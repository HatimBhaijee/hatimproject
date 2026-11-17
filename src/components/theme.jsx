/* ==========================================================
   Shared look for the whole site: colours, icons and the
   colour each project uses (same order as the homepage cards).
   ========================================================== */

/* ==========================================================
   Card colours. Every card uses the same style, with its own
   colour, icon and corner shape so each one looks different.
   main = button and icon, dark = 3D edge, soft = light tint,
   text = text colour on the button
   ========================================================== */
export const COLORS = [
  { main: "#3E9C00", dark: "#2F7A00", soft: "#E5F6D6", text: "#FFFFFF" }, // green
  { main: "#0A84C6", dark: "#076699", soft: "#DCF0FA", text: "#FFFFFF" }, // blue
  { main: "#D46A00", dark: "#A85400", soft: "#FDEBD9", text: "#FFFFFF" }, // orange
  { main: "#E02E2E", dark: "#B32020", soft: "#FCE1E1", text: "#FFFFFF" }, // red
  { main: "#FFC800", dark: "#D9A900", soft: "#FFF6CC", text: "#2B2B2B" }, // yellow
  { main: "#00897A", dark: "#006B5F", soft: "#D6F0EC", text: "#FFFFFF" }, // teal
  { main: "#D63D86", dark: "#AD2E6A", soft: "#F9E0EC", text: "#FFFFFF" }, // pink
  { main: "#2B70C9", dark: "#1F559C", soft: "#DFE9F7", text: "#FFFFFF" }, // royal blue
];

export const SHAPES = ["circle", "square", "ring", "diamond"];

// Gives each card its colour as CSS variables
export function colorVars(c) {
  return { "--c": c.main, "--cd": c.dark, "--cs": c.soft, "--ct": c.text };
}

/* ==========================================================
   Icons (simple line drawings, 24 x 24)
   ========================================================== */
const ICONS = {
  "/users": (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
      <path d="M18 14.3c1.8.8 3 2.6 3 4.7" />
    </>
  ),
  "/payments": (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19" />
      <path d="M6.5 15h4" />
    </>
  ),
  "/billing": (
    <>
      <path d="M6 2.5h12v19l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h3" />
    </>
  ),
  "/products": (
    <>
      <path d="M12 2.8l8.5 4.6v9.2L12 21.2l-8.5-4.6V7.4z" />
      <path d="M3.5 7.4L12 12l8.5-4.6" />
      <path d="M12 12v9.2" />
    </>
  ),
  "/chat": (
    <>
      <path d="M4 4.5h16A1.5 1.5 0 0 1 21.5 6v9a1.5 1.5 0 0 1-1.5 1.5h-9.5L6 20v-3.5H4A1.5 1.5 0 0 1 2.5 15V6A1.5 1.5 0 0 1 4 4.5z" />
      <path d="M7.5 9.5h9" />
      <path d="M7.5 12.5h5" />
    </>
  ),
  "/insurance": (
    <>
      <path d="M12 2.8l7.5 3v6c0 4.6-3.2 8.3-7.5 9.4-4.3-1.1-7.5-4.8-7.5-9.4v-6z" />
      <path d="M8.5 12l2.4 2.4 4.6-4.8" />
    </>
  ),
  "/crop": (
    <>
      <path d="M5 20c0-8.5 5.5-14.5 15.5-16-.5 10-6.5 16-15.5 16z" />
      <path d="M5 20l8-8" />
    </>
  ),
  "/country": (
    <>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M2.8 12h18.4" />
      <path d="M12 2.8c2.6 2.5 4 5.8 4 9.2s-1.4 6.7-4 9.2c-2.6-2.5-4-5.8-4-9.2s1.4-6.7 4-9.2z" />
    </>
  ),
  "/cars": (
    <>
      <path d="M3.5 16V12l2-5a2 2 0 0 1 1.9-1.3h9.2a2 2 0 0 1 1.9 1.3l2 5v4z" />
      <path d="M3.5 12h17" />
      <circle cx="7.5" cy="16.5" r="2" />
      <circle cx="16.5" cy="16.5" r="2" />
    </>
  ),
  "/houses": (
    <>
      <path d="M3 11l9-7.5 9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5.5h4V20" />
    </>
  ),
  "/delivery": (
    <>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  "/catsdog": (
    <>
      <circle cx="8.5" cy="6.5" r="1.8" />
      <circle cx="15.5" cy="6.5" r="1.8" />
      <circle cx="4.8" cy="11.2" r="1.6" />
      <circle cx="19.2" cy="11.2" r="1.6" />
      <path d="M12 11c-3 0-6 3.6-6 6.2 0 1.6 1.3 2.6 2.8 2.6 1.2 0 2-.6 3.2-.6s2 .6 3.2.6c1.5 0 2.8-1 2.8-2.6 0-2.6-3-6.2-6-6.2z" />
    </>
  ),
  "/pplcar": (
    <>
      <path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8" />
      <path d="M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8" />
      <path d="M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16" />
      <path d="M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M7.5 17c.8-2 2.5-3 4.5-3s3.7 1 4.5 3" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  back: (
    <>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M3 6.5l9 6.5 9-6.5" />
    </>
  ),
  code: (
    <>
      <path d="M8 7l-5 5 5 5" />
      <path d="M16 7l5 5-5 5" />
    </>
  ),
  up: (
    <>
      <path d="M12 19V5" />
      <path d="M6 11l6-6 6 6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
    </>
  ),
  moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
};

export function Icon({ name, size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name] || ICONS.star}
    </svg>
  );
}

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
    shape: SHAPES[index % SHAPES.length],
  };
}
