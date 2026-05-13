const config = window.portfolioConfig;

if (!config) {
  throw new Error("Missing portfolio configuration.");
}

const root = document.documentElement;

function applyTheme(theme) {
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

function renderNavigation(items) {
  const nav = document.getElementById("nav-links");
  nav.innerHTML = items
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");
}

function renderHero(hero) {
  document.title = config.siteName;
  document.getElementById("brand-link").textContent = config.siteName;
  document.getElementById("hero-location").textContent = hero.location;
  document.getElementById("hero-kicker").innerHTML = hero.kicker
    .replace("brand", "<em>brand</em>")
    .replace("mark", "<em>mark</em>");
  document.getElementById("hero-title").textContent = hero.title;
  document.getElementById("hero-copy").textContent = hero.copy;

  const actions = document.getElementById("hero-actions");
  actions.innerHTML = `
    <a class="button button-primary" href="${hero.primaryAction.href}">${hero.primaryAction.label}</a>
    <a class="button button-secondary" href="${hero.secondaryAction.href}">${hero.secondaryAction.label}</a>
  `;

  const marqueeItems = [...hero.marquee, ...hero.marquee];
  document.getElementById("marquee-track").innerHTML = marqueeItems
    .map((item) => `<span>${item}</span>`)
    .join("");
}

function renderFallingOrbs() {
  const palette = [
    "rgba(255, 255, 255, 0.16)",
    "rgba(215, 219, 247, 0.18)",
    "rgba(198, 204, 214, 0.14)",
    "rgba(255, 255, 255, 0.1)"
  ];
  const orbCount = 24;
  const container = document.getElementById("falling-orbs");

  const pseudoRandom = (seed) => {
    const value = Math.sin(seed * 9999) * 10000;
    return value - Math.floor(value);
  };

  container.innerHTML = Array.from({ length: orbCount }, (_, index) => {
    const size = 28 + Math.round(pseudoRandom(index + 1) * 72);
    const left = Math.round(pseudoRandom(index + 11) * 100);
    const duration = 11 + Math.round(pseudoRandom(index + 21) * 14);
    const delay = -1 * Math.round(pseudoRandom(index + 31) * 18);
    const drift = Math.round(-90 + pseudoRandom(index + 41) * 180);
    const startY = -5 - Math.round(pseudoRandom(index + 51) * 35);
    const opacity = 0.45 + pseudoRandom(index + 61) * 0.4;
    const color = palette[index % palette.length];
    const interactiveClass = index % 4 === 0 ? "orb orb-interactive" : "orb";

    return `
      <span
        class="${interactiveClass}"
        style="
          --orb-size:${size}px;
          --orb-left:${left}%;
          --orb-duration:${duration}s;
          --orb-delay:${delay}s;
          --orb-color:${color};
          --orb-drift:${drift}px;
          --orb-start-y:${startY}vh;
          --orb-opacity:${opacity};
        "
      ></span>
    `;
  }).join("");
}

function renderAbout(about) {
  document.getElementById("about-lead").textContent = about.lead;
  document.getElementById("about-details").innerHTML = about.details
    .map((detail) => `<p>${detail}</p>`)
    .join("");
}

function renderProjects(projects) {
  document.getElementById("projects").innerHTML = projects
    .map(
      (project) => `
        <article class="project-card">
          <div class="project-meta">
            <span>${project.index}</span>
            <span>${project.category}</span>
            <span>${project.year}</span>
          </div>
          <div class="project-main">
            <h3>${project.title}</h3>
            <p>${project.summary}</p>
          </div>
          <a class="project-link" href="${project.link}">Open</a>
        </article>
      `
    )
    .join("");
}

function renderServices(services) {
  document.getElementById("services-list").innerHTML = services
    .map(
      (service) => `
        <article class="card">
          <h3>${service.title}</h3>
          <p>${service.description}</p>
        </article>
      `
    )
    .join("");
}

function renderContact(contact) {
  document.getElementById("contact-title").textContent = contact.title;
  document.getElementById("contact-copy").textContent = contact.copy;
  document.getElementById("contact-links").innerHTML = contact.links
    .map(
      (link) => `
        <a class="contact-link" href="${link.href}">
          <span>${link.label}</span>
          <strong>${link.value}</strong>
        </a>
      `
    )
    .join("");
}

function applyRainbowPanels() {
  const palette = [
    "rgba(255, 59, 48, 0.12)",
    "rgba(255, 149, 0, 0.12)",
    "rgba(255, 214, 10, 0.12)",
    "rgba(50, 215, 75, 0.12)",
    "rgba(10, 132, 255, 0.12)",
    "rgba(94, 92, 230, 0.12)",
    "rgba(191, 90, 242, 0.12)"
  ];

  const panels = [...document.querySelectorAll(".project-card, .card, .contact-link")];
  panels.forEach((panel, index) => {
    panel.style.setProperty("--panel-tint", palette[index % palette.length]);
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function setupScrollEffects() {
  const progressBar = document.getElementById("scroll-progress-bar");
  const heroTitle = document.getElementById("hero-title");
  const heroCopyWrap = document.querySelector(".hero-copy-wrap");
  const heroMarquee = document.querySelector(".hero-marquee");
  const cards = [...document.querySelectorAll(".project-card, .card, .contact-link")];

  let ticking = false;

  const updateScrollEffects = () => {
    const scrollTop = window.scrollY;
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(scrollTop / maxScroll, 1);
    const heroShift = Math.min(scrollTop * 0.08, 36);

    progressBar.style.width = `${progress * 100}%`;

    if (heroTitle) {
      heroTitle.style.transform = `translate3d(0, ${heroShift * -0.32}px, 0)`;
    }

    if (heroCopyWrap) {
      heroCopyWrap.style.transform = `translate3d(0, ${heroShift * 0.18}px, 0)`;
    }

    if (heroMarquee) {
      heroMarquee.style.transform = `translate3d(0, ${heroShift * 0.12}px, 0)`;
    }

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.55;
      const distance = rect.top + rect.height / 2 - viewportCenter;
      const offset = Math.max(Math.min(distance * -0.02, 16), -16);
      const rotate = ((index % 2 === 0 ? 1 : -1) * offset) / 24;
      card.style.transform = `translate3d(0, ${offset}px, 0) rotate(${rotate}deg)`;
    });

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  };

  updateScrollEffects();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}

function setupCustomCursor() {
  if (!window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  const cursor = document.getElementById("paint-cursor");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  document.body.classList.add("has-custom-cursor");

  const animateCursor = () => {
    cursorX += (mouseX - cursorX) * 0.22;
    cursorY += (mouseY - cursorY) * 0.22;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    window.requestAnimationFrame(animateCursor);
  };

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  window.addEventListener("mousedown", () => {
    cursor.classList.add("is-pressed");
  });

  window.addEventListener("mouseup", () => {
    cursor.classList.remove("is-pressed");
  });

  animateCursor();
}

applyTheme(config.theme);
renderNavigation(config.navigation);
renderHero(config.hero);
renderFallingOrbs();
renderAbout(config.about);
renderProjects(config.projects);
renderServices(config.services);
renderContact(config.contact);
applyRainbowPanels();
setupReveal();
setupScrollEffects();
setupCustomCursor();
