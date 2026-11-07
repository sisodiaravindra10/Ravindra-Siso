// laik — mockup interactions for the 12-screen flow.
// no framework. screens swap by toggling .is-active. tabbar wires to top-level screens.

const fixtures = {
  me: { name: "ravindra", age: 25, initial: "R" },

  profiles: [
    { name: "anaya, 24",  vibe: "late-night maggi person",  snacks: ["maggi", "monaco + cheese", "cold coffee"],   mark: "a.", tint: "sage",       id: "a01", photo: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "rhea, 26",   vibe: "filter coffee purist",     snacks: ["filter kaapi", "medu vada", "banana chips"], mark: "r.", tint: "terracotta", id: "r02", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "ishita, 23", vibe: "samosa on rainy days",     snacks: ["samosa", "masala chai", "kit kat"],          mark: "i.", tint: "lilac",    id: "i03", photo: "https://randomuser.me/api/portraits/women/12.jpg" },
  ],

  match: { name: "anaya", emoji: "🍜", initial: "A", vibe: "late-night maggi person" },

  shelves: {
    blinkit: [
      { id: "b1", emoji: "🥟", name: "samosa box (6)",        price: 99 },
      { id: "b2", emoji: "🍫", name: "kit kat family pack",   price: 199 },
      { id: "b3", emoji: "🍜", name: "maggi midnight kit",    price: 199 },
      { id: "b4", emoji: "🍦", name: "kulfi · 4 sticks",      price: 199 },
      { id: "b5", emoji: "🌰", name: "trail mix · premium",   price: 399 },
      { id: "b6", emoji: "🍰", name: "tres leches slice",     price: 399 },
    ],
    instamart: [
      { id: "i1", emoji: "🍪", name: "parle-g nostalgia pack", price: 99 },
      { id: "i2", emoji: "🥤", name: "thums up · 4 cans",      price: 199 },
      { id: "i3", emoji: "🥐", name: "croissant + butter chai", price: 199 },
      { id: "i4", emoji: "🍩", name: "donut box · 6",          price: 399 },
      { id: "i5", emoji: "🍕", name: "tiny pizza · 2",         price: 399 },
      { id: "i6", emoji: "🌯", name: "wrap of the day",        price: 199 },
    ],
    swiggy: [
      { id: "s1", emoji: "☕", name: "filter kaapi · hot",      price: 99 },
      { id: "s2", emoji: "🍵", name: "masala chai + biscuit",  price: 99 },
      { id: "s3", emoji: "🍛", name: "rajma chawal bowl",      price: 199 },
      { id: "s4", emoji: "🌮", name: "kathi roll · paneer",    price: 199 },
      { id: "s5", emoji: "🍨", name: "naturals ice cream · 2", price: 399 },
      { id: "s6", emoji: "🍝", name: "pesto pasta · single",   price: 399 },
    ],
    spicy: [
      { id: "x1", emoji: "🌶",  name: "ghost pepper maggi",     price: 199 },
      { id: "x2", emoji: "🍫", name: "dark chocolate · 70%",   price: 199 },
      { id: "x3", emoji: "🍯", name: "gulab jamun · share box", price: 199 },
      { id: "x4", emoji: "🍦", name: "kulfi · for two",        price: 399 },
      { id: "x5", emoji: "🍵", name: "midnight chai · 2 cups", price: 199 },
      { id: "x6", emoji: "🍰", name: "molten brownie",          price: 399 },
    ],
    /* curated 4-item shelf for the Drop action — front-loaded high-signal picks */
    drop: [
      { id: "d1", emoji: "🥟", name: "samosa box (6)",         price: 99 },
      { id: "d2", emoji: "🍫", name: "dark chocolate · 70%",   price: 199 },
      { id: "d3", emoji: "🍰", name: "molten brownie",          price: 399 },
      { id: "d4", emoji: "🌶",  name: "ghost pepper maggi",     price: 199 },
    ],
  },

  /* mystery card stack — 4 candidate senders the receiver sees in Mystery Drop */
  mystery: [
    { initial: "K", name: "kabir, 25",  vibe: "feral but cute",       tint: "sage",       photo: "https://randomuser.me/api/portraits/men/22.jpg" },
    { initial: "R", name: "ravi, 25",   vibe: "samosa-on-rainy-days", tint: "terracotta", photo: "https://randomuser.me/api/portraits/men/45.jpg" },
    { initial: "A", name: "arjun, 27",  vibe: "filter coffee philosopher", tint: "lilac",  photo: "https://randomuser.me/api/portraits/men/67.jpg" },
    { initial: "V", name: "vihaan, 24", vibe: "midnight chai person", tint: "sage",       photo: "https://randomuser.me/api/portraits/men/12.jpg" },
  ],

  inbox: [
    { id: "mystery", name: "mystery drop", initial: "🎁", bg: "heat", preview: "someone dropped a snack. find them.", time: "now",   unread: 1, mystery: true },
    { id: "anaya",   name: "anaya",   initial: "A", bg: "lilac",      preview: "ok this is unfair. brb i'm boiling water", time: "now",   unread: 1, gift: true },
    { id: "rhea",    name: "rhea",    initial: "R", bg: "terracotta", preview: "lol filter kaapi at 11pm? brave",           time: "2h",    unread: 0, gift: false },
    { id: "ishita",  name: "ishita",  initial: "I", bg: "sage",       preview: "rainy day. samosa weather you said?",       time: "yest.", unread: 1, gift: false },
    { id: "kabir",   name: "kabir",   initial: "K", bg: "lilac",      preview: "no thanks, i'm good. take care 🤍",         time: "tue",   unread: 0, gift: false },
  ],

  sends: [
    { to: "anaya",  emoji: "🍜", name: "maggi midnight kit", via: "blinkit",  status: "en route", eta: "eta 14 min",  tag: "enroute" },
    { to: "rohan",  emoji: "☕", name: "filter kaapi · hot",  via: "swiggy",   status: "delivered", eta: "2h ago",     tag: "delivered" },
    { to: "ishita", emoji: "🥟", name: "samosa box (6)",     via: "blinkit",  status: "declined",  eta: "yesterday",  tag: "declined" },
  ],
};

const state = {
  sendTiles: new Set(),
  loveTiles: new Set(),
  spicyTiles: new Set(),
  shelf: "blinkit",
  picked: null,
  note: "",
  phone: "98765 43210",
  phoneEdited: false,
  splashTimer: null,
  drop: { snack: null, note: "", tonight: false },
  stamps: new Set(), // tags the user has stamped on the active profile
};

const sendOptions = [
  { id: "samosa",  emoji: "🥟", label: "samosa" },
  { id: "maggi",   emoji: "🍜", label: "maggi" },
  { id: "chai",    emoji: "🍵", label: "chai" },
  { id: "kitkat",  emoji: "🍫", label: "kit kat" },
  { id: "donut",   emoji: "🍩", label: "donut" },
  { id: "vada",    emoji: "🥯", label: "medu vada" },
  { id: "biryani", emoji: "🍚", label: "biryani" },
  { id: "kulfi",   emoji: "🍦", label: "kulfi" },
  { id: "coffee",  emoji: "☕", label: "filter kaapi" },
];

// ---- screen navigation ----
const TABBAR_SCREENS = ["discover", "sends", "inbox", "me"];

function goTo(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("is-active"));
  const target = document.getElementById(`screen-${id}`);
  if (!target) return;
  target.classList.add("is-active");
  target.scrollTop = 0;

  // tabbar: visible only on top-level screens, active button matches current
  const tabbar = document.getElementById("tabbar");
  if (tabbar) {
    const show = TABBAR_SCREENS.includes(id);
    tabbar.classList.toggle("is-visible", show);
    if (show) {
      tabbar.querySelectorAll(".tabbar__btn").forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.tab === id);
      });
    }
  }

  if (id === "snack")   renderShelf();
  if (id === "confirm") renderConfirm();
  if (id === "chat")    renderChat();
  if (id === "inbox")   renderInbox();
  if (id === "sends")   renderSends();
  if (id === "drop")    renderDropShelf();
  if (id === "mystery") renderMystery();
}

// ---- 01 splash ----
function startSplash() {
  // animate the dots
  const dots = document.getElementById("splash-dots");
  let i = 0;
  if (dots) {
    state.splashTimer = setInterval(() => {
      i = (i + 1) % 4;
      dots.textContent = ".".repeat(i);
    }, 280);
  }
  setTimeout(() => {
    if (state.splashTimer) clearInterval(state.splashTimer);
    goTo("phone");
  }, 2200);
}

// ---- 02 phone keypad ----
function setupKeypad() {
  const display = document.getElementById("phone-number");
  if (!display) return;

  document.querySelectorAll(".keypad__key").forEach((key) => {
    key.addEventListener("click", () => {
      const v = key.dataset.num;
      if (v === "") return;
      if (!state.phoneEdited) {
        state.phone = "";
        state.phoneEdited = true;
      }
      if (v === "back") {
        state.phone = state.phone.slice(0, -1);
      } else if (state.phone.replace(/\D/g, "").length < 10) {
        const digits = state.phone.replace(/\D/g, "") + v;
        state.phone = digits.length > 5
          ? digits.slice(0, 5) + " " + digits.slice(5)
          : digits;
      }
      display.firstChild.textContent = state.phone || "·····";
    });
  });
}

// ---- 04 snack identity (onboarding) ----
function renderOnboarding() {
  const sendGrid = document.getElementById("onb-send-grid");
  const loveGrid = document.getElementById("onb-love-grid");
  if (!sendGrid || !loveGrid) return;

  const build = (grid, store) => {
    grid.innerHTML = "";
    sendOptions.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "onb-tile";
      if (store.has(opt.id)) btn.classList.add("is-on");
      btn.innerHTML = `<span class="emoji">${opt.emoji}</span><span>${opt.label}</span>`;
      btn.onclick = () => {
        if (store.has(opt.id)) store.delete(opt.id);
        else if (store.size < 3) store.add(opt.id);
        build(grid, store);
        updateOnbCount();
      };
      grid.appendChild(btn);
    });
  };

  build(sendGrid, state.sendTiles);
  build(loveGrid, state.loveTiles);
  updateOnbCount();
}

function updateOnbCount() {
  const sendCount = document.getElementById("onb-send-count");
  const loveCount = document.getElementById("onb-love-count");
  const cta = document.getElementById("onb-cta");
  if (sendCount) sendCount.textContent = `${state.sendTiles.size}/3`;
  if (loveCount) loveCount.textContent = `${state.loveTiles.size}/3`;
  if (!cta) return;

  const sendLeft = 3 - state.sendTiles.size;
  const loveLeft = 3 - state.loveTiles.size;
  const ready = sendLeft === 0 && loveLeft === 0;

  cta.disabled = !ready;
  cta.style.opacity = ready ? "1" : "0.55";
  cta.style.pointerEvents = ready ? "auto" : "none";

  if (ready) {
    cta.textContent = "that's me →";
  } else if (sendLeft > 0 && loveLeft > 0) {
    cta.textContent = `pick ${sendLeft} to send · ${loveLeft} to love`;
  } else if (sendLeft > 0) {
    cta.textContent = `pick ${sendLeft} more to send`;
  } else {
    cta.textContent = `pick ${loveLeft} more to love`;
  }
}

// ---- 05 discover (photo on top, stampable tag tags below) ----
// crave mechanic: tap a tag to stamp it ("I noticed you'd send maggi").
// 1+ stamps arms the crave button. each "like" carries WHY.
function renderDeck() {
  const deck = document.getElementById("deck");
  if (!deck) return;
  deck.innerHTML = "";
  fixtures.profiles.forEach((p, profileIdx) => {
    const card = document.createElement("div");
    card.className = "deck__card";
    card.dataset.vibe = p.tint;
    const isTop = profileIdx === fixtures.profiles.length - 1;
    const snackTags = p.snacks
      .map((s, i) => `<button data-tag="${profileIdx}:${i}" type="button">${s}</button>`)
      .join("");
    card.innerHTML = `
      <div class="deck__photo">
        <img src="${p.photo}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="deck__content">
        <div class="deck__top">
          <span class="deck__id">${p.id} · vibe-first</span>
          <span class="deck__mark">${p.mark}</span>
        </div>
        <div class="deck__center">
          <div class="deck__vibe">${p.vibe}</div>
          <div class="deck__name">${p.name}</div>
          <div class="deck__snacks">${snackTags}</div>
        </div>
      </div>
    `;
    deck.appendChild(card);

    // only the top (last) card's tags are interactive
    if (isTop) {
      card.querySelectorAll(".deck__snacks button").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const tag = btn.dataset.tag;
          if (state.stamps.has(tag)) {
            state.stamps.delete(tag);
            btn.classList.remove("is-stamped");
          } else {
            state.stamps.add(tag);
            btn.classList.add("is-stamped");
          }
          updateCraveBtn();
        });
      });
    }
  });
  updateCraveBtn();
}

function updateCraveBtn() {
  const btn = document.getElementById("crave-btn");
  const countEl = document.getElementById("crave-count");
  if (!btn) return;
  const n = state.stamps.size;
  if (countEl) countEl.textContent = n;
  btn.classList.toggle("is-disabled", n === 0);
  btn.classList.toggle("is-armed", n > 0);
  btn.title = n === 0
    ? "crave (tap tags first)"
    : `crave with ${n} stamp${n === 1 ? "" : "s"}`;
}

// ---- 07 snack picker ----
function renderShelf() {
  document.querySelectorAll(".tabs button").forEach((b) => {
    b.classList.toggle("is-on", b.dataset.shelf === state.shelf);
  });
  const grid = document.getElementById("shelf-grid");
  if (!grid) return;
  grid.innerHTML = "";
  fixtures.shelves[state.shelf].forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "shelf__item";
    if (state.picked && state.picked.id === item.id) btn.classList.add("is-on");
    btn.innerHTML = `
      <span class="tier">₹${item.price}</span>
      <span class="emoji">${item.emoji}</span>
      <div class="name">${item.name}</div>
    `;
    btn.onclick = () => {
      state.picked = { ...item, shelf: state.shelf };
      renderShelf();
      updateSendBtn();
    };
    grid.appendChild(btn);
  });
  updateSendBtn();
}

function updateSendBtn() {
  const btn = document.getElementById("send-cta");
  if (!btn) return;
  const ready = !!state.picked;
  btn.disabled = !ready;
  btn.style.opacity = ready ? "1" : "0.45";
  btn.style.pointerEvents = ready ? "auto" : "none";
  btn.textContent = ready
    ? `send ${state.picked.emoji} for ₹${state.picked.price} →`
    : "pick a snack first";
}

// ---- 08 confirm ----
function renderConfirm() {
  const summary = document.getElementById("confirm-summary");
  if (!summary || !state.picked) return;
  state.note = document.getElementById("note-input")?.value || state.note;
  summary.innerHTML = `
    <div class="confirm__row"><span class="k">to</span><span class="v">${fixtures.match.name}</span></div>
    <div class="confirm__row"><span class="k">via</span><span class="v">${state.picked.shelf}</span></div>
    <div class="confirm__row"><span class="k">snack</span><span class="v">${state.picked.emoji} ${state.picked.name}</span></div>
    <div class="confirm__row"><span class="k">note</span><span class="v">${state.note || "(none)"}</span></div>
    <div class="confirm__row"><span class="k">total</span><span class="v">₹${state.picked.price}</span></div>
  `;
}

// ---- 09 chat ----
function renderChat() {
  const gift = document.getElementById("chat-gift");
  if (!gift) return;
  if (!state.picked) { gift.innerHTML = ""; return; }
  gift.innerHTML = `
    <div class="gift__head">
      <span class="gift__tag">snack en route</span>
      <span class="gift__status">eta · 14 min</span>
    </div>
    <div class="gift__body">
      <span class="gift__emoji">${state.picked.emoji}</span>
      <div>
        <div class="gift__name">${state.picked.name}</div>
        <div class="gift__meta">via ${state.picked.shelf} · ₹${state.picked.price}</div>
      </div>
    </div>
    ${state.note ? `<div class="gift__note">"${state.note}"</div>` : ""}
  `;
}

// ---- 10 inbox ----
function renderInbox() {
  const list = document.getElementById("inbox-list");
  if (!list) return;
  list.innerHTML = "";
  fixtures.inbox.forEach((row) => {
    const el = document.createElement("button");
    el.className = "inbox__row";
    if (row.mystery) el.classList.add("inbox__row--mystery");
    const bgVar = row.bg === "heat" ? "var(--heat)" : `var(--vibe-${row.bg})`;
    el.innerHTML = `
      <span class="avatar" style="background: ${bgVar};">${row.initial}</span>
      <div class="text">
        <div class="name">${row.name}</div>
        <div class="preview">${row.gift ? '<span class="gift-mark">●</span>' : ""}${row.mystery ? '<span class="gift-mark">🎁</span>' : ""}${row.preview}</div>
      </div>
      <div class="meta">
        <span>${row.time}</span>
        ${row.unread > 0 ? `<span class="badge">${row.unread}</span>` : ""}
      </div>
    `;
    el.onclick = () => goTo(row.mystery ? "mystery" : "chat");
    list.appendChild(el);
  });
}

// ---- 11 sends ----
function renderSends() {
  const list = document.getElementById("sends-list");
  if (!list) return;
  list.innerHTML = "";
  fixtures.sends.forEach((s) => {
    const el = document.createElement("div");
    el.className = "sends__card";
    el.dataset.status = s.tag;
    el.innerHTML = `
      <span class="emoji">${s.emoji}</span>
      <div>
        <div class="to">to <strong>${s.to}</strong></div>
        <div class="item">${s.name}</div>
        <div class="meta">via ${s.via}</div>
      </div>
      <div class="status-tag">
        ${s.status}
        <strong>${s.eta}</strong>
      </div>
    `;
    list.appendChild(el);
  });
}

// ---- DROP · pre-match send ----
function renderDropShelf() {
  const shelf = document.getElementById("drop-shelf");
  if (!shelf) return;
  shelf.innerHTML = "";
  fixtures.shelves.drop.forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "drop-shelf__item";
    if (state.drop.snack && state.drop.snack.id === item.id) btn.classList.add("is-on");
    btn.innerHTML = `
      <span class="emoji">${item.emoji}</span>
      <div class="name">${item.name}</div>
      <div class="price">₹${item.price}</div>
    `;
    btn.onclick = () => {
      state.drop.snack = item;
      renderDropShelf();
      updateDropSummary();
    };
    shelf.appendChild(btn);
  });
  updateDropSummary();
}

function updateDropSummary() {
  const snackEl = document.getElementById("drop-sum-snack");
  const totalEl = document.getElementById("drop-sum-total");
  const cta = document.getElementById("drop-cta");
  if (!snackEl || !totalEl || !cta) return;
  if (state.drop.snack) {
    snackEl.textContent = `${state.drop.snack.emoji} ${state.drop.snack.name} · ₹${state.drop.snack.price}`;
    const total = state.drop.snack.price + 49;
    totalEl.textContent = `₹${total}`;
    cta.textContent = `drop it 🎁 · ₹${total}`;
    cta.style.opacity = "1";
    cta.style.pointerEvents = "auto";
  } else {
    snackEl.textContent = "pick one first";
    totalEl.textContent = "—";
    cta.textContent = "pick a snack first";
    cta.style.opacity = "0.6";
    cta.style.pointerEvents = "none";
  }
}

function setupTonightToggle() {
  const toggle = document.getElementById("tonight-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    state.drop.tonight = !state.drop.tonight;
    toggle.classList.toggle("is-on", state.drop.tonight);
  });
}

function setupDropNote() {
  const input = document.getElementById("drop-note");
  if (!input) return;
  input.addEventListener("input", (e) => { state.drop.note = e.target.value; });
}

// ---- MYSTERY · receiver finds the sender ----
function renderMystery() {
  const grid = document.getElementById("mystery-grid");
  const banner = document.getElementById("mystery-banner");
  if (!grid) return;
  if (banner) { banner.className = "mystery-banner"; banner.innerHTML = ""; }
  grid.innerHTML = "";
  // the "correct" sender is index 1 (ravi) in the mystery fixtures — that's "you"
  fixtures.mystery.forEach((m, idx) => {
    const card = document.createElement("button");
    card.className = "mystery-card";
    card.innerHTML = `
      <img src="${m.photo}" alt="mystery candidate" loading="lazy" />
      <div class="body">
        <div class="initial">${m.initial}</div>
        <div class="vibe-tag">${m.vibe}</div>
      </div>
    `;
    card.onclick = () => {
      card.classList.add("is-revealed");
      const correct = idx === 1;
      if (banner) {
        banner.classList.add("is-shown");
        if (correct) {
          banner.innerHTML = `she found you. <span class="script">match unlocked.</span>`;
        } else {
          banner.classList.add("wrong");
          banner.innerHTML = `not them. <span class="script">they stay anonymous.</span>`;
        }
      }
    };
    grid.appendChild(card);
  });
}

// ---- 05 spicy mode (lust selector, 18+) ----
function setupSpicyTiles() {
  document.querySelectorAll(".spicy-tile").forEach((tile) => {
    tile.addEventListener("click", () => {
      const v = tile.dataset.vibe;
      if (!v) return;
      if (state.spicyTiles.has(v)) {
        state.spicyTiles.delete(v);
        tile.classList.remove("is-on");
      } else {
        state.spicyTiles.add(v);
        tile.classList.add("is-on");
      }
    });
  });
}

// ---- tabbar ----
function setupTabbar() {
  document.querySelectorAll(".tabbar").forEach((bar) => {
    bar.querySelectorAll(".tabbar__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        if (tab) goTo(tab);
      });
    });
  });
}

// ---- wire up ----
document.addEventListener("DOMContentLoaded", () => {
  renderOnboarding();
  renderDeck();
  setupKeypad();
  setupSpicyTiles();
  setupTonightToggle();
  setupDropNote();
  setupTabbar();

  document.querySelectorAll("[data-go]").forEach((el) => {
    el.addEventListener("click", () => {
      if (el.dataset.go) goTo(el.dataset.go);
    });
  });

  document.querySelectorAll(".tabs button").forEach((b) => {
    b.addEventListener("click", () => {
      if (!b.dataset.shelf) return;
      state.shelf = b.dataset.shelf;
      state.picked = null;
      renderShelf();
    });
  });

  const noteInput = document.getElementById("note-input");
  if (noteInput) {
    noteInput.addEventListener("input", (e) => {
      state.note = e.target.value;
    });
  }

  // start at splash, which auto-advances
  goTo("splash");
  startSplash();
});
