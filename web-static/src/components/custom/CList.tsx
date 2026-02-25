import { cn } from "@/lib/utils";
import { CLoading } from "./CLoading";
import { CLottie } from "@/components/DynamicLoader";

interface CListProps<T> {
  dataList: T[];
  isLoading?: boolean;
  emptyComp?: React.ReactNode | null;
  reverse?: boolean;
  className?: string;
  children?: (args: { item: T; index: number }) => React.ReactNode | null;
}

/**
 * @param children li ve key kullanın.
 */
export const CList = <T,>(props: CListProps<T>) => {
  if (props.dataList.length === 0) {
    if (props.isLoading) return <CLoading center />;
    if (props.emptyComp) return <>{props.emptyComp}</>;
    return (
      <div className="flex justify-center items-center">
        <CLottie animKey="emptyAnim" />
      </div>
    );
  }

  return (
    <ul
      className={cn(
        "list-none! pl-0!",
        "w-full h-full flex overflow-y-auto gap-2",
        props.reverse ? "flex-col-reverse" : "flex-col",
        props.className,
      )}
    >
      {props.dataList.map((item, index) => props.children?.({ item, index }))}
    </ul>
  );
};
