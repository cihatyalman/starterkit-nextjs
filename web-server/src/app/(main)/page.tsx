import { Cover } from "@/features/cover";

export default function HomePage() {
  return (
    <div
      className="flex flex-col gap-2 px-3 items-center
    *:w-full *:max-w-6xl"
    >
      {/* Cover */}
      <section className="min-w-svw">
        <Cover />
      </section>
    </div>
  );
}
