/** Links scraped from the live site's sibling sites and downloads stay external. */
export function resolveLiveHref(href: string): string {
  if (href.startsWith("/zm/")) return `https://seedcogroup.com${href}`;
  if (href === "/careers" || href.startsWith("/careers/page/")) return href.replace("/careers", "/about-us/careers");
  return href;
}