import { LocationIndexer } from '../../../../app/suggestion/location/indexer/location.indexer';
import { LocationData } from '../../../../app/suggestion/location/location.data';
import { LocationQueryResult } from '../../../../app/suggestion/location/location.query.result';
import { LocationIndexedData } from '../../../../app/suggestion/location/indexer/location.data.indexed';
import * as _ from 'lodash';

export class LocationBasicIndexer implements LocationIndexer {
  private indexedData: LocationIndexedData = {};

  public getByQuery(query: string): LocationQueryResult[] {
    const queryTokens = query.toLocaleLowerCase().split(' ');
    const filteredTokens = _.keys(this.indexedData).filter(t => this.containsAnyOf(t, queryTokens));
    return this.getMatchingQueryResults(filteredTokens);
  }

  public index(data: LocationData[]): LocationIndexedData {
    data.forEach(d => {
      const tokens = LocationBasicIndexer.tokenize(d.name);
      this.mapTokensToData(tokens, d);
    });

    return this.indexedData;
  }

  private getMatchingQueryResults = (filteredTokens: string[]) =>
    this.getMatchingLocationData(filteredTokens).map(d => ({
      label: d.name,
      latitude: d.lat,
      longitude: d.long,
    }));

  private getMatchingLocationData = (filteredTokens: string[]) =>
    filteredTokens.reduce((acc: LocationData[], t) => {
      return _.uniq(acc.concat(this.indexedData[t]));
    }, []);

  private containsAnyOf = (t: string, queryToken: string[]): boolean => !!queryToken.find(qt => t.includes(qt));

  private mapTokensToData = (tokens: string[], d: LocationData) => {
    tokens.forEach(t => {
      if (!this.indexedData[t]) {
        this.indexedData[t] = [];
      }
      this.indexedData[t] = _.uniq(this.indexedData[t].concat(d));
    });
  };

  private static tokenize = (str: string): string[] =>
    str
      .replace(/[^a-z0-9\s]+/gi, '')
      .replace(/\s{2,}/g, ' ')
      .toLowerCase()
      .split(' ')
      .sort();
}
