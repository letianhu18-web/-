(() => {
  "use strict";
  const levels = window.MERZ_LEVELS;
  const gallery = document.getElementById("meme-gallery");
  const lightbox = document.getElementById("meme-lightbox");
  const grid = document.getElementById("gallery-grid");
  const progress = document.getElementById("merge-name");
  let previousHighest = 0;
  const toast = document.createElement("div");
  toast.className = "merge-toast";
  toast.setAttribute("role", "status");
  toast.hidden = true;
  document.body.append(toast);
  let toastTimer;
  function notify(level) {
    toast.textContent = "✦ " + level.name + " · " + level.de;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2000);
  }
  window.onMerzState = ({ highest, next, score }) => {
    const level = levels[Math.min(highest, levels.length - 1)];
    progress.textContent = "LV." + (highest + 1) + " · " + level.name + " / " + level.de;
    if (highest > previousHighest) notify(level);
    previousHighest = highest;
    if (levels[next]) document.getElementById("next-face").setAttribute("aria-label", "下一颗 · " + levels[next].name);
  };
  for (const level of levels) {
    const card = document.createElement("article");
    card.className = "meme-card";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "meme-image-button";
    button.setAttribute("aria-label", "查看完整梗图 · " + level.name);
    const image = document.createElement("img");
    image.src = level.image;
    image.alt = level.name + " / " + level.de;
    image.loading = "lazy";
    button.append(image);
    button.addEventListener("click", () => {
      document.getElementById("lightbox-image").src = level.image;
      document.getElementById("lightbox-image").alt = image.alt;
      document.getElementById("lightbox-title").textContent = "LV." + level.level + " · " + level.name + " / " + level.de;
      lightbox.showModal();
    });
    const title = document.createElement("h3");
    title.textContent = "0" + level.level + " · " + level.name;
    const subtitle = document.createElement("p");
    subtitle.textContent = level.de + " · " + level.kind;
    const source = document.createElement("a");
    source.href = level.post;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    source.textContent = "X ↗ @" + level.author;
    card.append(button, title, subtitle, source);
    grid.append(card);
  }
  function openGallery() {
    if (!document.getElementById("app").hidden && document.getElementById("pause-game").getAttribute("aria-pressed") !== "true") document.getElementById("pause-game").click();
    gallery.showModal();
  }
  document.getElementById("open-gallery").addEventListener("click", openGallery);
  document.getElementById("game-gallery").addEventListener("click", openGallery);
  document.getElementById("close-gallery").addEventListener("click", () => gallery.close());
  document.getElementById("close-lightbox").addEventListener("click", () => lightbox.close());
  // Name the levels in the existing crop preview without changing its controls.
  const previewList = document.getElementById("level-preview-list");
  const observer = new MutationObserver(() => {
    previewList.querySelectorAll("li").forEach((item, index) => {
      if (item.querySelector(".merz-level-label") || !levels[index]) return;
      const name = document.createElement("small");
      name.className = "merz-level-label";
      name.textContent = levels[index].name;
      item.append(name);
    });
  });
  observer.observe(previewList, { childList: true });
})();
