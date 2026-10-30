/*
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT
 *  Every piece of text on the website lives in this one file.
 *  Edit the values below — layout and animations update
 *  automatically.
 *
 *  Tips
 *  - Remove an item from a list to remove it from the page.
 *  - Set a list to [] (empty) to hide that section entirely.
 *  - Leave a `url` empty ("") to hide that link / button.
 * ─────────────────────────────────────────────────────────────
 */
window.SITE = {
  meta: {
    title: "Dr. Arpi Melikyan | French & Francophone Studies",
    description:
      "Dr. Arpi Melikyan, multilingual scholar and educator specializing in French and Francophone Studies at UCLA. Research on exile, body politics and symbolic homelands.",
  },

  person: {
    firstName: "Arpi",
    lastName: "Melikyan",
    prefix: "Dr.",
    degree: "PhD in French and Francophone Studies, UCLA",
    eyebrow: "French & Francophone Studies",
    tagline:
      "Multilingual scholar and educator specializing in French and Francophone Studies.",
    portrait: "assets/img/portrait.jpg",
    cvFile: "", // e.g. "assets/Arpi-Melikyan-Teaching-CV.pdf"; shows a “Download CV” button when set
  },

  // Words that scroll across the marquee band
  focus: [
    "Transnationalism",
    "French and Francophone Studies",
    "Immigration",
    "Exile",
    "Displacement",
  ],

  about: {
    // Large statement that lights up word-by-word as you scroll
    statement: "Dr. Arpi Melikyan is a scholar and educator of French and Francophone Studies.",
    // Wrap text in *asterisks* to show it in italics
    paragraphs: [
      "She earned her Ph.D. in French and Francophone Studies from the University of California, Los Angeles in 2025, where she also taught French language, culture, and cinema.",
      "Her research examines migration, exile, and transcultural identity in contemporary Francophone literature. Her dissertation, *Between Fiction, Memoir, and Manifesto: Negotiating Exile in the Works of Abnousse Shalmani*, is the first book-length scholarly study of Shalmani’s literary works and explores autobiographical testimony and storytelling as forms of cultural and political agency.",
    ],
  },

  // Animated counters: a number counts up; text (e.g. "PhD") is shown as is
  stats: [
    { value: 4, suffix: "", label: "Languages: English, French, Armenian, and Spanish" },
    { value: 8, suffix: "", label: "Conference presentations & invited talks" },
    { value: 8, suffix: "+", label: "Years of Teaching Experience" },
    { value: "PhD", suffix: "", label: "Degree from UCLA" },
  ],

  // “Featured Work & News” highlights
  highlights: [
    { title: "University and\u00a0K\u2060-\u206012 Teaching Experience" },
    { title: "Curriculum Development" },
    { title: "Conferences & Invited Talks" },
  ],

  research: {
    dissertation: {
      label: "Dissertation",
      title: "Between Fiction, Memoir, and Manifesto: Negotiating Exile in the Works of Abnousse Shalmani",
      url: "https://escholarship.org/uc/item/4q51g34j",
    },
    publicationsNote: "Peer reviewed publications forthcoming",
    other: [
      {
        title: "Conference Presentations",
        text: "She has presented her research at the American University of Armenia, Boston College, Rocky Mountain Modern Language Association, the National Women’s Studies Association, and the Pacific Ancient and Modern Language Association, with a forthcoming presentation at the Modern Language Association Annual Convention.",
      },
    ],
    citations: [
      {
        text: "Farhan, R. N. (2025). Postcolonial Feminism, Subaltern Voices, and Literary Resistance in Azar Nafisi’s Reading Lolita in Tehran. International Journal of Language, Literature and Culture, 5(4), 87 to 99.",
      },
    ],
  },

  teaching: [
    {
      period: "UCLA",
      title: "University Teaching Experience",
      // A list shows one place per line
      place: [
        "UCLA Department of French and Francophone Studies",
        "UCLA Department of European Languages and Transcultural Studies",
      ],
      points: ["Teaching Fellow & Teaching Assistant Consultant"],
    },
    {
      period: "GUSD",
      title: "French Dual Language Immersion Teacher",
      place: "Glendale Unified School District",
      points: [],
    },
  ],

  // Media & appearances — newest first
  appearances: [
    {
      date: "January 2027",
      type: "Conference",
      title: "Between Fiction, Memoir, and Manifesto: Negotiating Exile in Éloge du Métèque",
      venue: "Modern Language Association (MLA) Annual Convention",
      url: "",
    },
    {
      date: "November 2026",
      type: "Conference",
      title: "(Un)veiling Exile: The Politics of the Female Body in Khomeiny, Sade et moi",
      venue: "National Women’s Studies Association",
      url: "",
    },
    {
      date: "November 2026",
      type: "Conference",
      title: "Liminality and Displacements of Exile in Abnousse Shalmani’s Éloge du Métèque",
      venue: "Pacific Ancient and Modern Language Association",
      url: "",
    },
    {
      date: "October 2026",
      type: "Conference",
      title: "Writing Trauma at the Limits of Belonging",
      venue: "Rocky Mountain Modern Language Association",
      url: "",
    },
    {
      date: "June 2026",
      type: "Educational Video Series",
      title: "Armenian Icons: Charles Aznavour",
      venue: "Haykakart",
      url: "",
      // Click-to-play video shown on this row
      video: {
        url: "https://vimeo.com/1206641223/8fcd9e5622",
        thumb: "assets/img/aznavour-thumb.jpg", // fallback; the official Vimeo thumbnail loads automatically when available
        duration: "2:39",
      },
    },
    {
      date: "January 2026",
      type: "Invited Talk",
      title: "Du français académique à la classe immersive : trajectoire et apprentissages d’une enseignante multilangue",
      lang: "fr", // title and venue are in French, so screen readers pronounce them correctly
      venue: "Atelier professionnel AATF SoCal, UCLA",
      url: "",
    },
    {
      date: "April 2023",
      type: "Conference",
      title: "Rethinking Exile: The Role of Writing in the Search for Symbolic Homelands",
      venue: "Boston College",
      url: "",
    },
    {
      date: "June 2022",
      type: "Conference",
      title: "A Testimony on Survival: Liminality in Nigoghos Sarafian’s The Bois de Vincennes",
      venue: "American University of Armenia (AUA) Center for Truth & Justice, Human Rights and Accountability",
      url: "",
    },
  ],

  education: [
    {
      period: "2018 to 2025",
      degree: "PhD in French and Francophone Studies",
      place: "University of California, Los Angeles",
      note: "Dissertation: Between Fiction, Memoir, and Manifesto: Negotiating Exile in the Works of Abnousse Shalmani",
    },
    {
      period: "2013 to 2015",
      degree: "BA in French, minor in Spanish",
      place: "University of California, Los Angeles",
      note: "",
    },
  ],

  affiliations: [
    { title: "UCLA Department of European Languages and Transcultural Studies", role: "Graduate Student Researcher and Teaching Assistant" },
    { title: "Department of French and Francophone Studies", role: "University of California, Los Angeles" },
    { title: "UCLA Humanities Council", role: "Graduate Student Representative" },
    { title: "Graduate Student Colloquium in Armenian Studies", role: "Member and Academic Service" },
  ],

  languages: [
    { name: "English", level: "" },
    { name: "French", level: "" },
    { name: "Armenian", level: "" },
    { name: "Spanish", level: "" },
  ],

  contact: {
    heading: "Let’s connect.",
    text: "For academic inquiries, research collaborations, or media appearances, please get in touch directly by email.",
    email: "arpimelikyan16@ucla.edu",
    address: ["Department of European Languages and Transcultural Studies", "University of California, Los Angeles"],
    links: [
      { label: "LinkedIn", url: "" }, // paste the LinkedIn profile URL to show this link
    ],
  },
};
