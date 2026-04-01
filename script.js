const yearNode = document.querySelector("#year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const revealNodes = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && revealNodes.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

const copyButtons = document.querySelectorAll(".copy-btn");
copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const targetId = button.getAttribute("data-copy-target");
    if (!targetId) return;

    const codeNode = document.getElementById(targetId);
    if (!codeNode) return;

    const originalLabel = button.textContent;
    try {
      await navigator.clipboard.writeText(codeNode.innerText);
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = originalLabel;
      }, 1000);
    } catch {
      button.textContent = "Failed";
      window.setTimeout(() => {
        button.textContent = originalLabel;
      }, 1000);
    }
  });
});

const pathSwitchers = document.querySelectorAll("[data-path-switch]");
pathSwitchers.forEach((switcher) => {
  const buttons = switcher.querySelectorAll("[data-path-button]");
  const panels = switcher.querySelectorAll("[data-path-panel]");
  if (buttons.length === 0 || panels.length === 0) return;

  const setActivePath = (path) => {
    buttons.forEach((button) => {
      const isActive = button.getAttribute("data-path-button") === path;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      const isActive = panel.getAttribute("data-path-panel") === path;
      panel.classList.toggle("is-active", isActive);
    });
  };

  const initialPath = buttons[0].getAttribute("data-path-button");
  if (initialPath) setActivePath(initialPath);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const path = button.getAttribute("data-path-button");
      if (!path) return;
      setActivePath(path);
    });
  });
});
