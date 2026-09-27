import { List } from "./List";

export const DemoList = () => {
  const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

  return (
    <div className="h-52 overflow-hidden">
      <List<string> dataList={items}>
        {({ item, index }) => (
          <ItemComp key={`list-${index}`} item={item} index={index} />
        )}
      </List>
    </div>
  );
};

const ItemComp = (props: { item: string; index: number }) => {
  return (
    <li className="border border-gray-400 p-2">{`${props.index} => ${props.item}`}</li>
  );
};
