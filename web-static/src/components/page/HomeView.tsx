import { DEFAULT_LOCALE, LocaleType } from "@/core/language-static/i18n/types";
import { DemoAccordion } from "@/features/accordion";
import { DemoButtons } from "@/features/button";
import { DemoCarousel } from "@/features/carousel";
import { Cover } from "@/features/cover";
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
import { CLink } from "../custom/CLink";

export const HomeView = ({ locale }: { locale?: LocaleType }) => {
  locale ||= DEFAULT_LOCALE;

  return (
    <div
      className="flex flex-col gap-2 px-3 items-center
        *:w-full *:max-w-6xl"
    >
      {/* Cover */}
      <section className="min-w-svw">
        <Cover />
      </section>
      {/* Content */}
      <section id="content">
        <div className="flex flex-wrap justify-center gap-2">
          <SectionButton id="state" title="State Managements" />
          <SectionButton id="buttons" title="Buttons" />
          <SectionButton id="inputs" title="Inputs" />
          <SectionButton id="form" title="Form" />
          <SectionButton id="tools" title="Tools" />
          <SectionButton id="accordion" title="Accordion" />
          <SectionButton id="carousel" title="Carousel" />
          <SectionButton id="flowing-carousel" title="FlowingCarousel" />
          <SectionButton id="list" title="List" />
          <SectionButton id="grid" title="Grid" />
          <SectionButton id="sortable-list" title="SortableList" />
          <SectionButton id="image" title="Image" />
          <SectionButton id="graphic" title="Graphic" />
          <SectionButton id="table" title="Table" />
        </div>
        <div className="h-4" />
        <Hr />
      </section>
      {/* State */}
      <section
        id="state"
        className="flex flex-wrap gap-4
      *:flex-1 *:min-w-sm *:border-b-2 *:border-gray-300 *:pb-3"
      >
        <div id="zustand">
          <Title value={"State Management (zustand)"} />
          <DemoZustand />
        </div>
        <div id="redux">
          <Title value={"State Management (redux)"} />
          <DemoRedux />
        </div>
      </section>
      {/* Buttons */}
      <section id="buttons">
        <Title value="Buttons" />
        <DemoButtons />
        <Hr />
      </section>
      {/* Inputs */}
      <section id="inputs">
        <Title value="Inputs" />
        <DemoInputs />
        <div className="h-3" />
        <Hr />
      </section>
      {/* Form */}
      <section id="form">
        <Title value="Form" />
        <DemoForm />
        <Hr />
      </section>
      {/* Tools */}
      <section id="tools">
        <Title value="Tools" />
        <DemoTools />
        <Hr />
      </section>
      {/* Accordion */}
      <section id="accordion">
        <Title value="Accordion" />
        <DemoAccordion />
        <Hr />
      </section>
      {/* Carousel */}
      <section id="carousel">
        <Title value="Carousel" />
        <DemoCarousel />
        <Hr />
      </section>
      {/* FlowingCarousel */}
      <section id="flowing-carousel">
        <Title value="FlowingCarousel" />
        <DemoFlowingCarousel />
        <Hr />
      </section>
      {/* List */}
      <section id="list">
        <Title value="List" />
        <DemoList />
        <Hr />
      </section>
      {/* Grid */}
      <section id="grid">
        <Title value="Grid" />
        <DemoGrid />
        <Hr />
      </section>
      {/* SortableList */}
      <section id="sortable-list">
        <Title value="SortableList" />
        <DemoSortableList />
        <Hr />
      </section>
      {/* Image */}
      <section id="image">
        <Title value="Image" />
        <DemoImage />
        <Hr />
      </section>
      {/* Graphic */}
      <section id="graphic">
        <Title value="Graphic" />
        <DemoGraphic />
        <Hr />
      </section>
      {/* Table */}
      <section id="table">
        <Title value="Table" />
        <DemoTable />
        {/* <Hr /> */}
      </section>
      <br />
    </div>
  );
};

const Hr = () => <hr className="my-2 h-0.5 bg-gray-300" />;

const Title = ({ value }: { value: string }) => {
  return <h2 className="font-bold text-2xl mb-2">{value}</h2>;
};

const SectionButton = (props: { id: string; title: string }) => {
  return (
    <CLink href={`#${props.id}`} className="border rounded-md px-3 py-1">
      {props.title}
    </CLink>
  );
};
