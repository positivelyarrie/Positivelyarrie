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
  document.getElementById("hero-kicker").textContent = hero.kicker;
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
  const palette = ["#d62828", "#f77f00", "#fcbf49", "#7cb518", "#3a86ff", "#8338ec"];
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

function setupCustomCursor() {
  if (!window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  const cursor = document.getElementById("paint-cursor");
  const droplets = document.getElementById("paint-droplets");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let lastDropTime = 0;

  document.body.classList.add("has-custom-cursor");

  const animateCursor = () => {
    cursorX += (mouseX - cursorX) * 0.22;
    cursorY += (mouseY - cursorY) * 0.22;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    window.requestAnimationFrame(animateCursor);
  };

  const spawnDroplet = (x, y) => {
    const droplet = document.createElement("span");
    droplet.className = "paint-droplet";
    const size = 4 + Math.random() * 12;
    const driftX = -28 - Math.random() * 36;
    const driftY = -4 + Math.random() * 18;
    const hue = [0, 18, 42, 100, 212, 268][Math.floor(Math.random() * 6)];

    droplet.style.left = `${x}px`;
    droplet.style.top = `${y}px`;
    droplet.style.width = `${size}px`;
    droplet.style.height = `${size}px`;
    droplet.style.setProperty("--drift-x", `${driftX}px`);
    droplet.style.setProperty("--drift-y", `${driftY}px`);
    droplet.style.background = `hsla(${hue}, 88%, 58%, 0.9)`;
    droplets.appendChild(droplet);

    window.setTimeout(() => {
      droplet.remove();
    }, 900);
  };

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    const now = performance.now();
    if (now - lastDropTime > 28) {
      spawnDroplet(event.clientX - 10, event.clientY + 6);
      if (Math.random() > 0.45) {
        spawnDroplet(event.clientX - 22, event.clientY + 10);
      }
      lastDropTime = now;
    }
  });

  window.addEventListener("mousedown", () => {
    cursor.classList.add("is-pressed");
    for (let index = 0; index < 4; index += 1) {
      spawnDroplet(mouseX - 8 + index * 3, mouseY + 8);
    }
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
setupReveal();
setupCustomCursor();
