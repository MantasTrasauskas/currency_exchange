import { IRates } from '../types/commonTypes';
//very basic LRU cache with get and put methods
export default class LRUCache {
  private values: Map<string, IRates> = new Map<string, IRates>();
  private maxEntries: number;

  constructor(maxEntries = 3) {
    this.maxEntries = maxEntries;
  }
  
  public get(key: string): IRates | null {
    const hasKey = this.values.has(key);
    if (hasKey) {
      const entry: IRates = <IRates>this.values.get(key);
      this.values.delete(key);
      this.values.set(key, entry);
      return entry;
    }
    return null;
  }

  public put(key: string, entry: IRates): void {
    const hasKey = this.values.has(key);
    if (hasKey) {
      this.values.delete(key);
    }
    if (this.values.size >= this.maxEntries) {
      const keyToDelete = this.values.keys().next().value;
      this.values.delete(keyToDelete);
    }
    this.values.set(key, entry);
  }

  public getSize(): number {
    return this.values.size;
  }
}
