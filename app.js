/* ========================================================
   SURAJ & Trupti WEDDING WEBSITE — JAVASCRIPT
   7 July 2026 | Shri Ganesh Mangal Karyalay, Dharashiv
   Developed by Shrinivas Solapure
   ======================================================== */

'use strict';

// ─── CONFIG ───────────────────────────────────────────────
const WEDDING_DATE = new Date('2026-07-07T12:31:00+05:30');
const BASE_URL = window.location.origin + window.location.pathname;

// ─── DOM READY ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initGuestModal();
  initNavbar();
  initPetals();
  initHearts();
  initCountdown();
  initScrollReveal();
  initShare();
  initFireworks();
  initMusic();
  initMobileMenu();
});

// ─── 1. GUEST MODAL (Personalized Link) ──────────────────
function initGuestModal() {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('guest') || params.get('invite');

  if (guestName) {
    const decoded = decodeURIComponent(guestName).replace(/\+/g, ' ');
    const modal = document.getElementById('guestModal');
    document.getElementById('guestModalTitle').textContent = `Welcome, ${decoded}! 🎉`;
    document.getElementById('guestModalMsg').textContent =
      `You are personally invited to celebrate the wedding of Suraj Bharat Tarte & Trupti Shivaji Wagh on Tuesday, 7 July 2026 at Shri Ganesh Mangal Karyalay, Solapur-Dhule Bypass Road, Dharashiv.`;
    modal.style.display = 'flex';

    document.getElementById('guestModalClose').addEventListener('click', closeGuestModal);
    document.getElementById('guestModalEnter').addEventListener('click', closeGuestModal);
    modal.querySelector('.guest-modal-overlay').addEventListener('click', closeGuestModal);
  }

  function closeGuestModal() {
    const modal = document.getElementById('guestModal');
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.4s ease';
    setTimeout(() => { modal.style.display = 'none'; }, 400);
  }
}

// ─── 2. NAVBAR ────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => observer.observe(sec));
}

// ─── 3. MOBILE MENU ──────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

window.closeMobileMenu = function() {
  document.getElementById('mobileMenu').classList.remove('open');
};

// ─── 4. FALLING PETALS (Hero) ────────────────────────────
function initPetals() {
  const container = document.getElementById('petalsContainer');
  const petals = ['🌸', '🌺', '🌷', '🌹', '💐'];

  function spawnPetal() {
    const el = document.createElement('span');
    el.className = 'petal';
    el.textContent = petals[Math.floor(Math.random() * petals.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    const dur = 6 + Math.random() * 8;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = Math.random() * 4 + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 5) * 1000);
  }

  for (let i = 0; i < 15; i++) setTimeout(spawnPetal, i * 400);
  setInterval(spawnPetal, 800);
}

// ─── 5. FLOATING HEARTS CANVAS ────────────────────────────
function initHearts() {
  const canvas = document.getElementById('heartsCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const hearts = [];

  function createHeart() {
    hearts.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: 10 + Math.random() * 20,
      speedY: 0.5 + Math.random() * 1.5,
      speedX: (Math.random() - 0.5) * 0.8,
      opacity: 0.3 + Math.random() * 0.5,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      color: Math.random() > 0.5 ? '#d4af37' : '#e8a0b0'
    });
  }

  function drawHeart(ctx, x, y, size, color, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    ctx.fill();
    ctx.restore();
  }

  setInterval(createHeart, 2500);

  function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      h.y -= h.speedY;
      h.wobble += h.wobbleSpeed;
      h.x += Math.sin(h.wobble) * 0.5 + h.speedX;
      h.opacity -= 0.001;
      if (h.y < -50 || h.opacity <= 0) { hearts.splice(i, 1); continue; }
      drawHeart(ctx, h.x, h.y, h.size, h.color, h.opacity);
    }
    requestAnimationFrame(animateHearts);
  }
  animateHearts();
}

// ─── 6. COUNTDOWN TIMER ──────────────────────────────────
function initCountdown() {
  const daysEl   = document.getElementById('countDays');
  const hoursEl  = document.getElementById('countHours');
  const minsEl   = document.getElementById('countMinutes');
  const secsEl   = document.getElementById('countSeconds');

  function pad(n) { return String(n).padStart(2, '0'); }

  function setWithFlip(el, val) {
    const padded = pad(val);
    if (el.textContent !== padded) {
      el.classList.add('flip');
      el.textContent = padded;
      setTimeout(() => el.classList.remove('flip'), 400);
    }
  }

  function updateCountdown() {
    const now  = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
      daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = '00';
      const disp = document.querySelector('.countdown-date-display');
      if (disp) disp.textContent = '🎉 The Wedding Has Begun! Congratulations Suraj & Trupti!';
      return;
    }

    setWithFlip(daysEl,  Math.floor(diff / (1000 * 60 * 60 * 24)));
    setWithFlip(hoursEl, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setWithFlip(minsEl,  Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    setWithFlip(secsEl,  Math.floor((diff % (1000 * 60)) / 1000));
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ─── 7. SCROLL REVEAL ────────────────────────────────────
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = (el.dataset.delay || 0);
        setTimeout(() => { el.classList.add('visible'); }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  elements.forEach((el, i) => {
    el.dataset.delay = (i % 4) * 120;
    observer.observe(el);
  });
}

// ─── 8. PERSONALIZED INVITATION + PDF + WHATSAPP ─────────
function initShare() {
  const btn     = document.getElementById('generateInviteBtn');
  const preview = document.getElementById('invitePreview');

  btn.addEventListener('click', () => {
    const name = document.getElementById('guestNameInput').value.trim();
    if (!name) {
      showToast('Please enter the guest name first! ✨');
      return;
    }
    document.getElementById('inviteWelcome').textContent = `Dear ${name} ❤️`;
    preview.style.display = 'block';
    setTimeout(() => preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    showToast(`Invitation prepared for ${name} 🎉`);
  });

  document.getElementById('downloadPdfBtn').addEventListener('click', () => {
    const name = document.getElementById('guestNameInput').value.trim() || 'Guest';
    generateInvitationPDF(name);
  });
}


// ─── 10. PDF GENERATION — HTML Template ──────────────────
function getPdfHTML(guestName) {
  const safeGuest = escapeHtml(guestName);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Wedding Invitation — Suraj & Trupti</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Great+Vibes&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet"/>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Outfit',sans-serif; background:#fdf8f0; color:#3a1820; }

    .page {
      width:210mm; min-height:297mm; margin:0 auto;
      position:relative; overflow:hidden;
      page-break-after:always; background:#fdf8f0;
    }
    .page:last-child { page-break-after:avoid; }

    /* === BORDERS & ORNAMENTS === */
    .page-border {
      position:absolute; inset:0;
      border:14px solid transparent;
      border-image:repeating-linear-gradient(45deg,#d4af37 0,#d4af37 8px,#f9d89c 8px,#f9d89c 16px) 14;
      pointer-events:none; z-index:10;
    }
    .page-inner-border {
      position:absolute; inset:20px;
      border:1.5px solid rgba(212,175,55,0.5);
      border-radius:4px; pointer-events:none; z-index:10;
    }
    .corner {
      position:absolute; width:60px; height:60px;
      z-index:11; font-size:38px; line-height:60px;
      text-align:center; opacity:0.65;
    }
    .c-tl{top:18px;left:18px} .c-tr{top:18px;right:18px;transform:scaleX(-1)}
    .c-bl{bottom:18px;left:18px;transform:scaleY(-1)} .c-br{bottom:18px;right:18px;transform:scale(-1)}

    .divider { width:120px; height:1px; background:linear-gradient(90deg,transparent,#d4af37,transparent); margin:10px auto; }
    .lotus-row { font-size:28px; letter-spacing:8px; opacity:0.5; margin:8px 0; text-align:center; }
    .bg-top { font-size:80px; opacity:0.08; text-align:center; margin-bottom:-20px; }
    .bg-bot { font-size:80px; opacity:0.08; text-align:center; margin-top:-20px; }

    /* === PAGE CONTENT WRAPPERS === */
    .content {
      display:flex; flex-direction:column; align-items:center;
      justify-content:center; min-height:297mm;
      padding:50px 56px; text-align:center; box-sizing:border-box;
    }
    .content-dark {
      background:linear-gradient(160deg,#2a1408 0%,#3d2010 50%,#2a1408 100%);
      color:#fff;
    }
    .content-cream { background:linear-gradient(160deg,#fdf4e8 0%,#fff9f0 50%,#fdf0ea 100%); }

    /* === TYPOGRAPHY === */
    .f-script { font-family:'Great Vibes',cursive; }
    .f-serif  { font-family:'Cormorant Garamond',serif; }
    .f-sans   { font-family:'Outfit',sans-serif; }

    /* Gold accented box */
    .gold-box {
      background:linear-gradient(135deg,#c8941a,#a07010);
      color:#fff; border-radius:14px;
      padding:16px 36px; margin:16px 0;
    }

    /* Ceremony card */
    .ceremony-card {
      background:#fff; border:1px solid rgba(200,148,26,0.2);
      border-radius:14px; padding:20px 24px;
      text-align:left; position:relative; overflow:hidden;
      margin-bottom:18px; width:100%;
    }
    .ceremony-card-top {
      position:absolute; top:0;left:0;right:0;height:3px;
      background:linear-gradient(90deg,#c8941a,#e8a0b0);
    }

    @media print {
      body { margin:0; }
      .page { margin:0; box-shadow:none; }
    }
  </style>
</head>
<body>

<!-- ═══════════════════════════════════════════════
     PAGE 1 — LORD GANESHA BLESSING
     ═══════════════════════════════════════════════ -->
<div class="page content-cream">
  <div class="page-border"></div><div class="page-inner-border"></div>
  <div class="corner c-tl">🌸</div><div class="corner c-tr">🌸</div>
  <div class="corner c-bl">🌺</div><div class="corner c-br">🌺</div>

  <div class="content">
    <div class="bg-top">🏵️</div>
    <div class="lotus-row">🌸 🏵️ 🌸</div>
    <div style="font-size:110px;margin:16px 0;filter:drop-shadow(0 4px 16px rgba(212,175,55,0.5))">🐘</div>
    <div class="f-script" style="font-size:62px;color:#8b6914;line-height:1.2;margin-bottom:8px">Om Shree<br/>Ganeshay Namah</div>
    <div class="divider"></div>
    <div class="f-serif" style="font-style:italic;font-size:16px;color:#7a5040;line-height:2;max-width:340px;margin:18px auto">
      "May Lord Ganesha, the remover of all obstacles and the harbinger of auspicious beginnings, bless this sacred union with eternal joy, prosperity and divine grace."
    </div>
    <div class="divider"></div>
    <div class="f-serif" style="font-size:13px;letter-spacing:3px;color:#8b6914;margin-top:16px">|| SHRI GANESHAYA NAMAH ||</div>
    <div class="lotus-row" style="margin-top:16px">🌸 🏵️ 🌸</div>
    <div class="bg-bot">🏵️</div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════
     PAGE 2 — PERSONALIZED GUEST WELCOME
     ═══════════════════════════════════════════════ -->
<div class="page content-cream">
  <div class="page-border"></div><div class="page-inner-border"></div>
  <div class="corner c-tl">💐</div><div class="corner c-tr">💐</div>
  <div class="corner c-bl">🌷</div><div class="corner c-br">🌷</div>

  <div class="content">
    <div class="bg-top">🏵️</div>
    <div class="lotus-row">🌸 ✦ 🌸</div>
    <div style="font-size:52px;margin-bottom:8px">🕉️</div>
    <div class="f-serif" style="font-style:italic;font-size:15px;color:#7a5040;margin-bottom:14px;line-height:1.8">
      With heartfelt joy and divine blessings,<br/>we present a special invitation to
    </div>
    <div class="divider"></div>
    <div class="f-serif" style="font-size:13px;letter-spacing:4px;text-transform:uppercase;color:#8b6914;margin:10px 0">Our Dear Guest</div>
    <div class="f-script" style="font-size:88px;color:#8b2635;line-height:1.1;margin:6px 0;text-shadow:0 2px 6px rgba(139,38,53,0.15)">${safeGuest}</div>
    <div class="divider"></div>
    <div class="f-serif" style="font-size:13px;color:#7a5040;margin:12px 0">You are cordially invited to the wedding of</div>
    <div class="f-script" style="font-size:52px;color:#c8941a;margin-bottom:6px">Suraj &amp; Trupti</div>
    <div class="f-serif" style="font-style:italic;font-size:12px;color:#9b7050;margin-bottom:22px">A Union Blessed by the Divine</div>
    <div class="gold-box">
      <div class="f-serif" style="font-size:20px;font-weight:700;letter-spacing:1px">Tuesday, 7 July 2026</div>
      <div class="f-sans" style="font-size:11px;opacity:0.9;margin-top:3px">Dharashiv, Maharashtra</div>
    </div>
    <div class="f-serif" style="font-size:12px;color:#7a5040;line-height:1.8;margin-top:10px">
      Shri Ganesh Mangal Karyalay<br/>
      Solapur–Dhule Bypass Road, Dharashiv — 413501
    </div>
    <div class="lotus-row" style="margin-top:16px">🌸 ✦ 🌸</div>
    <div class="bg-bot">🏵️</div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════
     PAGE 3 — MAIN INVITATION CARD
     ═══════════════════════════════════════════════ -->
<div class="page content-cream">
  <div class="page-border"></div><div class="page-inner-border"></div>
  <div class="corner c-tl">🌺</div><div class="corner c-tr">🌺</div>
  <div class="corner c-bl">🌺</div><div class="corner c-br">🌺</div>

  <div class="content">
    <div style="font-size:52px;margin-bottom:6px">🕉️</div>
    <div class="f-serif" style="font-size:13px;letter-spacing:3px;color:#8b6914;margin-bottom:14px">|| Shri Ganeshaya Namah ||</div>
    <div class="f-serif" style="font-style:italic;font-size:13px;color:#7a5060;line-height:1.8;margin-bottom:16px">
      With the blessings of God<br/>and the families
    </div>
    <div class="divider"></div>
    <div class="f-serif" style="font-size:14px;color:#7a5060;margin-bottom:14px">We joyfully announce the marriage of</div>

    <div class="f-script" style="font-size:70px;color:#8b2635;line-height:1.1">Suraj Bharat Tarte</div>
    <div class="f-serif" style="font-size:12px;color:#7a5060;margin-bottom:10px">
      Son of Shri Bharat Tarte
    </div>

    <div class="f-script" style="font-size:46px;color:#c8941a;margin:4px 0">&amp;</div>

    <div class="f-script" style="font-size:70px;color:#8b2635;line-height:1.1">Trupti Shivaji Wagh</div>
    <div class="f-serif" style="font-size:12px;color:#7a5060;margin-bottom:14px">
      Daughter of Shri Shivaji Wagh
    </div>

    <div class="divider"></div>
    <div class="f-serif" style="font-style:italic;font-size:13px;color:#7a5060;line-height:1.8;margin:14px 0 10px">
      You are cordially invited to grace this auspicious occasion<br/>with your blessings and joyful presence.
    </div>
    <div class="divider"></div>
    <div style="display:flex;flex-direction:column;gap:6px;align-items:center;margin-bottom:10px">
      <div class="f-serif" style="font-size:13px;color:#7a5060"><strong style="color:#8b6914">Date:</strong> Tuesday, 7th July 2026</div>
      <div class="f-serif" style="font-size:13px;color:#7a5060"><strong style="color:#8b6914">Time:</strong> Afternoon 12:31 PM</div>
      <div class="f-serif" style="font-size:13px;color:#7a5060"><strong style="color:#8b6914">Venue:</strong> Shri Ganesh Mangal Karyalay</div>
      <div class="f-serif" style="font-size:13px;color:#7a5060">Solapur–Dhule Bypass Road, Dharashiv — 413501</div>
    </div>
    <div class="lotus-row">🌸 🏵️ 🌸</div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════
     PAGE 4 — SAVE THE DATE
     ═══════════════════════════════════════════════ -->
<div class="page" style="background:linear-gradient(160deg,#2a1408 0%,#3d2010 50%,#2a1408 100%)">
  <div class="page-border"></div><div class="page-inner-border"></div>
  <div class="corner c-tl">💫</div><div class="corner c-tr">💫</div>
  <div class="corner c-bl">💫</div><div class="corner c-br">💫</div>

  <div class="content" style="color:#fff">
    <div class="bg-top" style="color:#f9d89c">🏵️</div>
    <div class="f-serif" style="font-size:12px;letter-spacing:5px;color:rgba(249,216,156,0.7);text-transform:uppercase;margin-bottom:14px">Please Save The Date</div>
    <div class="f-script" style="font-size:80px;color:#f0d060;line-height:1.1;margin-bottom:6px">Save<br/>the Date</div>
    <div class="f-script" style="font-size:54px;color:#fff;margin-bottom:24px">Suraj &amp; Trupti</div>

    <div style="background:rgba(255,255,255,0.08);border:1px solid rgba(212,175,55,0.35);border-radius:18px;padding:28px 44px;max-width:300px;margin:0 auto 24px">
      <div style="font-size:11px;letter-spacing:4px;color:rgba(249,216,156,0.7);text-transform:uppercase">Tuesday</div>
      <div class="f-serif" style="font-size:84px;font-weight:700;color:#f0d060;line-height:1">07</div>
      <div style="font-size:22px;letter-spacing:6px;color:#fff;text-transform:uppercase">July</div>
      <div class="f-serif" style="font-size:18px;color:rgba(255,255,255,0.6)">2026</div>
    </div>

    <div class="f-serif" style="font-size:16px;font-style:italic;color:rgba(249,216,156,0.85);margin-bottom:14px">🕛 Ceremony begins at 12:31 PM</div>


    <div class="f-serif" style="font-size:13px;color:rgba(255,255,255,0.7);line-height:1.9">
      📍 Shri Ganesh Mangal Karyalay<br/>
      Solapur–Dhule Bypass Road, Dharashiv — 413501
    </div>
    <div class="bg-bot" style="color:#f9d89c">🏵️</div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════
     PAGE 5 — FUNCTIONS & CEREMONIES
     ═══════════════════════════════════════════════ -->
<div class="page content-cream">
  <div class="page-border"></div><div class="page-inner-border"></div>
  <div class="corner c-tl">🌼</div><div class="corner c-tr">🌼</div>
  <div class="corner c-bl">🌼</div><div class="corner c-br">🌼</div>

  <div class="content">
    <div class="bg-top">🏵️</div>
    <div class="f-serif" style="font-size:12px;letter-spacing:4px;color:#8b6914;text-transform:uppercase;margin-bottom:10px">|| Mangalashtak ||</div>
    <div class="f-script" style="font-size:58px;color:#8b2635;margin-bottom:10px">Functions<br/>&amp;<br/>Ceremonies</div>
    <div class="divider"></div>
    <div style="width:100%;max-width:380px;margin:0 auto">

      <div class="ceremony-card">
        <div class="ceremony-card-top"></div>
        <div style="font-size:28px;margin-bottom:8px">💍</div>
        <div class="f-serif" style="font-size:20px;font-weight:700;color:#3a1c10;margin-bottom:6px;letter-spacing:2px">SAKHARPUDA</div>
        <div class="f-sans" style="font-size:11px;color:#8b6040;line-height:1.8">
          <strong style="color:#c8941a">Sunday, 5 July 2026</strong><br/>
          Evening 5:00 PM — Dharashiv
        </div>
      </div>

      <div style="text-align:center;font-size:22px;color:#d4af37;margin:4px 0">❧</div>

      <div class="ceremony-card">
        <div class="ceremony-card-top"></div>
        <div style="font-size:28px;margin-bottom:8px">🌿</div>
        <div class="f-serif" style="font-size:20px;font-weight:700;color:#3a1c10;margin-bottom:6px;letter-spacing:2px">HALDI</div>
        <div class="f-sans" style="font-size:11px;color:#8b6040;line-height:1.8">
          <strong style="color:#c8941a">Monday, 6 July 2026</strong><br/>
          Evening 7:00 PM — Dharashiv
        </div>
      </div>

      <div style="text-align:center;font-size:22px;color:#d4af37;margin:4px 0">❧</div>

      <div class="ceremony-card">
        <div class="ceremony-card-top"></div>
        <div style="font-size:28px;margin-bottom:8px">🕉️</div>
        <div class="f-serif" style="font-size:20px;font-weight:700;color:#3a1c10;margin-bottom:6px;letter-spacing:2px">WEDDING (VIVAH)</div>
        <div class="f-sans" style="font-size:11px;color:#8b6040;line-height:1.8">
          <strong style="color:#c8941a">Tuesday, 7 July 2026</strong><br/>
          Afternoon 12:31 PM<br/>
          Shri Ganesh Mangal Karyalay, Dharashiv
        </div>
      </div>
    </div>
    <div class="f-serif" style="font-style:italic;font-size:12px;color:#8b6040;margin-top:12px">Dress Code: Traditional Indian Attire 🌸</div>
    <div class="bg-bot">🏵️</div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════
     PAGE 6 — FAMILY BLESSING & CLOSING
     ═══════════════════════════════════════════════ -->
<div class="page content-cream" style="page-break-after:avoid">
  <div class="page-border"></div><div class="page-inner-border"></div>
  <div class="corner c-tl">🌹</div><div class="corner c-tr">🌹</div>
  <div class="corner c-bl">🌹</div><div class="corner c-br">🌹</div>

  <div class="content">
    <div class="bg-top">🏵️</div>
    <div class="lotus-row">🌸 🏵️ 🌸</div>
    <div style="font-size:32px;margin:12px 0">🙏</div>
    <div class="f-script" style="font-size:52px;color:#8b6914;line-height:1.3;margin-bottom:10px">With Love &amp;<br/>Blessings</div>
    <div class="divider"></div>
    <div class="f-serif" style="font-style:italic;font-size:15px;color:#7a5060;line-height:2;max-width:340px;margin:18px auto">
      "May Lord Ganesha shower his choicest blessings upon Suraj and Trupti. May their union be filled with eternal love, laughter, prosperity and divine happiness throughout their lives together."
    </div>
    <div class="divider"></div>
    <div style="background:linear-gradient(135deg,rgba(200,148,26,0.08),rgba(200,148,26,0.15));border:1px solid rgba(200,148,26,0.25);border-radius:16px;padding:24px 40px;margin:20px auto;max-width:360px">
      <div class="f-serif" style="font-size:13px;color:#7a5060;margin-bottom:12px">With Love &amp; Blessings,</div>
      <div class="f-script" style="font-size:34px;color:#8b6914;margin-bottom:4px">The Tarte Family</div>
      <div style="width:60px;height:1px;background:rgba(200,148,26,0.4);margin:10px auto"></div>
      <div class="f-script" style="font-size:34px;color:#8b6914;margin-bottom:4px">The Wagh Family</div>
    </div>
    <div class="f-serif" style="font-size:11px;color:#9b7050;margin-top:12px;letter-spacing:1px">
      🎗️ Wedding Coordinated by <strong>Mr. Om Wagh</strong> (Bride's Brother)
    </div>
    <div class="lotus-row" style="margin-top:14px">🌸 🏵️ 🌸</div>
    <div class="bg-bot">🏵️</div>
  </div>
</div>

</body>
</html>`;
}

function generateInvitationPDF(guestName) {
  showToast('Opening your personalized 6-page invitation PDF... 📄');
  const pdfHTML = getPdfHTML(guestName);

  const pdfWindow = window.open('', '_blank', 'width=960,height=800');
  if (!pdfWindow) {
    showToast('Please allow pop-ups to open the PDF! 📄');
    return;
  }

  pdfWindow.document.write(pdfHTML);
  pdfWindow.document.close();

  pdfWindow.onload = function() {
    setTimeout(() => {
      pdfWindow.focus();
      pdfWindow.print();
    }, 1500);
  };

  showToast('PDF opened! Use "Save as PDF" in the print dialog. 📄');
}

// ─── 9. WHATSAPP SHARE (PDF) ─────────────────────────────
function shareOnWhatsApp(guestName) {
  showToast('Preparing PDF for WhatsApp... Please wait ⏳');
  
  const msg = `🕉️ *|| Shri Ganeshaya Namah ||*

🎉 *Wedding Invitation* 🎉

Dear *${guestName}*,

With the blessings of God and our families, we joyfully invite you to celebrate the wedding of

✨ *Suraj Bharat Tarte* ✨
_Son of Shri Bharat Tarte & Smt. Tarte_

💐 & 💐

✨ *Trupti Shivaji Wagh* ✨
_Daughter of Shri Shivaji Wagh & Smt. Wagh_

📌 *Events Schedule:*

💍 *Sakharpuda (Engagement)*
📅 Sunday, 5 July 2026 — Evening 5:00 PM
📍 Dharashiv, Maharashtra

🌿 *Haldi Ceremony*
📅 Monday, 6 July 2026 — Evening 7:00 PM
📍 Dharashiv, Maharashtra

💍 *Wedding Ceremony (Vivah)*
📅 Tuesday, 7 July 2026 — Afternoon 12:31 PM
📍 Shri Ganesh Mangal Karyalay
   Near Vidyamata High School,
   Solapur–Dhule Bypass Road,
   Dharashiv (Osmanabad) — 413501, Maharashtra

*Your presence will be our greatest joy and blessing!* 🌸

_— The Tarte & Wagh Families_ 🙏
_🎗️ Wedding Coordinated by Mr. Om Wagh (Bride’s Brother)_

🌐 *View Website:* ${window.location.href.split('?')[0]}?guest=${encodeURIComponent(guestName)}`;

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '210mm';
  iframe.style.height = '1782mm';
  iframe.style.zIndex = '-9999';
  iframe.style.opacity = '0.01';
  document.body.appendChild(iframe);
  
  const pdfContent = getPdfHTML(guestName);
  
  iframe.contentDocument.open();
  iframe.contentDocument.write(pdfContent);
  iframe.contentDocument.close();

  setTimeout(() => {
    const opt = {
      margin: 0,
      filename: `Wedding_Invitation_${guestName.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(iframe.contentDocument.body).output('blob').then((blob) => {
      document.body.removeChild(iframe);
      
      const file = new File([blob], opt.filename, { type: 'application/pdf' });
      
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: 'Wedding Invitation',
          text: msg
        }).then(() => showToast('Shared successfully! 🎉'))
          .catch((err) => showToast('Sharing cancelled or failed.'));
      } else {
        // Fallback for desktop browsers that don't support file sharing
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = opt.filename;
        a.click();
        URL.revokeObjectURL(url);
        
        // Open WhatsApp Web with the prefilled message so they can attach the downloaded PDF
        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
        showToast('PDF downloaded! Please attach it to the WhatsApp message.');
      }
    });
  }, 2500); // Wait for fonts to load
}

// ─── 11. FIREWORKS ───────────────────────────────────────
function initFireworks() {
  const canvas = document.getElementById('fireworksCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  let particles = [];

  function launchFirework(x, y) {
    const colors = ['#d4af37', '#f0d060', '#e8a0b0', '#f9d89c', '#fff', '#c8a0c8'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 80; i++) {
      const angle = (Math.PI * 2 / 80) * i;
      const speed = 2 + Math.random() * 5;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        radius: 2 + Math.random() * 3,
        gravity: 0.08 + Math.random() * 0.05,
        trail: []
      });
    }
  }

  function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.alpha > 0.01);
    particles.forEach(p => {
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 6) p.trail.shift();
      p.x += p.vx; p.y += p.vy;
      p.vy += p.gravity; p.vx *= 0.98; p.alpha -= 0.014;
      p.trail.forEach((t, i) => {
        ctx.beginPath();
        ctx.arc(t.x, t.y, p.radius * (i / p.trail.length) * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (i / p.trail.length) * 0.4;
        ctx.fill();
      });
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateFireworks);
  }
  animateFireworks();

  const eventsSection = document.getElementById('events');
  let fireworksFired = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !fireworksFired) {
        fireworksFired = true;
        triggerShow();
        setTimeout(() => { fireworksFired = false; }, 10000);
      }
    });
  }, { threshold: 0.3 });
  if (eventsSection) observer.observe(eventsSection);

  function triggerShow() {
    [0, 600, 1200, 1800, 2400, 3000].forEach(delay => {
      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            launchFirework(
              100 + Math.random() * (canvas.width - 200),
              100 + Math.random() * (canvas.height * 0.5)
            );
          }, i * 200);
        }
      }, delay);
    });
  }

  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
    launchFirework(e.clientX, e.clientY);
  });
}

// ─── 12. MUSIC ───────────────────────────────────────────
function initMusic() {
  const btn  = document.getElementById('musicToggle');
  const icon = document.getElementById('musicIcon');
  const audio = document.getElementById('bgMusic');

  audio.src = 'music.mp3'; // Placed locally to prevent broken links
  audio.volume = 0.5;

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        icon.textContent = '⏸️';
        btn.classList.add('playing');
        showToast('Playing Love Hindi Song 🎶');
      }).catch((err) => {
        console.error("Audio playback failed:", err);
        showToast('Please add a "music.mp3" file in the folder to play music! 🎶');
      });
    } else {
      audio.pause();
      icon.textContent = '🎵';
      btn.classList.remove('playing');
    }
  });
}

// ─── 13. PARALLAX HERO ───────────────────────────────────
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transform = `translateY(${window.pageYOffset * 0.4}px) scale(1.05)`;
  }
});

// ─── 14. SECTION ENTRANCE ANIMATIONS ─────────────────────
(function() {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(30px)';
    sec.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    sectionObserver.observe(sec);
  });
})();

// ─── 15. OPEN INVITATION RIPPLE ──────────────────────────
const openBtn = document.getElementById('openInvitationBtn');
if (openBtn) {
  openBtn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      background:rgba(255,255,255,0.4);
      width:100px; height:100px;
      margin-top:-50px; margin-left:-50px;
      animation:rippleEffect 0.8s ease-out;
      pointer-events:none;
    `;
    const style = document.createElement('style');
    style.textContent = '@keyframes rippleEffect{from{transform:scale(0);opacity:1}to{transform:scale(4);opacity:0}}';
    document.head.appendChild(style);
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    const rect = this.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top  = (e.clientY - rect.top) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  });
}

// ─── 16. UTILITY: TOAST & ESCAPE HTML ────────────────────
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

console.log('%c💍 Suraj & Trupti Wedding — 7 July 2026 💍', 'color:#d4af37;font-size:1.2rem;font-weight:bold;');
console.log('%cShri Ganesh Mangal Karyalay, Solapur-Dhule Bypass Road, Dharashiv | Developed by Shrinivas Solapure', 'color:#8b6914;');
