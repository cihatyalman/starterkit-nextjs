import { CLoading } from "@/components/custom/tools/CLoading";
import { CLottie } from "@/components/DynamicLoader";
import { cn } from "@/lib/utils";

interface GridProps<T> {
  dataList: T[];
  isLoading?: boolean;
  emptyComp?: React.ReactNode | null;
  colClass?: string;
  className?: string;
  children?: (args: { item: T; index: number }) => React.ReactNode | null;
}

/**
 * @param children li ve key kullanın.
 */
export const Grid = <T,>({
  colClass = "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3",
  isLoading,
  ...props
}: GridProps<T>) => {
  if (props.dataList.length === 0) {
    if (isLoading) return <CLoading />;
    if (props.emptyComp) return <>{props.emptyComp}</>;
    <div className="flex justify-center items-center w-full h-full">
      <CLottie animKey="emptyAnim" />
    </div>;
  }

  return (
    <ul
      className={cn(
        "list-none! pl-0!",
        "w-full grid gap-2 overflow-y-auto",
        colClass,
        props.className,
      )}
    >
      {props.dataList.map((item, index) => props.children?.({ item, index }))}
    </ul>
  );
};
