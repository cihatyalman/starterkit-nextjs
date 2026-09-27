import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ItemProps {
  id: string;
  title: string;
  description: string;
}

export interface AccordionnProps {
  items: ItemProps[];
}

export const Accordionn = (props: AccordionnProps) => {
  return (
    <Accordion className="w-full">
      {props.items.map((item) => (
        <ItemComp key={item.id} data={item} />
      ))}
    </Accordion>
  );
};

const ItemComp = (props: { data: ItemProps }) => {
  return (
    <AccordionItem value={props.data.title}>
      <AccordionTrigger className="cursor-pointer font-semibold text-sm sm:text-base">
        {props.data.title}
      </AccordionTrigger>
      <AccordionContent className="whitespace-pre-line text-left text-accent-foreground text-xs sm:text-sm">
        {props.data.description}
      </AccordionContent>
    </AccordionItem>
  );
};
