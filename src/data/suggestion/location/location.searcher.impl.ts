import { LocationSearcher } from '../../../app/suggestion/location/location.searcher';
import { LocationSuggestionOutput } from '../../../app/suggestion/location/location.suggestion.out';
import { LocationSuggestionInput } from '../../../app/suggestion/location/location.suggestion.in';
import { LocationIndexer } from '../../../app/suggestion/location/indexer/location.indexer';
import { LocationQueryResult } from '../../../app/suggestion/location/location.query.result';
import { LocationRanker } from '../../../app/suggestion/location/ranking/location.ranker';
import { LocationRankingOut } from '../../../app/suggestion/location/ranking/location.ranking.out';
import * as _ from 'lodash';

export class LocationSearcherImpl implements LocationSearcher {
  constructor(private locationIndexer: LocationIndexer, private locationRanker: LocationRanker) {}

  search(locationSuggestionInput: LocationSuggestionInput): LocationSuggestionOutput[] {
    const queryResults: LocationQueryResult[] = this.locationIndexer.getByQuery(locationSuggestionInput.query);
    if (_.isEmpty(queryResults)) return [];
    const { latitude, longitude } = locationSuggestionInput;
    return this.scoreResults(queryResults, latitude, longitude);
  }

  scoreResults = (queryResults: LocationQueryResult[], latitude: string, longitude: string): LocationRankingOut[] =>
    queryResults.map(result => this.locationRanker.score(result, { latitude, longitude }));
}
