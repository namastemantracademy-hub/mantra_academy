import connectToDatabase from "@/lib/mongodb";
import { SiteSetting } from "@/models/site-setting";
import { cleanPricing, DEFAULT_PERSONAL_PRICING, type PersonalPricing } from "@/lib/personal-pricing";

export async function getPersonalPricing(): Promise<PersonalPricing> {
  try {
    await connectToDatabase();
    const doc: any = await SiteSetting.findOne({ key: "personalPricing" }).lean();
    return doc ? cleanPricing(doc.value) : DEFAULT_PERSONAL_PRICING;
  } catch {
    return DEFAULT_PERSONAL_PRICING;
  }
}

export async function setPersonalPricing(v: PersonalPricing) {
  await connectToDatabase();
  const value = cleanPricing(v);
  await SiteSetting.findOneAndUpdate({ key: "personalPricing" }, { $set: { value } }, { upsert: true });
  return value;
}
