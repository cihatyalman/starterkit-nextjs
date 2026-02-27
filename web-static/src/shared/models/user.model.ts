import { z } from "zod";
import { mapBase, RawBaseSchema } from "./base.model";
import { dataSchemes } from "./_schema";
import { toDateFromString } from "@/infrastructure/helpers/date";

const RawUserSchema = RawBaseSchema.extend({
  role: z.number(),
  username: z.string(),
  fullname: z.string(),
  profileImageUrl: z.string().nullable().optional(),
  lastLoginDate: dataSchemes.datetime,
});

export const UserSchema = RawUserSchema.transform((raw) => ({
  ...mapBase(raw),
  role: raw.role,
  username: raw.username,
  fullname: raw.fullname,
  profileImageUrl: raw.profileImageUrl,
  lastLoginDate: raw.lastLoginDate ? toDateFromString(raw.lastLoginDate) : null,
}));
export type User = z.infer<typeof UserSchema>;

/* #region Helpers */
export function parseUser(data: MyAny): User {
  return UserSchema.parse(data);
}

export function parseUserList(data: MyAny): User[] {
  return z.array(UserSchema).parse(data);
}
/* #endregion */
