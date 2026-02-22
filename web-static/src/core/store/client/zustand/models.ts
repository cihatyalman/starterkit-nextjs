
import { BaseModel } from "@/shared/models";
import { BaseStore, createBaseStore } from "./base.store";
import { StoreApi } from "zustand";

export class StoreData<T> {
  private store: StoreApi<BaseStore<T>>;
  public listen: <U>(selector: (state: BaseStore<T>) => U) => U;

  constructor(initialValue?: T) {
    const { listen, store } = createBaseStore<T>(initialValue);
    this.store = store;
    this.listen = listen;
  }

  static create<T>(initialData?: T) {
    return new StoreData<T>(initialData);
  }

  /* #region Genel (getter - setter) */
  private get base(): BaseStore<T> {
    return this.store.getState();
  }

  get data(): T | undefined {
    return this.base.data;
  }

  get isLoading(): boolean {
    return this.base.isLoading;
  }

  setData(newData: T) {
    this.base.setData(newData);
  }

  activateLoading() {
    this.base.activateLoading();
  }

  deactivateLoading() {
    this.base.deactivateLoading();
  }

  updateUI() {
    this.base.setData(this.base.data);
  }
  /* #endregion */
}

export class StoreList<T> {
  private store: StoreApi<BaseStore<T[]>>;
  public listen: <U>(selector: (state: BaseStore<T[]>) => U) => U;

  constructor(initialValue: T[]) {
    const { listen, store } = createBaseStore<T[]>(initialValue ?? []);
    this.store = store;
    this.listen = listen;
  }

  static create<T>(initialData?: T[]) {
    return new StoreList<T>(initialData ?? []);
  }

  /* #region Genel Siniflar (getter - setter) */
  private get base(): BaseStore<T[]> {
    return this.store.getState();
  }
  get data(): T[] {
    return this.base.data || [];
  }
  setData(newData: T[]) {
    this.base.setData(newData);
  }
  updateUI() {
    this.base.setData(this.base.data);
  }
  get isLoading(): boolean {
    return this.base.isLoading;
  }
  activateLoading() {
    this.base.activateLoading();
  }
  deactivateLoading() {
    this.base.deactivateLoading();
  }
  /* #endregion */

  getIndex(value: T): number {
    return this._getIndex(value);
  }

  getAt(index: number): T | null {
    try {
      return this.data[index];
    } catch {
      return null;
    }
  }

  add(value: T) {
    this.setData([...this.data, value]);
  }

  addAll(values: T[]) {
    this.setData([...this.data, ...values]);
  }

  insert(index: number, value: T) {
    const newData = [...this.data];
    newData.splice(index, 0, value);
    this.setData(newData);
  }

  delete(value: T): boolean {
    const index = this.getIndex(value);
    if (index === -1) return false;
    return this.deleteAt(index);
  }

  deleteAt(index: number): boolean {
    if (index < 0 || index >= this.data.length) return false;
    const newData = [...this.data];
    newData.splice(index, 1);
    this.setData(newData);
    return true;
  }

  updateAt(index: number, value: T): boolean {
    if (index < 0 || index >= this.data.length) return false;
    const newData = [...this.data];
    newData[index] = value;
    this.setData(newData);
    return true;
  }

  clear() {
    this.setData([]);
  }

  get isEmpty(): boolean {
    return this.data.length == 0;
  }

  _getIndex(value: T): number {
    return this.data.findIndex((el) => el === value);
  }
}

export class StoreDataList<T extends BaseModel> {
  private store: StoreApi<BaseStore<T[]>>;
  public listen: <U>(selector: (state: BaseStore<T[]>) => U) => U;

  constructor(initialValue: T[]) {
    const { listen, store } = createBaseStore<T[]>(initialValue ?? []);
    this.store = store;
    this.listen = listen;
  }

  static create<T extends BaseModel>(initialData?: T[]) {
    return new StoreDataList<T>(initialData ?? []);
  }

  /* #region Genel Siniflar (getter - setter) */
  private get base(): BaseStore<T[]> {
    return this.store.getState();
  }
  get data(): T[] {
    return this.base.data || [];
  }
  setData(newData: T[]) {
    this.base.setData(newData);
  }
  updateUI() {
    this.base.setData(this.base.data);
  }
  get isLoading(): boolean {
    return this.base.isLoading;
  }
  activateLoading() {
    this.base.activateLoading();
  }
  deactivateLoading() {
    this.base.deactivateLoading();
  }
  /* #endregion */

  getIndex(id: Nullable<string>): number {
    return this._getIndex(id);
  }

  getAt(index: number): T | null {
    try {
      return this.data[index];
    } catch {
      return null;
    }
  }

  get(id: Nullable<string>): T | null {
    try {
      const index = this._getIndex(id);
      if (index == -1) return null;
      return this.getAt(index);
    } catch {
      return null;
    }
  }

  add(value: T) {
    this.setData([...this.data, value]);
  }

  addAll(values: T[]) {
    this.setData([...this.data, ...values]);
  }

  insert(index: number, value: T) {
    const newData = [...this.data];
    newData.splice(index, 0, value);
    this.setData(newData);
  }

  deleteAt(index: number): boolean {
    if (index < 0 || index >= this.data.length) return false;
    const newData = [...this.data];
    newData.splice(index, 1);
    this.setData(newData);
    return true;
  }

  delete(id: Nullable<string>): boolean {
    try {
      const index = this.getIndex(id);
      if (index == -1) return false;
      return this.deleteAt(index);
    } catch {
      return false;
    }
  }

  updateAt(index: number, value: T): boolean {
    if (index < 0 || index >= this.data.length) return false;
    const newData = [...this.data];
    newData[index] = value;
    this.setData(newData);
    return true;
  }

  update(id: Nullable<string>, value: T): boolean {
    const index = this.getIndex(id);
    if (index < 0 || index >= this.data.length) return false;
    const newData = [...this.data];
    newData[index] = value;
    this.setData(newData);
    return true;
  }

  get isEmpty(): boolean {
    return this.data.length == 0;
  }

  isExist(id: Nullable<string>): boolean {
    return this._getIndex(id) !== -1;
  }

  clear() {
    this.setData([]);
  }

  _getIndex(id: Nullable<string>): number {
    if (!id) return -1;
    return this.data.findIndex((el) => el.id === id);
  }
}
