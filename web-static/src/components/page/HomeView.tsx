import { DEFAULT_LOCALE, LocaleType } from "@/core/language-static/i18n/types";
import { DemoAccordion } from "@/features/accordion";
import { DemoButtons } from "@/features/button";
import { DemoCarousel } from "@/features/carousel";
import { DemoFlowingCarousel } from "@/features/flowing-carousel";
import { DemoForm } from "@/features/form";
import { DemoInputs } from "@/features/input";
import { DemoRedux } from "@/features/state-management/redux";
import { DemoZustand } from "@/features/state-management/zustand";
import { DemoTools } from "@/features/tools";

export const HomeView = ({ locale }: { locale?: LocaleType }) => {
  locale ||= DEFAULT_LOCALE;

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
      <section>
        <Title value="Buttons" />
        <DemoButtons />
        <Hr />
      </section>
      {/* Inputs */}
      <section>
        <Title value="Inputs" />
        <DemoInputs />
        <div className="h-3" />
        <Hr />
      </section>
      {/* Form */}
      <section>
        <Title value="Form" />
        <DemoForm />
        <Hr />
      </section>
      {/* Tools */}
      <section>
        <Title value="Tools" />
        <DemoTools />
        <Hr />
      </section>
      {/* Accordion */}
      <section>
        <Title value="Accordion" />
        <DemoAccordion />
        <Hr />
      </section>
      {/* Carousel */}
      <section>
        <Title value="Carousel" />
        <DemoCarousel />
        <Hr />
      </section>
      {/* FlowingCarousel */}
      <section>
        <Title value="FlowingCarousel" />
        <DemoFlowingCarousel />
        <Hr />
      </section>
    </div>
  );
};

const Hr = () => <hr className="my-2 h-0.5 bg-gray-300" />;

const Title = ({ value }: { value: string }) => {
  return <h2 className="font-bold text-2xl mb-2">{value}</h2>;
};
