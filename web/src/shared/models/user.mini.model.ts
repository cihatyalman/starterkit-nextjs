import { z } from "zod";
import { mapBase, RawBaseSchema } from "@/shared/models/base.model";
import { dataSchemas } from "@/shared/models/_schema";

const RawUserMiniSchema = RawBaseSchema.extend({
  role: z.number().catch(12),
  username: dataSchemas.string,
  fullname: dataSchemas.string,
  profileImageUrl: dataSchemas.stringNullable,
});
export const UserMiniSchema = RawUserMiniSchema.transform((raw) => ({
  ...mapBase(raw),
  role: raw.role,
  username: raw.username,
  fullname: raw.fullname,
  profileImageUrl: raw.profileImageUrl,
}));
export type UserMiniModel = z.infer<typeof UserMiniSchema>;

/* #region Helpers */
export function parseUserMini(data: unknown): UserMiniModel {
  return UserMiniSchema.parse(data);
}
export function parseUserMiniList(data: unknown): UserMiniModel[] {
  return z.array(UserMiniSchema).parse(data);
}
/* #endregion */
