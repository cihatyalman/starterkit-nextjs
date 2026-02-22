import { StoreData, StoreDataList } from "@/core/store/client/zustand/models";
import { City } from "@/shared/models/city.model";

export const cityListStore = StoreDataList.create<City>();
export const counterStore = StoreData.create(0);
