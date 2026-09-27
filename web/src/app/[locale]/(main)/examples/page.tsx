import { DemoZustand } from "@/features/examples/state-management/zustand";
import { DemoTable } from "@/features/examples/table";
import { CLink } from "@/components/custom/button/CLink";
import { DemoAccordion } from "@/features/examples/accordion";
import { DemoForm } from "@/features/examples/form";
import { DemoRedux } from "@/features/examples/state-management/redux";
import { SquareArrowOutUpRight } from "lucide-react";
import { DemoTools } from "@/features/examples/tools";
import { DemoList } from "@/features/examples/list";
import { DemoGrid } from "@/features/examples/grid";
import { Metadata } from "next";
import { getMetadata } from "@/shared/utils/metadata";
import { DEFAULT_LOCALE, LocaleType } from "@/lib/language/i18n/types";

interface Props {
  params: Promise<{ locale: LocaleType }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  let baseLink = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  if (locale !== DEFAULT_LOCALE) baseLink = baseLink + "/" + locale;

  return getMetadata.sub({
    title: "Example Components",
    ogtitle: "Example Components | Nextjs StarterKit",
    description: "Example Components | Nextjs StarterKit",
    link: `${baseLink}/examples`,
  });
}

export default function ExamplesPage() {
  return (
    <div className="my-container mx-auto p-3">
      <div className="flex flex-col gap-2">
        {/* Content */}
        <section id="content">
          <div className="flex flex-wrap justify-center gap-2">
            <SectionButton id="state" title="State Managements" />
            <SectionButton id="form" title="Form (RHF)" />
            <SectionButton id="tools" title="Tools" />
            <SectionButton id="accordion" title="Accordion" />
            <SectionButton id="list" title="List" />
            <SectionButton id="grid" title="Grid" />
            <SectionButton id="table" title="Table" />
          </div>
          <Hr />
        </section>
        {/* State */}
        <section
          id="state"
          className="flex flex-wrap gap-4 *:flex-1 *:min-w-xs sm:*:min-w-sm *:border-b-2 *:border-gray-300 *:pb-3"
        >
          <div id="zustand">
            <Title
              value={"State Management (zustand)"}
              path="/state-management/zustand"
            />
            <DemoZustand />
          </div>
          <div id="redux">
            <Title
              value={"State Management (redux)"}
              path="/state-management/redux"
            />
            <DemoRedux />
          </div>
        </section>
        {/* Form */}
        <section id="form">
          <Title value="Form (React Hook Form)" path="/form" />
          <DemoForm />
          <Hr />
        </section>
        {/* Tools */}
        <section id="tools">
          <Title value="Tools" path="/tools" />
          <DemoTools />
          <Hr />
        </section>
        {/* Accordion */}
        <section id="accordion">
          <Title value="Accordion" path="/accordion" />
          <DemoAccordion />
          <Hr />
        </section>
        {/* List */}
        <section id="list">
          <Title value="List" path="/list" />
          <DemoList />
          <Hr />
        </section>
        {/* Grid */}
        <section id="grid">
          <Title value="Grid" path="/grid" />
          <DemoGrid />
          <Hr />
        </section>
        {/* Table */}
        <section id="table">
          <Title value="Table" path="/table" />
          <DemoTable />
        </section>
      </div>
    </div>
  );
}

const Hr = () => <hr className="my-2 h-0.5 bg-gray-300" />;

const Title = ({ value, ...props }: { value: string; path?: string }) => {
  let fullUrl;
  if (props.path) {
    fullUrl =
      process.env.NEXT_PUBLIC_GITHUB_URL +
      "/tree/master/web/src/features/examples" +
      props.path;
  }

  return (
    <div className="flex gap-2">
      <h2 className="font-bold text-xl sm:text-2xl mb-2">{value}</h2>
      {fullUrl && (
        <CLink href={fullUrl} target="_blank" className="px-1">
          <SquareArrowOutUpRight className="mt-1.5" size={20} />
        </CLink>
      )}
    </div>
  );
};

const SectionButton = (props: { id: string; title: string }) => {
  return (
    <CLink
      href={`#${props.id}`}
      className="border rounded-md px-3 py-1 hover:bg-muted"
    >
      {props.title}
    </CLink>
  );
};
