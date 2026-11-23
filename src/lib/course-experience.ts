// Extra, hand-written content for each course page (the "Sacred Night" design).
// Price, fee type, FAQs, dates and the Pay & Enroll flow still come from the database / admin.
// Anything left out here falls back to the database, so a new course still gets a full page.
import type { IllusName } from "@/components/course/illustrations";

export type JourneyStep = { icon: IllusName; tag: string; title: string; text: string };
export type Testimonial = { quote: string; name: string; place?: string; stars?: boolean };
export type TeacherId = "karthik" | "jyothi" | "vishwa";
export type VedaExtras = {
  sample: { deva: string; roman: string; meaning: string; source: string; caption: string };
  foundations?: { title: string; text: string }[];
  sikshaIntro: string;
  lessons: { deva: string; name: string; text: string }[];
  svaraStory: string;
  svaraClose: string;
  takes: [string, string][];
};

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
  about?: { eyebrow: string; title: string; intro: string; parts: { icon: IllusName; name: string; tag: string; text: string; source?: string; puja?: string }[]; note?: string; small?: string };
  /** Show only the learning-path strip in "How you'll learn" (no step cards). */
  pathOnly?: boolean;
  /** Small card linking to a related course. */
  goDeeper?: { eyebrow: string; title: string; text: string; href: string; cta: string };
  /** Vedaśikṣā: extra immersive sections (shown only when present). */
  veda?: VedaExtras;
  /** Interactive Pañcāyatana diagram. "sukta" labels each deity with its Vedic hymn; "form" with its sacred stone. */
  pancayatana?: { eyebrow: string; title: string; text: string; label: "sukta" | "form" };
  /** Course manual preview: small tilted pages (not readable, not downloadable). */
  manual?: { title: string; text: string; langs?: string; pages: { src: string; alt: string }[] };
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
  /** Link preview (WhatsApp, Facebook…): short title and selling line; the card image is /images/share/<slug>.jpg */
  share?: { title: string; text: string };
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
  vishwa: {
    name: "Vishwaradhyaswamy C Hiremath",
    role: "Āchārya",
    image: "/images/course/teacher-vishwa.webp",
    bio: "13 years of Gurukula training — Prabodhini Gurukulam and Veda Vijñāna Gurukulam. Master's in Advaita Vedānta and Śakti Viśiṣṭādvaita Vedānta. Teaches Veda and Saṃskṛta as an Assistant Professor at an Ayurvedic Medical College.",
  },
};

const LIVE_FACTS: [string, string][] = [
  ["Live classes", "on Google Meet"],
  ["Recordings", "of every session"],
];

export const COURSE_EXPERIENCE: Record<string, CourseExperience> = {
  // ---------------- Pūjā Vidhi ----------------
  "mantras-for-healing": {
    share: { title: "Pūjā Vidhi — Live Workshop | Mantra Academy", text: "Learn the complete 16-step pūjā live — correct mantras, the meaning of every step, and a manual in 5 languages." },
    group: "puja",
    order: 2,
    cardLine: "The complete 16-step pūjā — every mantra, its meaning and how to perform it at home.",
    displayTitle: "Pūjā Vidhi",
    eyebrow: "Live online workshop · Registrations open",
    subtitle: "The 16 Upachāra Pūjā, the traditional way",
    lead: "From *Āvāhana* to *Visarjana* — learn what to do, why and how, with correct mantra pronunciation, so every offering at home is done with understanding.",
    heroImage: "/images/course/hero-puja-vidhi.webp",
    heroAlt: "Dr. Karthik Sharma",
    heroCard: { icon: "palm", title: "Course manual", text: "in 5 languages · yours to keep" },
    stats: { completed: "52+", rating: "4.9" },
    facts: [
      ["20 live classes", "on Google Meet"],
      ["3 months", "2 classes a week"],
      ["English", "& Sanskrit"],
      ["Recordings", "of every session"],
      ["Course manual", "in 5 languages"],
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
      { icon: "flowers", tag: "Ṣoḍaśa Upacāra", title: "The 16 offerings", text: "Each upacāra demonstrated, then practised — and what each one means. In Vedic pūjā, each is offered with a verse of the Puruṣa Sūktam." },
      { icon: "arati", tag: "Naivedya & Ārati", title: "Offer with devotion", text: "Naivedya, ārati and prayers — understanding the bhāva behind them." },
      { icon: "home", tag: "Visarjana & Sādhanā", title: "Your pūjā at home", text: "Conclude correctly and perform the full pūjā yourself, with your course manual." },
    ],
    journeyNote: "You're not just learning steps — you're learning to offer them with *understanding* and *bhāva*.",
    teachers: ["karthik", "jyothi"],
    testimonials: [
      { quote: "Acharya clearly explains each aspect of Pooja Vidhi and why & how we should do it. Questions were answered with no room for doubt. It gave me a lot of confidence and motivation to perform the Pooja Vidhi.", name: "Student", place: "Germany", stars: true },
      { quote: "Got to know the Nithya Pooja vidhana in more detail. This gives me confidence that I am not doing it wrongly.", name: "Srirama V.", place: "India" },
      { quote: "Experience of learning Puja Vidhi mantras and the process has been very pleasant, enriching and very professionally delivered.", name: "Krishna M. C.", place: "Professor, Bengaluru" },
    ],
    pancayatana: {
      eyebrow: "Pañcāyatana pūjā",
      title: "Five forms. *One Divine.*",
      text: "Many homes worship five deities together — Gaṇapati, Sūrya, Viṣṇu, Devī and Śiva — as five forms of the one Brahman. Tradition credits Ādi Śaṅkarācārya with giving this pūjā to householders. Your iṣṭa devatā sits in the centre; each is worshipped in a sacred natural form.",
      label: "form",
    },
    manual: {
      title: "An 18-page *course manual.*",
      text: "Every step of the pūjā — each mantra with svara marks, and simple guidance for every offering. Yours to keep.",
      langs: "English · Sanskrit · Kannada · Tamil · Telugu",
      pages: [
        { src: "/images/course/manual/puja-cover.webp", alt: "Pūjā Vidhi manual cover" },
        { src: "/images/course/manual/puja-read-chant.webp", alt: "Manual page: how to read and chant" },
        { src: "/images/course/manual/puja-purvanga.webp", alt: "Manual page: Pūrvāṅgapūjā" },
        { src: "/images/course/manual/puja-pancamrta.webp", alt: "Manual page: Pañcāmṛta snāna" },
        { src: "/images/course/manual/puja-pradakshina.webp", alt: "Manual page: Uttarāṅgapūjā and pradakṣiṇa" },
      ],
    },
    goDeeper: {
      eyebrow: "Your next step",
      title: "After Pūjā Vidhi, offer it with *Vedic mantras*",
      text: "Vedaśikṣā teaches the five sūktas of the Pañcāyatana — one for each deity: Gaṇapati, Sūrya, Nārāyaṇa, Devī and Śiva.",
      href: "/courses/vedashiksha-introduction-to-vedas",
      cta: "Explore Vedaśikṣā",
    },
    finalLine: "Learn it once, properly — and carry it for a lifetime.",
  },

  // ---------------- Śrī Rudra Adhyayana ----------------
  "rudrachamakam-course": {
    share: { title: "Śrī Rudram — Live & Guided | Mantra Academy", text: "Learn Namakam, Chamakam and Puruṣa Sūktam live — correct svara, meaning, personal correction and a 40-page manual." },
    group: "chanting",
    order: 1,
    usd: 25, personal: true,
    personalLine: "All 15 modules — Namakam, Chamakam and Puruṣa Sūktam — with svara, padapāṭha and meaning",
    cardLine: "Namakam and Chamakam with svara, padapāṭha and meaning — anuvāka by anuvāka.",
    displayTitle: "Śrī Rudra Praśnaḥ Sādhana",
    eyebrow: "Learn Śrī Rudram the way the Veda is meant to be chanted",
    subtitle: "Namakam and Chamakam from the Kṛṣṇa Yajurveda",
    lead: "Learned with correct *svara*, *padapāṭha*, word-by-word meaning and personal chanting correction. Śrī Rudram is not a song to memorise — in the Veda, the sound is the mantra. This sādhana takes you from your first syllable to chanting all eleven anuvākas with confidence, clarity and devotion.",
    heroImage: "/images/course/hero-rudra.webp",
    heroAlt: "Dr. Karthik Sharma in traditional white vastra, smiling",
    heroCard: { icon: "mala", title: "Live with your Āchārya", text: "every class recorded" },
    stats: { completed: "100+", rating: "4.9" },
    facts: [
      ["Live classes", "on Google Meet"],
      ["15 modules", "Namakam, Chamakam & Puruṣa Sūktam"],
      ["English", "texts in Devanagari"],
      ["Recordings", "of every class"],
      ["Course manual", "in 5 scripts"],
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
      intro: "15 modules, anuvāka by anuvāka. Every lesson uses the Devanagari text with svara marks, transliteration, padapāṭha and word meaning.",
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
        { title: "Module 13 · Puruṣa Sūktam — sahasraśīrṣā puruṣaḥ", text: "The hymn to the Cosmic Person: the thousand-headed Puruṣa who pervades all that is, and the creation that arises from his offering." },
        { title: "Module 14 · Integration", text: "The full Rudram at natural pace, the Ekādaśa Rudra method, and a final chant with your Āchārya." },
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
      "All 15 modules — Namakam, Chamakam and Puruṣa Sūktam",
      "Svara, padapāṭha and meaning for every mantra",
      "Recordings of every class",
      "Rudra Śikṣā course manual",
      "Personal chanting correction",
      "WhatsApp support with your batch",
    ],
    manual: {
      title: "A 40-page illustrated *course manual.*",
      text: "Namakam, Chamakam and Puruṣa Sūktam with svara marks, a key to the svaras, and the meaning of Śrī Rudram explained.",
      langs: "English (IAST) · Devanagari · Kannada · Tamil · Telugu",
      pages: [
        { src: "/images/course/manual/rudra-cover.webp", alt: "Rudra Śikṣā manual cover" },
        { src: "/images/course/manual/rudra-svaras.webp", alt: "Manual page: key to the svaras" },
        { src: "/images/course/manual/rudra-namakam.webp", alt: "Manual page: Namakam, first anuvāka" },
        { src: "/images/course/manual/rudra-meaning.webp", alt: "Manual page: the meaning of Śrī Rudram" },
        { src: "/images/course/manual/rudra-chant.webp", alt: "Manual page: how to chant" },
      ],
    },
    teachers: ["karthik", "vishwa"],
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
      { question: "How long does it take to learn the whole Rudram?", answer: "The full course takes about 1 year. The batch moves anuvāka by anuvāka — Namakam first, then Chamakam and Puruṣa Sūktam. With regular classes and 20–30 minutes of daily practice, you will chant with growing confidence week by week." },
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
    share: { title: "Sanskrit Orientation | Mantra Academy", text: "Your first steps into the Devabhāṣā — script, sounds, reading and your first sentences, taught live." },
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
    share: { title: "Veda Śikṣā — Live & Guided | Mantra Academy", text: "Chant five Vedic sūktas with correct svara and meaning in six months — beginners welcome, with a 68-page manual." },
    group: "chanting",
    order: 4,
    usd: 25, personal: true,
    personalLine: "Vedic chanting from the foundations — sounds, svara and meaning",
    cardLine: "An introduction to the Vedas and the art of Vedic chanting — the right foundation.",
    displayTitle: "Vedaśikṣā",
    subtitle: "An introduction to the Vedas and Vedic chanting",
    lead: "In six months, learn to chant five Vedic sūktas with correct *svara* and meaning — and offer them in your own *pūjā*. Beginners welcome.",
    heroImage: "/images/course/hero-vedashiksha.webp",
    facts: [
      ["8 live classes", "every month"],
      ["6 months", "5 Vedic sūktas"],
      ["Beginners", "no Sanskrit needed"],
      ["Recordings", "of every class"],
      ["68-page manual", "illustrated"],
    ],
    heroAlt: "Dr. Karthik Sharma teaching, Sanskrit notes on the whiteboard behind",
    heroCard: { icon: "palm", title: "Gurukula method", text: "listen · repeat · correct" },
    forYou: [
      "I do pūjā at home, but I don't know the Vedic mantras.",
      "I want to chant correctly — not just listen.",
      "I have never read Sanskrit, and want to start properly.",
      "I want my daily sādhanā to have a Vedic foundation.",
    ],
    forYouNote: "If any of these is you, Vedaśikṣā is the right first step.",
    pathOnly: true,
    journeyTitle: "Vedaśikṣā",
    journey: [
      { icon: "palm", tag: "Paricaya", title: "What the Vedas are", text: "Where the Vedas come from and how they have been preserved." },
      { icon: "svara", tag: "Śikṣā", title: "Sounds & svara", text: "The sounds and pitch-accents that make Vedic chanting exact." },
      { icon: "ear", tag: "Guru-mukha", title: "First chants, by ear", text: "Listen to the teacher, repeat, and receive correction." },
      { icon: "mala", tag: "Abhyāsa", title: "Daily practice", text: "A steady routine so the chanting becomes your own." },
    ],
    journeyNote: "One sūkta at a time, over *six months* — with your teacher beside you.",
    path: [
      { title: "1 · Gaṇapati", text: "Gaṇapati Sūktam" },
      { title: "2 · Sūrya", text: "Saura Sūktam" },
      { title: "3 · Nārāyaṇa", text: "Puruṣa Sūktam" },
      { title: "4 · Devī", text: "Śrī Sūktam" },
      { title: "5 · Śiva", text: "Sadyojātādi Pañca Mantrāḥ" },
    ],
    about: {
      eyebrow: "What you will chant",
      title: "Five sūktas. *Five forms of the Divine.*",
      intro: "One Vedic hymn for each deity of the Pañcāyatana pūjā.",
      parts: [
        { icon: "kalasha", name: "Gaṇapati Sūktam", tag: "for Gaṇapati · gaṇānāṃ tvā", source: "Ṛgveda · twelve ṛks", text: "The Lord of the hosts, “seer among seers”. Without him, says the Veda, nothing is done.", puja: "Chanted first, at the start of every pūjā." },
        { icon: "diya", name: "Saura Sūktam", tag: "for Sūrya · sūryo devīm uṣasam", source: "Taittirīya Brāhmaṇa 2.8.7", text: "The rising Sun, eye of the world — for health, clear sight and the light of learning.", puja: "Sūrya arghya at sunrise; the Sun of the Pañcāyatana." },
        { icon: "lotus", name: "Puruṣa Sūktam", tag: "for Nārāyaṇa · sahasraśīrṣā puruṣaḥ", source: "Taittirīya Āraṇyaka 3.12–13 · Ṛgveda 10.90", text: "The Cosmic Person, whose heads are the heads of all beings — creation as one great offering.", puja: "A verse for each of the sixteen offerings." },
        { icon: "trishula", name: "Śrī Sūktam", tag: "for Devī · hiraṇyavarṇāṃ hariṇīm", source: "Ṛgveda Khila · fifteen ṛks", text: "Śrī — abundance, beauty and grace — invited to come and never leave.", puja: "Lakṣmī and Devī pūjā; Fridays and Varalakṣmī vrata." },
        { icon: "linga", name: "Sadyojātādi Pañca Mantrāḥ", tag: "for Śiva · sadyojātaṃ prapadyāmi", source: "Taittirīya Āraṇyaka 10 · Mahānārāyaṇa Upaniṣad", text: "Five mantras for Śiva’s five faces: Sadyojāta, Vāmadeva, Aghora, Tatpuruṣa and Īśāna.", puja: "The heart of Śiva pūjā and liṅgārcana." },
      ],
      note: "These sūktas will enrich your pūjā vidhi. Through them you worship and honour the divine energy in each form, and your sādhanā on these cosmic forces grows deeper.",
      small: "Meanings in the course follow the classical commentary of Sāyaṇācārya.",
    },
    veda: {
      sample: {
        deva: "ग॒णाना᳚-न्त्वा ग॒णप॑तिं हवामहे क॒वि-ङ्क॑वी॒नामु॑प॒मश्र॑वस्तमम् ।",
        roman: "gaṇānāṃ tvā gaṇapatiṃ havāmahe kaviṃ kavīnām upamaśravastamam |",
        meaning: "We invoke you, Lord of the hosts — seer among seers, of the highest renown.",
        source: "Ṛgveda 2.23.1",
        caption: "The line below a syllable, the stroke above it — these are svara marks. You will learn to read and chant them.",
      },
      sikshaIntro: "Śikṣā, the science of sound, is called the nose of the Veda — its breath. Our own Veda gives its six lessons in one line.",
      lessons: [
        { deva: "वर्णः", name: "Varṇa — the letter", text: "Each sound from its right place in the mouth." },
        { deva: "स्वरः", name: "Svara — the pitch", text: "Low, steady and rising — marked with voice and hand." },
        { deva: "मात्रा", name: "Mātrā — the length", text: "Short, long and prolated — each vowel its exact time." },
        { deva: "बलम्", name: "Bala — the effort", text: "Breath where it belongs, and none where it does not." },
        { deva: "साम", name: "Sāma — evenness", text: "A steady pace — neither rushed nor dragged." },
        { deva: "सन्तानः", name: "Santāna — the flow", text: "Words joined as the text joins them." },
      ],
      svaraStory: "Tvaṣṭṛ poured an offering into the fire, crying *“indraśatrur vardhasva”* — “grow, slayer of Indra!” But he chanted one svara wrongly, and the words meant “one whose slayer is Indra”. And so it happened. *One pitch changed the outcome.*",
      svaraClose: "This is why, in class, your chanting is corrected one svara at a time.",
      takes: [["6 months", "seven modules"], ["8 live classes", "every month, on Google Meet"], ["20 minutes", "of daily practice"]],
    },
    pancayatana: {
      eyebrow: "Pañcāyatana pūjā",
      title: "Why *these five?*",
      text: "Gaṇapati, Sūrya, Viṣṇu, Devī and Śiva — worshipped together as five forms of the one Brahman. Tradition credits Ādi Śaṅkarācārya with giving this pūjā to householders. Your chosen deity sits in the centre; each has its own Vedic sūkta.",
      label: "sukta",
    },
    manual: {
      title: "A 68-page illustrated *course manual.*",
      text: "The five hymns with svara marks, meanings after Sāyaṇācārya, a guide to Vedic sound and a daily practice plan.",
      pages: [
        { src: "/images/vedashiksha/manual-cover.webp", alt: "Vedaśikṣā manual cover" },
        { src: "/images/vedashiksha/manual-vidya-wheel.webp", alt: "Manual page: the eighteen branches of knowledge" },
        { src: "/images/vedashiksha/manual-vedangas.webp", alt: "Manual page: the six Vedāṅgas" },
        { src: "/images/vedashiksha/manual-varnamala.webp", alt: "Manual page: the Sanskrit letters" },
        { src: "/images/vedashiksha/manual-hymn-page.webp", alt: "Manual page: a hymn with svara marks" },
      ],
    },
    gurukula: true,
    support: [
      { title: "Live classes", text: "Chant together with your Āchārya on Google Meet — 8 classes a month.", live: true },
      { title: "Chanting correction", text: "Your chanting corrected one by one, in class — every svara, every syllable." },
      { title: "Questions answered", text: "Bring any doubt about sound, meaning or practice to class." },
      { title: "Recordings", text: "Every class is recorded, so you can revise or catch up anytime." },
      { title: "WhatsApp support", text: "Stuck on one line? Send a voice note to your batch group." },
      { title: "Daily practice e-guide", text: "A free e-guide to support your practice at home." },
    ],
    curriculum: {
      intro: "7 modules over 6 months. Every sūkta is taught with the Devanagari text, svara marks, transliteration and word meaning — and where it is chanted in pūjā.",
      modules: [
        { title: "Module 0 · Foundations", text: "What the Vedas are and how they have been preserved. Sanskrit sounds, reading svara marks, hand movement for svara, posture, and the Śānti pāṭha." },
        { title: "Module 1 · Gaṇapati Sūktam — gaṇānāṃ tvā gaṇapatiṃ havāmahe", text: "The invocation of Gaṇapati, Lord of the hosts — chanted first, at the start of every pūjā and every new beginning." },
        { title: "Module 2 · Saura Sūktam — sūryo devīm uṣasam", text: "The hymn to the rising Sun, the eye of the world — for health, clear sight and the radiance of learning. Its use in Sūrya arghya at sunrise." },
        { title: "Module 3 · Puruṣa Sūktam — sahasraśīrṣā puruṣaḥ", text: "The hymn to the Cosmic Person, Nārāyaṇa. How its verses go with the ṣoḍaśa upacāra — the sixteen offerings of pūjā." },
        { title: "Module 4 · Śrī Sūktam — hiraṇyavarṇāṃ hariṇīm", text: "The prayer to Śrī — the Divine Mother as abundance, beauty and grace. Its place in Lakṣmī and Devī pūjā, on Fridays and in the Varalakṣmī vrata." },
        { title: "Module 5 · Sadyojātādi Pañca Mantrāḥ — sadyojātaṃ prapadyāmi", text: "The five mantras of the five faces of Śiva — Sadyojāta, Vāmadeva, Aghora, Tatpuruṣa and Īśāna — used in Śiva pūjā and abhiṣeka." },
        { title: "Module 6 · In your pūjā", text: "All five sūktas at natural pace, where each is chanted in pūjā, and a final chant with your Āchārya." },
      ],
    },
    includes: [
      "Live classes on Google Meet · 8 a month",
      "5 sūktas over 6 months",
      "Svara and meaning for every mantra",
      "Recordings of every class",
      "68-page illustrated course manual",
      "Free daily-practice e-guide",
      "Personal chanting correction",
      "WhatsApp support with your batch",
    ],
    faqs: [
      { question: "Do I need to know Sanskrit?", answer: "No. Module 00 begins with the sounds and letters, and every mantra is given in transliteration as well as Devanagari." },
      { question: "Why learn live instead of from a book or video?", answer: "The Veda is learnt by ear, from the teacher’s voice. The Pāṇinīya Śikṣā even lists “one who chants from a written page” among the faults of a reciter. In class your chanting is heard and corrected, svara by svara." },
      { question: "How long is the course, and how much time do I need each day?", answer: "6 months, with 8 live classes a month. Each day, about twenty minutes: begin with the Śānti pāṭha, revise, learn the new lines, and read their meaning. You also receive a free e-guide for daily practice." },
      { question: "What will I be able to do after six months?", answer: "Chant all five hymns with correct svara, understand what they mean, and use them in your own pūjā." },
      { question: "Who are the teachers?", answer: "Dr. Karthik Sharma and Dr. Jyothi Sharma, inspired by Ācārya Dr. Ramachandra Bhat Kotemane." },
      { question: "What if I miss a class?", answer: "Every class is recorded. Watch it, practise, and bring your doubts to the next class or the WhatsApp group." },
      { question: "What should I learn after Vedaśikṣā?", answer: "Many students continue with Śrī Rudra Adhyayana (Namakam and Chamakam), which builds on the same svara foundation." },
      { question: "How do the fees work?", answer: "The amount you pay here is your registration fee and also counts as your first month's fee. Fees from the second month are collected separately; we share the details after you join." },
      { question: "Can I get a refund?", answer: "Yes — within 7 days of payment or before your second class, whichever comes first, minus the small payment-gateway charge. See our refund policy for details." },
      { question: "What do I need?", answer: "A phone, tablet or computer, a stable internet connection and headphones." },
    ],
    finalTitle: "Let the Vedic sūktas enter your *daily pūjā*",
    finalLine: "Five sūktas. Five forms of the Divine. One sādhanā, with a teacher beside you.",
    teachers: ["karthik", "jyothi", "vishwa"],
  },

  // ---------------- Durgā Saptaśatī ----------------
  "durga-saptashati": {
    share: { title: "Durgā Saptaśatī — Live & Guided | Mantra Academy", text: "A journey into the Devī tradition through the seven hundred verses — taught live by your Ācāryas." },
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
    share: { title: "Jijñāsā — for Children | Mantra Academy", text: "Daily prayers, ślokas and stories for children aged 4–14 — taught live, with patience." },
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
