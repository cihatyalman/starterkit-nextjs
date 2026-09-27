import { Grid } from "./Grid";

export const DemoGrid = () => {
  const items = Array.from({ length: 40 }, (_, i) => `Item ${i + 1}`);

  return (
    <div className="flex h-52 overflow-hidden">
      <Grid<string>
        dataList={items}
        colClass="grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4"
      >
        {({ item, index }) => (
          <ItemComp key={`grid-${index}`} item={item} index={index} />
        )}
      </Grid>
    </div>
  );
};

const ItemComp = (props: { item: string; index: number }) => {
  return (
    <li className="flex border border-gray-400 p-2">
      {`${props.index} => ${props.item}`}
    </li>
  );
};
