import { CLink } from "@/components/custom/button/CLink";

export const OtherPageSignin = () => {
  return (
    <CLink
      href="/signup"
      replace
      className="text-primary text-sm hover:underline"
    >
      Henüz bir hesabınız yok mu?
    </CLink>
  );
};

export const OtherPageSignup = () => {
  return (
    <CLink
      href="/signin"
      replace
      className="text-primary text-sm hover:underline"
    >
      Zaten bir hesabınız var mı?
    </CLink>
  );
};
