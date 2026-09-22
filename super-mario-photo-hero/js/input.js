(function() {
    var pressedKeys = {};
    var keyboardKeys = {};
    var virtualPointers = {};
    var clearTouchStates = [];
    var touchHint;
    var defaultTouchHint;

    function updateTouchHint() {
        if (!touchHint && document.getElementById) {
            touchHint = document.getElementById('touch-hint');
            if (touchHint) defaultTouchHint = touchHint.textContent;
        }
        if (!touchHint) return;

        var labels = [];
        var names = { LEFT: '← 左移', RIGHT: '→ 右移', UP: '↑ 跳跃', DOWN: '↓ 下蹲', RUN: 'B 奔跑', JUMP: '跳跃' };
        for (var key in pressedKeys) {
            if (pressedKeys.hasOwnProperty(key) && pressedKeys[key] && names[key]) labels.push(names[key]);
        }
        if (labels.length) {
            touchHint.textContent = '已收到按键：' + labels.join('、');
            touchHint.classList.add('input-live');
        } else {
            touchHint.textContent = defaultTouchHint;
            touchHint.classList.remove('input-live');
        }
    }

    function updateKey(key) {
        var pointers = virtualPointers[key];
        var hasPointer = false;
        if (pointers) {
            for (var id in pointers) {
                if (pointers.hasOwnProperty(id)) {
                    hasPointer = true;
                    break;
                }
            }
        }
        pressedKeys[key] = !!keyboardKeys[key] || hasPointer;
        updateTouchHint();
    }

    function setKey(event, status) {
        var code = event.keyCode;
        var key;

        if (code >= 37 && code <= 40) event.preventDefault();

        switch(code) {
        case 32:
            key = 'SPACE'; break;
        case 37:
            key = 'LEFT'; break;
        case 38:
            key = 'UP'; break;
        case 39:
            key = 'RIGHT'; break;
        case 40:
            key = 'DOWN'; break;
        case 88:
            key = 'JUMP'; break;
        case 90:
            key = 'RUN'; break;
        default:
            key = String.fromCharCode(code);
        }

        keyboardKeys[key] = status;
        updateKey(key);
    }

    document.addEventListener('keydown', function(e) {
        setKey(e, true);
    });

    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    });

    window.addEventListener('blur', function() {
        pressedKeys = {};
        keyboardKeys = {};
        virtualPointers = {};
        clearTouchStates.forEach(function(clearState) { clearState(); });
        updateTouchHint();
    });

    function bindTouchControls() {
        var buttons = document.querySelectorAll('[data-game-key]');
        for (var index = 0; index < buttons.length; index++) {
            bindOneButton(buttons[index]);
        }
    }

    function bindOneButton(button) {
        var key = button.getAttribute('data-game-key').toUpperCase();
        var activePointers = {};
        var lastNativeInput = 0;
        var clickSerial = 0;

        function pressPointer(pointerId) {
            var id = String(pointerId);
            if (activePointers[id]) return;
            activePointers[id] = true;
            lastNativeInput = Date.now();
            window.input.setVirtualKey(key, true, id);
            button.classList.add('is-pressed');
        }

        function releasePointer(pointerId) {
            var id = String(pointerId);
            if (!activePointers[id]) return;
            delete activePointers[id];
            lastNativeInput = Date.now();
            window.input.setVirtualKey(key, false, id);
            var stillPressed = false;
            for (var activeId in activePointers) {
                if (activePointers.hasOwnProperty(activeId)) { stillPressed = true; break; }
            }
            if (!stillPressed) button.classList.remove('is-pressed');
        }

        clearTouchStates.push(function() {
            activePointers = {};
            button.classList.remove('is-pressed');
        });

        // Register all available event names. Some embedded phone browsers
        // report PointerEvent support but still deliver only Touch Events.
        button.addEventListener('pointerdown', function(event) {
            event.preventDefault();
            pressPointer('pointer-' + event.pointerId);
            if (button.setPointerCapture && event.pointerId !== undefined) {
                try { button.setPointerCapture(event.pointerId); } catch (ignore) {}
            }
        });
        button.addEventListener('pointerup', function(event) { releasePointer('pointer-' + event.pointerId); });
        button.addEventListener('pointercancel', function(event) { releasePointer('pointer-' + event.pointerId); });
        button.addEventListener('lostpointercapture', function(event) { releasePointer('pointer-' + event.pointerId); });

        button.addEventListener('touchstart', function(event) {
            event.preventDefault();
            for (var touchIndex = 0; touchIndex < event.changedTouches.length; touchIndex++) {
                pressPointer('touch-' + event.changedTouches[touchIndex].identifier);
            }
        }, { passive: false });
        button.addEventListener('touchend', function(event) {
            for (var touchIndex = 0; touchIndex < event.changedTouches.length; touchIndex++) {
                releasePointer('touch-' + event.changedTouches[touchIndex].identifier);
            }
        }, false);
        button.addEventListener('touchcancel', function(event) {
            for (var touchIndex = 0; touchIndex < event.changedTouches.length; touchIndex++) {
                releasePointer('touch-' + event.changedTouches[touchIndex].identifier);
            }
        }, false);

        button.addEventListener('mousedown', function(event) {
            event.preventDefault();
            pressPointer('mouse');
        });
        window.addEventListener('mouseup', function() { releasePointer('mouse'); });

        // A short tap also moves on click-only mobile webviews. Normal
        // pointer/touch presses already supplied native input, so skip them.
        button.addEventListener('click', function() {
            if (Date.now() - lastNativeInput < 500) return;
            var id = 'click-' + (++clickSerial);
            pressPointer(id);
            window.setTimeout(function() { releasePointer(id); }, 180);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindTouchControls);
    } else {
        bindTouchControls();
    }

    window.input = {
        isDown: function(key) {
            return pressedKeys[key.toUpperCase()];
        },
        setVirtualKey: function(key, status, pointerId) {
            key = key.toUpperCase();
            if (!virtualPointers[key]) virtualPointers[key] = {};
            pointerId = String(pointerId);
            if (status) {
                virtualPointers[key][pointerId] = true;
            } else {
                delete virtualPointers[key][pointerId];
                var hasPointers = false;
                for (var id in virtualPointers[key]) {
                    if (virtualPointers[key].hasOwnProperty(id)) {
                        hasPointers = true;
                        break;
                    }
                }
                if (!hasPointers) delete virtualPointers[key];
            }
            updateKey(key);
        },
        reset: function() {
          ['RUN', 'LEFT', 'RIGHT', 'DOWN', 'UP', 'JUMP'].forEach(function(key) {
              keyboardKeys[key] = false;
              delete virtualPointers[key];
              updateKey(key);
          });
        }
    };
})();
