import { delay } from "@/core/helpers";
import { parseResponse } from "@/shared/models";

export const resendCode = async (props: { email: string }) => {
  console.log(`[C_resendCode]: `, props);
  await delay(1000);
  const res = parseResponse({ hasError: false });
  return res;
};

export const verifyCode = async (props: { email: string; code?: string }) => {
  console.log(`[C_verifyCode]: `, props);
  await delay(1000);
  const res = parseResponse({ hasError: false });
  return res;
};
