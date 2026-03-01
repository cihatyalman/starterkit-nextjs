import { CLink } from "@/components/custom/CLink";
import { Cover } from "@/features/cover";
import { DemoImage } from "@/features/image";
import { DemoTools } from "@/features/tools";
import { ExternalLink } from "lucide-react";

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
      {/* Image */}
      <section id="image">
        <Title value="Image" path="/image" />
        <DemoImage />
        <Hr />
      </section>
      <section id="tools">
        <Title value="Tools" path="/tools" />
        <DemoTools />
        {/* <Hr /> */}
      </section>
      <div className="h-4" />
    </div>
  );
}

const Hr = () => <hr className="my-2 h-0.5 bg-gray-300" />;

const Title = ({ value, ...props }: { value: string; path?: string }) => {
  let fullUrl;
  if (props.path) {
    fullUrl =
      process.env.NEXT_PUBLIC_GITHUB_URL +
      "/tree/master/web-server/src/features" +
      props.path;
  }

  return (
    <div className="flex gap-2">
      <h2 className="font-bold text-2xl mb-2">{value}</h2>
      {fullUrl && (
        <CLink href={fullUrl} target="_blank" className="px-1">
          <ExternalLink className="mt-1.5" size={20} />
        </CLink>
      )}
    </div>
  );
};
