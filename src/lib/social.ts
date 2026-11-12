// The one place for contact details and social profiles. Verified by Ashok Reddy Kundurru; do not add accounts here without confirming them.
export const email = "kundurruashokreddy67@gmail.com";

export type SocialKey = "linkedin" | "github" | "instagram" | "facebook" | "youtube" | "x";
export type Social = { key: SocialKey; label: string; handle: string; href: string; primary: boolean };

export const socials: Social[] = [
  { key: "linkedin", label: "LinkedIn", handle: "Ashok Reddy Kundurru", href: "https://www.linkedin.com/in/kundurru-ashok-reddy-8b6b463a3/", primary: true },
  { key: "github", label: "GitHub", handle: "ashokreddy67w", href: "https://github.com/ashokreddy67w", primary: true },
  { key: "instagram", label: "Instagram", handle: "ashokreddy__67", href: "https://www.instagram.com/ashokreddy__67/", primary: false },
  { key: "facebook", label: "Facebook", handle: "Ashok Reddy Kundurru", href: "https://www.facebook.com/ashokreddy.kunduru.50", primary: false },
  { key: "youtube", label: "YouTube", handle: "@Ashokreddy-m6g7p", href: "https://www.youtube.com/@Ashokreddy-m6g7p", primary: false },
  { key: "x", label: "X", handle: "AshokRe90258906", href: "https://x.com/AshokRe90258906", primary: false },
];
