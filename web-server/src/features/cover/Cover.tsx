import { CLink } from "@/components/custom/CLink";
import { GithubButton } from "@/shared/ui/GithubButton";

export const Cover = () => {
  return (
    <div
      className="relative h-[35svh] w-full px-2 short:h-[50svh]
      flex flex-col justify-center items-center
      text-center
      inset-0 z-1 bg-linear-to-br
      from-background via-indigo-500/20 to-background
      *:max-w-6xl *:px-3"
    >
      <h1 className="text-6xl sm:text-8xl font-bold mix-blend-overlay mt-20">
        <span>Starter</span>
        <span className="text-(--color-primary)">Kit</span>
      </h1>
      <p className="text-accent-foreground text-sm sm:text-base">
        Next.js projeleriniz için başlangıç kiti
      </p>
      <div className="h-6" />
      <GithubButton />
      <div className="h-10" />
      <p className="absolute bottom-0 text-sm sm:text-base text-accent-foreground">
        Sadece server olan özellikler burada bulunur. Tüm özellikler için{" "}
        <CLink href={process.env.NEXT_PUBLIC_STATIC_URL || ""} isUnderline target="_blank˝">
          buradaki
        </CLink>{" "}
        sayfayı ziyaret edebilirsiniz.
      </p>
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-red-500/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
    </div>
  );
};
