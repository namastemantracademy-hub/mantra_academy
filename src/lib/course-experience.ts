// Extra, hand-written content for each course page (the "Sacred Night" design).
// Price, fee type, FAQs, dates and the Pay & Enroll flow still come from the database / admin.
// Anything left out here falls back to the database, so a new course still gets a full page.
import type { IllusName } from "@/components/course/illustrations";

export type JourneyStep = { icon: IllusName; tag: string; title: string; text: string };
export type Testimonial = { quote: string; name: string; place?: string; stars?: boolean };
export type TeacherId = "karthik" | "jyothi";

export type CourseExperience = {
  /** Title as shown on the page (with diacritics); falls back to the admin title. */
  displayTitle?: string;
  /** One quiet line under the title. */
  subtitle?: string;
  /** Short paragraph in the hero. Words wrapped in *stars* are highlighted. */
  lead?: string;
  eyebrow?: string;
  heroImage?: string;
  heroAlt?: string;
  /** Floating card on the hero photo. */
  heroCard?: { icon: IllusName; title: string; text: string };
  /** e.g. completed: "52+", rating: "4.9" (rating only where students actually rated). */
  stats?: { completed?: string; rating?: string };
  /** Quick facts strip; [bold, small] pairs. */
  facts?: [string, string][];
  forYou?: string[];
  journeyTitle?: string;
  journeyIntro?: string;
  journey?: JourneyStep[];
  journeyNote?: string;
  /** Shows the guru-mukha cycle, "preparing the vessel" and a learning path (Rudra Śikṣā manual). */
  gurukula?: boolean;
  path?: { title: string; text: string }[];
  teachers?: TeacherId[];
  testimonials?: Testimonial[];
  finalLine?: string;
};

export const TEACHERS: Record<TeacherId, { name: string; role: string; image: string; bio: string }> = {
  karthik: {
    name: "Dr. Karthik Sharma",
    role: "Āchārya · Co-founder",
    image: "/images/course/teacher-karthik.webp",
    bio: "13+ years of Gurukula study — Kṛṣṇa Yajurveda, Upaniṣads and Vedānta under Dr. Ramachandra Bhat Kotemane. Vidwat (M.A.) and M.Phil in Advaita Vedānta.",
  },
  jyothi: {
    name: "Dr. Jyothi Sharma",
    role: "Āchāryā · Co-founder",
    image: "/images/course/teacher-jyothi.webp",
    bio: "Teaches Advaita Vedānta and the Sanskrit scriptures, with a focus on clear understanding and daily practice. Known for patient, immersive teaching that makes beginners feel at home.",
  },
};

const LIVE_FACTS: [string, string][] = [
  ["Live classes", "on Google Meet"],
  ["Recordings", "of every session"],
];

export const COURSE_EXPERIENCE: Record<string, CourseExperience> = {
  // ---------------- Pūjā Vidhi ----------------
  "mantras-for-healing": {
    displayTitle: "Pūjā Vidhi",
    eyebrow: "Live online workshop · Registrations open",
    subtitle: "The 16 Upachāra Pūjā, the traditional way",
    lead: "From *Āvāhana* to *Visarjana* — learn what to do, why and how, with correct mantra pronunciation, so every offering at home is done with understanding.",
    heroImage: "/images/course/hero-puja-vidhi.webp",
    heroAlt: "Dr. Karthik Sharma",
    heroCard: { icon: "palm", title: "Pūjā Handbook", text: "included · yours to keep" },
    stats: { completed: "52+", rating: "4.9" },
    facts: [
      ["20 live classes", "on Google Meet"],
      ["3 months", "2 classes a week"],
      ["English", "& Sanskrit"],
      ["Recordings", "of every session"],
      ["Pūjā Handbook", "e-manual to keep"],
    ],
    forYou: [
      "I do pūjā at home, but I'm not sure I'm doing it correctly.",
      "I chant the mantras but don't know what they mean.",
      "I want to learn from a traditional teacher, not random videos.",
      "I live abroad and want to keep our family's tradition alive.",
      "I'm a beginner and want to learn step by step, from scratch.",
      "I want pūjā to feel calm and meaningful, not rushed.",
    ],
    journeyTitle: "Pūjā Vidhi",
    journeyIntro: "Six steps, from the first idea to your own pūjā at home.",
    journey: [
      { icon: "palm", tag: "Tattva", title: "Why we worship", text: "The philosophy and purpose of pūjā, explained from the śāstra — no made-up stories." },
      { icon: "sound", tag: "Uccāraṇa", title: "Chant correctly", text: "Every mantra with clear pronunciation and svara, corrected live in class." },
      { icon: "kalasha", tag: "Saṅkalpa & Āvāhana", title: "Begin the pūjā", text: "Setting up, the resolve, and inviting the deity — the right way." },
      { icon: "flowers", tag: "Ṣoḍaśa Upacāra", title: "The 16 offerings", text: "Each upacāra demonstrated, then practised — and what each one means." },
      { icon: "arati", tag: "Naivedya & Ārati", title: "Offer with devotion", text: "Naivedya, ārati and prayers — understanding the bhāva behind them." },
      { icon: "home", tag: "Visarjana & Sādhanā", title: "Your pūjā at home", text: "Conclude correctly and perform the full pūjā yourself, with the Pūjā Handbook." },
    ],
    journeyNote: "You're not just learning steps — you're learning to offer them with *understanding* and *bhāva*.",
    teachers: ["karthik", "jyothi"],
    testimonials: [
      { quote: "Acharya clearly explains each aspect of Pooja Vidhi and why & how we should do it. Questions were answered with no room for doubt. It gave me a lot of confidence and motivation to perform the Pooja Vidhi.", name: "Student", place: "Germany", stars: true },
      { quote: "Got to know the Nithya Pooja vidhana in more detail. This gives me confidence that I am not doing it wrongly.", name: "Srirama V.", place: "India" },
      { quote: "Experience of learning Puja Vidhi mantras and the process has been very pleasant, enriching and very professionally delivered.", name: "Krishna M. C.", place: "Professor, Bengaluru" },
    ],
    finalLine: "Learn it once, properly — and carry it for a lifetime.",
  },

  // ---------------- Śrī Rudra Adhyayana ----------------
  "rudrachamakam-course": {
    displayTitle: "Śrī Rudra Adhyayana",
    eyebrow: "Live online · Gurukula-style cohort",
    subtitle: "Namakam & Chamakam, sound by sound",
    lead: "Learn Śrī Rudram the way it has always been passed on — from the *Guru's voice*, with exact *svara*, word-by-word *pada-pāṭha* and the meaning of every anuvāka.",
    heroImage: "/images/course/hero-rudra.webp",
    heroAlt: "Dr. Karthik Sharma teaching online",
    heroCard: { icon: "mala", title: "Practice recordings", text: "chant along between classes" },
    stats: { completed: "100+", rating: "4.9" },
    forYou: [
      "I want to chant Rudram with the correct svara, not just from audio.",
      "I've learnt parts of Rudram but I'm unsure of my pronunciation.",
      "I want to understand what each anuvāka means.",
      "I want to chant for abhiṣeka and daily worship with confidence.",
      "I live abroad and want a traditional teacher, live.",
      "I want steady, disciplined practice with personal correction.",
    ],
    gurukula: true,
    journeyTitle: "Śrī Rudram",
    journey: [
      { icon: "svara", tag: "Svara", title: "The pitch of the Veda", text: "Anudātta (low, line below), udātta (middle), svarita (raised, line above) — shown with the hand as you chant." },
      { icon: "sound", tag: "Mātrā · Anusvāra · Visarga", title: "Every sound, exact", text: "Short and long syllables, ru-dra not ru-ra, and how ṃ and ḥ change with the next letter." },
      { icon: "pada", tag: "Pada-pāṭha", title: "Split every word", text: "Each line broken into words first, so the chant is clear and correct." },
      { icon: "anuvaka", tag: "Namakam", title: "All 11 anuvākas", text: "Anuvāka by anuvāka, with the meaning from the bhāṣya between the chanting." },
      { icon: "mala", tag: "Abhyāsa", title: "Practise with recordings", text: "Listen fully · repeat exactly · receive correction · repeat again — in class and at home." },
      { icon: "linga", tag: "Upāsanā", title: "Rudram as sādhanā", text: "Chant for abhiṣeka, arcana and japa — with svara, meaning and devotion." },
    ],
    path: [
      { title: "1 · Rudram", text: "Namakam · anuvākas 1–11" },
      { title: "2 · Chamakam", text: "anuvākas 1–11" },
      { title: "3 · Puruṣa Sūktam", text: "hymn to the Cosmic Person" },
    ],
    teachers: ["karthik"],
    testimonials: [
      { quote: "What I really appreciate is the attention to detail he gives to pronunciation, clarity, and small corrections. The recordings provided for practice are extremely helpful. Highly recommend Mantra Academy to anyone who wants to learn Rudram with proper pronunciation, discipline, and understanding.", name: "Vamsee K.", place: "Austin, USA", stars: true },
      { quote: "Extremely patient with us, wonderful attention to each and every word — udātta, anudātta and svaritam. Personal attention to each and every student.", name: "Danny F.", place: "Chartered Accountant, Dubai" },
      { quote: "Acharya not only teaches the Vedas but also explains the gist of what each verse is about. The class is structured, slow paced and enjoyable — similar to a gurukulam way of learning.", name: "Kruthivasan A.", place: "Stamford, USA" },
    ],
    finalLine: "Exact svara before speed — learn Rudram the Gurukula way.",
  },

  // ---------------- Sanskrit Orientation ----------------
  "sanskrit-orientation": {
    displayTitle: "Sanskrit Orientation",
    subtitle: "Your first steps into the Devabhāṣā",
    heroImage: "/images/course/hero-sanskrit.webp",
    heroAlt: "Dr. Jyothi Sharma",
    heroCard: { icon: "letters", title: "Taught in Sanskrit", text: "learn by immersion" },
    journeyTitle: "Sanskrit",
    journey: [
      { icon: "letters", tag: "Lipi", title: "Script & sounds", text: "Read and write Devanāgarī, and pronounce every letter clearly." },
      { icon: "pada", tag: "Paṭhana", title: "Reading words", text: "Join letters into words and read simple lines with confidence." },
      { icon: "palm", tag: "Vyākaraṇa", title: "Verbs & sentences", text: "Build sentences with the most useful verbs and forms." },
      { icon: "sound", tag: "Saṃbhāṣaṇa", title: "Speaking simply", text: "Classes conducted mostly in Sanskrit, so you start to think in it." },
    ],
    teachers: ["jyothi"],
    testimonials: [
      { quote: "She makes it easy for everyone in the class, teaching with utmost patience — comfortable even for beginners. And my son wishes Jyothi bhagini was his Sanskrit teacher in his school!", name: "Shrilakshmi", place: "India", stars: true },
      { quote: "By conducting her sessions primarily in Sanskrit, she utilizes an immersive technique that compels the mind to adapt and grasp the language through direct context.", name: "Shreedhar", place: "Germany" },
    ],
  },

  // ---------------- Vedaśikṣā ----------------
  "vedashiksha-introduction-to-vedas": {
    displayTitle: "Vedaśikṣā",
    subtitle: "An introduction to the Vedas and Vedic chanting",
    lead: "Begin your journey into the Vedas the traditional way — hear the *svara* from your teacher, repeat it exactly, and understand what you chant.",
    heroImage: "/images/course/hero-vedashiksha.webp",
    heroAlt: "Dr. Karthik Sharma",
    heroCard: { icon: "palm", title: "Gurukula method", text: "listen · repeat · correct" },
    journeyTitle: "Vedaśikṣā",
    journey: [
      { icon: "palm", tag: "Paricaya", title: "What the Vedas are", text: "Where the Vedas come from and how they have been preserved." },
      { icon: "svara", tag: "Śikṣā", title: "Sounds & svara", text: "The sounds and pitch-accents that make Vedic chanting exact." },
      { icon: "ear", tag: "Guru-mukha", title: "First chants, by ear", text: "Listen to the teacher, repeat, and receive correction." },
      { icon: "mala", tag: "Abhyāsa", title: "Daily practice", text: "A steady routine so the chanting becomes your own." },
    ],
    teachers: ["karthik", "jyothi"],
  },

  // ---------------- Durgā Saptaśatī ----------------
  "durga-saptashati": {
    displayTitle: "Durgā Saptaśatī",
    subtitle: "A journey into the heart of the Devī tradition",
    heroImage: "/images/course/hero-durga-saptashati.webp",
    heroAlt: "Dr. Karthik Sharma",
    heroCard: { icon: "trishula", title: "700 verses", text: "chapter by chapter" },
    journeyTitle: "Durgā Saptaśatī",
    journey: [
      { icon: "trishula", tag: "Śākta paramparā", title: "The Devī tradition", text: "The story, meaning and place of the Saptaśatī in worship." },
      { icon: "sound", tag: "Uccāraṇa", title: "Pronunciation", text: "Chant each verse clearly, corrected live in class." },
      { icon: "palm", tag: "Adhyāya", title: "Chapter by chapter", text: "Learn the text step by step, with meaning." },
      { icon: "lotus", tag: "Pārāyaṇa", title: "Recitation as sādhanā", text: "Recite the Saptaśatī with understanding and devotion." },
    ],
    teachers: ["karthik", "jyothi"],
  },

  // ---------------- Jijñāsā (children) ----------------
  "jijs": {
    displayTitle: "Jijñāsā",
    subtitle: "Daily prayers, stories and values for children",
    lead: "Daily prayers, ślokas and stories for children aged 4–14 — taught with patience, so *values* and *devotion* grow naturally.",
    heroImage: "/images/course/hero-jijnasa.webp",
    heroAlt: "Dr. Jyothi Sharma",
    heroCard: { icon: "child", title: "Ages 4–14", text: "small, friendly batches" },
    journeyTitle: "Jijñāsā",
    journey: [
      { icon: "child", tag: "Nitya prārthanā", title: "Daily prayers", text: "Short prayers for morning, meals and night." },
      { icon: "palm", tag: "Kathā", title: "Stories & values", text: "Stories from our tradition that build character." },
      { icon: "sound", tag: "Śloka", title: "Ślokas by heart", text: "Learn ślokas with clear pronunciation and meaning." },
      { icon: "home", tag: "Kuṭumba", title: "Chanting with family", text: "Practise at home, together with parents." },
    ],
    teachers: ["jyothi"],
  },
};

export function getCourseExperience(slug: string): CourseExperience {
  return COURSE_EXPERIENCE[slug] || {};
}

export const DEFAULT_FACTS = LIVE_FACTS;
