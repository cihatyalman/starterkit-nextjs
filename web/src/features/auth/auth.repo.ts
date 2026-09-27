import { delay } from "@/core/helpers";
import { parseResponse } from "@/shared/models";
import { SigninModel } from "./models/signin.model";
import { SignupModel } from "./models/signup.model";

export const signin = async (props: SigninModel) => {
  console.log(`[C_signin]: `, props);
  await delay(1000);
  const res = parseResponse({ hasError: false });
  return res;
};

export const signup = async (props: SignupModel) => {
  console.log(`[C_signup]: `, props);
  await delay(1000);
  const res = parseResponse({ hasError: false });
  return res;
};

export const forgotPassword = async (props: { email: string }) => {
  console.log(`[C_forgotPassword]: `, props);
  await delay(1000);
  const res = parseResponse({ hasError: false });
  return res;
};

export const updatePassword = async (props: {
  email: string;
  code?: string;
  password?: string;
  confirmPassword?: string;
}) => {
  console.log(`[C_updatePassword]: `, props);
  await delay(1000);
  const res = parseResponse({ hasError: false });
  return res;
};
