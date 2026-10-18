(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const header = document.querySelector("[data-site-header]");
  const progress = document.querySelector(".scroll-progress span");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const toast = document.querySelector(".toast");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let toastTimer;

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (header) {
      header.classList.toggle("is-scrolled", y > 24);
    }
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const percent = max > 0 ? Math.min(100, (y / max) * 100) : 0;
      progress.style.width = percent.toFixed(2) + "%";
    }
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  function closeMenu() {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    const label = menuToggle.querySelector(".sr-only");
    if (label) label.textContent = "打开菜单";
    mobileNav.classList.remove("is-open");
    mobileNav.hidden = true;
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute("aria-expanded", "true");
    const label = menuToggle.querySelector(".sr-only");
    if (label) label.textContent = "关闭菜单";
    mobileNav.hidden = false;
    mobileNav.classList.add("is-open");
    document.body.classList.add("menu-open");
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function (event) {
        const href = link.getAttribute("href") || "";
        closeMenu();
        if (href.startsWith("#")) {
          const target = document.querySelector(href);
          if (target) {
            event.preventDefault();
            target.scrollIntoView({
              behavior: prefersReducedMotion ? "auto" : "smooth",
              block: "start"
            });
          }
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  const revealElements = Array.from(document.querySelectorAll(".reveal"));
  if (revealElements.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      const observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const siblings = el.parentElement
              ? Array.from(el.parentElement.children).filter(function (node) {
                  return node.classList && node.classList.contains("reveal");
                })
              : [];
            const index = Math.max(0, siblings.indexOf(el));
            el.style.transitionDelay = Math.min(index * 65, 260) + "ms";
            el.classList.add("is-visible");
            obs.unobserve(el);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
      );

      revealElements.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  function showToast(message) {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2200);
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const succeeded = document.execCommand("copy");
    document.body.removeChild(textarea);
    return succeeded;
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", async function () {
      const text = button.getAttribute("data-copy") || "";
      if (!text) return;
      try {
        await copyText(text);
        const previous = button.textContent;
        button.textContent = "已复制";
        showToast("邮箱地址已复制");
        window.setTimeout(function () {
          button.textContent = previous;
        }, 1800);
      } catch (error) {
        showToast("请手动复制邮箱地址");
      }
    });
  });

  const galleryImages = Array.from(document.querySelectorAll(".gallery-grid img"));
  let lightbox = document.querySelector(".lightbox");

  if (galleryImages.length && !lightbox) {
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "项目截图预览");
    lightbox.innerHTML =
      '<button class="lightbox-close" type="button" aria-label="关闭预览">×</button><div><img alt=""><p></p></div>';
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");
    const lightboxCaption = lightbox.querySelector("p");
    const closeButton = lightbox.querySelector(".lightbox-close");
    let lastFocused = null;
    let inertSiblings = [];

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      inertSiblings.forEach(function (node) {
        node.inert = false;
      });
      inertSiblings = [];
      if (lastFocused instanceof HTMLElement) lastFocused.focus();
    }

    function openLightbox(image) {
      lastFocused = document.activeElement;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt || "";
      const figure = image.closest("figure");
      const caption = figure ? figure.querySelector("figcaption") : null;
      lightboxCaption.textContent = caption ? caption.textContent.trim() : image.alt;
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      inertSiblings = Array.from(document.body.children).filter(function (node) {
        return node !== lightbox && !["SCRIPT", "STYLE"].includes(node.tagName);
      });
      inertSiblings.forEach(function (node) {
        node.inert = true;
      });
      closeButton.focus();
    }

    galleryImages.forEach(function (image) {
      image.setAttribute("tabindex", "0");
      image.setAttribute("role", "button");
      image.setAttribute("aria-label", "放大查看：" + (image.alt || "项目截图"));
      image.addEventListener("click", function () {
        openLightbox(image);
      });
      image.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(image);
        }
      });
    });

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
      if (event.key === "Tab" && lightbox.classList.contains("is-open")) {
        event.preventDefault();
        closeButton.focus();
      }
    });
  }
})();
