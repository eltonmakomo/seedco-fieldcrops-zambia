// Section-specific banner images for inner-page heroes, so every part of the
// site carries its own visual instead of one shared photo.
import farmersImage from "@/assets/banner-farmers-wide.jpg";
import productsImage from "@/assets/banner-products.jpg";
import aboutImage from "@/assets/banner-about.jpg";
import agronomyImage from "@/assets/banner-agronomy.jpg";
import mediaImage from "@/assets/banner-media.jpg";
import careersImage from "@/assets/banner-careers.jpg";
import contactImage from "@/assets/banner-contact.jpg";

const banners: Array<[RegExp, string]> = [
  [/^(products|sc-products|product_category|maize_subcategory)\b/, productsImage],
  [/^about-us\b/, aboutImage],
  [/^(agronomists|farming-regions|seed-co-agronomy-app|learn-with-seed-co)\b/, agronomyImage],
  [/^(media|news|blog|testimonial|events|video-gallery|promotions)\b/, mediaImage],
  [/^careers\b/, careersImage],
  [/^contact-us\b/, contactImage],
];

export function bannerFor(path: string): string {
  for (const [re, src] of banners) if (re.test(path)) return src;
  return farmersImage;
}
