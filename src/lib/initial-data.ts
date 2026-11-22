// Minimal initial data placeholders (cleared sample/default data)

export type BlogPost = {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
};

export const blogPosts: BlogPost[] = [];

export type Course = {
  slug: string;
  title: string;
  category: string;
  featured?: boolean;
  image: string;
  description: string;
  fullDescription: string;
  price: number;
  // "registration" (default): price is a registration fee that also covers the first month.
  // "full": price is the total fee (e.g. a workshop).
  feeType?: "registration" | "full";
  rating: number;
  reviews: number;
  // total duration in minutes
  duration: number;
  lectures: number;
  level: string;
  language: string;
  instructor: {
    name: string;
    title: string;
    image: string;
  };
  curriculum: {
    title: string;
    lessons: {
      title: string;
      // duration in minutes
      durationMinutes: number;
    }[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  highlights?: {
    title: string;
    description: string;
  }[];
  whoCanAttend?: {
    title: string;
    description: string;
  }[];
  badges?: {
    title: string;
    subtitle?: string;
    icon?: string;
  }[];
  startDate?: string;
  /** e.g. "52+" — shown as "52+ completed" */
  studentsCompleted?: string;
  /** e.g. "4.9" — only from real student ratings; blank hides it */
  studentRating?: string;
  /** e.g. "Mon & Thu · 7:00–8:15 PM IST" */
  batchInfo?: string;
  /** false = "Join the waitlist" instead of Pay & Enroll */
  registrationsOpen?: boolean;
  priceUSD?: number;
  personalClasses?: boolean;
};

export const instructors: Record<string, { name: string; title: string; image: string }> = {};

export const courses: Course[] = [];

export const initialAnnouncements: any[] = [];
