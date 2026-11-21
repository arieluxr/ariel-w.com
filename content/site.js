// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file to update the site.
//  Lines marked TODO need your input before going live.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Ariel Wang",
  fullName: "Chun-Han Ariel Wang",
  title: "PhD Candidate, Computational Media",
  affiliation: "University of California, Santa Cruz",
  // Put your photo at public/images/profile.jpg (square, ~800×800px works best).
  photo: "/images/profile.jpg",
  // Scrolling ticker (跑馬燈) shown under the intro. Set to "" to hide.
  status:
    "I am on the job market for faculty and researcher positions:)",
  // Shown under your name in the header pill.
  location: "San Jose, CA, USA",
  // Greeting at the top of the home page.
  greeting: "Hi, I am Ariel Wang.",
  // The research statement under the greeting.
  // Wrap words in *asterisks* to set them in the italic serif accent.
  statement:
    "I study how social and algorithmic platforms shape the way young people *eat,* *care for their health,* and *tell their own stories.*",
  // About section paragraphs.
  bio: [
    "I'm a PhD candidate in Computational Media at University of California, Santa Cruz, advised by Chia-Fang (Christina) Chung. I work in Human-Computer Interaction, looking at where everyday health meets creatiivity and self-identity.", //online and offline life meet: what happens when a TikTok recipe ends up on a teenager's dinner plate, or when an Instagram Story becomes a way to keep a food diary.
    
    "Before HCI, I trained in dental technology, worked as a designer, and then a mixed-methods design policy researcher at the Taiwan Design Research Institute.",
  ],
  email: "cwang329@ucsc.edu",
  cv: "/cv.pdf", // the file is public/cv.pdf; replace it to update your CV
  links: [
    { label: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&user=EoOR6iYAAAAJ" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/arielchwang/" },
    { label: "Medium", href: "https://medium.com/@ariewang" },
  ],
};

// Newest first. date: "YYYY-MM". Links are optional.
// TODO: confirm dates and add defense date, awards, talks, and conferences attended.
export const news = [
  {
    date: "2026-11-18",
    text: "Successfully defended my dissertation on agency in everyday health with social media.", 
  },
  {
    date: "2026-04",
    text: "Our paper on teens' design fictions about future food and health technology was published at CHI 2026.",
    link: { label: "Paper", href: "https://aux.engineering.ucsc.edu/publications/Wang_Choi_Su_Chung-EnvisioningFoodTech-CHI26.pdf" },
  },
  {
    date: "2026-01", // TODO: confirm
    text: "\"Small Stories with Food Allergies on TikTok\" accepted to ACM Transactions on Computing for Healthcare.",
    link: {label: "Paper", href: "https://dl.acm.org/doi/10.1145/3822403"}
  },
  {
    date: "2025-04",
    text: "Published our CHI 2025 paper on food allergy identity and social media.",
    link: { label: "Video", href: "https://www.youtube.com/watch?v=FjNPqTgM3XQ" },
  },
  {
    date: "2024-11",
    text: "Our study of teenagers and TikTok food videos appeared at CSCW 2024.",
    link: { label: "Article", href: "https://medium.com/acm-cscw/from-tiktok-to-cuisines-teens-food-content-and-health-41391a513a38" },
  },
];

// Projects. Each one gets its own page at /projects/<slug>/.
// Images: drop a file named after the project's slug into public/images/projects/
// (e.g. public/images/projects/teen-design-fiction.jpg; .png and .webp work too) and it
// appears in the Work list and on the project page. Until then, the `mark` word is shown.
// imageFocus (optional) picks which part of the image stays in view when it's cropped:
// "50% 40%" = centered left–right, a little above the middle top–bottom.
// imageFit: "contain" (optional) shows the whole image uncropped, on imageBg.
export const projects = [
  {
    slug: "teen-design-fiction",
    imageFit: "contain", // collage with captions near the edges: show it whole
    imageBg: "#ffffff", // matches the collage's white gutters
    title: "Teens imagine the future of food and health technology",
    mark: "Futures",
    year: "2026",
    venue: "CHI 2026",
    acceptance: "25.3%",
    summary:
      "Design fiction workshops where teenagers wrote and built the health technologies they would want... and the ones they'd fear.",
    collaborators: "Eunsol Sol Choi, Norman Makoto Su, Chia-Fang Chung",
    methods: "Design fiction, participatory workshops",
    body: [
      "Teenagers are constantly told what healthy eating should look like, but rarely asked what kind of technology they want in their food lives. We ran design fiction workshops in which teens imagined, sketched, and wrote about future food and health technologies.",
      "Their fictions surfaced hopes for technology that supports curiosity and social connection, alongside sharp worries about surveillance, judgment, and losing control over their own choices. We translate these into implications for designing health technology with and for young people.",
    ],
    links: [
      { label: "Paper (PDF)", href: "https://aux.engineering.ucsc.edu/publications/Wang_Choi_Su_Chung-EnvisioningFoodTech-CHI26.pdf" },
      { label: "Medium article", href: "https://medium.com/@ariewang/designing-futures-what-teenagers-imagine-for-the-future-of-health-tech-9d19130054db" },
    ],
  },
  {
    slug: "food-allergy-small-stories",
    imageFit: "contain", // three panels: show all of them, no cropping
    imageBg: "#f9f4e6", // matches the artwork's cream border
    title: "Small stories of living with food allergies on TikTok",
    mark: "Stories",
    year: "2026",
    venue: "ACM Transactions on Computing for Healthcare",
    summary:
      "How people with food allergies use short videos to tell everyday stories about their health — and what social technologies can learn from them.",
    collaborators: "Madeleine Pintor, Norman Makoto Su, Chia-Fang Chung",
    methods: "Content analysis of 202 TikTok videos (small stories framework)",
    body: [
      "Health stories online are often imagined as big, dramatic arcs. On TikTok, people with food allergies tell small ones: a quick check of a menu, a joke about reading labels, a moment of frustration at a party.",
      "Drawing on the small stories framework, we analyzed 202 videos and identified four kinds of storytelling. The paper describes how a diverse range of tellers, diffuse forms of sociality, and algorithmically assembled communities shape health storytelling — and offers design opportunities for social technologies that support it.",
    ],
    links: [
      { label: "Paper (PDF)", href: "https://people.ucsc.edu/~cfchung/assets%5Cpapers%5Chealth2026-small-stories.pdf" },
    ],
  },
  {
    slug: "food-allergy-identity",
    title: "Food allergy identity, online and off",
    mark: "Identity",
    year: "2025",
    venue: "CHI 2025",
    acceptance: "24.9%",
    summary:
      "Interviews with young adults with food allergies about how social media shapes an identity that switches on and off across everyday life.",
    collaborators: "Elizabeth Kaziunas, Chia-Fang Chung",
    methods: "Semi-structured interviews",
    body: [
      "For people with food allergies, health is not a constant label — it comes forward at a restaurant, fades at home, and reappears when scrolling through food content. We interviewed young adults about how they manage this identity across social media and everyday life.",
      "We describe allergy identity as something that turns on and off, and show how food content online can both support people and add to what one participant called \"your own food drama.\"",
    ],
    links: [
      { label: "Paper (PDF)", href: "https://people.ucsc.edu/~cfchung/assets%5Cpapers%5Cchi2025-foodallergy-identity.pdf" },
      { label: "Medium article", href: "https://medium.com/ucsc-hci/life-with-food-allergies-what-it-really-looks-like-on-social-media-and-offline-8d063969337f" },
      { label: "Video", href: "https://www.youtube.com/watch?v=FjNPqTgM3XQ" },
    ],
  },
  {
    slug: "teens-tiktok-food",
    imageFocus: "50% 40%", // keep both heads and the phone in the wide cover
    title: "From viral TikTok food videos to real kitchens, and beyond",
    mark: "TikTok",
    year: "2024",
    venue: "CSCW 2024",
    acceptance: "", // TODO: CSCW 2024 rate
    summary:
      "How teenagers find, watch, and act on TikTok food content — and how it shows up in what they cook and eat.",
    collaborators: "Stephen Tsung-Han Sher, Chia-Fang Chung",
    methods: "Interviews with teenagers, temporal stage model",
    body: [
      "TikTok is one of the main places teenagers encounter food. We spoke with teens about how they come across food videos, which ones they save or try, and what changes in their eating as a result.",
      "We present a stage model of how engagement moves from scrolling to cooking and beyond, and discuss what it means for designing platforms that support teens' health without telling them what to eat.",
    ],
    links: [
      { label: "Paper (PDF)", href: "https://people.ucsc.edu/~cfchung/assets%5Cpapers%5Ccscw2024-teenager-tiktok-food.pdf" },
      { label: "Medium article", href: "https://medium.com/acm-cscw/from-tiktok-to-cuisines-teens-food-content-and-health-41391a513a38" },
    ],
  },
  
];

// Newest first. Mark your name with the `me` field so it gets highlighted.
// "*" after a name marks shared first authorship.
export const publications = [
  {
    year: 2026,
    title: "Small Stories with Food Allergies on TikTok: Design Opportunities for Social Technologies Supporting Health",
    authors: "Chun-Han Ariel Wang, Madeleine Pintor, Norman Makoto Su, Chia-Fang Chung",
    venue: "ACM Transactions on Computing for Healthcare",
    type: "Journal",
    links: [{ label: "PDF", href: "https://people.ucsc.edu/~cfchung/assets/papers/health2026-small-stories.pdf" }],
  },
  {
    year: 2026,
    title: "Envisioning Future Food, Technology, and Health: Teens' Perspectives Through Design Fiction",
    authors: "Chun-Han Ariel Wang*, Eunsol Sol Choi*, Norman Makoto Su, Chia-Fang Chung",
    venue: "CHI 2026",
    type: "Conference",
    acceptance: "25.3%", // CHI 2026 Papers: 1,705 of 6,730 (chi2026.acm.org)
    links: [
      { label: "PDF", href: "https://aux.engineering.ucsc.edu/publications/Wang_Choi_Su_Chung-EnvisioningFoodTech-CHI26.pdf" },
      { label: "Article", href: "https://medium.com/@ariewang/designing-futures-what-teenagers-imagine-for-the-future-of-health-tech-9d19130054db" },
    ],
  },
  {
    year: 2025,
    title: "“It's Too Much On Top of Your Own Food Drama”: Exploring Food Allergy Identity and Experience Through Social Media",
    authors: "Chun-Han Ariel Wang, Elizabeth Kaziunas, Chia-Fang Chung",
    venue: "CHI 2025",
    type: "Conference",
    acceptance: "24.9%", // CHI 2025 Papers: 1,249 of 5,014 (chi2025.acm.org)
    links: [
      { label: "PDF", href: "https://dl.acm.org/doi/pdf/10.1145/3706598.3714126" }
    ],
  },
  {
    year: 2024,
    title: "From Viral Content to Real-Life Cuisine and Beyond: Examining Teenagers' Interactions with TikTok Food Videos and the Influence on Their Food Practices",
    authors: "Chun-Han Ariel Wang, Stephen Tsung-Han Sher, Chia-Fang Chung",
    venue: "CSCW 2024 (PACM HCI 8, CSCW2)",
    type: "Conference",
    acceptance: "", // TODO: CSCW 2024 rate not found in an official source — fill in from the proceedings front matter
    links: [{ label: "PDF", href: "https://people.ucsc.edu/~cfchung/assets%5Cpapers%5Ccscw2024-teenager-tiktok-food.pdf" }],
  },
  {
    year: 2024,
    title: "Understanding Fraudulence in Online Qualitative Studies: From the Researcher's Perspective",
    authors: "Aswati Panicker, Novia Nurain, Zaidat Ibrahim, Chun-Han (Ariel) Wang, Seung Wan Ha, Yuxing Wu, Kay Connelly, Katie A. Siek, Chia-Fang Chung",
    venue: "CHI 2024",
    type: "Conference",
    acceptance: "26.4%", // CHI 2024 Papers: 1,060 accepted (chi2024.acm.org post-PC report)
    links: [
      { label: "PDF", href: "https://people.ucsc.edu/~cfchung/assets%5Cpapers%5Cchi2024-fraudulence-hci.pdf" },
      { label: "Video", href: "https://www.youtube.com/watch?v=ryouRl2yKYw" },
    ],
  },
  {
    year: 2026, 
    title: "Co-Designing Social Media that Support Teen Well-Being and Healthy Habits",
    authors: "Chun-Han Ariel Wang, Yuxing Wu, Chia-Fang Chung",
    venue: "Journal of Adolescent Health 78(3), abstract",
    type: "Abstract",
    links: [],
  },

  {
    year: 2022,
    title: "“TikTok Made Me Do It”: Teenagers' Perception and Use of Food Content on TikTok",
    authors: "Chun-Han Wang, Stephen Tsung-Han Sher, Kelly Janek, Isabela Salman, Chia-Fang Chung",
    venue: "IDC 2022, Work-in-Progress",
    type: "Work in progress",
    acceptance: "", // TODO: IDC 2022 WIP rate not published; check the IDC '22 front matter
    links: [
      { label: "PDF", href: "https://people.ucsc.edu/~cfchung/assets%5Cpapers%5Cidc2022-tiktok-healthyeating.pdf" },
      { label: "Poster", href: "https://people.ucsc.edu/~cfchung/assets%5Cpapers%5Cidc2022-tiktok-healthyeating-poster.pdf" },
    ],
  },
];

// Name variants that get bolded in author lists.
export const myNames = ["Chun-Han Ariel Wang", "Chun-Han (Ariel) Wang", "Chun-Han Wang"];
