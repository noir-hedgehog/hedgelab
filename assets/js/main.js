/* =============================================
   黑棘实验室 — Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollEffects();
  initPageAnimations();
  initMobileNav();
  initLowPolyEffects();
  initCardTerminalChrome();
  initAboutCliTyping();
});

/* =============================================
   Navigation
   ============================================= */

function initNav() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // Add scrolled class on scroll
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');

  if (!toggle || !links) return;

  const closeNav = () => {
    links.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  const openNav = () => {
    links.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  toggle.addEventListener('click', () => {
    if (links.classList.contains('active')) {
      closeNav();
    } else {
      openNav();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeNav);
  }

  // Close on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('active')) {
      closeNav();
    }
  });
}

/* =============================================
   Scroll effects
   ============================================= */

function initScrollEffects() {
  const sections = Array.from(document.querySelectorAll('.main-content .section'));
  if (!sections.length) return;

  document.body.classList.add('screen-fx');
  let lastActiveSection = null;

  const triggerTerminalTyping = (section) => {
    if (!section) return;
    section.classList.remove('section-typing');

    const lines = section.querySelectorAll('.container > *');
    lines.forEach((line, idx) => {
      line.style.setProperty('--line-delay', `${120 + idx * 90}ms`);
    });

    // Restart CSS animation reliably.
    window.requestAnimationFrame(() => {
      section.classList.add('section-typing');
      window.setTimeout(() => {
        section.classList.remove('section-typing');
      }, 1400);
    });
  };

  const pickActiveSection = () => {
    const viewportCenter = window.innerHeight * 0.5;
    let closest = null;
    let minDistance = Number.POSITIVE_INFINITY;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height * 0.5;
      const distance = Math.abs(sectionCenter - viewportCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closest = section;
      }
    });

    sections.forEach((section) => {
      const isActive = section === closest;
      section.classList.toggle('section-active', isActive);
    });

    if (closest && closest !== lastActiveSection) {
      triggerTerminalTyping(closest);
      lastActiveSection = closest;
    }
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      pickActiveSection();
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  pickActiveSection();
}

/* =============================================
   Page animations
   ============================================= */

function initPageAnimations() {
  // Add page-enter class to main content
  const main = document.querySelector('.main-content');
  if (main) {
    main.classList.add('page-enter');
  }
}

/* =============================================
   Lowpoly motion effects
   ============================================= */

function initLowPolyEffects() {
  const canvas = document.getElementById('lowpolyCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const spacing = 74;
  const points = [];
  const pointer = { x: 0, y: 0, inside: false };
  let width = 0;
  let height = 0;
  let tick = 0;

  const gridColor = [166, 196, 82];

  const resizeCanvas = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    points.length = 0;
    const cols = Math.ceil(width / spacing) + 2;
    const rows = Math.ceil(height / spacing) + 2;
    for (let y = -1; y < rows; y += 1) {
      for (let x = -1; x < cols; x += 1) {
        const px = x * spacing + ((y % 2) * spacing * 0.45);
        const py = y * spacing;
        points.push({
          baseX: px,
          baseY: py,
          phase: Math.random() * Math.PI * 2,
          speed: 0.35 + Math.random() * 0.45,
          amp: 6 + Math.random() * 10
        });
      }
    }
  };

  const getGravityOffset = (x, y) => {
    if (!pointer.inside) return { gx: 0, gy: 0, force: 0 };
    const dx = pointer.x - x;
    const dy = pointer.y - y;
    const dist = Math.hypot(dx, dy) || 1;
    const radius = 300;
    if (dist > radius) return { gx: 0, gy: 0, force: 0 };
    const normalized = 1 - dist / radius;
    const force = normalized * normalized;
    const pull = 14 * force;
    return {
      gx: (dx / dist) * pull,
      gy: (dy / dist) * pull,
      force
    };
  };

  const drawFrame = () => {
    tick += 0.014;
    ctx.clearRect(0, 0, width, height);

    const displaced = points.map((p, idx) => {
      const nx = p.baseX + Math.cos(tick * p.speed + p.phase) * p.amp;
      const ny = p.baseY + Math.sin(tick * (p.speed + 0.2) + p.phase) * p.amp;
      const gravity = getGravityOffset(nx, ny);
      return {
        x: nx + gravity.gx,
        y: ny + gravity.gy,
        grav: gravity.force,
        idx
      };
    });

    const cols = Math.ceil(width / spacing) + 2;
    const rows = Math.ceil(height / spacing) + 2;
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const p = displaced[y * cols + x];
        if (!p) continue;
        const right = displaced[y * cols + x + 1];
        const down = displaced[(y + 1) * cols + x];
        const downRight = displaced[(y + 1) * cols + x + 1];

        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distToPointer = Math.hypot(dx, dy);
        const visibilityRadius = 280;
        const localVisibility = pointer.inside
          ? Math.max(0, 1 - distToPointer / visibilityRadius)
          : 0;
        const alpha = (0.06 + p.grav * 0.24) * Math.pow(localVisibility, 1.2);
        if (alpha <= 0.006) continue;

        const radius = 0.72 + localVisibility * 1.35 + p.grav * 1.05;
        const lineAlpha = (0.012 + p.grav * 0.05) * Math.pow(localVisibility, 1.25);
        if (lineAlpha > 0.003) {
          ctx.strokeStyle = `rgba(${gridColor[0]}, ${gridColor[1]}, ${gridColor[2]}, ${lineAlpha.toFixed(3)})`;
          ctx.lineWidth = 0.45;
          if (right) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(right.x, right.y);
            ctx.stroke();
          }
          if (down) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(down.x, down.y);
            ctx.stroke();
          }
          if ((x + y) % 2 === 0 && downRight) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(downRight.x, downRight.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `rgba(${gridColor[0]}, ${gridColor[1]}, ${gridColor[2]}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (!prefersReducedMotion) {
      window.requestAnimationFrame(drawFrame);
    }
  };

  window.addEventListener('pointermove', (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.inside = true;
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    pointer.inside = false;
  });

  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas();

  if (prefersReducedMotion) {
    drawFrame();
  } else {
    window.requestAnimationFrame(drawFrame);
  }
}

function initCardTerminalChrome() {
  const cards = Array.from(document.querySelectorAll('.card'));
  if (!cards.length) return;

  const toSlug = (value) => {
    const slug = value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\p{L}\p{N}\-_]+/gu, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return slug || 'untitled';
  };

  const blogSlugFromCard = (card) => {
    const onclick = card.getAttribute('onclick') || '';
    const match = onclick.match(/'([^']+)'/);
    if (!match) return null;
    const path = match[1];
    const parts = path.split('/').filter(Boolean);
    return parts.length ? parts[parts.length - 1] : null;
  };

  cards.forEach((card, index) => {
    if (card.querySelector('.card-statusbar')) return;

    const path = document.createElement('div');
    const statusBar = document.createElement('div');
    statusBar.className = 'card-statusbar';
    path.className = 'card-statusbar-path';

    const title = card.querySelector('h3')?.textContent || `card-${index + 1}`;
    if (card.classList.contains('post-card')) {
      const slug = blogSlugFromCard(card) || toSlug(title);
      path.textContent = `~/hedgelab/memory/${slug}`;
    } else {
      path.textContent = `~/hedgelab/session/${toSlug(title)}`;
    }

    const sourceTag = card.querySelector('.card-meta .tag');
    if (sourceTag) {
      const statusTag = sourceTag.cloneNode(true);
      statusTag.classList.add('status-tag');
      statusBar.appendChild(path);
      statusBar.appendChild(statusTag);
      sourceTag.remove();
    } else {
      statusBar.appendChild(path);
    }

    card.prepend(statusBar);
  });
}

function initAboutCliTyping() {
  const cli = document.querySelector('#about .about-cli');
  if (!cli) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const lines = Array.from(cli.querySelectorAll('.about-cli-line'));
  if (!lines.length) return;

  const startTyping = () => {
    const targets = lines.map((line) => {
      const textEl = line.querySelector('.about-cli-text');
      const text = textEl ? textEl.textContent || '' : '';
      if (textEl) textEl.textContent = '';
      return { textEl, text };
    });

    let lineDelay = 0;
    targets.forEach(({ textEl, text }) => {
      if (!textEl || !text) {
        lineDelay += 120;
        return;
      }

      window.setTimeout(() => {
        let index = 0;
        const timer = window.setInterval(() => {
          index += 1;
          textEl.textContent = text.slice(0, index);
          if (index >= text.length) window.clearInterval(timer);
        }, 16);
      }, lineDelay);

      lineDelay += Math.min(700, text.length * 18) + 120;
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (cli.dataset.typed === '1') return;
      cli.dataset.typed = '1';
      startTyping();
    });
  }, { threshold: 0.35 });

  observer.observe(cli);
}

/* =============================================
   Post card click handler
   ============================================= */

// For blog listing pages - make cards clickable
document.querySelectorAll('.post-card').forEach(card => {
  const link = card.querySelector('a');
  if (link) {
    card.addEventListener('click', (e) => {
      if (e.target.tagName !== 'A') {
        link.click();
      }
    });
    card.style.cursor = 'pointer';
  }
});
