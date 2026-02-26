import { DEFAULT_LOCALE, LocaleType } from "@/core/language-static/i18n/types";
import { DemoAccordion } from "@/features/accordion";
import { DemoButtons } from "@/features/button";
import { DemoCarousel } from "@/features/carousel";
import { DemoFlowingCarousel } from "@/features/flowing-carousel";
import { DemoForm } from "@/features/form";
import { DemoGraphic } from "@/features/graphic";
import { DemoGrid } from "@/features/grid";
import { DemoImage } from "@/features/image";
import { DemoInputs } from "@/features/input";
import { DemoList } from "@/features/list";
import { DemoSortableList } from "@/features/sortable-list";
import { DemoRedux } from "@/features/state-management/redux";
import { DemoZustand } from "@/features/state-management/zustand";
import { DemoTable } from "@/features/table/table.demo";
import { DemoTools } from "@/features/tools";

export const HomeView = ({ locale }: { locale?: LocaleType }) => {
  locale ||= DEFAULT_LOCALE;

  return (
    <div
      className="flex flex-col gap-2 p-3 items-center mb-50
        *:w-full *:max-w-6xl"
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
      {/* List */}
      <section>
        <Title value="List" />
        <DemoList />
        <Hr />
      </section>
      {/* Grid */}
      <section>
        <Title value="Grid" />
        <DemoGrid />
        <Hr />
      </section>
      {/* SortableList */}
      <section>
        <Title value="SortableList" />
        <DemoSortableList />
        <Hr />
      </section>
      {/* Image */}
      <section>
        <Title value="Image" />
        <DemoImage />
        <Hr />
      </section>
      {/* Graphic */}
      <section>
        <Title value="Graphic" />
        <DemoGraphic />
        <Hr />
      </section>
      {/* Table */}
      <section>
        <Title value="Table" />
        <DemoTable />
        <Hr />
      </section>
    </div>
  );
};

const Hr = () => <hr className="my-2 h-0.5 bg-gray-300" />;

const Title = ({ value }: { value: string }) => {
  return <h2 className="font-bold text-2xl mb-2">{value}</h2>;
};
