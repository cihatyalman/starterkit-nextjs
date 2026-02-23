import { CAccordion } from "@/components/custom/CAccordion";

export const DemoAccordion = (props: { className?: string }) => {
  const dataSet = [
    {
      id: "1",
      title: "Item-1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, sit reiciendis porro modi quibusdam explicabo quisquam voluptatibus ipsa inventore facilis eaque libero. Praesentium corporis, explicabo a optio quisquam veritatis modi?",
    },
    { id: "2", title: "Item-2", description: "Description-2" },
    { id: "3", title: "Item-3", description: "Description-3" },
    { id: "4", title: "Item-4", description: "Description-4" },
  ];

  return <CAccordion items={dataSet} />;
};
