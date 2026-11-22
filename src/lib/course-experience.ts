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
  /** Courses list: filter group and position (lower = earlier) */
  group?: "chanting" | "puja" | "sanskrit" | "children";
  order?: number;
  /** Suggested group price in US$ (admin can override per course). */
  usd?: number;
  /** Offer one-to-one personal classes for this course. */
  personal?: boolean;
  /** Course-content line on the personal (one-to-one) card. */
  personalLine?: string;
  /** Courses list: one short line on the card */
  cardLine?: string;
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
  /** Extra sections (shown only when present) */
  forYouNote?: string;
  about?: { eyebrow: string; title: string; intro: string; parts: { icon: IllusName; name: string; tag: string; text: string }[]; note?: string };
  support?: { title: string; text: string; live?: boolean }[];
  supportTitle?: string;
  curriculum?: { intro: string; modules: { title: string; text: string }[] };
  benefits?: { icon: IllusName; title: string; text: string }[];
  badges?: string[];
  onboarding?: { title: string; steps: string[]; note?: string };
  includes?: string[];
  teacherStats?: string;
  foundersNote?: { greeting: string; paragraphs: string[]; signoff: string };
  faqs?: { question: string; answer: string }[];
  finalTitle?: string;
  seo?: { title: string; description: string };
};

export const TEACHERS: Record<TeacherId, { name: string; role: string; image: string; bio: string }> = {
  karthik: {
    name: "Dr. Karthik Sharma",
    role: "Āchārya · Co-founder",
    image: "/images/course/teacher-karthik.webp",
    bio: "13 years of Gurukula study — Kṛṣṇa Yajurveda, Upaniṣads and Vedānta under Dr. Ramachandra Bhat Kotemane. Vidwat (M.A.), M.Phil and Ph.D. (Vidyāvāridhi) in Advaita Vedānta.",
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
    group: "puja",
    order: 2,
    cardLine: "The complete 16-step pūjā — every mantra, its meaning and how to perform it at home.",
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
    group: "chanting",
    order: 1,
    usd: 25, personal: true,
    personalLine: "All 14 modules of Namakam and Chamakam — svara, padapāṭha and meaning",
    cardLine: "Namakam and Chamakam with svara, padapāṭha and meaning — anuvāka by anuvāka.",
    displayTitle: "Śrī Rudra Praśnaḥ Sādhana",
    eyebrow: "Learn Śrī Rudram the way the Veda is meant to be chanted",
    subtitle: "Namakam and Chamakam from the Kṛṣṇa Yajurveda",
    lead: "Learned with correct *svara*, *padapāṭha*, word-by-word meaning and personal chanting correction. Śrī Rudram is not a song to memorise — in the Veda, the sound is the mantra. This sādhana takes you from your first syllable to chanting all eleven anuvākas with confidence, clarity and devotion.",
    heroImage: "/images/course/hero-rudra.webp",
    heroAlt: "Dr. Karthik Sharma chanting, marking the svara with his hand",
    heroCard: { icon: "mala", title: "Live with your Āchārya", text: "every class recorded" },
    stats: { completed: "100+", rating: "4.9" },
    facts: [
      ["Live classes", "on Google Meet"],
      ["14 modules", "Namakam & Chamakam"],
      ["English", "texts in Devanagari"],
      ["Recordings", "of every class"],
      ["Course manual", "Rudra Śikṣā"],
    ],
    badges: [
      "Beginners welcome",
      "No Sanskrit needed",
      "Taught in English",
      "Devanagari & transliteration",
      "Personal chanting correction",
      "Live classes + recordings",
    ],
    forYou: [
      "“I listen to Rudram every Monday, but I can’t chant it myself.”",
      "“I chant along, but I don’t know if my svaras are right.”",
      "“I tried learning from videos and got lost after the second anuvāka.”",
      "“I want to take part in Rudrābhiṣeka at my temple, not just watch.”",
      "“I know the sound, but not what I am saying.”",
      "“I am going through a hard time and want a practice that holds me.”",
    ],
    forYouNote: "If even one of these is you, this sādhana was built for you.",
    about: {
      eyebrow: "About Śrī Rudram",
      title: "The heart of the *Yajurveda*",
      intro: "Śrī Rudram, also called Rudra Praśnaḥ or Śatarudrīya, is found in the Taittirīya Saṃhitā of the Kṛṣṇa Yajurveda. It has two parts.",
      parts: [
        { icon: "lotus", name: "Namakam", tag: "namaḥ · “I bow”", text: "Eleven anuvākas of salutations to Rudra in every form: fierce and gentle, in the forest and the home, in the river and the dust. Its eighth anuvāka carries the Pañcākṣarī: namaḥ śivāya ca śivatarāya ca." },
        { icon: "kalasha", name: "Chamakam", tag: "ca me · “and for me”", text: "Eleven anuvākas of prayer, asking for everything a full life needs — from food and health to wisdom and the fruit of yajña." },
      ],
      note: "The Jabāla and Kaivalya Upaniṣads praise its recitation. It is the core of Rudrābhiṣeka, and of the Ekādaśa Rudra, Laghu Rudra, Mahā Rudra and Ati Rudra recitations in temples across India.",
    },
    gurukula: true,
    journeyTitle: "Śrī Rudram",
    journeyIntro: "Seven steps, one anuvāka at a time.",
    journey: [
      { icon: "letters", tag: "Varṇa-Śikṣā", title: "Sound basics", text: "The sounds of Sanskrit, where each is born in the mouth, and the rules for visarga, anusvāra and long vowels." },
      { icon: "svara", tag: "Svara", title: "The Vedic accents", text: "Udātta, anudātta, svarita and pracaya: how to read the accent marks and move your hand with them." },
      { icon: "pada", tag: "Padapāṭha", title: "Word by word", text: "Each mantra broken into its words before it is joined back, so you know where one word ends and the next begins." },
      { icon: "sound", tag: "Uccāraṇa", title: "Guided chanting", text: "Chant line by line after the Āchārya, slowly at first, then at natural pace, until it flows." },
      { icon: "palm", tag: "Padārtha", title: "Meaning of every word", text: "A plain-English meaning for each word and each mantra." },
      { icon: "lotus", tag: "Gūḍhārtha", title: "Deeper significance", text: "What the tradition and its commentators say — no invented stories." },
      { icon: "linga", tag: "Sādhana", title: "Chant as offering", text: "Bring it together with bhāva: in daily pūjā, on Mondays and Pradoṣa, or in abhiṣeka." },
    ],
    journeyNote: "The goal is not to finish Rudram. The goal is for Rudram to *become yours*.",
    path: [
      { title: "1 · Rudram", text: "Namakam · anuvākas 1–11" },
      { title: "2 · Chamakam", text: "anuvākas 1–11" },
      { title: "3 · Puruṣa Sūktam", text: "hymn to the Cosmic Person" },
    ],
    supportTitle: "Learn live. *Never alone.*",
    support: [
      { title: "Live classes", text: "Chant together with the Āchārya on Google Meet and get feedback on svara and flow.", live: true },
      { title: "Chanting correction", text: "Your chanting corrected one by one, in class — every svara, every visarga." },
      { title: "Questions answered", text: "Bring any doubt about sound, meaning or practice to class." },
      { title: "Recordings", text: "Every class is recorded, so you can revise or catch up anytime." },
      { title: "WhatsApp support", text: "Stuck on one line? Send a voice note to your batch group." },
      { title: "Rudra sādhaka community", text: "Chant alongside seekers from 12 countries, and stay connected after your course." },
    ],
    curriculum: {
      intro: "14 modules, anuvāka by anuvāka. Every lesson uses the Devanagari text with svara marks, transliteration, padapāṭha and word meaning.",
      modules: [
        { title: "Module 0 · Foundations", text: "Sanskrit sounds, reading svara marks, hand movement for svara, posture and saṅkalpa, Śānti pāṭha and the Rudra Dhyāna śloka." },
        { title: "Module 1 · Namakam, Anuvāka 1 — namaste rudra manyava", text: "Salutation to Rudra’s wrath and weapons, and the prayer that his arrow, bow and form become auspicious. Rudra as the first physician." },
        { title: "Module 2 · Anuvāka 2 — namo hiraṇyabāhave", text: "Rudra as the golden-armed leader, lord of the directions, trees, paths, animals and food." },
        { title: "Module 3 · Anuvāka 3 — namaḥ sahamānāya", text: "Rudra as the conqueror, present even in those who wander by night. Nothing is outside him." },
        { title: "Module 4 · Anuvāka 4 — nama āvyādhinībhyaḥ", text: "Rudra as the hosts and groups of beings, and as carpenters, chariot-makers, potters, smiths and hunters." },
        { title: "Module 5 · Anuvāka 5 — namo bhavāya ca rudrāya ca", text: "The names Bhava, Śarva, Paśupati, Nīlagrīva and Śitikaṇṭha. Rudra in the waters and in all that comes first." },
        { title: "Module 6 · Anuvāka 6 — namo jyeṣṭhāya ca kaniṣṭhāya ca", text: "Rudra as the eldest and the youngest, in every age, time and world." },
        { title: "Module 7 · Anuvāka 7 — namo dundubhyāya ca", text: "Rudra in the drum, the messenger and the warrior; in streams, lakes, rain and cloud." },
        { title: "Module 8 · Anuvāka 8 — namaḥ somāya ca rudrāya ca", text: "Śambhu, Mayobhava, Śaṅkara, and the Pañcākṣarī: namaḥ śivāya ca śivatarāya ca. Rudra at the sacred tīrthas." },
        { title: "Module 9 · Anuvāka 9 — nama iriṇyāya ca prapathyāya ca", text: "Rudra in barren land, highways, leaves and homes — the very hearts of the devas." },
        { title: "Module 10 · Anuvāka 10 — drāpe andhasaspate", text: "Prayers for the protection of family, people and cattle. Rudra as the most gracious." },
        { title: "Module 11 · Anuvāka 11 and closing mantras — sahasrāṇi sahasraśaḥ", text: "The thousands of Rudras in earth, sky and heaven, and the closing mantras including tryambakaṃ yajāmahe." },
        { title: "Module 12 · Chamakam, Anuvākas 1–11 — agnāviṣṇū · vājaś ca me", text: "Prayers for strength, leadership, happiness, food, earth and its metals, the devas, the yajña and its vessels, cattle, and the sacred number sequences." },
        { title: "Module 13 · Integration", text: "The full Rudram at natural pace, the Ekādaśa Rudra method, and a final chant with your Āchārya." },
      ],
    },
    benefits: [
      { icon: "diya", title: "A steady anchor", text: "A practice to return to every day, whatever the day brings." },
      { icon: "lotus", title: "Clarity and focus", text: "Vedic chanting asks for full attention, and the mind learns to settle." },
      { icon: "linga", title: "Confidence in sacred spaces", text: "Chant with the priests at Rudrābhiṣeka instead of only listening." },
      { icon: "palm", title: "Rooted in an unbroken tradition", text: "Learn svara as it has been passed down in Veda pāṭhaśālās." },
      { icon: "pada", title: "Understanding, not just sound", text: "Know what you ask for in every “ca me”." },
      { icon: "trishula", title: "A living bond with Śiva", text: "Salute him in every form, and begin to see him everywhere." },
    ],
    onboarding: {
      title: "How your sādhana begins",
      steps: [
        "Register and pay securely online.",
        "Within 24 hours, we add you to your batch WhatsApp group.",
        "Receive the Rudra Śikṣā course manual.",
        "Take your saṅkalpa — a simple resolve, guided in the first class.",
        "Begin with Module 0: sound and svara.",
        "Chant daily, even if only one line.",
      ],
    },
    includes: [
      "Live classes on Google Meet with your Āchārya",
      "All 14 modules of Namakam and Chamakam",
      "Svara, padapāṭha and meaning for every mantra",
      "Recordings of every class",
      "Rudra Śikṣā course manual",
      "Personal chanting correction",
      "WhatsApp support with your batch",
    ],
    teachers: ["karthik"],
    teacherStats: "Ph.D. in Advaita Vedānta · 13 years of Veda study · 7 years teaching · 220+ students · 12 countries",
    testimonials: [
      { quote: "What I really appreciate is the attention to detail he gives to pronunciation, clarity, and small corrections. The recordings provided for practice are extremely helpful. Highly recommend Mantra Academy to anyone who wants to learn Rudram with proper pronunciation, discipline, and understanding.", name: "Vamsee K.", place: "Austin, USA", stars: true },
      { quote: "Extremely patient with us, wonderful attention to each and every word — udātta, anudātta and svaritam. Personal attention to each and every student.", name: "Danny F.", place: "Chartered Accountant, Dubai" },
      { quote: "Acharya not only teaches the Vedas but also explains the gist of what each verse is about. The class is structured, slow paced and enjoyable — similar to a gurukulam way of learning.", name: "Kruthivasan A.", place: "Stamford, USA" },
    ],
    foundersNote: {
      greeting: "Dear seeker,",
      paragraphs: [
        "We started Mantra Academy because so many people told us the same thing: “I love Rudram, but I don’t know how to chant it properly.”",
        "The Veda has been kept alive for thousands of years by careful teaching — one student, one syllable at a time. We have tried to build that same care into every class.",
        "Go slowly. Chant daily, even if only one line. We will be with you.",
      ],
      signoff: "With praṇāms, Dr. Karthik Sharma & Dr. Jyothi Sharma",
    },
    faqs: [
      { question: "I have never chanted Sanskrit. Can I join?", answer: "Yes. Module 0 starts from the sounds and the svara marks. Most of our students have no Sanskrit background." },
      { question: "How long does it take to learn the whole Rudram?", answer: "The batch moves anuvāka by anuvāka — Namakam first, then Chamakam. With regular classes and 20–30 minutes of daily practice, you will chant with growing confidence week by week." },
      { question: "Which svara tradition do you teach?", answer: "The Taittirīya (Kṛṣṇa Yajurveda) svara as taught in the Śṛṅgeri tradition. Regional styles differ slightly, and we explain this in Module 0." },
      { question: "Will I learn the meaning?", answer: "Yes — word by word for every mantra, with the deeper significance from traditional commentaries." },
      { question: "Do you teach Laghunyāsa and Rudrābhiṣeka?", answer: "The Dhyāna śloka is part of Module 0. Laghunyāsa and the Rudrābhiṣeka procedure will be offered as a separate course." },
      { question: "Are there food or lifestyle guidelines?", answer: "Chant after a bath, in clean clothes, at a regular time. Many sādhakas avoid alcohol and meat on the days they chant. Sincerity matters most." },
      { question: "What if I miss a class?", answer: "Every class is recorded. Watch it, practise, and bring your doubts to the next class or the WhatsApp group." },
      { question: "How does chanting correction work?", answer: "In class, the Āchārya listens to each student and corrects svara and pronunciation one by one. Between classes, you can send a voice note on WhatsApp." },
      { question: "How do the fees work?", answer: "The amount you pay here is your registration fee and also counts as your first month's fee. Fees from the second month are collected separately; we share the details after you join." },
      { question: "What is the refund policy?", answer: "You can ask for a refund within 7 days of payment or before your second class, whichever comes first — minus the small payment-gateway charge. See our refund policy for details." },
      { question: "What do I need?", answer: "A phone, tablet or computer, a stable internet connection and headphones. A printed course manual helps." },
    ],
    finalTitle: "Let Rudram become your *daily offering*",
    finalLine: "One line at a time. One anuvāka at a time. With a teacher beside you.",
    seo: {
      title: "Learn Sri Rudram Chanting | Namakam & Chamakam with Svara | Mantra Academy",
      description: "Learn Śrī Rudram (Rudra Praśnaḥ) live with correct svara, padapāṭha, word-by-word meaning and personal chanting correction. Beginners welcome.",
    },
  },

  // ---------------- Sanskrit Orientation ----------------
  "sanskrit-orientation": {
    group: "sanskrit",
    order: 5,
    usd: 45,
    cardLine: "Script, sounds, reading and your first sentences in the Devabhāṣā.",
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
    group: "chanting",
    order: 4,
    usd: 25, personal: true,
    personalLine: "Vedic chanting from the foundations — sounds, svara and meaning",
    cardLine: "An introduction to the Vedas and the art of Vedic chanting — the right foundation.",
    displayTitle: "Vedaśikṣā",
    subtitle: "An introduction to the Vedas and Vedic chanting",
    lead: "Begin your journey into the Vedas the traditional way — hear the *svara* from your teacher, repeat it exactly, and understand what you chant.",
    heroImage: "/images/course/hero-vedashiksha.webp",
    heroAlt: "Dr. Karthik Sharma with a Veda text",
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
    group: "chanting",
    order: 3,
    usd: 25, personal: true,
    personalLine: "The seven hundred verses of the Saptaśatī — svara, pronunciation and meaning",
    cardLine: "A journey into the Devī tradition through the seven hundred verses.",
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
    group: "children",
    order: 6,
    usd: 25, personal: true,
    personalLine: "Prayers, ślokas and stories chosen for your child’s age",
    cardLine: "Daily prayers, ślokas and stories for children aged 4–14.",
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
