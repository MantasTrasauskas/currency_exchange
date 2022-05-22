import { Rates } from '../types/commonTypes';
import exchangeRateResolver from '../resolvers/exchangeRateResolver';

export default class LRUCache {
  private values: Map<string, Rates> = new Map<string, Rates>();
  private maxEntries: number;

  constructor(maxEntries: number = 3) {
    this.maxEntries = maxEntries;
  }

  public async get(key: string): Promise<Rates> {
    const hasKey = this.values.has(key);
    if (hasKey) {
      let entry: Rates = <Rates>this.values.get(key);
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
