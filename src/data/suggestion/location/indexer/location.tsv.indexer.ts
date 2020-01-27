import { LocationIndexer } from '../../../../app/suggestion/location/indexer/location.indexer';

export class LocationTsvIndexer implements LocationIndexer {
  getByQuery(query: string): LocationQueryResult[] {
    return [];
  }

  index(data: LocationData[]): IndexedData[] {
    return [];
  }
}
