/* Roast House: the single shared script for catalogues, bag, dialogs, and review forms. */
"use strict";

window.BeanBoutique = {
  currency: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
  products: [
    {
      id: "morning-bloom",
      category: "coffee",
      name: "Morning Bloom",
      origin: "Colombia · Huila",
      roast: "Medium roast",
      price: 1650,
      size: "250 g",
      image: "image/beans1.jpg",
      alt: "Roasted coffee beans",
      notes: "Milk chocolate, caramel, orange",
      aroma: "Sweet cocoa and citrus blossom",
      description:
        "A soft, sunny everyday coffee with a caramel finish. Your slow-morning companion.",
      method: "Pour-over or drip coffee · 15 g coffee to 250 ml water.",
      badge: "Bestseller"
    },
    {
      id: "rose-cloud",
      category: "coffee",
      name: "Rose Cloud",
      origin: "Ethiopia · Sidama",
      roast: "Light roast",
      price: 1900,
      size: "250 g",
      image: "image/beans2.jpg",
      alt: "A freshly prepared cup of coffee",
      notes: "Bergamot, peach, jasmine",
      aroma: "Delicate florals and ripe stone fruit",
      description:
        "Bright and beautifully delicate, with a tea-like body and a little floral magic.",
      method: "Pour-over · medium-fine grind, water just off the boil.",
      badge: "Floral & bright"
    },
    {
      id: "velvet-moon",
      category: "coffee",
      name: "Velvet Moon",
      origin: "Brazil · Cerrado",
      roast: "Dark roast",
      price: 1550,
      size: "250 g",
      image: "image/beans3.jpg",
      alt: "Coffee beans ready to grind",
      notes: "Dark chocolate, hazelnut, molasses",
      aroma: "Toasted nuts and bittersweet cocoa",
      description: "Rich, round and wonderfully comforting. Especially lovely with steamed milk.",
      method: "Espresso or moka pot · grind fresh just before brewing.",
      badge: "Espresso favourite"
    },
    {
      id: "honey-hug",
      category: "coffee",
      name: "Honey Hug",
      origin: "Costa Rica · Tarrazú",
      roast: "Medium roast",
      price: 1800,
      size: "250 g",
      image: "image/beans4.jpg",
      alt: "Coffee served in a cup",
      notes: "Honey, apricot, brown sugar",
      aroma: "Warm honey and dried fruit",
      description: "A honey-processed coffee with a silky body and natural sweetness.",
      method: "French press · coarse grind, steep for four minutes.",
      badge: "Sweet & mellow"
    },
    {
      id: "forest-day",
      category: "coffee",
      name: "Forest Day",
      origin: "Guatemala · Antigua",
      roast: "Medium roast",
      price: 1750,
      size: "250 g",
      image: "image/beans5.jpg",
      alt: "Roasted beans for brewing at home",
      notes: "Cocoa, red apple, almond",
      aroma: "Baked apple and toasted almond",
      description: "A balanced little adventure: crisp fruit, cozy cocoa and a clean finish.",
      method: "Drip or AeroPress · start with a 1:16 coffee-to-water ratio.",
      badge: "Beautifully balanced"
    },
    {
      id: "quiet-hours",
      category: "coffee",
      name: "Quiet Hours Decaf",
      origin: "Colombia · Tolima",
      roast: "Medium roast",
      price: 1700,
      size: "250 g",
      image: "image/beans6.jpg",
      alt: "A cozy cup of coffee",
      notes: "Caramel, cacao, red grape",
      aroma: "Soft chocolate and caramel",
      description:
        "All the cozy ritual, with less caffeine. A sugarcane-process decaf for winding down.",
      method: "French press or espresso · adjust the grind to your brewer.",
      badge: "Decaf, full of joy"
    },
    {
      id: "ceramic-dripper",
      category: "equipment",
      name: "Petal Pour-over Set",
      origin: "Your mindful morning ritual",
      price: 3200,
      size: "Dripper + server",
      image: "image/coffee-pour-over.jpg",
      alt: "Pour-over coffee brewing equipment",
      description: "A simple pour-over setup for a clean, delicate cup.",
      method:
        "Rinse the paper filter, add medium-fine grounds, bloom for 30 seconds, then pour slowly in circles.",
      badge: "Start here"
    },
    {
      id: "espresso-machine",
      category: "equipment",
      name: "Little Barista Machine",
      origin: "Café moments, at home",
      price: 24900,
      size: "1 machine",
      image: "image/coffee-machine.jpg",
      alt: "An espresso coffee machine",
      description: "An entry-level espresso machine with a steam wand for your home café dreams.",
      method:
        "Warm the machine first. Use a fine grind and an even tamp; follow the manufacturer's cleaning and steam-wand safety instructions.",
      badge: "Coffee corner hero"
    },
    {
      id: "french-press",
      category: "equipment",
      name: "Slow Sunday Press",
      origin: "Full-bodied & fuss-free",
      price: 2850,
      size: "600 ml press",
      image: "image/coffee-glass-press.jpg",
      alt: "A stainless steel French press coffee maker",
      description: "A classic press for generous, full-bodied cups and slow conversations.",
      method:
        "Use coarse grounds and hot water. Steep for four minutes, press gently, and pour away from the grounds.",
      badge: "Cozy classic"
    },
    {
      id: "burr-grinder",
      category: "equipment",
      name: "Daily Ritual Grinder",
      origin: "Freshness starts here",
      price: 5800,
      size: "1 hand grinder",
      image: "image/coffee-grinder.jpg",
      alt: "Coffee grinding equipment",
      description:
        "A compact burr grinder for fresher, more even brewing. Pictured equipment may differ.",
      method:
        "Choose a fine setting for espresso, medium for pour-over, or coarse for French press. Brush burrs clean; do not immerse them.",
      badge: "Freshly ground"
    }
  ],
  money(cents) {
    return this.currency.format(cents / 100);
  },
  getProduct(id) {
    return this.products.find((product) => product.id === id);
  },
  totals(items, promo) {
    const subtotal = items.reduce((sum, item) => {
      const product = this.getProduct(item.id);
      if (!product || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) {
        throw new RangeError("Cannot calculate totals for an invalid cart item.");
      }
      return sum + product.price * item.quantity;
    }, 0);
    const discount = promo === "FIRSTSIP" ? Math.round(subtotal / 10) : 0;
    return { subtotal, discount, total: subtotal - discount };
  }
};

(() => {
  const forms = document.querySelectorAll("form[data-demo-form]");
  function validateField(field) {
    field.setCustomValidity("");
    if (field.required && !field.value.trim()) {
      field.setCustomValidity(
        field.tagName === "SELECT"
          ? "Please choose a plan."
          : `Please enter your ${field.dataset.label}.`
      );
    }
    const valid = field.checkValidity();
    let message = "";
    if (!valid) {
      if (field.validity.typeMismatch) {
        message = "Please enter an email address such as hello@example.com.";
      } else if (field.validity.tooLong) {
        message = `Please use no more than ${field.maxLength} characters.`;
      } else {
        message = field.validationMessage;
      }
    }
    document.getElementById(`${field.id}-error`).textContent = message;
    field.setAttribute("aria-invalid", String(!valid));
    return valid;
  }
  forms.forEach((form) => {
    const fields = Array.from(form.querySelectorAll("input, select"));
    const status = form.querySelector(".status-message");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.textContent = "";
      const invalidFields = fields.filter((field) => !validateField(field));
      if (invalidFields.length) {
        status.textContent = "Please check the highlighted fields. Nothing has been sent.";
        invalidFields[0].focus();
        return;
      }
      const tier = form.querySelector("#subscription-tier");
      const confirmation =
        form.dataset.demoForm === "subscription"
          ? `Plan reviewed: ${tier.selectedOptions[0].textContent}. Subscriptions are not yet available to order online. No subscription or payment was created, and your details were not sent or stored.`
          : `Details checked for ${form.dataset.workshop}. Online registration is not yet available. No seat was reserved or confirmation email sent, and your details were not sent or stored.`;
      form.reset();
      fields.forEach((field) => {
        field.setCustomValidity("");
        field.removeAttribute("aria-invalid");
        document.getElementById(`${field.id}-error`).textContent = "";
      });
      status.textContent = confirmation;
      status.focus();
    });
    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      const handleEdit = () => {
        status.textContent = "";
        if (field.getAttribute("aria-invalid") === "true") validateField(field);
        else field.setCustomValidity("");
      };
      field.addEventListener("input", handleEdit);
      field.addEventListener("change", handleEdit);
    });
    form.noValidate = true;
    form.querySelector('button[type="submit"]').disabled = false;
  });
  const tierSelect = document.getElementById("subscription-tier");
  if (tierSelect) {
    document.querySelectorAll("[data-tier-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        tierSelect.value = button.dataset.tierChoice;
        tierSelect.dispatchEvent(new Event("change", { bubbles: true }));
        validateField(tierSelect);
        tierSelect.focus();
      });
      button.disabled = false;
    });
  }
})();

(() => {
  const shop = window.BeanBoutique;
  const storageKey = "bean-boutique-cart-v1";
  const announcement = document.createElement("div");
  announcement.className = "toast";
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", "polite");
  document.body.append(announcement);
  let announcementTimer;
  shop.announce = (message) => {
    clearTimeout(announcementTimer);
    announcement.textContent = message;
    announcement.classList.add("is-visible");
    announcementTimer = setTimeout(() => announcement.classList.remove("is-visible"), 6500);
  };
  const storageNotice = document.createElement("p");
  storageNotice.className = "storage-notice";
  storageNotice.setAttribute("role", "status");
  storageNotice.hidden = true;
  document.querySelector("main").prepend(storageNotice);
  const storageWarning = (message, error) => {
    storageNotice.textContent = message;
    storageNotice.hidden = false;
    console.warn(message, error || "");
  };
  shop.readPreference = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      storageWarning(
        "Browser storage is unavailable. Your bag and welcome-popup preference may not carry over to another page.",
        error
      );
      return null;
    }
  };
  shop.writePreference = (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      storageWarning(
        "We could not save in this browser. Changes work on this page, but may not carry over when you leave.",
        error
      );
      return false;
    }
  };
  function readCart(raw) {
    const empty = { version: 1, items: [], promo: "" };
    if (raw === null) return empty;
    let saved;
    try {
      saved = JSON.parse(raw);
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error;
      storageWarning(
        "Your saved bag could not be read. An empty bag is shown; add an item to start again.",
        error
      );
      return empty;
    }
    if (!saved || saved.version !== 1 || !Array.isArray(saved.items)) {
      storageWarning("Your saved bag has an unsupported format. An empty bag is shown.");
      return empty;
    }
    const seen = new Set();
    let invalid = false;
    const items = saved.items
      .filter((item) => {
        const valid =
          item &&
          typeof item.id === "string" &&
          shop.getProduct(item.id) &&
          Number.isInteger(item.quantity) &&
          item.quantity >= 1 &&
          item.quantity <= 99 &&
          !seen.has(item.id);
        if (!valid) invalid = true;
        else seen.add(item.id);
        return valid;
      })
      .map(({ id, quantity }) => ({ id, quantity }));
    const promo = saved.promo === "FIRSTSIP" ? saved.promo : "";
    if (invalid || (saved.promo !== "" && saved.promo !== "FIRSTSIP")) {
      storageWarning(
        "Some saved bag details were invalid and have been removed. Please review your items and promotion."
      );
    }
    return { version: 1, items, promo };
  }
  let cart = readCart(shop.readPreference(storageKey));
  shop.getCart = () => ({ ...cart, items: cart.items.map((item) => ({ ...item })) });
  function notify() {
    const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll("[data-cart-count]").forEach((element) => {
      element.textContent = String(count);
    });
    document.dispatchEvent(new CustomEvent("cartchange"));
  }
  function save() {
    shop.writePreference(storageKey, JSON.stringify(cart));
    notify();
  }
  shop.addToCart = (id) => {
    const product = shop.getProduct(id);
    if (!product) {
      shop.announce("This product is unavailable. Please choose a product from the catalogue.");
      return;
    }
    const existing = cart.items.find((item) => item.id === id);
    if (existing && existing.quantity >= 99) {
      shop.announce("The limit is 99 of each item. Review your bag to make changes.");
      return;
    }
    if (existing) existing.quantity += 1;
    else cart.items.push({ id, quantity: 1 });
    save();
    shop.announce(`${product.name} added to your bag.`);
  };
  shop.setQuantity = (id, quantity) => {
    const item = cart.items.find((entry) => entry.id === id);
    if (!item || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      shop.announce("Please choose a whole-number quantity between 1 and 99.");
      return false;
    }
    item.quantity = quantity;
    save();
    return true;
  };
  shop.removeItem = (id) => {
    const product = shop.getProduct(id);
    cart.items = cart.items.filter((item) => item.id !== id);
    save();
    shop.announce(`${product ? product.name : "Item"} removed from your bag.`);
  };
  shop.clearCart = () => {
    cart = { version: 1, items: [], promo: "" };
    save();
  };
  shop.applyPromo = (code) => {
    if (code.trim().toUpperCase() !== "FIRSTSIP") return false;
    cart.promo = "FIRSTSIP";
    save();
    return true;
  };
  const navButton = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".site-nav");
  if (navButton && navigation) {
    navButton.hidden = false;
    navigation.classList.add("nav-collapsible");
    navButton.addEventListener("click", () => {
      const expanded = navButton.getAttribute("aria-expanded") === "true";
      navButton.setAttribute("aria-expanded", String(!expanded));
      navigation.classList.toggle("is-open", !expanded);
    });
    navigation.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navButton.getAttribute("aria-expanded") === "true") {
        navigation.classList.remove("is-open");
        navButton.setAttribute("aria-expanded", "false");
        navButton.focus();
      }
    });
  }
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const addButton = event.target.closest("[data-add-product]");
    if (addButton) shop.addToCart(addButton.dataset.addProduct);
  });
  document.querySelectorAll("[data-add-product]").forEach((button) => {
    button.disabled = false;
  });
  window.addEventListener("storage", (event) => {
    if (event.key === storageKey || event.key === null) {
      cart = readCart(event.newValue);
      notify();
    }
  });
  notify();
})();

// Each page module checks its own hooks so one script can serve all six pages.
(() => {
  const shop = window.BeanBoutique;
  const catalogue = document.querySelector("[data-catalogue]");
  if (!catalogue) return;
  const category = catalogue.dataset.catalogue;
  const grid = document.querySelector("#product-grid");
  const search = document.querySelector("#product-search");
  const clear = document.querySelector("#clear-search");
  const resultCount = document.querySelector("#result-count");
  const empty = document.querySelector("#no-results");
  const filters = document.querySelectorAll("[data-filter]");
  let filter = "all";
  function render() {
    const query = search.value.trim().toLowerCase();
    const products = shop.products.filter(
      (product) =>
        product.category === category &&
        (filter === "all" ||
          product.roast === filter ||
          (filter === "decaf" && product.id === "quiet-hours")) &&
        [
          product.name,
          product.origin,
          product.roast,
          product.notes,
          product.aroma,
          product.description,
          product.method
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query)
    );
    grid.replaceChildren();
    products.forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-image"><img src="${product.image}" alt="${product.alt}" width="640" height="480" loading="lazy">
          <span class="product-badge">${product.badge}</span></div>
        <div class="product-body">
          <p class="eyebrow">${product.origin}</p><h2>${product.name}</h2>
          <p class="product-notes">${product.notes || product.size}</p><p>${product.description}</p>
          <details><summary>${category === "coffee" ? "Aroma & brewing notes" : "How to use it"}</summary>
            ${product.aroma ? `<p><strong>Aroma:</strong> ${product.aroma}</p><p><strong>Roast:</strong> ${product.roast}</p>` : ""}
            <p>${product.method}</p></details>
          <div class="product-bottom"><p class="price">${shop.money(product.price)} <span>/ ${product.size}</span></p>
          <button class="button button-small" type="button" data-add-product="${product.id}" aria-label="Add ${product.name} to bag">Add to bag <span aria-hidden="true">+</span></button></div>
        </div>`;
      grid.append(card);
    });
    resultCount.textContent = `${products.length} ${products.length === 1 ? "selection" : "selections"} for your coffee ritual`;
    empty.hidden = products.length !== 0;
    clear.hidden = search.value.length === 0;
  }
  search.disabled = false;
  search.addEventListener("input", render);
  clear.addEventListener("click", () => {
    search.value = "";
    render();
    search.focus();
  });
  filters.forEach((button) => {
    button.disabled = false;
    button.addEventListener("click", () => {
      filter = button.dataset.filter;
      filters.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
      render();
    });
  });
  render();
})();

(() => {
  const items = document.querySelector("#cart-items");
  if (!items) return;
  const shop = window.BeanBoutique;
  const content = document.querySelector("#cart-content");
  const empty = document.querySelector("#empty-cart");
  const confirmation = document.querySelector("#order-confirmation");
  const reviewButton = document.querySelector("#review-order");
  const dialog = document.querySelector("#checkout-dialog");
  const confirmButton = document.querySelector("#confirm-order");
  const promoInput = document.querySelector("#promo-code");
  const promoStatus = document.querySelector("#promo-status");
  let completed = false;
  let reviewedCart = "";
  let confirming = false;
  function render() {
    const cart = shop.getCart();
    const totals = shop.totals(cart.items, cart.promo);
    if (completed && cart.items.length > 0) {
      completed = false;
      confirmation.hidden = true;
    }
    empty.hidden = cart.items.length > 0 || completed;
    content.hidden = cart.items.length === 0;
    const focused = document.activeElement;
    const focusId = focused && focused.dataset.focusId;
    items.replaceChildren();
    cart.items.forEach((item) => {
      const product = shop.getProduct(item.id);
      const row = document.createElement("article");
      row.className = "cart-item";
      row.innerHTML = `
        <img src="${product.image}" alt="${product.alt}" width="160" height="160">
        <div class="cart-item-detail"><p class="eyebrow">${product.category === "coffee" ? product.roast : "The brewing collection"}</p>
          <h3>${product.name}</h3><p>${product.size} · ${shop.money(product.price)} each</p>
          <div class="quantity-row"><div class="quantity-control" role="group" aria-label="Quantity of ${product.name}">
            <button type="button" data-quantity="${item.id}" data-delta="-1" data-focus-id="${item.id}-minus" aria-label="Decrease ${product.name} quantity" ${item.quantity === 1 ? "disabled" : ""}>−</button>
            <input id="quantity-${item.id}" data-quantity-input="${item.id}" data-focus-id="${item.id}-input" type="number" min="1" max="99" step="1" value="${item.quantity}" aria-label="${product.name} quantity">
            <button type="button" data-quantity="${item.id}" data-delta="1" data-focus-id="${item.id}-plus" aria-label="Increase ${product.name} quantity" ${item.quantity === 99 ? "disabled" : ""}>+</button>
          </div><button class="text-button" type="button" data-remove="${item.id}" aria-label="Remove ${product.name} from bag">Remove</button></div></div>
        <strong class="item-total">${shop.money(product.price * item.quantity)}</strong>`;
      items.append(row);
    });
    if (focusId) {
      const replacement = [...items.querySelectorAll("[data-focus-id]")].find(
        (element) => element.dataset.focusId === focusId
      );
      if (replacement && !replacement.disabled) replacement.focus();
      else if (replacement) replacement.closest(".quantity-control").querySelector("input").focus();
    }
    document.querySelector("#cart-subtotal").textContent = shop.money(totals.subtotal);
    document.querySelector("#cart-discount").textContent = `−${shop.money(totals.discount)}`;
    document.querySelector("#discount-row").hidden = cart.promo !== "FIRSTSIP";
    document.querySelector("#cart-total").textContent = shop.money(totals.total);
    reviewButton.disabled = cart.items.length === 0;
  }
  items.addEventListener("click", (event) => {
    const quantityButton = event.target.closest("[data-quantity]");
    const removeButton = event.target.closest("[data-remove]");
    if (quantityButton) {
      const item = shop
        .getCart()
        .items.find((entry) => entry.id === quantityButton.dataset.quantity);
      if (item && shop.setQuantity(item.id, item.quantity + Number(quantityButton.dataset.delta))) {
        const cart = shop.getCart();
        shop.announce(
          `Quantity updated. Bag total ${shop.money(shop.totals(cart.items, cart.promo).total)}.`
        );
      }
    }
    if (removeButton) {
      shop.removeItem(removeButton.dataset.remove);
      const nextControl = items.querySelector("button:not(:disabled)") || empty.querySelector("a");
      nextControl.focus();
    }
  });
  items.addEventListener("change", (event) => {
    const input = event.target.closest("[data-quantity-input]");
    if (!input) return;
    if (!shop.setQuantity(input.dataset.quantityInput, Number(input.value))) {
      const original = shop.getCart().items.find((item) => item.id === input.dataset.quantityInput);
      input.value = String(original.quantity);
      input.setAttribute("aria-invalid", "true");
    } else {
      shop.announce("Quantity updated.");
    }
  });
  document.querySelector("#clear-cart").addEventListener("click", () => {
    shop.clearCart();
    shop.announce("Your bag has been emptied.");
    empty.querySelector("a").focus();
  });
  document.querySelector("#promo-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (shop.applyPromo(promoInput.value)) {
      promoStatus.classList.remove("field-error");
      promoStatus.classList.add("success-text");
      promoStatus.textContent = "FIRSTSIP applied: 10% off. Offers cannot be combined.";
      promoInput.removeAttribute("aria-invalid");
    } else {
      promoStatus.classList.add("field-error");
      promoStatus.classList.remove("success-text");
      promoStatus.textContent = "That code isn’t available. Try FIRSTSIP for your welcome offer.";
      promoInput.setAttribute("aria-invalid", "true");
      promoInput.focus();
    }
  });
  reviewButton.addEventListener("click", () => {
    const cart = shop.getCart();
    if (!cart.items.length) {
      shop.announce("Add an item to your collection before checking out.");
      return;
    }
    reviewedCart = JSON.stringify(cart);
    const list = document.querySelector("#review-items");
    list.replaceChildren();
    cart.items.forEach((item) => {
      const product = shop.getProduct(item.id);
      const line = document.createElement("li");
      line.textContent = `${item.quantity} × ${product.name} — ${shop.money(product.price * item.quantity)}`;
      list.append(line);
    });
    const totals = shop.totals(cart.items, cart.promo);
    if (totals.discount) {
      const discount = document.createElement("li");
      discount.textContent = `FIRSTSIP discount: −${shop.money(totals.discount)}`;
      list.append(discount);
    }
    document.querySelector("#review-total").textContent = shop.money(totals.total);
    confirmButton.disabled = false;
    dialog.showModal();
  });
  document.querySelector("#close-checkout").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    if (completed) confirmation.focus();
    else if (!content.hidden) reviewButton.focus();
    else empty.querySelector("a").focus();
  });
  confirmButton.addEventListener("click", () => {
    if (confirming || !dialog.open) return;
    const cart = shop.getCart();
    if (!cart.items.length || reviewedCart !== JSON.stringify(cart)) {
      dialog.close();
      shop.announce(
        "Your bag changed in another tab. Please review the updated bag before finishing."
      );
      return;
    }
    confirming = true;
    confirmButton.disabled = true;
    const totals = shop.totals(cart.items, cart.promo);
    const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector("#confirmation-detail").textContent =
      `${count} ${count === 1 ? "item" : "items"} · Total ${shop.money(totals.total)}.`;
    completed = true;
    confirmation.hidden = false;
    shop.clearCart();
    dialog.close();
    shop.announce("Review complete. Your bag has been cleared. No order or payment was processed.");
    confirming = false;
  });
  document.addEventListener("cartchange", render);
  render();
})();

(() => {
  document.querySelectorAll("[data-slideshow]").forEach((slideshow) => {
    const slides = [...slideshow.querySelectorAll("[data-slide]")];
    const label = slideshow.querySelector("[data-slide-status]");
    const controls = slideshow.querySelector(".slider-controls");
    let current = 0;
    const show = () => {
      slides.forEach((slide, index) => {
        slide.hidden = index !== current;
      });
      label.textContent = `${current + 1} / ${slides.length}`;
    };
    controls.hidden = false;
    slideshow.querySelector("[data-previous]").addEventListener("click", () => {
      current = (current + slides.length - 1) % slides.length;
      show();
    });
    slideshow.querySelector("[data-next]").addEventListener("click", () => {
      current = (current + 1) % slides.length;
      show();
    });
    show();
  });
  const dialog = document.querySelector("#welcome-dialog");
  if (!dialog) return;
  const openButton = document.querySelector("#open-welcome");
  const closeButton = document.querySelector("#close-welcome");
  const form = document.querySelector("#welcome-form");
  const email = document.querySelector("#welcome-email");
  const error = document.querySelector("#welcome-error");
  const success = document.querySelector("#welcome-success");
  let returnFocus = openButton;
  function openWelcome() {
    if (dialog.open) return;
    returnFocus = document.activeElement;
    dialog.showModal();
  }
  openButton.disabled = false;
  openButton.addEventListener("click", openWelcome);
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    const focusTarget =
      returnFocus instanceof HTMLElement && returnFocus !== document.body && returnFocus.isConnected
        ? returnFocus
        : document.querySelector("#main");
    focusTarget.focus({ preventScroll: true });
  });
  form.noValidate = true;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    email.value = email.value.trim();
    if (!email.validity.valid) {
      error.textContent = "Enter a valid email address, such as hello@example.com.";
      email.setAttribute("aria-invalid", "true");
      email.focus();
      return;
    }
    error.textContent = "";
    email.removeAttribute("aria-invalid");
    success.hidden = false;
    success.textContent =
      "Your welcome code is FIRSTSIP — enjoy 10% off your bag. Your email has not been sent or saved.";
    form.reset();
  });
  form.querySelector('button[type="submit"]').disabled = false;
  // Back/Forward can restore this page without rerunning the script.
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) openWelcome();
  });
  openWelcome();
})();
