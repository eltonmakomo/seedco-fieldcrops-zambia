export type NavChild = { label: string; href: string };
export type NavGroup = { label: string; children: NavChild[] };

export const navGroups: NavGroup[] = [
  { label: "About Us", children: [
    { label: "Overview", href: "/about-us/overview" }, { label: "Our Story", href: "/about-us/our-story" },
    { label: "Board of Directors", href: "/about-us/board-of-directors" }, { label: "Management Team", href: "/about-us/management-team" },
    { label: "Research Team", href: "/about-us/research-team" }, { label: "Sales Team", href: "/about-us/sales-team" },
    { label: "Agronomists", href: "/agronomists" }, { label: "Corporate Social Responsibility", href: "/about-us/corporate-social-responsibility" },
    { label: "Careers", href: "/about-us/careers" },
  ]},
  { label: "Products", children: [
    { label: "All Products", href: "/products" }, { label: "White Maize", href: "/product_category/maize" },
    { label: "Yellow Maize", href: "/product_category/yellow-maize" }, { label: "Soya beans", href: "/product_category/soyabeans" },
    { label: "Wheat", href: "/product_category/wheat" }, { label: "Sugar beans", href: "/product_category/sugar-beans" },
    { label: "Rice", href: "/product_category/rice" },
  ]},
  { label: "Innovations", children: [
    { label: "Service Innovations", href: "/service-innovations" }, { label: "Product Innovations", href: "/product-innovations" },
    { label: "Seed Co Agronomy App", href: "/seed-co-agronomy-app" },
  ]},
  { label: "Farmers' Hub", children: [
    { label: "Maize Farming Regions", href: "/farming-regions" }, { label: "Maize", href: "/maize-2" },
    { label: "Wheat", href: "/farming-regions/wheat" }, { label: "Soya", href: "/farming-regions/soya" },
    { label: "Calculators", href: "/calculators" }, { label: "Learn With Seed Co", href: "/learn-with-seed-co" },
  ]},
  { label: "Media", children: [
    { label: "News", href: "/news" }, { label: "Events Calendar", href: "/media/events-calendar" },
    { label: "Blog", href: "/blog" }, { label: "FAQs", href: "/media/faqs" },
    { label: "Testimonials", href: "/testimonial" }, { label: "Photo Gallery", href: "/media/photo-gallery" },
    { label: "Video Gallery", href: "/media/video-gallery" }, { label: "Promotions", href: "/promotions" },
  ]},
];

export const crops = [
  { name: "White Maize", slug: "maize", note: "High-yielding hybrids for every Zambian ecological region." },
  { name: "Yellow Maize", slug: "yellow-maize", note: "Sweet green mealies and dependable livestock feed." },
  { name: "Soya beans", slug: "soyabeans", note: "Stable varieties yielding between 3 and 6 tonnes per hectare." },
  { name: "Wheat", slug: "wheat", note: "Strong milling quality for irrigated production." },
  { name: "Sugar beans", slug: "sugar-beans", note: "Market-preferred grain with reliable field performance." },
  { name: "Rice", slug: "rice", note: "Adapted varieties for productive local rice systems." },
];

export const productsByCrop: Record<string, string[]> = {
  maize: ["SC 513", "SC 555", "SC 627", "SC 647", "SC 719"],
  "yellow-maize": ["SC 506", "SC 602", "SC 608"],
  soyabeans: ["SC Sepa", "SC Spike", "SC Safari", "SC Samba", "SC Semeki", "SC Squire"],
  wheat: ["SC Shungu", "SC Select", "SC Sicho", "SC Shine", "SC Nduna"],
  "sugar-beans": ["SC Bounty"], rice: ["SC OP 06", "SC OP 02"],
};

export const faqs = [
  ["Where is Seed Co found and how can we access Seed Co seed?", "Our head office is 23km from Lusaka City Centre on Mumbwa Road. Seed Co serves customers through depots in Lusaka, Choma, Chipata, Mkushi, Kasama, Kitwe and Mpika, plus sales agents in Western, North Western and Luapula."],
  ["Does Seed Co sell yellow maize?", "Yes. SC 506 has a potential of 6 metric tonnes per hectare, SC 602 up to 13 tonnes, and SC 608 up to 14 tonnes. These varieties produce sweet green mealies and are suitable for livestock feed."],
  ["How can we attain the recommended yield potentials?", "Choose the right variety and maturity series for your production area, plant at the right time, apply the right fertiliser at the right time, and keep the crop weed-free and healthy."],
  ["How is soya bean grown from planting to harvesting?", "Choose a stable Seed Co variety for your area, prepare land for good seed-to-soil contact and plant into moist soil when rains have stabilised, generally from mid-November to mid-December."],
  ["Is it safe to use herbicides on Seed Co varieties?", "Commercial farmers use herbicides on Seed Co soybean varieties successfully. Always follow the product label and local agronomic guidance."],
  ["How can I become a Seed Co agent?", "You need a seed seller’s licence, trading licence, ZRA tax clearance, a bank recommendation, suitable ventilated storage and a signed Seed Co stockist contract."],
  ["How much fertiliser do I need?", "Requirements depend on target yield and soil fertility. A basic guide is 200kg basal D Compound plus 200kg urea per hectare, adjusted with professional soil advice."],
];

export type PageContent = { eyebrow: string; title: string; intro: string; sections: { title: string; body: string }[]; kind?: "products"|"faq"|"contact"|"team"|"media"|"calculator" };

const standard = (eyebrow: string, title: string, intro: string, sections: PageContent["sections"], kind?: PageContent["kind"]): PageContent =>
  kind ? { eyebrow, title, intro, sections, kind } : { eyebrow, title, intro, sections };

export const pages: Record<string, PageContent> = {
  "about-us/overview": standard("About Seed Co Zambia", "The heart of agriculture", "Seed Co develops and markets certified crop seed, bred in Africa for African climatic and geographic conditions.", [
    { title: "Our purpose", body: "With 86 years of plant-breeding experience across the Seed Co Group, we give farmers access to high-yielding maize, wheat, soya bean, sorghum, sugar bean, groundnut and vegetable seed." },
    { title: "Research in Zambia", body: "Our research stations at Mpongwe and Lusaka West develop, test and select varieties for the conditions Zambian farmers know." },
    { title: "Our values", body: "Customer centricity, people our pride, teamwork and partnerships, accountability, quality focus, integrity and innovation guide the way we work." },
  ]),
  "about-us/our-story": standard("Our story", "Rooted in Africa. Growing with Zambia.", "Seed Co’s journey is one of African seed science, farmer partnership and an expanding continental footprint.", [
    { title: "Built through research", body: "From early hybrid breeding to today’s climate-smart varieties, market-oriented research has remained at the centre of our work." },
    { title: "A Pan-African seed company", body: "Our footprint spans Southern, East, West and Central Africa, sharing locally tested genetics and agronomic knowledge across borders." },
  ]),
  "about-us/board-of-directors": standard("Leadership", "Board of Directors", "The board provides stewardship, governance and long-term direction for Seed Co Zambia.", [
    { title: "Chance Kabaghe", body: "Chairman" }, { title: "Fred Banda", body: "Non-Executive Director" }, { title: "Paul Francis", body: "Non-Executive Director" }, { title: "Morgan Nzwere", body: "Non-Executive Director" }, { title: "Grace Bwanali", body: "Managing Director" }, { title: "Tichaona Ravasingadi", body: "Finance Director" },
  ], "team"),
  "about-us/management-team": standard("Leadership", "Management Team", "Our management team combines seed expertise, operational excellence and deep local market knowledge.", [
    { title: "Grace Bwanali", body: "Managing Director" }, { title: "Tichaona Ravasingadi", body: "Finance Director" }, { title: "Mukumbi Kyalusanza", body: "Commercial Director" }, { title: "Kirth Hanzala", body: "Operations Manager" }, { title: "Nyambe Mubita", body: "Human Resources Manager" },
  ], "team"),
  "about-us/research-team": standard("Our people", "Research Team", "Plant breeders and researchers developing the next generation of high-performing African seed.", [{ title: "Kelvin Simpasa", body: "Head of Research Station" }, { title: "Mwila Chibanda", body: "Research Associate" }], "team"),
  "about-us/sales-team": standard("Our people", "Sales Team", "Local market specialists connecting farmers, agents and agro-dealers with the right Seed Co varieties.", [{ title: "Fred Kusaloka", body: "Sales team" }, { title: "Jasper Simanego", body: "Sales team" }, { title: "Grace Kalungu", body: "Sales team" }, { title: "Katowando Chawinga", body: "Sales team" }, { title: "Matthews Kandela", body: "Sales team" }], "team"),
  agronomists: standard("Our people", "Agronomists", "Practical technical support for variety choice, planting, crop nutrition, protection and harvest.", [{ title: "Advice for your field", body: "Our agronomists translate research into practical, location-specific decisions that help each seed reach its potential." }, { title: "Support through the season", body: "Connect with the Zambia team for guidance tailored to your crop, production region and target yield." }], "team"),
  "about-us/corporate-social-responsibility": standard("Our responsibility", "Growing stronger communities", "Seed Co Zambia supports initiatives that improve livelihoods, build skills and care for the environments where farmers grow.", [{ title: "Greening Zambia", body: "Supporting environmental stewardship and practical action with communities." }, { title: "Inspiring the next generation", body: "Creating opportunities for young people to learn about agriculture, science and enterprise." }], "media"),
  "about-us/careers": standard("Careers", "Grow with Seed Co", "Join a team advancing African seed science and farmer success.", [{ title: "Working at Seed Co", body: "We value accountable, collaborative people who are passionate about agriculture, quality and innovation." }, { title: "Current opportunities", body: "Vacancies are published here with role details and closing dates. Please check back for the latest openings." }], "media"),
  products: standard("The home of bumper harvests", "Find the right seed", "Explore certified Seed Co field crop varieties bred and selected for Zambia’s diverse growing regions.", [], "products"),
  "product_category/maize": standard("White Maize", "Maize for every season", "Choose from ultra-early, very-early, early, medium and late-maturing hybrids suited to local rainfall and production goals.", [], "products"),
  "product_category/yellow-maize": standard("Yellow Maize", "Sweet, productive and versatile", "Yellow maize for green mealies, grain and livestock feed, with yield potential matched to your management system.", [], "products"),
  "product_category/soyabeans": standard("Soya beans", "Stable across environments", "High-performing soybean varieties for rotation, food and feed markets.", [], "products"),
  "product_category/wheat": standard("Wheat", "Quality from field to mill", "Seed Co wheat varieties combine productive agronomics with strong grain and milling characteristics.", [], "products"),
  "product_category/sugar-beans": standard("Sugar beans", "Market-preferred performance", "Reliable sugar bean genetics for quality grain and productive farming systems.", [], "products"),
  "product_category/rice": standard("Rice", "Seed for productive rice systems", "Adapted Seed Co rice varieties for local growing conditions.", [], "products"),
  "product-innovations": standard("Product innovations", "Climate-smart varieties", "Intensive research and development keeps Seed Co varieties productive as growing conditions change.", [{ title: "Climate smart varieties", body: "Our northern research station, established in 2004, strengthens selection for varied rainfall, disease pressure and farmer needs." }, { title: "Disease tolerance", body: "Breeding work targets key constraints including maize cob rot and grey leaf spot. SC 647, released in 2013, helped establish a stronger generation of resilient hybrids." }]),
  "service-innovations": standard("Service innovations", "Better support, closer to the farmer", "Digital tools and new routes to market make trusted seed and agronomy advice easier to access.", [{ title: "Seed Co Agronomy App", body: "Seedney puts practical agronomy tools and product information into farmers’ hands." }, { title: "Online shop", body: "The Seed Co online shop extends convenient access to genuine seed across Eastern, Southern and Central provinces." }]),
  "seed-co-agronomy-app": standard("Seedney", "Agronomy in your pocket", "Download the Seed Co Agronomy App for field tools, product information and practical support.", [{ title: "Tools for better decisions", body: "Use simple crop and field tools to support planning and management throughout the season." }, { title: "Explore products", body: "Browse Seed Co crop varieties and learn more about the choices available to your farm." }]),
  "farming-regions": standard("Farmers' Hub", "Maize farming regions", "Match maize maturity and variety choice to your district, rainfall and planting window.", [{ title: "Choose for your environment", body: "The right maturity group helps a crop make best use of the available water resource and length of season." }, { title: "Local guidance", body: "Seed Co supports farmers across Zambia’s districts through depots, agents and agronomists." }]),
  "maize-2": standard("Farmers' Hub", "Maize agronomy", "Practical guidance from land preparation and planting through nutrition, protection and harvest.", [{ title: "Crop establishment", body: "Start with a suitable variety, a well-prepared seedbed, correct spacing and timely planting into adequate moisture." }, { title: "Manage for potential", body: "Feed the crop at the right time, control weeds and scout for pests and diseases to protect grain filling." }]),
  "farming-regions/wheat": standard("Farmers' Hub", "Wheat production", "Plan variety, planting, irrigation and crop nutrition for productive wheat.", [{ title: "Establish evenly", body: "Prepare a fine, firm seedbed and use high-quality certified seed for an even stand." }, { title: "Protect grain quality", body: "Manage water, nutrition, weeds and disease through critical growth stages." }]),
  "farming-regions/soya": standard("Farmers' Hub", "Soya production", "Use adapted varieties and timely establishment to build a productive rotation.", [{ title: "Plant on time", body: "Plant into moist soil after rains stabilise, generally between mid-November and mid-December." }, { title: "Harvest carefully", body: "Monitor physiological maturity and harvest before shattering causes field loss." }]),
  calculators: standard("Farm tools", "Yield forecasting calculator", "Estimate yield by sampling your field in a consistent, repeatable way.", [{ title: "How to sample", body: "Select representative points, count plants and cobs, sample grain, estimate moisture and scale the result to a hectare." }, { title: "Use the estimate", body: "Forecasts help with harvest planning, storage and marketing, but field variability means results remain estimates." }], "calculator"),
  "learn-with-seed-co": standard("Farmers' Hub", "Learn with Seed Co", "Practical crop knowledge from Seed Co agronomists and researchers.", [{ title: "Plan", body: "Select the right variety for your ecology, market and planting window." }, { title: "Grow", body: "Use timely crop establishment, nutrition and protection practices." }, { title: "Harvest", body: "Protect yield and quality through timely harvesting, drying and storage." }]),
  news: standard("Media", "News", "Updates from Seed Co Zambia, our farmers, teams and partners.", [{ title: "Preparing Africa’s Farmers for the 2026/27 El Niño Season", body: "July 14, 2026 · Climate and agronomy update" }, { title: "Seed Co innovation and community news", body: "Follow the latest developments from across our Zambian operations." }], "media"),
  blog: standard("From the blog", "Ideas from the field", "Agronomy, farmer stories and perspectives from Seed Co.", [{ title: "Preparing Africa’s Farmers for the 2026/27 El Niño Season", body: "July 14, 2026" }, { title: "Beyond the fields into the white marbles of the Taj Mahal", body: "July 15, 2025" }, { title: "Successful Maize Crop Establishment 2", body: "March 2, 2023" }], "media"),
  "media/events-calendar": standard("Media", "Events Calendar", "Find Seed Co field days, farmer meetings and agricultural events.", [{ title: "Upcoming events", body: "New Zambia event dates and venue details will be posted here as they are confirmed." }], "media"),
  "media/faqs": standard("Help centre", "Frequently asked questions", "Clear answers to common questions from Seed Co farmers, customers and prospective agents.", [], "faq"),
  testimonial: standard("Farmer voices", "Testimonials", "Hear directly from Seed Co farmers across Solwezi, Petauke, Kasama, Chikankata and beyond.", [{ title: "Solwezi farmer", body: "A Seed Co Zambia farmer shares their experience from the field." }, { title: "SC 719 and SC Spike", body: "A determined young farmer shares the results of growing Seed Co varieties." }, { title: "Soya bean testimonials", body: "Farmers share their experience with Seed Co soya bean varieties." }], "media"),
  "media/photo-gallery": standard("Media", "Photo Gallery", "Field days, research, partnerships and harvests from across Zambia.", [{ title: "In the field", body: "A visual record of Seed Co Zambia working alongside farmers and communities." }], "media"),
  "media/video-gallery": standard("Media", "Video Gallery", "Watch farmer testimonials, agronomy advice and Seed Co updates.", [{ title: "Farmer stories", body: "Real experiences from Seed Co growers across Zambia." }, { title: "Learn with Seed Co", body: "Practical videos for better crop decisions." }], "media"),
  promotions: standard("Offers", "Promotions", "See current Seed Co Zambia campaigns and farmer promotions.", [{ title: "Current promotions", body: "Promotion details, eligibility and dates are published here when available." }], "media"),
  "notice-to-suppliers-and-contractors": standard("Notice", "Suppliers and contractors", "Current notices and information for Seed Co Zambia suppliers and contractors.", [{ title: "Official information", body: "Review current procurement notices, requirements and contact details published by Seed Co Zambia." }], "media"),
  "preparing-africas-farmers-for-the-2026-27-el-nino-season": standard("Climate outlook · July 14, 2026", "Preparing Africa’s Farmers for the 2026/27 El Niño Season", "Practical preparation starts with informed variety choice, realistic planting windows and climate-smart field management.", [{ title: "Plan for rainfall uncertainty", body: "Use adapted varieties, conserve soil moisture and align planting with effective rainfall rather than the first isolated shower." }, { title: "Protect every hectare", body: "Good establishment, timely weed control and balanced nutrition help crops use available water efficiently." }]),
  "beyond-the-fields-into-the-white-marbles-of-the-taj-mahal": standard("From the blog · July 15, 2025", "Beyond the fields into the white marbles of the Taj Mahal", "A Seed Co story beyond the field, connecting people, ideas and agricultural possibility.", [{ title: "A wider view", body: "Shared experiences and learning strengthen the people behind Africa’s seed industry." }]),
  "successful-maize-crop-establishment-2": standard("Agronomy · March 2, 2023", "Successful Maize Crop Establishment", "A strong crop begins with the right seed, timely planting and even emergence.", [{ title: "Prepare well", body: "Create conditions for good seed-to-soil contact and reliable germination." }, { title: "Plant precisely", body: "Use recommended depth and spacing, then monitor emergence and early weed competition." }]),
  "contact-us": standard("Contact Seed Co Zambia", "Let’s talk about your next season", "Speak to our team about products, agronomy support, sales, depots or becoming a Seed Co agent.", [{ title: "Head office", body: "Seed Co Business Complex, P.O. Box 35310, Farm No. 683B, Mumbwa Road, Lusaka." }, { title: "Telephone", body: "+260 211 426 400" }, { title: "General enquiries", body: "Zambia.seedco@seedcogroup.com" }, { title: "Sales", body: "Zambia.sales@seedcogroup.com" }], "contact"),
  "privacy-policy": standard("Legal", "Privacy policy", "How Seed Co Zambia handles information shared through this website.", [{ title: "Your information", body: "Information provided to Seed Co is used to respond to enquiries, deliver requested services and improve customer support." }, { title: "Contact", body: "Questions about privacy can be sent to Zambia.seedco@seedcogroup.com." }]),
};

export function getPage(path: string): PageContent {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  if (normalized.startsWith("sc-products/")) {
    const productName = normalized.split("/").pop()?.replaceAll("-", " ") ?? "Seed variety";
    return standard("Certified Seed Co variety", productName.toUpperCase(), "Field-tested seed developed for strong agronomic performance under African growing conditions.", [
      { title: "Product description", body: "A certified Seed Co variety selected for yield potential, field stability and dependable crop performance." },
      { title: "Product characteristics", body: "Consult the current product guide or speak with a Seed Co agronomist for maturity, population, disease tolerance and recommended production zones." },
    ]);
  }
  return pages[normalized] ?? standard("Seed Co Zambia", "Field crops", "Explore trusted seed, practical agronomy and farmer support from Seed Co Zambia.", [{ title: "Find what you need", body: "Use the navigation to explore our products, farmer resources, innovations, company information and contact details." }]);
}
