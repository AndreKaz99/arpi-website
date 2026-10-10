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
    eyebrow: "French & Francophone Studies  ·  UCLA",
    tagline:
      "Multilingual scholar and educator specializing in French and Francophone Studies. Grounded in her extensive research at UCLA, she brings a transcultural perspective to modern language pedagogy and literary analysis.",
    portrait: "assets/img/portrait.jpg",
    cvFile: "", // e.g. "assets/Arpi-Melikyan-Teaching-CV.pdf"; shows a “Download CV” button when set
  },

  // Words that scroll across the marquee band
  focus: [
    "Exile",
    "Body Politics",
    "Symbolic Homelands",
    "Francophone Literature",
    "Transcultural Studies",
    "Language Pedagogy",
    "Armenian Diaspora",
  ],

  about: {
    // Large statement that lights up word-by-word as you scroll
    statement:
      "Dr. Arpi Melikyan is a Professor of French and Francophone Studies, specializing in the intersections of exile, body politics, and symbolic homelands.",
    paragraphs: [
      "Her work deeply explores how narrative structures in French and Armenian contexts negotiate the complexities of identity and displacement.",
      "Her research interests are centered on transcultural studies and the advancement of language pedagogy. In the classroom, she focuses on fostering a nuanced understanding of Francophone literature, encouraging students to engage with texts as cultural manifestos of historical and personal negotiation.",
    ],
  },

  // Animated counters — `value` must be a number
  stats: [
    { value: 4, suffix: "", label: "Languages: Armenian, English, French and Spanish" },
    { value: 7, suffix: "", label: "Conference presentations & invited talks" },
    { value: 4, suffix: "", label: "Academic affiliations & service roles" },
    { value: 2, suffix: "", label: "Degrees from UCLA" },
  ],

  // “Featured Work & News” highlights
  highlights: [
    {
      title: "Teaching & Curriculum Development",
      text: "Extensive experience at UCLA developing and delivering a diverse range of courses on French language and Francophone cultures, from introductory levels to advanced transcultural studies.",
    },
    {
      title: "K through 12 and Community Teaching",
      text: "Dedicated educator within the Glendale Unified School District, fostering language acquisition and cultural literacy through primary and community focused instructional roles.",
    },
    {
      title: "Conferences & Invited Talks",
      text: "Frequent presenter at leading academic venues including the MLA, NWSA, PAMLA, and RMMLA, contributing to global dialogues on exile and transculturalism.",
    },
  ],

  research: {
    dissertation: {
      label: "Dissertation",
      title: "Between Fiction, Memoir, and Manifesto: Negotiating Exile in the Works of Abnousse Shalmani",
      text: "A critical analysis of exile and body politics through the symbolic homelands explored in modern Francophone literature. The study negotiates the intersections of memory and manifesto within the specific context of Abnousse Shalmani’s narratives.",
      url: "https://escholarship.org/uc/item/4q51g34j",
    },
    publicationsNote: "Peer reviewed publications forthcoming",
    publicationsText:
      "Current research investigates the complex intersections of exile, trauma, and belonging within Francophone and Armenian cultural contexts. The project explores how displaced identities are reconstructed through literary and symbolic narratives of home.",
    other: [
      {
        title: "Conference Presentations",
        text: "Presentations at national venues including PAMLA and RMMLA, focusing on body politics and Armenian diasporic narratives.",
      },
      {
        title: "Works in Progress",
        text: "Scholarly articles focusing on transculturalism and exile in Francophone literature currently under development.",
      },
    ],
    citations: [
      {
        text: "Farhan, R. N. (2025). Postcolonial Feminism, Subaltern Voices, and Literary Resistance in Azar Nafisi’s Reading Lolita in Tehran. International Journal of Language, Literature and Culture, 5(4), 87 to 99.",
        note: "Cites Dr. Arpi Melikyan’s scholarship on counter narrative discourse and the subversive potential of literary framing as part of its theoretical framework and analysis.",
      },
    ],
  },

  teaching: [
    {
      period: "UCLA",
      title: "University Teaching Experience",
      place: "UCLA Department of European Languages and Transcultural Studies",
      points: ["Graduate Student Researcher and Teaching Assistant"],
    },
    {
      period: "UCLA",
      title: "Teaching Fellow & Teaching Assistant Consultant",
      place: "UCLA Department of French and Francophone Studies",
      points: [],
    },
    {
      period: "2018 to 2019",
      title: "Educator",
      place: "Glendale Unified School District",
      points: [],
    },
    {
      period: "2016 to 2018",
      title: "Curriculum & Instruction",
      place: "Curriculum Coordinator (2016 to 2017) & Language Instructor (2017 to 2018)",
      points: [],
    },
  ],

  // Media & appearances — newest first
  appearances: [
    {
      date: "November 2026",
      type: "Conference",
      title: "Between Fiction, Memoir, and Manifesto: Negotiating Exile in Éloge du Métèque",
      venue: "National Women’s Studies Association",
      text: "Details for this upcoming talk will be shared soon.",
      url: "",
    },
    {
      date: "November 2026",
      type: "Conference",
      title: "Liminality and Displacements of Exile in Abnousse Shalmani’s Éloge du Métèque",
      venue: "Pacific Ancient and Modern Language Association",
      text: "Details for this upcoming talk will be shared soon.",
      url: "",
    },
    {
      date: "October 2026",
      type: "Conference",
      title: "Writing Trauma at the Limits of Belonging",
      venue: "Rocky Mountain Modern Language Association",
      text: "Details for this upcoming talk will be shared soon.",
      url: "",
    },
    {
      date: "June 2026",
      type: "Educational Video Series",
      title: "Armenian Icons: Charles Aznavour",
      venue: "Haykakart",
      text: "An educational exploration of Charles Aznavour’s life and legacy, examining his influence as a French singer of Armenian heritage and his enduring impact on French and Armenian culture. The series also highlights the history of Armenian diaspora communities in Paris and Marseille and their role in preserving Armenian identity.",
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
      venue: "Atelier professionnel AATF SoCal, UCLA",
      text: "An exploration of the transition from academic French to everyday spoken French in a dual language immersion classroom, examining how multilingual educators adapt their language practices to foster authentic communication and effective language learning.",
      url: "",
    },
    {
      date: "April 2023",
      type: "Conference",
      title: "Rethinking Exile: The Role of Writing in the Search for Symbolic Homelands",
      venue: "Boston College",
      text: "A comparative examination of exile in the works of Iosif Brodsky and Abnousse Shalmani, exploring how language, identity, and migration shape the experience of displacement and redefine the condition of exile in an increasingly globalized world.",
      url: "",
    },
    {
      date: "June 2022",
      type: "Conference",
      title: "A Testimony on Survival: Liminality in Nigoghos Sarafian’s The Bois de Vincennes",
      venue: "American University of Armenia (AUA) Center for Truth & Justice, Human Rights and Accountability",
      text: "An examination of Nigoghos Sarafian’s The Bois de Vincennes, exploring how literature serves as testimony to displacement, exile, and survival while examining the enduring relationship between memory, trauma, language, and the Armenian diasporic experience.",
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
    { name: "Armenian", level: "" },
    { name: "English", level: "" },
    { name: "French", level: "" },
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
