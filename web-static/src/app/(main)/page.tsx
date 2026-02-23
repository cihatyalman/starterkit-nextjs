import { DemoAccordion } from "@/features/accordion";
import { DemoButtons } from "@/features/button";
import { DemoInputs } from "@/features/input";
import { DemoRedux } from "@/features/state-management/redux";
import { DemoZustand } from "@/features/state-management/zustand";

export default function HomePage() {
  return (
    <div
      className="flex flex-col gap-2 p-3 items-center
        *:w-full *:max-w-5xl"
    >
      {/* State */}
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
      {/* Buttons */}
      <div>
        <Title value="Buttons" />
        <DemoButtons />
        <Hr />
      </div>
      {/* Inputs */}
      <div>
        <Title value="Inputs" />
        <DemoInputs />
        <div className="h-3" />
        <Hr />
      </div>
      {/* Accordion */}
      <div>
        <Title value="Accordion" />
        <DemoAccordion />
        <Hr />
      </div>
    </div>
  );
}

const Hr = () => <hr className="my-2 h-0.5 bg-gray-300" />;

const Title = ({ value }: { value: string }) => {
  return <h2 className="font-bold text-2xl mb-2">{value}</h2>;
};
