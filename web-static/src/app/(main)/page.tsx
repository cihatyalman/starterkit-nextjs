import { DemoAccordion } from "@/features/accordion";
import { DemoButtons } from "@/features/button";
import { DemoCarousel } from "@/features/carousel";
import { DemoFlowingCarousel } from "@/features/flowing-carousel";
import { DemoForm } from "@/features/form";
import { DemoInputs } from "@/features/input";
import { DemoRedux } from "@/features/state-management/redux";
import { DemoZustand } from "@/features/state-management/zustand";
import { DemoTools } from "@/features/tools";

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
      {/* Form */}
      <div>
        <Title value="Form" />
        <DemoForm />
        <Hr />
      </div>
      {/* Tools */}
      <div>
        <Title value="Tools" />
        <DemoTools />
        <Hr />
      </div>
      {/* Accordion */}
      <div>
        <Title value="Accordion" />
        <DemoAccordion />
        <Hr />
      </div>
      {/* Carousel */}
      <div>
        <Title value="Carousel" />
        <DemoCarousel />
        <Hr />
      </div>
      {/* FlowingCarousel */}
      <div>
        <Title value="FlowingCarousel" />
        <DemoFlowingCarousel />
        <Hr />
      </div>
    </div>
  );
}

const Hr = () => <hr className="my-2 h-0.5 bg-gray-300" />;

const Title = ({ value }: { value: string }) => {
  return <h2 className="font-bold text-2xl mb-2">{value}</h2>;
};
