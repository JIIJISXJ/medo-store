// ====================== المنتجات ======================
const products = [
  {
    id: 1,
    name: "جاكيت شتوي كلاسيك",
    price: 89,
    emoji: "🧥",
    desc: "جاكيت دافئ بتصميم أنيق"
  },
  {
    id: 2,
    name: "هودي أوفر سايز",
    price: 55,
    emoji: "hoodie",
    desc: "هودي مريح للشتاء"
  },
  {
    id: 3,
    name: "سويت شيرت قطني",
    price: 45,
    emoji: "👕",
    desc: "سويت شيرت ناعم ودافئ"
  },
  {
    id: 4,
    name: "بنطلون جينز سميك",
    price: 65,
    emoji: "👖",
    desc: "جينز شتوي متين"
  },
  {
    id: 5,
    name: "سكارف صوفي",
    price: 25,
    emoji: "🧣",
    desc: "سكارف دافئ وأنيق"
  },
  {
    id: 6,
    name: "قفازات شتوية",
    price: 18,
    emoji: "🧤",
    desc: "قفازات ناعمة ومريحة"
  },
  {
    id: 7,
    name: "بياني شتوي",
    price: 22,
    emoji: "🧢",
    desc: "بياني صوفي أنيق"
  },
  {
    id: 8,
    name: "بوت شتوي",
    price: 95,
    emoji: "🥾",
    desc: "بوت دافئ ومقاوم للمياه"
  }
];

// ====================== المتغيرات ======================
let cart = [];

// ====================== عرض المنتجات ======================
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const count = document.getElementById("productCount");

  grid.innerHTML = products.map(p => `
    <div class="product">
      <div class="product-img">${p.emoji === "hoodie" ? "hoodie" : p.emoji}</div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price-row">
          <span class="price">€${p.price}</span>
          <button class="add" onclick="addToCart(${p.id})">أضف للسلة</button>
        </div>
      </div>
    </div>
  `).join("");

  count.textContent = `${products.length} منتج`;
}

// ====================== السلة ======================
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  // عدد القطع
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalQty;

  // الإجمالي
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  cartTotal.textContent = `€${totalPrice}`;

  // عرض العناصر
  if (cart.length === 0) {
    cartItems.innerHTML = `<div class="empty">السلة فارغة</div>`;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-thumb">${item.emoji === "hoodie" ? "hoodie" : item.emoji}</div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <small>€${item.price} × ${item.qty}</small>
        </div>
        <button class="remove" onclick="removeFromCart(${item.id})">حذف</button>
      </div>
    `).join("");
  }
}

// ====================== فتح/إغلاق السلة ======================
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartEl = document.getElementById("cart");

cartBtn.addEventListener("click", () => {
  cartEl.classList.add("open");
  overlay.classList.add("open");
});

closeCart.addEventListener("click", closeCartFunc);
overlay.addEventListener("click", closeCartFunc);

function closeCartFunc() {
  cartEl.classList.remove("open");
  overlay.classList.remove("open");
}

// ====================== إتمام الطلب (واتساب) ======================
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("السلة فارغة!");
