import { Cover } from "@/features/cover";
import { DemoImage } from "@/features/image";
import { DemoTools } from "@/features/tools";

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
        <Title value="Image" />
        <DemoImage />
        <Hr />
      </section>
      <section id="tools">
        <Title value="Tools" />
        <DemoTools />
        {/* <Hr /> */}
      </section>
      <div className="h-4" />
    </div>
  );
}

const Hr = () => <hr className="my-2 h-0.5 bg-gray-300" />;

const Title = ({ value }: { value: string }) => {
  return <h2 className="font-bold text-2xl mb-2">{value}</h2>;
};
