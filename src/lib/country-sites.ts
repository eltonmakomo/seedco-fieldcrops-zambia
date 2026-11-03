/** Official destinations listed by the Zambia Field Crops site. */
export const countrySites = [
  { name: "Seed Co Group", href: "https://seedcogroup.com/", group: true },
  { name: "Botswana", href: "https://seedcogroup.com/bw/", flag: "bw" },
  { name: "Kenya", href: "https://seedcogroup.com/ke/", flag: "ke" },
  { name: "Malawi", href: "https://seedcogroup.com/mw/", flag: "mw" },
  { name: "Nigeria", href: "https://seedcogroup.com/ng", flag: "ng" },
  { name: "Tanzania", href: "https://seedcogroup.com/tz", flag: "tz" },
  { name: "Zambia", href: "/", flag: "zm", current: true },
  { name: "Zimbabwe", href: "https://seedcogroup.com/zw/", flag: "zw" },
] as const;
