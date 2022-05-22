import { IRates } from '../types/commonTypes';
import exchangeRateResolver from '../resolvers/exchangeRateResolver';

export default class LRUCache {
  private values: Map<string, IRates> = new Map<string, IRates>();
  private maxEntries: number;

  constructor(maxEntries = 3) {
    this.maxEntries = maxEntries;
  }

  public async get(key: string): Promise<IRates> {
    const hasKey = this.values.has(key);
    if (hasKey) {
      const entry: IRates = <IRates>this.values.get(key);
      this.values.delete(key);
      this.values.set(key, entry);
      return entry;
    } else {
      if (this.values.size >= this.maxEntries) {
        const keyToDelete = this.values.keys().next().value;
        this.values.delete(keyToDelete);
      }

      const value = await exchangeRateResolver(key);
      this.values.set(key, value);
      return value;
    }
  }
}
