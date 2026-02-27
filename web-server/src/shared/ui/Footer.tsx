import { CLink } from "@/components/custom/CLink";
import { Brand } from "./Brand";

export const Footer = () => {
  return (
    <footer className="flex flex-col w-full my-container mx-auto max-[1152px]:px-3">
      <hr className="w-full" />
      <div className="py-3 text-center text-sm sm:text-base">
        <Brand className="text-5xl sm:text-6xl" />
        <p className="text-accent-foreground">
          Next.js projeleriniz için başlangıç kiti
        </p>
        <div className="h-4" />
        <p className="text-accent-foreground text-sm">
          Proje dosyalarını görüntülemek için{" "}
          <span>
            <CLink
              href={process.env.NEXT_PUBLIC_GITHUB_URL || ""}
              target="_blank"
              isUnderline
            >
              github sayfasını
            </CLink>
          </span>{" "}
          ziyaret edebilirsiniz.
        </p>
      </div>
      <Copyright />
    </footer>
  );
};

const Copyright = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <hr className="w-full" />
      <p className="p-4 text-sm text-muted-foreground">
        © {new Date().getFullYear()} ___. Tüm hakları saklıdır.
      </p>
    </div>
  );
};
