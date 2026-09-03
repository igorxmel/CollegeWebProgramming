/* ==========================================================================
   Dream Sneakers - page interactivity
   Practical work 3: events, DOM, modal window, burger menu, accordion,
   gallery, back to top button and theme switching.
   ========================================================================== */

"use strict";

const THEME_STORAGE_KEY = "dream-sneakers-theme";
const MOBILE_BREAKPOINT = 768;
const SCROLL_TOP_OFFSET = 400;

/* --------------------------------------------------------------------------
   Task 2, 3. Modal window with the request form
   -------------------------------------------------------------------------- */

function initModal() {
    const modal = document.getElementById("modal");

    if (!modal) {
        return;
    }

    const openButtons = document.querySelectorAll("[data-modal-open]");
    const closeElements = modal.querySelectorAll("[data-modal-close]");
    const form = document.getElementById("modalForm");
    const successMessage = document.getElementById("modalSuccess");

    function openModal() {
        modal.classList.add("modal--open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("is-locked");
    }

    function closeModal() {
        modal.classList.remove("modal--open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("is-locked");
    }

    openButtons.forEach(function (button) {
        button.addEventListener("click", openModal);
    });

    // Task 3. The overlay and the cross both carry data-modal-close,
    // so a click on the dimmed area around the window closes it too.
    closeElements.forEach(function (element) {
        element.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("modal--open")) {
            closeModal();
        }
    });

    if (form) {
        form.addEventListener("submit", function (event) {
            // Without preventDefault the browser would reload the page
            // and the entered data would be lost.
            event.preventDefault();

            form.hidden = true;
            successMessage.hidden = false;

            window.setTimeout(function () {
                closeModal();
                form.reset();
                form.hidden = false;
                successMessage.hidden = true;
            }, 2500);
        });
    }
}

/* --------------------------------------------------------------------------
   Task 4. Burger menu for screens narrower than 768 pixels
   -------------------------------------------------------------------------- */

function initBurgerMenu() {
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");

    if (!burger || !nav) {
        return;
    }

    function closeMenu() {
        burger.classList.remove("burger--active");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Открыть меню");
        nav.classList.remove("nav--open");
    }

    burger.addEventListener("click", function () {
        const isOpen = nav.classList.toggle("nav--open");

        burger.classList.toggle("burger--active", isOpen);
        burger.setAttribute("aria-expanded", String(isOpen));
        burger.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
    });

    // A tap on a menu link should navigate and hide the panel at the same time.
    nav.querySelectorAll(".nav__link").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > MOBILE_BREAKPOINT) {
            closeMenu();
        }
    });
}

/* --------------------------------------------------------------------------
   Task 5. Back to top button
   -------------------------------------------------------------------------- */

function initScrollTopButton() {
    const button = document.getElementById("scrollTop");

    if (!button) {
        return;
    }

    function toggleButton() {
        button.classList.toggle("scroll-top--visible", window.scrollY > SCROLL_TOP_OFFSET);
    }

    window.addEventListener("scroll", toggleButton);

    button.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    toggleButton();
}

/* --------------------------------------------------------------------------
   Task 6. FAQ accordion
   -------------------------------------------------------------------------- */

function initAccordion() {
    const accordion = document.getElementById("accordion");

    if (!accordion) {
        return;
    }

    const items = accordion.querySelectorAll(".accordion__item");

    function closeItem(item) {
        const button = item.querySelector(".accordion__button");
        const panel = item.querySelector(".accordion__panel");

        item.classList.remove("accordion__item--open");
        button.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = null;
    }

    function openItem(item) {
        const button = item.querySelector(".accordion__button");
        const panel = item.querySelector(".accordion__panel");

        item.classList.add("accordion__item--open");
        button.setAttribute("aria-expanded", "true");
        // scrollHeight is the real height of the content, so the panel
        // can be animated instead of appearing instantly.
        panel.style.maxHeight = panel.scrollHeight + "px";
    }

    items.forEach(function (item) {
        const button = item.querySelector(".accordion__button");

        button.addEventListener("click", function () {
            const isOpen = item.classList.contains("accordion__item--open");

            items.forEach(closeItem);

            if (!isOpen) {
                openItem(item);
            }
        });
    });
}

/* --------------------------------------------------------------------------
   Task 8. Gallery: a thumbnail replaces the main image
   -------------------------------------------------------------------------- */

function initGallery() {
    const image = document.getElementById("galleryImage");
    const caption = document.getElementById("galleryCaption");
    const thumbs = document.querySelectorAll(".gallery__thumb");

    if (!image || thumbs.length === 0) {
        return;
    }

    thumbs.forEach(function (thumb) {
        thumb.addEventListener("click", function () {
            thumbs.forEach(function (item) {
                item.classList.remove("gallery__thumb--active");
            });

            thumb.classList.add("gallery__thumb--active");

            // The fade class is removed on the next frame, that restarts the transition.
            image.classList.add("gallery__image--fading");

            window.setTimeout(function () {
                image.src = thumb.dataset.image;
                image.alt = "Кроссовки " + thumb.dataset.caption;
                caption.textContent = thumb.dataset.caption;
                image.classList.remove("gallery__image--fading");
            }, 150);
        });
    });
}

/* --------------------------------------------------------------------------
   Task 7. Light and dark theme
   -------------------------------------------------------------------------- */

function initThemeToggle() {
    const toggle = document.getElementById("themeToggle");

    if (!toggle) {
        return;
    }

    function applyTheme(theme) {
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }

        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }

    // Restore the choice made during the previous visit
    if (localStorage.getItem(THEME_STORAGE_KEY) === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    toggle.addEventListener("click", function () {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";

        applyTheme(isDark ? "light" : "dark");
    });
}

/* --------------------------------------------------------------------------
   Start
   -------------------------------------------------------------------------- */

initThemeToggle();
initModal();
initBurgerMenu();
initScrollTopButton();
initAccordion();
initGallery();
