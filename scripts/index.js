"use strict";

const CreateElement = (elementObj) => {
  if (!elementObj || !elementObj.tag) return {};
  var element = document.createElement(elementObj.tag);
  for (var prop in elementObj) {
    if (prop === "childNodes") {
      elementObj.childNodes.forEach(function (node) {
        element.appendChild(node);
      });
    } else if (prop === "attributes") {
      elementObj.attributes.forEach(function (attr) {
        element.setAttribute(attr.key, attr.value);
      });
    } else if (prop === "datasets") {
      elementObj.datasets.forEach(function (dataset) {
        element.dataset[dataset] = elementObj[dataset];
      });
    } else element[prop] = elementObj[prop];
  }
  return element;
};

const CreateInputText = () => {
  const textboxes = document.querySelectorAll("textbox");
  if (!textboxes?.length) return;

  for (const textbox of textboxes) {
    const label = CreateElement({
      tag: "label",
      htmlFor: textbox.id,
      className: `custom-form-label ${textbox.dataset.validationclass ?? ""}`,
      innerHTML: textbox.dataset.label,
    });
    const input = CreateElement({
      tag: "input",
      id: textbox.id,
      className: `custom-form-control ${textbox.classList} ${
        textbox.dataset.validationclass ?? ""
      }`,
      autocomplete: "off",
      value: textbox.dataset.value ?? "",
    });
    const check = CreateElement({
      tag: "span",
      className: "input-check",
    });

    function addClass() {
      input.classList.add("active");
      label.classList.add("active");
      setTimeout(() => {
        input.placeholder = textbox.dataset.placeholder || "";
      }, 300);
    }

    function removeClass() {
      input.classList.remove("active");
      label.classList.remove("active");
      input.placeholder = "";
    }

    input.addEventListener("focus", addClass);

    // For mobile devices where 'focus' and 'blur' might not work as expected
    input.addEventListener("click", addClass);

    input.addEventListener("blur", () => {
      if (!input.value) {
        removeClass();
      }
    });

    // When the page is loaded the input value checks and if it is not empty, the required classes add
    window.addEventListener("load", () => {
      console.log("page loaded");
      if (input.value) {
        addClass();
      }
    });

    const newEl = {
      tag: "div",
      className: `custom-form-group`,
      childNodes: [label, input],
    };

    // adds check sign if data-status set to "success"
    if (textbox.dataset.status === "success") {
      newEl.childNodes.push(check);
    }

    // Create the box of elements
    const inputText = CreateElement(newEl);
    textbox.replaceWith(inputText);
  }
};
(function () {
  CreateInputText();

  let isMenuOpen = false;
  let isItemsDisplayed = false;
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navigation = document.querySelector(".navigation");

  const threeDots = document.querySelector(".three-dots-menu");
  const menu = document.querySelector(".menu");

  hamburgerMenu.addEventListener("click", (event) => {
    if (hamburgerMenu.classList.contains("menu-active")) {
      isMenuOpen = !isMenuOpen;
    } else {
      isMenuOpen = !isMenuOpen;
    }

    if (isMenuOpen) {
      hamburgerMenu.classList.add("menu-active");
      navigation.classList.add("navigation-active");
    } else {
      hamburgerMenu.classList.remove("menu-active");
      navigation.classList.remove("navigation-active");
    }
  });

  threeDots.addEventListener("click", (event) => {
    if (menu.classList.contains("menu-toggle")) {
      isItemsDisplayed = !isItemsDisplayed;
    } else {
      isItemsDisplayed = !isItemsDisplayed;
    }

    if (isItemsDisplayed) {
      menu.classList.add("menu-toggle");
    } else {
      menu.classList.remove("menu-toggle");
    }
  });

  window.addEventListener("click", function (e) {
    if (
      !document.querySelector(".clickbox").contains(e.target) &&
      (hamburgerMenu.classList.contains("menu-active") ||
        menu.classList.contains("menu-toggle"))
    ) {
      // Clicked in box
      hamburgerMenu.classList.remove("menu-active");
      navigation.classList.remove("navigation-active");
      menu.classList.remove("menu-toggle")

      isMenuOpen = !isMenuOpen;
      isItemsDisplayed = !isItemsDisplayed;
    }
  });
})();
