import { Metadata } from "next";
import { CLink } from "@/components/custom/button/CLink";
import { DemoButtons } from "@/features/reusable/button";
import { DemoCarousel } from "@/features/reusable/carousel";
import { DemoFlowingCarousel } from "@/features/reusable/flowing-carousel";
import { DemoFormSubmit } from "@/features/reusable/form-submit";
import { DemoGraphic } from "@/features/reusable/graphic";
import { DemoImage } from "@/features/reusable/image";
import { DemoInputs } from "@/features/reusable/input";
import { DemoSortableList } from "@/features/reusable/sortable-list";
import { DemoTools } from "@/features/reusable/tools";
import { DEFAULT_LOCALE, LocaleType } from "@/lib/language/i18n/types";
import { getMetadata } from "@/shared/utils/metadata";
import { SquareArrowOutUpRight } from "lucide-react";

interface Props {
  params: Promise<{ locale: LocaleType }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  let baseLink = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  if (locale !== DEFAULT_LOCALE) baseLink = baseLink + "/" + locale;

  return getMetadata.sub({
    title: "Reusable Components",
    ogtitle: "Reusable Components | Nextjs StarterKit",
    description: "Reusable Components | Nextjs StarterKit",
    link: `${baseLink}/reusable`,
  });
}

export default function ReusablePage() {
  return (
    <div className="my-container mx-auto p-3">
      <div className="flex flex-col gap-2">
        {/* Content */}
        <section id="content">
          <div className="flex flex-wrap justify-center gap-2">
            <SectionButton id="buttons" title="Buttons" />
            <SectionButton id="inputs" title="Inputs" />
            <SectionButton id="form-submit" title="Form (FSS)" />
            <SectionButton id="tools" title="Tools" />
            <SectionButton id="image" title="Image" />
            <SectionButton id="carousel" title="Carousel" />
            <SectionButton id="flowing-carousel" title="FlowingCarousel" />
            <SectionButton id="sortable-list" title="SortableList" />
            <SectionButton id="graphic" title="Graphic" />
          </div>
          <Hr />
        </section>
        {/* Buttons */}
        <section id="buttons">
          <Title value="Buttons" path="/button" />
          <DemoButtons />
          <Hr />
        </section>
        {/* Inputs */}
        <section id="inputs">
          <Title value="Inputs" path="/input" />
          <DemoInputs />
          <div className="h-3" />
          <Hr />
        </section>
        {/* FormSubmit */}
        <section id="form-submit">
          <Title value="Form (Form Submit State)" path="/form-submit" />
          <DemoFormSubmit />
          <Hr />
        </section>
        {/* Tools */}
        <section id="tools">
          <Title value="Tools" path="/tools" />
          <DemoTools />
          <Hr />
        </section>
        {/* Image */}
        <section id="image">
          <Title value="Image" path="/image" />
          <DemoImage />
          <Hr />
        </section>
        {/* Carousel */}
        <section id="carousel">
          <Title value="Carousel" path="/carousel" />
          <DemoCarousel />
          <Hr />
        </section>
        {/* FlowingCarousel */}
        <section id="flowing-carousel">
          <Title value="FlowingCarousel" path="/flowing-carousel" />
          <DemoFlowingCarousel />
          <Hr />
        </section>
        {/* SortableList */}
        <section id="sortable-list">
          <Title value="SortableList" path="/sortable-list" />
          <DemoSortableList />
          <Hr />
        </section>
        {/* Graphic */}
        <section id="graphic">
          <Title value="Graphic" path="/graphic" />
          <DemoGraphic />
          <Hr />
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
      "/tree/master/web/src/features/reusable" +
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
