window.portfolioConfig = {
  siteName: "AIR Studios",
  navigation: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" }
  ],
  theme: {
    background: "#ffffff",
    backgroundAccent: "#f5f5f5",
    surface: "rgba(255, 255, 255, 0.82)",
    text: "#191919",
    muted: "#5f5a52",
    line: "rgba(25, 25, 25, 0.12)",
    accent: "#d62828",
    accentSoft: "#ffe1d6"
  },
  hero: {
    location: "Based in OHIO / Working worldwide",
    kicker: "Creative Developer + Digital Designer",
    title: "Immersive websites with a cinematic point of view.",
    copy:
      "This starter lets you swap out every major piece of content from one file. Update the text, links, project list, and colors in config.js to make the site yours without rewriting the layout.",
    primaryAction: {
      label: "See Projects",
      href: "#work"
    },
    secondaryAction: {
      label: "Email Me",
      href: "mailto:Create@AirStudios.com"
    },
    marquee: [
      "Direction",
      "Motion",
      "WebGL-ready layout",
      "Editorial design",
      "Custom storytelling"
    ]
  },
  about: {
    lead:
      "I design and build portfolio experiences that feel tactile, paced, and unmistakably personal.",
    details: [
      "Use this template if you want a strong visual foundation without locking your content into hard-coded HTML.",
      "Everything on the page is generated from config.js, including navigation, projects, service cards, and contact links.",
      "You can keep it simple as a static site now and later migrate the same content structure into React, Next.js, or another stack."
    ]
  },
  projects: [
    {
      index: "01",
      title: "Pulse Riot",
      category: "Music + entertainment",
      year: "2026",
      summary:
        "A bold launch concept for an entertainment brand with artist promotion, event storytelling, and fan-first digital campaigns.",
      link: "./pulse-riot.html"
    },
    {
      index: "02",
      title: "Saffron Table",
      category: "Restaurant brand",
      year: "2025",
      summary:
        "A modern restaurant concept site with menus, reservations, and a warm hospitality-first visual identity.",
      link: "./saffron-table.html"
    },
    {
      index: "03",
      title: "NovaMed Direct",
      category: "Medical device sales",
      year: "2025",
      summary:
        "A B2B sales concept for medical devices focused on product clarity, trust, and distributor lead generation.",
      link: "./novamed-direct.html"
    }
  ],
  services: [
    {
      title: "Portfolio Design",
      description:
        "Art direction, layout systems, and visual language for personal or studio websites."
    },
    {
      title: "Frontend Development",
      description:
        "Responsive implementation with reusable sections and simple content management."
    },
    {
      title: "Motion Direction",
      description:
        "Intentional transitions, scroll reveals, and atmosphere without overwhelming the content."
    }
  ],
  contact: {
    title: "Let’s build something that feels unmistakably yours.",
    copy:
      "Replace these links with your real channels. You can add or remove items freely in config.js.",
    links: [
      {
        label: "Email",
        value: "Create@AirStudios.com",
        href: "mailto:Create@AirStudios.com"
      },
      {
        label: "Instagram",
        value: "AirStudios.co",
        href: "https://instagram.com/AirStudios.co"
      },
      {
        label: "LinkedIn",
        value: "AirStudios",
        href: "https://linkedin.com/company/airstudios"
      }
    ]
  }
};
