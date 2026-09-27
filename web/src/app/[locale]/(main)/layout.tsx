import { cn } from "@/lib/utils";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-svh flex flex-col">
      <Header />
      <main
        id="main-content"
        className={cn(
          "flex-1 flex flex-col *:flex-1",
          "*:flex *:flex-col *:w-full",
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
