import { ButtonsDemo } from "@/features/button";
import { DemoRedux } from "@/features/state-management/redux";
import { DemoZustand } from "@/features/state-management/zustand";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <div
        className="flex flex-wrap gap-4
      *:flex-1 *:min-w-sm *:border-b-2 *:border-gray-300 *:pb-3"
      >
        <section id="zustand">
          <Title value={"State Management (zustand)"} />
          <DemoZustand />
        </section>
        <section id="redux">
          <Title value={"State Management (redux)"} />
          <DemoRedux />
        </section>
      </div>
      <div>
        <Title value="Buttons" />
        <ButtonsDemo />
        <Hr />
      </div>
    </div>
  );
}

const Hr = () => <hr className="my-2 h-0.5 bg-gray-300" />;

const Title = ({ value }: { value: string }) => {
  return <h2 className="font-bold text-2xl mb-2">{value}</h2>;
};
