import { z } from "zod";
import { mapBase, RawBaseSchema } from "./base.model";
import { dataSchemes } from "./_schema";
import { toDateFromString } from "@/core/helpers/date";

const RawUserSchema = RawBaseSchema.extend({
  Role: z.number(),
  Username: z.string(),
  Fullname: z.string(),
  ProfileImageUrl: z.string().nullable().optional(),
  LastLoginDate: dataSchemes.datetime,
});

export const UserSchema = RawUserSchema.transform((raw) => ({
  ...mapBase(raw),
  role: raw.Role,
  username: raw.Username,
  fullname: raw.Fullname,
  profileImageUrl: raw.ProfileImageUrl,
  lastLoginDate: raw.LastLoginDate ? toDateFromString(raw.LastLoginDate) : null,
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
