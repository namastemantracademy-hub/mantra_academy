import mongoose, { Schema } from "mongoose";

// Small key/value settings editable from admin (e.g. personal class price).
const SiteSettingSchema = new Schema({ key: { type: String, required: true, unique: true }, value: Schema.Types.Mixed }, { timestamps: true });

export const SiteSetting = mongoose.models.SiteSetting || mongoose.model("SiteSetting", SiteSettingSchema);
