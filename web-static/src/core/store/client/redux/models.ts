import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "@/lib/store/redux/main.store";
import { BaseModel } from "@/shared/models/base.model";

type Updater<T> = (prev: T) => T;

interface SliceProps<T> {
  name: string;
  initialData?: T;
}

interface SliceStateProps<T> {
  data: T;
  loading: boolean;
}

/* #region Data */
export class SliceData<T> {
  private slice;

  constructor(props: SliceProps<T>) {
    this.slice = createSliceData(props);
  }

  static create<T>({ name, initialData }: SliceProps<T>) {
    return new SliceData({ name, initialData });
  }

  get reducer() {
    return this.slice.reducer;
  }
  get actions() {
    return this.slice.actions;
  }
}

function createSliceData<T>({ name, initialData }: SliceProps<T>) {
  const initialState: SliceStateProps<T> = {
    data: initialData as T,
    loading: false,
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      set(state, action: PayloadAction<T>) {
        (state.data as T) = action.payload;
      },
      update(state, action: PayloadAction<Updater<T>>) {
        const updater = action.payload;
        (state.data as T) = updater(state.data as T);
      },
      updateUI(state) {
        state.data = structuredClone(state.data);
      },
      activateLoading(state) {
        state.loading = true;
      },
      deactivateLoading(state) {
        state.loading = false;
      },
    },
  });

  return slice;
}
/* #endregion */

/* #region List */
export class SliceList<T> {
  private slice;

  constructor(props: SliceProps<T[]>) {
    this.slice = createSliceList(props);
  }

  static create<T>({ name, initialData }: SliceProps<T[]>) {
    return new SliceList({ name, initialData });
  }

  get reducer() {
    return this.slice.reducer;
  }
  get actions() {
    return this.slice.actions;
  }
  private get state() {
    return store.getState()[
      this.slice.name as keyof RootState
    ] as MyAny as SliceStateProps<T[]>;
  }

  getIndex(item: T): number {
    return this.state.data.findIndex((e) => e === item);
  }
  getAt(index: number): T | null {
    try {
      return this.state.data[index];
    } catch {
      return null;
    }
  }
  get isEmpty(): boolean {
    return this.state.data.length == 0;
  }
}

function createSliceList<T>({ name, initialData }: SliceProps<T[]>) {
  const initialState: SliceStateProps<T[]> = {
    data: initialData ?? [],
    loading: false,
  };

  function getIndex(dataList: T[], item: T): number {
    return dataList.findIndex((e) => e === item);
  }

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      set(state, action: PayloadAction<T[]>) {
        (state.data as T[]) = action.payload;
      },
      update(state, action: PayloadAction<Updater<T[]>>) {
        const updater = action.payload;
        (state.data as T[]) = updater(state.data as T[]);
      },
      updateUI(state) {
        state.data = structuredClone(state.data);
      },
      activateLoading(state) {
        state.loading = true;
      },
      deactivateLoading(state) {
        state.loading = false;
      },
      add(state, action: PayloadAction<T>) {
        (state.data as T[]) = [...(state.data as T[]), action.payload];
      },
      addAll(state, action: PayloadAction<T[]>) {
        (state.data as T[]) = [...(state.data as T[]), ...action.payload];
      },
      insert(state, action: PayloadAction<{ index: number; value: T }>) {
        const currentData = [...(state.data as T[])];
        currentData.splice(action.payload.index, 0, action.payload.value);
        (state.data as T[]) = currentData;
      },
      deleteAt(state, action: PayloadAction<number>) {
        const dataList = state.data as T[];
        const index = action.payload;
        if (index < 0 || index >= dataList.length) return;
        dataList.splice(index, 1);
        (state.data as T[]) = dataList;
      },
      delete(state, action: PayloadAction<T>) {
        const dataList = state.data as T[];
        const index = getIndex(state.data as T[], action.payload);
        if (index < 0 || index >= dataList.length) return;
        dataList.splice(index, 1);
        (state.data as T[]) = dataList;
      },
      updateAt(state, action: PayloadAction<{ index: number; value: T }>) {
        const dataList = state.data as T[];
        const index = action.payload.index;
        const value = action.payload.value;
        if (index < 0 || index >= dataList.length) return;
        dataList[index] = value;
        (state.data as T[]) = dataList;
      },
      clear(state) {
        (state.data as T[]) = [];
      },
    },
  });

  return slice;
}
/* #endregion */

/* #region DataList */
export class SliceDataList<T extends BaseModel> {
  private slice;

  constructor(props: SliceProps<T[]>) {
    this.slice = createSliceDataList(props);
  }

  static create<T extends BaseModel>({ name, initialData }: SliceProps<T[]>) {
    return new SliceDataList({ name, initialData });
  }

  get reducer() {
    return this.slice.reducer;
  }
  get actions() {
    return this.slice.actions;
  }
  private get state() {
    return store.getState()[
      this.slice.name as keyof RootState
    ] as MyAny as SliceStateProps<T[]>;
  }

  getIndex(id: Nullable<string>): number {
    if (!id) return -1;
    return this.state.data.findIndex((e) => e.id === id);
  }
  getAt(index: number): T | null {
    try {
      return this.state.data[index];
    } catch {
      return null;
    }
  }
  get(id: Nullable<string>): T | null {
    try {
      const index = this.getIndex(id);
      if (index == -1) return null;
      return this.getAt(index);
    } catch {
      return null;
    }
  }
  isExist(id: Nullable<string>): boolean {
    return this.getIndex(id) != -1;
  }
  get isEmpty(): boolean {
    return this.state.data.length == 0;
  }
}

function createSliceDataList<T extends BaseModel>({
  name,
  initialData,
}: SliceProps<T[]>) {
  const initialState: SliceStateProps<T[]> = {
    data: initialData ?? [],
    loading: false,
  };

  function getIndex(dataList: T[], id: Nullable<string>): number {
    if (!id) return -1;
    return dataList.findIndex((e) => e.id === id);
  }

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      set(state, action: PayloadAction<T[]>) {
        (state.data as T[]) = action.payload;
      },
      update(state, action: PayloadAction<Updater<T[]>>) {
        const updater = action.payload;
        (state.data as T[]) = updater(state.data as T[]);
      },
      updateUI(state) {
        state.data = structuredClone(state.data);
      },
      activateLoading(state) {
        state.loading = true;
      },
      deactivateLoading(state) {
        state.loading = false;
      },
      add(state, action: PayloadAction<T>) {
        (state.data as T[]) = [...(state.data as T[]), action.payload];
      },
      addAll(state, action: PayloadAction<T[]>) {
        (state.data as T[]) = [...(state.data as T[]), ...action.payload];
      },
      insert(state, action: PayloadAction<{ index: number; value: T }>) {
        const currentData = [...(state.data as T[])];
        currentData.splice(action.payload.index, 0, action.payload.value);
        (state.data as T[]) = currentData;
      },
      deleteAt(state, action: PayloadAction<number>) {
        const dataList = state.data as T[];
        const index = action.payload;
        if (index < 0 || index >= dataList.length) return;
        dataList.splice(index, 1);
        (state.data as T[]) = dataList;
      },
      deleteId(state, action: PayloadAction<string>) {
        const dataList = state.data as T[];
        const index = getIndex(dataList, action.payload);
        if (index < 0 || index >= dataList.length) return;
        dataList.splice(index, 1);
        (state.data as T[]) = dataList;
      },
      updateAt(state, action: PayloadAction<{ index: number; value: T }>) {
        const dataList = state.data as T[];
        const index = action.payload.index;
        const value = action.payload.value;
        if (index < 0 || index >= dataList.length) return;
        dataList[index] = value;
        (state.data as T[]) = dataList;
      },
      updateId(state, action: PayloadAction<{ id: string; value: T }>) {
        const dataList = state.data as T[];
        const id = action.payload.id;
        const value = action.payload.value;

        const index = getIndex(dataList, id);
        if (index < 0 || index >= dataList.length) return;
        dataList[index] = value;
        (state.data as T[]) = dataList;
      },
      clear(state) {
        (state.data as T[]) = [];
      },
    },
  });

  return slice;
}
/* #endregion */
