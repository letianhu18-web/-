(function() {
    var pressedKeys = {};
    var keyboardKeys = {};
    var virtualPointers = {};

    function updateKey(key) {
        var pointers = virtualPointers[key];
        pressedKeys[key] = !!keyboardKeys[key] || !!(pointers && pointers.size);
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
        document.querySelectorAll('.touch-button.is-pressed').forEach(function(button) {
            button.classList.remove('is-pressed');
        });
    });

    function bindTouchControls() {
        document.querySelectorAll('[data-game-key]').forEach(function(button) {
            var key = button.getAttribute('data-game-key').toUpperCase();
            var activePointers = new Set();

            function releasePointer(event) {
                if (!activePointers.has(event.pointerId)) return;
                activePointers.delete(event.pointerId);
                window.input.setVirtualKey(key, false, event.pointerId);
                if (!activePointers.size) button.classList.remove('is-pressed');
            }

            button.addEventListener('pointerdown', function(event) {
                event.preventDefault();
                activePointers.add(event.pointerId);
                window.input.setVirtualKey(key, true, event.pointerId);
                button.classList.add('is-pressed');
                if (button.setPointerCapture) button.setPointerCapture(event.pointerId);
            });

            button.addEventListener('pointerup', releasePointer);
            button.addEventListener('pointercancel', releasePointer);
            button.addEventListener('lostpointercapture', releasePointer);
        });
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
            if (!virtualPointers[key]) virtualPointers[key] = new Set();
            if (status) {
                virtualPointers[key].add(pointerId);
            } else {
                virtualPointers[key].delete(pointerId);
                if (!virtualPointers[key].size) delete virtualPointers[key];
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
