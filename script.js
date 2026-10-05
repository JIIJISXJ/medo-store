const products = [
  {id:1,name:"جاكيت شتوي كلاسيك",price:500,emoji:"🧥",desc:"جاكيت دافئ بتصميم أنيق"},
  {id:2,name:"هودي أوفر سايز",price:500,emoji:"hoodie",desc:"هودي مريح للشتاء"},
  {id:3,name:"سويت شيرت قطني",price:500,emoji:"👕",desc:"سويت شيرت ناعم ودافئ"},
  {id:4,name:"بنطلون جينز سميك",price:500,emoji:"👖",desc:"جينز شتوي متين"},
  {id:5,name:"سكارف صوفي",price:500,emoji:"🧣",desc:"سكارف دافئ وأنيق"},
  {id:6,name:"قفازات شتوية",price:500,emoji:"🧤",desc:"قفازات ناعمة ومريحة"},
  {id:7,name:"بياني شتوي",price:500,emoji:"🧢",desc:"بياني صوفي أنيق"},
  {id:8,name:"بوت شتوي",price:500,emoji:"🥾",desc:"بوت دافئ ومقاوم للمياه"}
];

let cart = [];

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  document.getElementById("productCount").textContent = products.length + " منتج";
  grid.innerHTML = products.map(p => `
    <div class="product">
      <div class="product-img">${p.emoji==="hoodie"?"hoodie":p.emoji}</div>
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
  document.getElementById("cartCount").textContent = totalQty;
  document.getElementById("cartTotal").textContent = totalPrice + " ج.م";
  const box = document.getElementById("cartItems");
  if (!cart.length) box.innerHTML = '<div class="empty">السلة فارغة</div>';
  else box.innerHTML = cart.map(i => `
    <div class="cart-item">
      <div class="cart-thumb">${i.emoji==="hoodie"?"hoodie":i.emoji}</div>
      <div class="cart-item-info"><h4>\( {i.name}</h4><small> \){i.price} ج.م × ${i.qty}</small></div>
      <button class="remove" onclick="removeFromCart(${i.id})">حذف</button>
    </div>
  `).join("");
}

document.getElementById("cartBtn").onclick = () => {
  document.getElementById("cart").classList.add("open");
  document.getElementById("overlay").classList.add("open");
};
document.getElementById("closeCart").onclick = closeCart;
document.getElementById("overlay").onclick = closeCart;
function closeCart() {
  document.getElementById("cart").classList.remove("open");
  document.getElementById("overlay").classList.remove("open");
}

document.getElementById("checkout").onclick = () => {
  if (!cart.length) return alert("السلة فارغة!");
  const phone = "201108302815";
  let msg = "طلب جديد من MEDO 🧥%0A%0A";
  cart.forEach(i => msg += `• ${i.name} × ${i.qty} = ${i.price*i.qty} ج.م%0A`);
  msg += `%0Aالإجمالي: ${cart.reduce((s,i)=>s+i.price*i.qty,0)} ج.م%0Aطريقة الدفع: الدفع عند الاستلام 💵`;
  window.open(`https://wa.me/\( {phone}?text= \){msg}`, "_blank");
};

renderProducts();
updateCart();
