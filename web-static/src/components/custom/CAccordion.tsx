import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export interface CAccordionItemProps {
  title: string;
  description: string;
}

export interface CAccordionProps {
  items: CAccordionItemProps[];
  defaultValue?: string;
  className?: string;
  classNameTitle?: string;
  classNameDescription?: string;
}

export const CAccordion = (props: CAccordionProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn("w-full", props.className)}
      defaultValue={props.defaultValue}
    >
      {props.items.map((item) => (
        <ItemComp
          key={item.title}
          data={item}
          classNameTitle={props.classNameTitle}
          classNameDescription={props.classNameDescription}
        />
      ))}
    </Accordion>
  );
};

const ItemComp = (props: {
  data: CAccordionItemProps;
  classNameTitle?: string;
  classNameDescription?: string;
}) => {
  return (
    <AccordionItem value={props.data.title}>
      <AccordionTrigger
        className={cn(
          "cursor-pointer font-semibold text-sm sm:text-base",
          props.classNameTitle,
        )}
      >
        {props.data.title}
      </AccordionTrigger>
      <AccordionContent
        className={cn(
          "whitespace-pre-line text-left text-accent-foreground text-xs sm:text-sm",
          props.classNameDescription,
        )}
      >
        {props.data.description}
      </AccordionContent>
    </AccordionItem>
  );
};
