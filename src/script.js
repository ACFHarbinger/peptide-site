(function () {
  'use strict';

  /* ---- Age gate ---- */
  var ageGate = document.getElementById('age-gate');
  var ageYes = document.getElementById('age-yes');
  if (ageGate && ageYes) {
    if (!sessionStorage.getItem('pepcore-age')) {
      document.body.style.overflow = 'hidden';
      ageYes.addEventListener('click', function () {
        sessionStorage.setItem('pepcore-age', '1');
        ageGate.classList.add('hidden');
        document.body.style.overflow = '';
      });
    } else {
      ageGate.classList.add('hidden');
    }
  }

  /* ---- Header scroll state ---- */
  var header = document.getElementById('site-header');
  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  /* ---- Best sellers track scroll ---- */
  var track = document.getElementById('bs-track');
  var prev = document.getElementById('bs-prev');
  var next = document.getElementById('bs-next');
  if (track && prev && next) {
    prev.addEventListener('click', function () { track.scrollBy({ left: -660, behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: 660, behavior: 'smooth' }); });
  }

  /* ---- Catalog render ---- */
  var grid = document.getElementById('catalog-grid');
  var countEl = document.getElementById('catalog-count');

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  function money(n) {
    return '€' + (Math.round(n * 100) / 100).toFixed(2).replace('.', ',');
  }

  function priceText(p) {
    return p % 1 === 0 ? '€' + p : '€' + p.toFixed(2).replace('.', ',');
  }

  function buildCatalog() {
    grid.innerHTML = '';
    PRODUCTS.forEach(function (prod) {
      var img = 'assets/svgs/' + prod.i + '.svg';
      var rows = prod.v.map(function (v) {
        var safeName = esc(prod.n);
        var safeSize = esc(v[0]);
        return '<li class="variant-row">' +
          '<span class="variant-size">' + safeSize + '</span>' +
          '<span class="variant-price">' + priceText(v[1]) + '</span>' +
          '<button class="variant-add" data-name="' + safeName + '" data-size="' + safeSize + '" data-price="' + v[1] + '" data-img="' + img + '" aria-label="Add ' + safeName + ' ' + safeSize + '">+</button>' +
          '</li>';
      }).join('');
      var card = document.createElement('article');
      card.className = 'product-card';
      card.setAttribute('data-category', prod.c);
      card.setAttribute('data-name', prod.n);
      card.innerHTML =
        '<a class="product-image" href="#catalog"><img src="' + img + '" alt="' + esc(prod.n) + '"></a>' +
        '<div class="product-body">' +
          '<div class="product-meta-row"><span class="product-category">' + esc(CATS[prod.c] || prod.c) + '</span></div>' +
          '<h3><a href="#catalog">' + esc(prod.n) + '</a></h3>' +
          '<div class="product-purity"><span class="dot"></span>Endotoxin Available · Research Use Only</div>' +
          '<ul class="variant-list">' + rows + '</ul>' +
        '</div>';
      grid.appendChild(card);
    });
    if (countEl) countEl.textContent = PRODUCTS.length + ' products · all lab-tested';
  }
  buildCatalog();

  /* ---- Catalog filter + search ---- */
  var pills = document.querySelectorAll('#filter-pills .pill');
  var searchInput = document.getElementById('search');
  var searchClear = document.getElementById('search-clear');

  function applyFilter() {
    var active = document.querySelector('#filter-pills .pill.active');
    var cat = active ? active.getAttribute('data-cat') : 'all';
    var q = (searchInput ? searchInput.value : '').trim().toLowerCase();
    var visible = 0;
    Array.prototype.forEach.call(grid.querySelectorAll('.product-card'), function (card) {
      var catMatch = cat === 'all' || card.getAttribute('data-category') === cat;
      var nameMatch = !q || card.getAttribute('data-name').toLowerCase().indexOf(q) !== -1;
      var show = catMatch && nameMatch;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (countEl) countEl.textContent = PRODUCTS.length + ' products · ' + visible + ' shown';
  }

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');
      applyFilter();
    });
  });
  if (searchInput) searchInput.addEventListener('input', applyFilter);
  if (searchClear) searchClear.addEventListener('click', function () {
    searchInput.value = '';
    applyFilter();
  });

  /* ---- Cart ---- */
  var cart = {};
  var cartDrawer = document.getElementById('cart-drawer');
  var cartOverlay = document.getElementById('cart-overlay');
  var cartCount = document.getElementById('cart-count');
  var cartItems = document.getElementById('cart-items');
  var cartSubtotal = document.getElementById('cart-subtotal');
  var shipRemaining = document.getElementById('ship-remaining');
  var shipBar = document.getElementById('ship-bar');
  var FREE_SHIP = 350;

  function key(name, size) { return size ? name + ' · ' + size : name; }

  function renderCart() {
    var names = Object.keys(cart);
    var count = 0, subtotal = 0;
    cartItems.innerHTML = '';
    names.forEach(function (k) {
      var item = cart[k];
      count += item.qty;
      subtotal += item.qty * item.price;
      var row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML =
        '<img src="' + item.img + '" alt="">' +
        '<div>' +
          '<div class="cart-item-name">' + esc(item.name) + '</div>' +
          (item.size ? '<div class="cart-item-size">' + esc(item.size) + '</div>' : '') +
          '<div class="cart-item-price">' + money(item.price) + '</div>' +
          '<div class="cart-item-qty">' +
            '<button data-act="dec" data-key="' + esc(k) + '">−</button>' +
            '<span>' + item.qty + '</span>' +
            '<button data-act="inc" data-key="' + esc(k) + '">+</button>' +
          '</div>' +
        '</div>' +
        '<button class="cart-remove" data-act="rm" data-key="' + esc(k) + '">✕</button>';
      cartItems.appendChild(row);
    });
    if (names.length === 0) {
      cartItems.innerHTML = '<div class="cart-empty">Your cart is empty — add some research peptides.</div>';
    }
    cartCount.textContent = count;
    cartSubtotal.textContent = money(subtotal);
    var remaining = FREE_SHIP - subtotal;
    var pct = Math.min(100, (subtotal / FREE_SHIP) * 100);
    shipBar.style.width = pct + '%';
    shipRemaining.textContent = remaining > 0 ? money(remaining) : 'Unlocked ✓';
  }

  function addItem(name, size, price, img) {
    var k = key(name, size);
    if (!cart[k]) cart[k] = { name: name, size: size, price: price, qty: 0, img: img };
    cart[k].qty += 1;
    renderCart();
    openCart();
  }

  cartItems.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-act]');
    if (!btn) return;
    var act = btn.getAttribute('data-act');
    var k = btn.getAttribute('data-key');
    if (act === 'inc') cart[k].qty += 1;
    else if (act === 'dec') {
      cart[k].qty -= 1;
      if (cart[k].qty <= 0) delete cart[k];
    } else if (act === 'rm') delete cart[k];
    renderCart();
  });

  function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('cart-toggle').addEventListener('click', openCart);
  document.getElementById('cart-close').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  /* Variant add buttons (catalog) */
  grid.addEventListener('click', function (e) {
    var btn = e.target.closest('.variant-add');
    if (!btn) return;
    addItem(
      btn.getAttribute('data-name'),
      btn.getAttribute('data-size'),
      parseFloat(btn.getAttribute('data-price')),
      btn.getAttribute('data-img')
    );
  });

  /* Best seller add buttons */
  var IMG = {
    'CJC-1295 + IPA': 'assets/svgs/cjc-1295.svg'
  };
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.add-btn');
    if (!btn) return;
    var name = btn.getAttribute('data-name');
    var price = parseFloat(btn.getAttribute('data-price'));
    var img = IMG[name] || 'assets/svgs/' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.svg';
    addItem(name, null, price, img);
  });

  /* ---- Subscribe modal ---- */
  var subModal = document.getElementById('subscribe-modal');
  var floatTrigger = document.getElementById('float-trigger');
  var modalClose = document.getElementById('modal-close');
  var subForm = document.getElementById('sub-form');
  var subSuccess = document.getElementById('sub-success');

  function openModal() { subModal.classList.add('open'); }
  function closeModal() { subModal.classList.remove('open'); }
  if (floatTrigger) floatTrigger.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
  subModal.addEventListener('click', function (e) { if (e.target === subModal) closeModal(); });

  if (subForm) {
    subForm.addEventListener('submit', function (e) {
      e.preventDefault();
      subForm.style.display = 'none';
      subSuccess.hidden = false;
    });
  }
  var copyBtn = document.getElementById('copy-code');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var code = document.getElementById('coupon-code');
      var range = document.createRange();
      range.selectNodeContents(code);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      try { document.execCommand('copy'); } catch (err) {}
      copyBtn.textContent = 'Copied!';
      setTimeout(function () { copyBtn.textContent = 'Copy Code'; }, 1500);
    });
  }
})();
