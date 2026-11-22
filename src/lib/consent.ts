import { z } from "zod";

/**
 * Consent under India's Digital Personal Data Protection (DPDP) Act.
 * Every form that collects personal details asks for a clear "yes" (an unticked
 * box the person ticks), and we save when they agreed and to which version of
 * our policies. Change POLICY_VERSION whenever the Terms or Privacy Policy change.
 */
export const POLICY_VERSION = "2026-11-22";

/** Courses taught to children: a parent or guardian must give consent. */
export const CHILD_COURSES = ["jijs"];
export const isChildCourse = (slug: string) => CHILD_COURSES.includes(slug);

/** Fields every public form sends. */
export const consentBody = {
  consent: z.literal(true, { errorMap: () => ({ message: "Please tick the box to give your consent." }) }),
  guardian: z.boolean().optional(),
};

/** Returns an error message if a child course is missing guardian consent. */
export function guardianProblem(slug: string, guardian?: boolean) {
  return isChildCourse(slug) && guardian !== true
    ? "Please confirm you are the child's parent or guardian."
    : "";
}

/** What we store as proof of consent. */
export function consentRecord(slug: string, guardian?: boolean) {
  return {
    agreedAt: new Date(),
    version: POLICY_VERSION,
    ...(isChildCourse(slug) ? { guardian: guardian === true } : {}),
  };
}

/** Mongoose sub-document definition for the consent record. */
export const consentSchemaDef = {
  agreedAt: { type: Date },
  version: { type: String },
  guardian: { type: Boolean },
};
