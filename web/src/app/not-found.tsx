/* eslint-disable @next/next/no-html-link-for-pages */
export const metadata = {
  title: "404 | Sayfa Bulunamadı",
  description: "Sayfa bulunamadı",
};

export default function NotFound() {
  return (
    <div className="min-h-svh flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl sm:text-5xl">404</h1>
      <div className="h-2" />
      <p className="text-lg sm:text-xl text-muted-foreground">
        Aradığınız sayfa bulunamadı
      </p>
      <div className="h-6 sm:h-8" />
      <a
        href="/"
        className="px-5 py-3 rounded-full bg-foreground hover:bg-foreground/80 font-semibold text-background scale-80 sm:scale-100"
      >
        Ana Sayfaya Dön
      </a>
    </div>
  );
}
