import asset0 from "@/assets/image-originals/4277249062.jpg.asset.json";
import asset1 from "@/assets/image-originals/1780308932.jpg.asset.json";
import asset2 from "@/assets/image-originals/1280957966.jpg.asset.json";
import asset3 from "@/assets/image-originals/732797652.jpg.asset.json";
import asset4 from "@/assets/image-originals/1013003608.jpg.asset.json";
import asset5 from "@/assets/image-originals/3776781851.webp.asset.json";
import asset6 from "@/assets/image-originals/1376047569.jpg.asset.json";
import asset7 from "@/assets/image-originals/547795379.webp.asset.json";
import asset8 from "@/assets/image-originals/135728388.webp.asset.json";
import asset9 from "@/assets/image-originals/3864018890.jpg.asset.json";
import asset10 from "@/assets/image-originals/2584311580.jpg.asset.json";
import asset11 from "@/assets/image-originals/741323200.webp.asset.json";
import asset12 from "@/assets/image-originals/3473617063.jpg.asset.json";
import asset13 from "@/assets/image-originals/3244059477.jpeg.asset.json";
import asset14 from "@/assets/image-originals/912309177.webp.asset.json";
import asset15 from "@/assets/image-originals/566831644.webp.asset.json";
import asset16 from "@/assets/image-originals/1269325514.jpg.asset.json";
import asset17 from "@/assets/image-originals/2865142375.jpg.asset.json";
import asset18 from "@/assets/image-originals/915712777.jpeg.asset.json";
import asset19 from "@/assets/image-originals/2836072591.jpg.asset.json";

const sources: Record<string, string> = {
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2023/03/419-blog-783x1024.jpg": asset0.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/06/Untitled-design-1024x768.jpg": asset1.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2024/06/Seedco-Notice-to-Suppliers-1024x1024.jpg": asset2.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/09/PHOTO-2026-09-29-14-14-23_1-1024x464.jpg": asset3.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2021/10/SeedCo_map_Zambia-1024x726.jpg": asset4.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/10/IMG_5985-copy-1-971x1024.webp": asset5.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/06/Untitled-design-2-1024x768.jpg": asset6.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/08/IMG_6296-copy-1024x768.webp": asset7.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/08/IMG_6248-1024x768.webp": asset8.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/09/PHOTO-2026-09-29-14-14-23_2-1024x476.jpg": asset9.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/09/PHOTO-2026-09-29-14-14-23-1024x518.jpg": asset10.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/10/IMG_5957-1024x683.webp": asset11.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/06/Untitled-design-3-1024x768.jpg": asset12.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/02/PXL_20260216_131940872.NIGHT_.jpg-768x1024.jpeg": asset13.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/10/IMG_5962-1024x683.webp": asset14.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/08/IMG_6324-copy-e1786519980202-1024x768.webp": asset15.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/06/Untitled-design-6-1024x768.jpg": asset16.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/06/Untitled-design-4-1024x768.jpg": asset17.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/09/a3297b8d-51d8-40b0-a101-91f820856900-1024x510.jpeg": asset18.url,
  "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/07/06_Strategic-Planting-Guide-1024x724.jpg": asset19.url,
};

export const originalImage = (src: string) => sources[src] ?? src;
