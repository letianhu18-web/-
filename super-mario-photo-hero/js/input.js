(function() {
    var pressedKeys = {};
    var keyboardKeys = {};
    var virtualPointers = {};
    var clearTouchStates = [];

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

        function pressPointer(pointerId) {
            var id = String(pointerId);
            if (activePointers[id]) return;
            activePointers[id] = true;
            window.input.setVirtualKey(key, true, id);
            button.classList.add('is-pressed');
        }

        function releasePointer(pointerId) {
            var id = String(pointerId);
            if (!activePointers[id]) return;
            delete activePointers[id];
            window.input.setVirtualKey(key, false, id);
            if (!Object.keys(activePointers).length) button.classList.remove('is-pressed');
        }

        clearTouchStates.push(function() {
            activePointers = {};
            button.classList.remove('is-pressed');
        });

        var supportsPointerEvents = !!window.PointerEvent;
        var supportsTouchEvents = ('ontouchstart' in window) ||
            (window.navigator && window.navigator.maxTouchPoints > 0);

        if (supportsPointerEvents) {
            button.addEventListener('pointerdown', function(event) {
                event.preventDefault();
                pressPointer('pointer-' + event.pointerId);
                if (button.setPointerCapture) {
                    try { button.setPointerCapture(event.pointerId); } catch (ignore) {}
                }
            });
            button.addEventListener('pointerup', function(event) { releasePointer('pointer-' + event.pointerId); });
            button.addEventListener('pointercancel', function(event) { releasePointer('pointer-' + event.pointerId); });
            button.addEventListener('lostpointercapture', function(event) { releasePointer('pointer-' + event.pointerId); });
        }

        if (supportsTouchEvents) {
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
        }

        if (!supportsPointerEvents && !supportsTouchEvents) {
            button.addEventListener('mousedown', function(event) {
                event.preventDefault();
                pressPointer('mouse');
            });
            window.addEventListener('mouseup', function() { releasePointer('mouse'); });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindTouchControls, { once: true });
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
