const products = [
  // شتوي
  {id:1, name:"جاكيت شتوي كلاسيك", price:500, emoji:"🧥", desc:"جاكيت دافئ بتصميم أنيق", category:"شتوي"},
  {id:2, name:"هودي أوفر سايز", price:500, emoji:"hoodie", desc:"هودي مريح للشتاء", category:"شتوي"},
  {id:3, name:"سويت شيرت قطني", price:500, emoji:"👕", desc:"سويت شيرت ناعم ودافئ", category:"شتوي"},
  {id:4, name:"بنطلون جينز سميك", price:500, emoji:"👖", desc:"جينز شتوي متين", category:"شتوي"},
  {id:5, name:"بوت شتوي", price:500, emoji:"🥾", desc:"بوت دافئ ومقاوم للمياه", category:"شتوي"},

  // صيفي
  {id:6, name:"تيشيرت صيفي", price:500, emoji:"👕", desc:"تيشيرت خفيف ومريح", category:"صيفي"},
  {id:7, name:"شورت صيفي", price:500, emoji:"🩳", desc:"شورت صيفي أنيق", category:"صيفي"},
  {id:8, name:"قميص كتان", price:500, emoji:"👔", desc:"قميص كتان خفيف", category:"صيفي"},
  {id:9, name:"بنطلون كتان", price:500, emoji:"👖", desc:"بنطلون كتان مريح", category:"صيفي"},

  // كتشيات
  {id:10, name:"سكارف صوفي", price:500, emoji:"🧣", desc:"سكارف دافئ وأنيق", category:"كتشيات"},
  {id:11, name:"قفازات شتوية", price:500, emoji:"🧤", desc:"قفازات ناعمة ومريحة", category:"كتشيات"},
  {id:12, name:"بياني شتوي", price:500, emoji:"🧢", desc:"بياني صوفي أنيق", category:"كتشيات"},
  {id:13, name:"نظارة شمس", price:500, emoji:"🕶️", desc:"نظارة شمس عصرية", category:"كتشيات"},
  {id:14, name:"ساعة يد", price:500, emoji:"⌚", desc:"ساعة يد أنيقة", category:"كتشيات"},
  {id:15, name:"كوتشي إير فورس أبيض", price:500, emoji:"👟", desc:"كوتشي إير فورس كلاسيك أبيض", category:"كتشيات"},
  {id:16, name:"كوتشي إير فورس أسود", price:500, emoji:"👟", desc:"كوتشي إير فورس أسود أنيق", category:"كتشيات"},
  {id:17, name:"كوتشي إير فورس ملون", price:500, emoji:"👟", desc:"كوتشي إير فورس بألوان مميزة", category:"كتشيات"},

  // شحن ألعاب (فري فاير وببجي)
  {id:18, name:"شحن 110 جوهرة فري فاير", price:45, emoji:"💎", desc:"شحن مباشر عن طريق الـ ID", category:"شحن ألعاب"},
  {id:19, name:"شحن 580 جوهرة فري فاير", price:210, emoji:"💎", desc:"شحن مباشر عن طريق الـ ID", category:"شحن ألعاب"},
  {id:20, name:"شحن 1180 جوهرة فري فاير", price:410, emoji:"💎", desc:"شحن مباشر عن طريق الـ ID", category:"شحن ألعاب"},
  {id:21, name:"شحن 60 شدة ببجي (UC)", price:45, emoji:"🎮", desc:"شحن سريع ومباشر بالـ ID", category:"شحن ألعاب"},
  {id:22, name:"شحن 325 شدة ببجي (UC)", price:210, emoji:"🎮", desc:"شحن سريع ومباشر بالـ ID", category:"شحن ألعاب"},
  {id:23, name:"شحن 660 شدة ببجي (UC)", price:415, emoji:"🎮", desc:"شحن سريع ومباشر بالـ ID", category:"شحن ألعاب"},
  {id:24, name:"شحن 1800 شدة ببجي (UC)", price:1050, emoji:"🎮", desc:"شحن سريع ومباشر بالـ ID", category:"شحن ألعاب"}
];

let cart = [];
let currentCategory = "الكل";

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const filtered = currentCategory === "الكل" 
    ? products 
    : products.filter(p => p.category === currentCategory);

  const countElem = document.getElementById("productCount");
  if (countElem) countElem.textContent = filtered.length + " منتج";

  grid.innerHTML = filtered.map(p => `
    <div class="product">
      <div class="product-img">${p.emoji === "hoodie" ? "🧥" : p.emoji}</div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price-row">
          <span class="price">${p.price} ج.م</span>
          <button class="add" onclick="addToCart(${p.id})">أضف للسلة</button>
        </div>
      </div>
    </div>
  `).join("");
}

function filterCategory(cat, btnElement) {
  currentCategory = cat;
  document.querySelectorAll(".cat-btn").forEach(btn => btn.classList.remove("active"));
  if (btnElement) {
    btnElement.classList.add("active");
  }
  renderProducts();
}

function addToCart(id) {
  const p = products.find(x => x.id === id);
  const e = cart.find(x => x.id === id);
  if (e) e.qty++; else cart.push({...p, qty:1});
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  updateCart();
}

function updateCart() {
  const totalQty = cart.reduce((s,i)=>s+i.qty,0);
  const totalPrice = cart.reduce((s,i)=>s+i.price*i.qty,0);
  
  const cartCountElem = document.getElementById("cartCount");
  const cartTotalElem = document.getElementById("cartTotal");
  if (cartCountElem) cartCountElem.textContent = totalQty;
  if (cartTotalElem) cartTotalElem.textContent = totalPrice + " ج.م";

  const box = document.getElementById("cartItems");
  if (!box) return;

  if (!cart.length) {
    box.innerHTML = '<div class="empty">السلة فارغة</div>';
  } else {
    box.innerHTML = cart.map(i => `
      <div class="cart-item">
        <div class="cart-thumb">${i.emoji === "hoodie" ? "🧥" : i.emoji}</div>
        <div class="cart-item-info">
          <h4>${i.name}</h4>
          <small>${i.price} ج.م × ${i.qty}</small>
        </div>
        <button class="remove" onclick="removeFromCart(${i.id})">حذف</button>
      </div>
    `).join("");
  }
}

function closeCart() {
  const cartElem = document.getElementById("cart");
  const overlayElem = document.getElementById("overlay");
  if (cartElem) cartElem.classList.remove("open");
  if (overlayElem) overlayElem.classList.remove("open");
}

// ربط أحداث الضغط بأمان عند فتح الصفحة
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cartBtn");
  const closeCartBtn = document.getElementById("closeCart");
  const overlay = document.getElementById("overlay");
  const checkoutBtn = document.getElementById("checkout");

  if (cartBtn) {
    cartBtn.onclick = () => {
      document.getElementById("cart")?.classList.add("open");
      document.getElementById("overlay")?.classList.add("open");
    };
  }

  if (closeCartBtn) closeCartBtn.onclick = closeCart;
  if (overlay) overlay.onclick = closeCart;

  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      if (!cart.length) {
        alert("السلة فارغة!");
        return;
      }

      const phone = "201108302815";
      let msg = "طلب جديد من متجر MEDO\n\n";

      cart.forEach(item => {
        msg += "• " + item.name + " × " + item.qty + " = " + (item.price * item.qty) + " ج.م\n";
      });

      const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      msg += "\nالإجمالي: " + total + " ج.م";
      msg += "\nطريقة الدفع: الدفع عند الاستلام / محفظة إلكترونية\n\n";
      msg += "------------------------\n";
      msg += "اسم العميل: \n";
      msg += "رقم الهاتف: \n";
      msg += "ID اللعبة (في حالة شحن الألعاب): \n";
      msg += "العنوان / الموقع: \n";
      msg += "------------------------";

      const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg);
      window.open(url, "_blank");
    };
  }

  const sectionHead = document.querySelector(".section-head");
  if (sectionHead && !document.querySelector(".filters")) {
    const filters = document.createElement("div");
    filters.className = "filters";
    filters.innerHTML = `
      <button class="cat-btn active" onclick="filterCategory('الكل', this)">الكل</button>
      <button class="cat-btn" onclick="filterCategory('شتوي', this)">شتوي</button>
      <button class="cat-btn" onclick="filterCategory('صيفي', this)">صيفي</button>
      <button class="cat-btn" onclick="filterCategory('كتشيات', this)">كتشيات</button>
      <button class="cat-btn" onclick="filterCategory('شحن ألعاب', this)">شحن ألعاب</button>
    `;
    sectionHead.appendChild(filters);
  }

  renderProducts();
  updateCart();
});
