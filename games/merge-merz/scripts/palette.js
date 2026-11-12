(() => {
  "use strict";
  const defaults = {
    bg: "#101824",
    ink: "#f1c75b",
    red: "#1c293a",
    soft: "#b9c7d8",
    border: "#41516a",
    button: "#f1c75b",
    buttonText: "#1c293a",
    boardTop: "#1b293b",
    boardBottom: "#101824",
    ballBorder: "#ffffff",
    guide: "#f1c75b",
    effect: "#f1c75b",
    overlay: "#101824",
    focus: "#ffffff",
  };
  let current = { ...defaults };
  function set(values) {
    for (const key of Object.keys(defaults)) {
      if (/^#[a-f0-9]{6}$/i.test(values[key])) current[key] = values[key];
      document.documentElement.style.setProperty(`--${key}`, current[key]);
    }
    document.dispatchEvent(new Event("palettechange"));
  }
  window.gamePalette = { defaults, get: () => ({ ...current }), set };
})();
