import { DemoZustand } from "@/features/state-management/zustand/components";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-2">
      <section id="zustand">
        <DemoZustand />
      </section>
    </div>
  );
}
