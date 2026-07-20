(function () {
  "use strict";

  var views = {
    landing: document.getElementById("view-landing"),
    product: document.getElementById("view-product"),
    checkout: document.getElementById("view-checkout"),
  };
  var steps = document.querySelectorAll(".step");

  function navigate(target) {
    if (!views[target]) return;

    Object.keys(views).forEach(function (key) {
      var el = views[key];
      var active = key === target;
      el.hidden = !active;
      el.classList.toggle("is-active", active);
    });

    steps.forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-step") === target);
    });
  }

  // Wire up every element with a data-nav attribute.
  document.querySelectorAll("[data-nav]").forEach(function (el) {
    el.addEventListener("click", function () {
      navigate(el.getAttribute("data-nav"));
    });
  });

  // Color swatches on the product page.
  var swatches = document.querySelectorAll(".swatch");
  swatches.forEach(function (sw) {
    sw.addEventListener("click", function () {
      swatches.forEach(function (s) {
        s.classList.remove("is-selected");
        s.setAttribute("aria-pressed", "false");
      });
      sw.classList.add("is-selected");
      sw.setAttribute("aria-pressed", "true");
    });
  });

  // Simple card-number formatting (groups of 4).
  var card = document.getElementById("card");
  if (card) {
    card.addEventListener("input", function () {
      var digits = card.value.replace(/\D/g, "").slice(0, 16);
      card.value = digits.replace(/(.{4})/g, "$1 ").trim();
    });
  }

  // Checkout submit -> fake success state.
  var form = document.getElementById("pay-form");
  var status = document.getElementById("pay-status");
  var payBtn = document.getElementById("pay-btn");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      payBtn.textContent = "Processing…";
      payBtn.disabled = true;
      setTimeout(function () {
        payBtn.textContent = "Payment complete ✓";
        status.classList.add("is-success");
        status.innerHTML = "Order confirmed — a receipt is on its way to your inbox.";
      }, 900);
    });
  }

  // Start on landing.
  navigate("landing");
})();
