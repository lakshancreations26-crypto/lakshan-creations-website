const DEFAULT_PRODUCTS = [
  { id: "nova-phone", name: "Nova X5 5G smartphone", description: "A sleek everyday phone for calls, photos and streaming.", category: "Phones", price: 149900, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=80", badge: "POPULAR" },
  { id: "pulse-earbuds", name: "Pulse wireless earbuds", description: "Clear calls and rich sound in a pocket-sized case.", category: "Accessories", price: 18900, image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=80", badge: "JUST IN" },
  { id: "orbit-watch", name: "Orbit smart watch", description: "Everyday fitness tracking, notifications and more.", category: "Accessories", price: 32900, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80", badge: "POPULAR" },
  { id: "volt-powerbank", name: "Volt 20,000mAh power bank", description: "Extra power for long days away from a wall socket.", category: "Accessories", price: 12500, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=700&q=80", badge: "" },
  { id: "sonic-speaker", name: "USB-C 20W wall charger", description: "A compact charger for compatible phones and devices.", category: "Accessories", price: 7900, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=700&q=80", badge: "NEW" },
  { id: "airbuds-case", name: "Everyday phone case", description: "A protective everyday case with a clean finish.", category: "Accessories", price: 3900, image: "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=700&q=80", badge: "" },
  { id: "focus-laptop", name: "HD phone screen protector", description: "A clear screen protector for compatible phone models.", category: "Accessories", price: 4500, image: "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=700&q=80", badge: "ESSENTIAL" },
  { id: "charge-kit", name: "USB-C fast-charge cable", description: "A handy charging cable for compatible phones and accessories.", category: "Accessories", price: 3900, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=700&q=80", badge: "" }
];
const STORAGE = { products: "lakshan-electronics-products-v2", settings: "lakshan-electronics-settings-v2", cart: "lakshan-electronics-cart-v2" };
const DEFAULT_SETTINGS = {
  name: "Lakshan Creations", mark: "L", tagline: "Phones and essentials, made easy.",
  announcement: "Smartphones and everyday phone essentials, all in one place.",
  email: "lakshancreations26@gmail.com", whatsapp: "+94779273876", shippingThreshold: 25000,
  heroEyebrow: "SMARTPHONES. ACCESSORIES. EVERYDAY.",
  heroFirst: "Your next", heroHighlight: "phone", heroLast: "starts here.",
  heroSubtitle: "Explore smartphones, chargers, cases and everyday essentials to keep you connected.",
  heroButton: "Shop phones", heroNote: "Find your next favourite.",
  heroImage: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1100&q=85",
  heroCaption: "PHONES MADE FOR EVERY DAY", stickerTop: "stay", stickerBottom: "connected",
  shopEyebrow: "PHONES & ESSENTIALS", shopTitle: "Find your next", shopHighlight: "favourite.",
  benefit1: "Phones for every day", benefit2: "Useful accessories", benefit3: "Islandwide delivery", benefit4: "Here to help",
  storyEyebrow: "YOUR PHONE SHOP",
  storyTitle: "Stay connected,", storyHighlight: "your way.",
  storyBody: "Discover smartphones and the everyday essentials that go with them. Browse phone accessories, choose what suits you and send your order details to us on WhatsApp.",
  storyLink: "Browse phones", storyImage: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=85",
  storyBadge: "PHONES & ACCESSORIES", newsletterEyebrow: "STAY IN THE LOOP",
  newsletterTitle: "New phones &", newsletterHighlight: "useful finds.",
  footerBottom: "Phones and essentials.", color: "#42dfc0", background: "#0b0e12", ink: "#f2f5f7",
  font: "sans", columns: "4"
};
const state = {
  products: readStorage(STORAGE.products, DEFAULT_PRODUCTS),
  settings: { ...DEFAULT_SETTINGS, ...readStorage(STORAGE.settings, DEFAULT_SETTINGS) },
  cart: readStorage(STORAGE.cart, {}),
  category: "All",
  search: ""
};

const $ = (selector) => document.querySelector(selector);
const grid = $("#product-grid");
const overlay = $("#overlay");
const cartPanel = $("#cart-panel");
const customizePanel = $("#customize-panel");
let toastTimer;

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : structuredClone(fallback);
  } catch (error) {
    console.error(`Could not read ${key} from local storage.`, error);
    return structuredClone(fallback);
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Could not save ${key} to local storage.`, error);
    showToast("Couldn't save changes. Check your browser storage settings.");
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function safeImageURL(value) {
  try {
    const url = new URL(value, window.location.href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function money(amount) {
  return `LKR ${Number(amount).toLocaleString("en-LK")}`;
}

function normalizeWhatsAppNumber(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.startsWith("0") ? `94${digits.slice(1)}` : digits;
}

function productImage(product, className = "product-image") {
  const image = safeImageURL(product.image);
  return image
    ? `<img class="${className}" src="${escapeHTML(image)}" alt="${escapeHTML(product.name)}" loading="lazy" onerror="this.style.visibility='hidden'">`
    : `<div class="${className}" role="img" aria-label="${escapeHTML(product.name)}"></div>`;
}

function applySettings() {
  const settings = { ...DEFAULT_SETTINGS, ...state.settings };
  const name = settings.name || DEFAULT_SETTINGS.name;
  const parts = name.trim().split(/\s+/);
  const logo = `<span>${escapeHTML(parts[0])}${parts.length > 1 ? `<span class="brand-light"> ${escapeHTML(parts.slice(1).join(" "))}</span>` : ""}</span>`;
  $("#brand-name").innerHTML = logo;
  $("#footer-brand-name").innerHTML = logo;
  $("#brand-mark").textContent = settings.mark || "L";
  $("#footer-brand-mark").textContent = settings.mark || "L";
  $("#copyright-name").textContent = name;
  $("#footer-tagline").textContent = settings.tagline;
  $("#footer-bottom").textContent = settings.footerBottom;
  $("#contact-link").href = `mailto:${settings.email}`;
  document.title = `${name} — ${settings.tagline}`;

  const textValues = {
    announcement: settings.announcement,
    "hero-eyebrow": settings.heroEyebrow,
    "hero-title-first": settings.heroFirst,
    "hero-title-highlight": settings.heroHighlight,
    "hero-title-last": settings.heroLast,
    "hero-subtitle": settings.heroSubtitle,
    "hero-button": settings.heroButton,
    "hero-note": settings.heroNote,
    "hero-caption": settings.heroCaption,
    "hero-sticker-top": settings.stickerTop,
    "hero-sticker-bottom": settings.stickerBottom,
    "shop-eyebrow": settings.shopEyebrow,
    "shop-title": settings.shopTitle,
    "shop-title-highlight": settings.shopHighlight,
    "story-eyebrow": settings.storyEyebrow,
    "story-title": settings.storyTitle,
    "story-title-highlight": settings.storyHighlight,
    "story-body": settings.storyBody,
    "story-link": settings.storyLink,
    "story-badge": settings.storyBadge,
    "newsletter-eyebrow": settings.newsletterEyebrow,
    "newsletter-title": settings.newsletterTitle,
    "newsletter-highlight": settings.newsletterHighlight
  };
  for (const [id, value] of Object.entries(textValues)) $(`#${id}`).textContent = value;
  const deliveryOffer = Number(settings.shippingThreshold) > 0
    ? `free delivery over ${money(settings.shippingThreshold)}`
    : "free delivery on every order";
  $("#announcement").innerHTML = `${escapeHTML(settings.announcement)} <span>— ${deliveryOffer}</span>`;
  $("#product-search").placeholder = "Search products...";
  $("#product-search").setAttribute("aria-label", "Search products");
  $("#nav-shop").textContent = "Shop all";
  $("#footer-shop-link").textContent = "Shop";
  $("#footer-story-link").textContent = "Our story";

  const heroImage = safeImageURL(settings.heroImage);
  $("#hero-art .hero-photo").style.backgroundImage = heroImage ? `url("${heroImage}")` : "none";
  $("#hero-art").setAttribute("aria-label", `${settings.name} featured electronics`);
  const storyImage = safeImageURL(settings.storyImage);
  $("#story-art .story-photo").style.backgroundImage = storyImage ? `url("${storyImage}")` : "none";
  const benefits = [settings.benefit1, settings.benefit2, settings.benefit3, settings.benefit4].filter(Boolean);
  $("#trust-strip").innerHTML = benefits.map((item) => `<span><i>✳</i> ${escapeHTML(item)}</span>`).join("");

  const root = document.documentElement;
  document.querySelector('meta[name="theme-color"]').content = settings.background;
  root.style.setProperty("--accent", settings.color);
  root.style.setProperty("--accent-dark", shadeColor(settings.color, -13));
  root.style.setProperty("--paper", settings.background);
  root.style.setProperty("--ink", settings.ink);
  root.style.setProperty("--serif", settings.font === "sans" ? "var(--sans)" : '"Playfair Display", Georgia, serif');
  root.style.setProperty("--product-columns", settings.columns === "3" ? "3" : "4");
  document.querySelectorAll("[data-setting]").forEach((input) => {
    input.value = settings[input.dataset.setting] ?? "";
  });
}

function shadeColor(hex, amount) {
  const value = hex.replace("#", "");
  const number = parseInt(value, 16);
  const channels = [number >> 16, (number >> 8) & 255, number & 255].map((channel) =>
    Math.min(255, Math.max(0, channel + Math.round(2.55 * amount)))
  );
  return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function renderCategories() {
  const categories = ["All", ...new Set(state.products.map((product) => product.category))];
  if (!categories.includes(state.category)) state.category = "All";
  $("#categories").innerHTML = categories.map((category) =>
    `<button class="category-button${state.category === category ? " active" : ""}" type="button" data-category="${escapeHTML(category)}">${escapeHTML(category)}</button>`
  ).join("");
}

function renderProducts() {
  renderCategories();
  const search = state.search.toLocaleLowerCase();
  const products = state.products.filter((product) =>
    (state.category === "All" || product.category === state.category) &&
    `${product.name} ${product.category} ${product.description || ""}`.toLocaleLowerCase().includes(search)
  );
  grid.innerHTML = products.map((product) => `
    <article class="product-card">
      <div class="product-image-wrap">
        ${productImage(product)}
        ${product.badge ? `<span class="product-badge">${escapeHTML(product.badge)}</span>` : ""}
        <button class="add-button" type="button" data-add="${escapeHTML(product.id)}" aria-label="Add ${escapeHTML(product.name)} to bag">+</button>
      </div>
      <div class="product-info">
        <div><h3 class="product-name">${escapeHTML(product.name)}</h3><span class="product-category">${escapeHTML(product.category)}</span>${product.description ? `<p class="product-description">${escapeHTML(product.description)}</p>` : ""}</div>
        <span class="product-price">${money(product.price)}</span>
      </div>
    </article>
  `).join("");
  $("#empty-state").hidden = products.length > 0;
  renderManagedProducts();
}

function renderManagedProducts() {
  const container = $("#managed-products");
  container.innerHTML = state.products.map((product) => `
    <div class="managed-product">
      <div><strong>${escapeHTML(product.name)}</strong><small>${escapeHTML(product.category)} · ${money(product.price)}</small></div>
      <div class="managed-product-actions">
        <button type="button" class="text-action" data-edit-product="${escapeHTML(product.id)}">Edit</button>
        <button type="button" class="text-action delete-action" data-delete-product="${escapeHTML(product.id)}">Delete</button>
      </div>
    </div>
  `).join("");
}

function cartProducts() {
  return Object.entries(state.cart)
    .map(([id, quantity]) => ({ product: state.products.find((item) => item.id === id), quantity }))
    .filter((entry) => entry.product && Number(entry.quantity) > 0);
}

function renderCart() {
  const entries = cartProducts();
  const count = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotal = entries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
  $("#cart-count").textContent = count;
  $("#bag-item-count").textContent = `(${count})`;
  $("#cart-empty").hidden = count > 0;
  $("#cart-summary").hidden = count === 0;
  $("#cart-items").innerHTML = entries.map(({ product, quantity }) => `
    <div class="cart-row">
      ${productImage(product, "cart-product-image")}
      <div class="cart-row-info">
        <strong>${escapeHTML(product.name)}</strong><small>${money(product.price)}</small>
        <div class="quantity-control" aria-label="Quantity">
          <button type="button" data-quantity="${escapeHTML(product.id)}" data-change="-1" aria-label="Remove one ${escapeHTML(product.name)}">−</button>
          <span>${quantity}</span>
          <button type="button" data-quantity="${escapeHTML(product.id)}" data-change="1" aria-label="Add one ${escapeHTML(product.name)}">+</button>
        </div>
        <button type="button" class="remove-item" data-remove="${escapeHTML(product.id)}">Remove</button>
      </div>
      <strong class="cart-row-price">${money(product.price * quantity)}</strong>
    </div>
  `).join("");
  $("#cart-subtotal").textContent = money(subtotal);
  $("#checkout-total").textContent = money(subtotal);
  const threshold = Number(state.settings.shippingThreshold) || 0;
  $("#shipping-note").textContent = subtotal >= threshold
    ? "Lovely! Your order qualifies for free delivery."
    : `${money(threshold - subtotal)} away from free delivery.`;
  $("#delivery-note").textContent = threshold > 0 ? `Free delivery on orders over ${money(threshold)}.` : "Free delivery is available on every order.";
  saveStorage(STORAGE.cart, state.cart);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function openPanel(panel) {
  const otherPanel = panel === cartPanel ? customizePanel : cartPanel;
  otherPanel.classList.remove("open");
  otherPanel.setAttribute("aria-hidden", "true");
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add("visible"));
  document.body.style.overflow = "hidden";
}

function closePanels() {
  cartPanel.classList.remove("open");
  customizePanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
  customizePanel.setAttribute("aria-hidden", "true");
  overlay.classList.remove("visible");
  document.body.style.overflow = "";
  setTimeout(() => { overlay.hidden = true; }, 250);
}

function addToCart(id) {
  if (!state.products.some((product) => product.id === id)) return;
  state.cart[id] = (state.cart[id] || 0) + 1;
  renderCart();
  showToast("A good thing added to your bag.");
}

$("#categories").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  renderProducts();
});

document.querySelectorAll("[data-nav-category]").forEach((link) => {
  link.addEventListener("click", () => {
    state.category = link.dataset.navCategory;
    renderProducts();
  });
});

$("#product-search").addEventListener("input", (event) => {
  state.search = event.target.value.trim();
  renderProducts();
});

$("#view-all").addEventListener("click", () => {
  state.category = "All";
  state.search = "";
  $("#product-search").value = "";
  renderProducts();
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});

$("#cart-items").addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (removeButton) delete state.cart[removeButton.dataset.remove];
  if (quantityButton) {
    const id = quantityButton.dataset.quantity;
    state.cart[id] = (state.cart[id] || 0) + Number(quantityButton.dataset.change);
    if (state.cart[id] <= 0) delete state.cart[id];
  }
  renderCart();
});

$("#cart-open").addEventListener("click", () => openPanel(cartPanel));
$("#customize-open").addEventListener("click", () => openPanel(customizePanel));
overlay.addEventListener("click", closePanels);
document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closePanels));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePanels();
});

$("#store-settings-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const updated = { ...DEFAULT_SETTINGS };
  document.querySelectorAll("[data-setting]").forEach((input) => {
    updated[input.dataset.setting] = input.value.trim();
  });
  if (!updated.name) {
    showToast("Add a shop name before saving.");
    return;
  }
  const whatsappNumber = normalizeWhatsAppNumber(updated.whatsapp);
  if (!/^\d{10,15}$/.test(whatsappNumber)) {
    showToast("Add a valid WhatsApp number with its country code.");
    return;
  }
  updated.whatsapp = `+${whatsappNumber}`;
  for (const key of ["heroImage", "storyImage"]) {
    if (updated[key] && !safeImageURL(updated[key])) {
      showToast("Use a valid http or https URL for store images.");
      return;
    }
  }
  updated.shippingThreshold = Math.max(0, Number(updated.shippingThreshold) || 0);
  state.settings = updated;
  saveStorage(STORAGE.settings, state.settings);
  applySettings();
  renderCart();
  showToast("Your shop details are saved.");
});

$("#product-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("#new-product-name").value.trim();
  const description = $("#new-product-description").value.trim();
  const price = Number($("#new-product-price").value);
  const category = $("#new-product-category").value.trim();
  const rawImage = $("#new-product-image").value.trim();
  const badge = $("#new-product-badge").value.trim();
  const editingId = $("#editing-product-id").value;
  if (!name || !category || !Number.isFinite(price) || price <= 0) {
    showToast("Add a name, category and valid price first.");
    return;
  }
  if (rawImage && !safeImageURL(rawImage)) {
    showToast("Please use a valid http or https photo URL.");
    return;
  }
  const product = {
    id: editingId || `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name, description, category, price, image: safeImageURL(rawImage), badge
  };
  if (editingId) {
    state.products = state.products.map((item) => item.id === editingId ? product : item);
  } else {
    state.products.unshift(product);
  }
  saveStorage(STORAGE.products, state.products);
  event.currentTarget.reset();
  $("#product-form-heading").textContent = "Add a product";
  $("#save-product").innerHTML = 'Add to my shop <span>＋</span>';
  $("#cancel-edit").hidden = true;
  renderProducts();
  renderCart();
  showToast(editingId ? "Your product has been updated." : "Your new product is on the shelf.");
});

$("#managed-products").addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-product]");
  const deleteButton = event.target.closest("[data-delete-product]");
  if (editButton) {
    const product = state.products.find((item) => item.id === editButton.dataset.editProduct);
    if (!product) return;
    $("#editing-product-id").value = product.id;
    $("#new-product-name").value = product.name;
    $("#new-product-description").value = product.description || "";
    $("#new-product-price").value = product.price;
    $("#new-product-category").value = product.category;
    $("#new-product-image").value = product.image || "";
    $("#new-product-badge").value = product.badge || "";
    $("#product-form-heading").textContent = "Edit product";
    $("#save-product").textContent = "Save product changes";
    $("#cancel-edit").hidden = false;
    $("#product-form").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  if (deleteButton) {
    const id = deleteButton.dataset.deleteProduct;
    const product = state.products.find((item) => item.id === id);
    if (!product || !window.confirm(`Remove "${product.name}" from your shop?`)) return;
    state.products = state.products.filter((item) => item.id !== id);
    delete state.cart[id];
    saveStorage(STORAGE.products, state.products);
    renderProducts();
    renderCart();
    showToast("Product removed.");
  }
});

$("#cancel-edit").addEventListener("click", () => {
  $("#product-form").reset();
  $("#product-form-heading").textContent = "Add a product";
  $("#save-product").innerHTML = 'Add to my shop <span>＋</span>';
  $("#cancel-edit").hidden = true;
});

$("#reset-store").addEventListener("click", () => {
  if (!window.confirm("Restore the electronics shop defaults and remove your custom products?")) return;
  state.settings = { ...DEFAULT_SETTINGS };
  state.products = structuredClone(DEFAULT_PRODUCTS);
  state.cart = {};
  state.category = "All";
  state.search = "";
  $("#product-form").reset();
  $("#product-form-heading").textContent = "Add a product";
  $("#save-product").innerHTML = 'Add to my shop <span>＋</span>';
  $("#cancel-edit").hidden = true;
  saveStorage(STORAGE.settings, state.settings);
  saveStorage(STORAGE.products, state.products);
  $("#product-search").value = "";
  applySettings();
  renderProducts();
  renderCart();
  showToast("Default electronics shop restored.");
});

$("#checkout-open").addEventListener("click", () => {
  $("#order-message").textContent = "";
  $("#order-receipt").hidden = true;
  $("#order-receipt").innerHTML = "";
  $("#checkout-form").querySelectorAll(":scope > label, :scope > .checkout-total, :scope > .button").forEach((element) => { element.hidden = false; });
  $("#checkout-form").reset();
  renderCart();
  $("#checkout-dialog").showModal();
});
$("#checkout-close").addEventListener("click", () => $("#checkout-dialog").close());
$("#checkout-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = cartProducts();
  if (!entries.length) return;
  const formData = new FormData(event.currentTarget);
  const customerName = String(formData.get("name")).trim();
  const customerEmail = String(formData.get("email")).trim();
  const customerAddress = String(formData.get("address")).trim();
  const subtotal = entries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
  const whatsappNumber = normalizeWhatsAppNumber(state.settings.whatsapp);
  if (!/^\d{10,15}$/.test(whatsappNumber)) {
    showToast("Add a valid WhatsApp number with its country code in store settings.");
    return;
  }
  const orderDetails = [
    `New order for ${state.settings.name}`,
    "",
    `Name: ${customerName}`,
    `Email: ${customerEmail}`,
    `Delivery address: ${customerAddress}`,
    "",
    "Items:",
    ...entries.map(({ product, quantity }) => `- ${product.name} x ${quantity} — ${money(product.price * quantity)}`),
    "",
    `Total: ${money(subtotal)}`
  ].join("\n");
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderDetails)}`;
  const emailURL = `mailto:${encodeURIComponent(state.settings.email)}?subject=${encodeURIComponent(`New order for ${state.settings.name}`)}&body=${encodeURIComponent(orderDetails)}`;
  const receipt = `
    <h3>Order details are ready</h3>
    <p>WhatsApp will open with your order details. Tap <strong>Send</strong> there to submit your order. If it does not open, use one of the buttons below.</p>
    <p><strong>${escapeHTML(customerName)}</strong><br>${escapeHTML(customerEmail)}<br>${escapeHTML(customerAddress)}</p>
    <ul>${entries.map(({ product, quantity }) => `<li>${escapeHTML(product.name)} × ${quantity} — ${money(product.price * quantity)}</li>`).join("")}</ul>
    <p class="receipt-total"><strong>Total: ${money(subtotal)}</strong></p>
    <a class="button button-dark full-button" href="${escapeHTML(whatsappURL)}" target="_blank" rel="noopener noreferrer">Send order with WhatsApp <span>↗</span></a>
    <a class="button button-outline full-button" href="${escapeHTML(emailURL)}">Send order by email <span>↗</span></a>
  `;
  window.open(whatsappURL, "_blank", "noopener,noreferrer");
  state.cart = {};
  renderCart();
  $("#order-message").textContent = "";
  $("#order-receipt").innerHTML = receipt;
  $("#order-receipt").hidden = false;
  event.currentTarget.querySelectorAll(":scope > label, :scope > .checkout-total, :scope > .button").forEach((element) => { element.hidden = true; });
});

$("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  $("#newsletter-message").textContent = "Lovely to have you. Newsletter signup needs a mailing-list connection to go live.";
  event.currentTarget.reset();
});

$("#year").textContent = new Date().getFullYear();
applySettings();
renderProducts();
renderCart();
