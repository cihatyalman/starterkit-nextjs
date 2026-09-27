import { Accordionn } from "./Accordionn";

export const DemoAccordion = () => {
  const dataSet = Array.from({ length: 4 }, (_, index) => {
    const id = index + 1;
    return {
      id: id.toString(),
      title: `Başlık ${id}`,
      description: `Açıklama ${id}`,
    };
  });

  return <Accordionn items={dataSet} />;
};
