/* ==========================================================
   Shared look for the whole site: colours, icons, and the
   colour and "How it works" text for each project page.
   ========================================================== */

/* ==========================================================
   Project colours: deep, muted tones (one per card).
   main = icons, banners and buttons in light mode
   lite = the same colour lightened, used in dark mode
   ========================================================== */
export const COLORS = [
  { main: "#2F4A3A", lite: "#8FB59C" }, // moss
  { main: "#23414F", lite: "#86A9BA" }, // petrol
  { main: "#5A2A2E", lite: "#C98F94" }, // oxblood
  { main: "#5E4A2C", lite: "#C7AE84" }, // bronze
  { main: "#2E3748", lite: "#9AA6BC" }, // slate
  { main: "#1F4744", lite: "#84B7B1" }, // deep teal
  { main: "#24304A", lite: "#9DAACC" }, // ink blue
  { main: "#464A2A", lite: "#B4B98A" }, // olive
];

// Gives an element its colour as CSS variables
export function colorVars(c) {
  return {
    "--c": c.main,
    "--cd": `color-mix(in srgb, ${c.main} 75%, #000000)`,
    "--cs": `color-mix(in srgb, ${c.main} 7%, #ffffff)`,
    "--ct": "#ffffff",
    "--cl": c.lite,
  };
}

/* ==========================================================
   Icons: thin line icons (24 x 24), based on the Lucide set
   ========================================================== */
const ICONS = {
  "/users": (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  "/payments": (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </>
  ),
  "/billing": (
    <>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 17.5v-11" />
    </>
  ),
  "/products": (
    <>
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </>
  ),
  "/chat": (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  ),
  "/insurance": (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  "/crop": (
    <>
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
    </>
  ),
  "/country": (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </>
  ),
  "/cars": (
    <>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </>
  ),
  "/houses": (
    <>
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </>
  ),
  "/delivery": (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  "/catsdog": (
    <>
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
    </>
  ),
  "/pplcar": (
    <>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M7.5 17c.8-2 2.5-3 4.5-3s3.7 1 4.5 3" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  back: (
    <>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </>
  ),
  up: (
    <>
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </>
  ),
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  dot: <circle cx="12" cy="12" r="3" />,
};

export function Icon({ name, size = 24, stroke = 1.6 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name] || ICONS.dot}
    </svg>
  );
}

/* ==========================================================
   "How it works" panel on each project page.
   steps = three short lines, built = what it runs on
   ========================================================== */
export const PROJECT_INFO = {
  "/users": {
    steps: [
      "You enter a name, email and phone number.",
      "React sends it to my Node.js server.",
      "It is saved in MySQL and listed back on this page.",
    ],
    built: ["React", "Node.js", "Express", "MySQL"],
  },
  "/payments": {
    steps: [
      "You choose a payment method and an amount.",
      "My Node.js server saves it in MySQL.",
      "Every record can be listed, edited or deleted.",
    ],
    built: ["React", "Node.js", "Express", "MySQL"],
  },
  "/billing": {
    steps: [
      "You enter the customer details and the amount.",
      "The bill is saved as pending and sent to a payment gateway.",
      "The gateway's answer marks it completed or failed. Pending bills can be retried.",
    ],
    built: ["Node.js", "MySQL", "Payment gateway API"],
  },
  "/products": {
    steps: [
      "You click Load Products.",
      "The page fetches products from a public API (DummyJSON).",
      "Pick any product to see its full details.",
    ],
    built: ["React", "Axios", "REST API"],
  },
  "/chat": {
    steps: [
      "You type a message.",
      "The server looks for keywords like hello, payment or help and picks a reply.",
      "Every message and reply is saved in MySQL as history.",
    ],
    built: ["Node.js", "Express", "MySQL"],
  },
  "/insurance": {
    steps: [
      "You enter age, sex, BMI, children, smoker and region.",
      "Node.js checks the values and sends them to my Python server.",
      "A linear regression model estimates the yearly cost.",
    ],
    built: ["Python", "FastAPI", "scikit-learn"],
  },
  "/crop": {
    steps: [
      "You enter rainfall, temperature, soil pH, weather and suitability.",
      "The numbers are scaled the same way as during training.",
      "A logistic regression model ranks 16 crops and shows the top 3.",
    ],
    built: ["Python", "FastAPI", "scikit-learn"],
  },
  "/country": {
    steps: [
      "You pick a crop and enter its growing conditions.",
      "The numbers are scaled the same way as during training.",
      "A logistic regression model ranks the countries and shows the top 5.",
    ],
    built: ["Python", "FastAPI", "scikit-learn"],
  },
  "/cars": {
    steps: [
      "You pick the make and model, then the age, mileage and condition.",
      "The details become the same columns the model was trained on.",
      "The model predicts the price, shown in TZS.",
    ],
    built: ["Python", "FastAPI", "scikit-learn"],
  },
  "/houses": {
    steps: [
      "You pick the city and area, then the size, bedrooms and age.",
      "The details become the same columns the model was trained on.",
      "The model predicts the price, shown in TZS.",
    ],
    built: ["Python", "FastAPI", "scikit-learn"],
  },
  "/delivery": {
    steps: [
      "You enter the distance, traffic, weather, vehicle and courier details.",
      "The details become the same columns the model was trained on.",
      "The model predicts the delivery time in minutes.",
    ],
    built: ["Python", "FastAPI", "scikit-learn"],
  },
  "/catsdog": {
    steps: [
      "You upload or take a photo.",
      "It is shrunk on your device, then resized to 128 × 128 pixels.",
      "A neural network trained on 24,998 photos gives the chance of cat or dog.",
    ],
    built: ["TensorFlow", "Keras", "FastAPI"],
  },
  "/pplcar": {
    steps: [
      "You upload or take a photo.",
      "It is shrunk on your device, then resized to 224 × 224 pixels.",
      "A neural network gives the chance of person, car or unknown.",
    ],
    built: ["TensorFlow", "Keras", "FastAPI"],
  },
};

/* Finds a project's details, colour and group from its page address */
export function findProject(path, management = [], ai = []) {
  const all = [
    ...management.map((p) => ({ ...p, group: "Management system" })),
    ...ai.map((p) => ({ ...p, group: "AI model" })),
  ];
  const index = all.findIndex((p) => p.path === path);
  if (index === -1) return null;
  return {
    ...all[index],
    index,
    color: COLORS[index % COLORS.length],
    info: PROJECT_INFO[path],
  };
}
