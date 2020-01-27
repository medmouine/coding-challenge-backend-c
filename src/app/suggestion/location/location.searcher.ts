import { LocationSuggestionOutput } from './location.suggestion.out';
import { LocationSuggestionInput } from './location.suggestion.in';
import { LocationIndexer } from './indexer/location.indexer';
import { LocationQueryResult } from './location.query.result';
import { LocationRanker } from './ranking/location.ranker';
import { LocationRankingOut } from './ranking/location.ranking.out';
import * as _ from 'lodash';
import { Searcher } from '../../core/definitions/searcher';

export class LocationSearcher implements Searcher {
  constructor(private locationIndexer: LocationIndexer, private overallLocationRanker: LocationRanker) {}

  search(locationSuggestionInput: LocationSuggestionInput): LocationSuggestionOutput[] {
    const queryResults: LocationQueryResult[] = this.locationIndexer.getByQuery(locationSuggestionInput.query);
    if (_.isEmpty(queryResults)) return [];
    const scoredResult: LocationRankingOut[] = this.scoreResults(queryResults, locationSuggestionInput);
    return LocationSearcher.mapRankingOutputToSuggestionOutput(scoredResult);
  }

  private static mapRankingOutputToSuggestionOutput = (scoredResult: LocationRankingOut[]) =>
    scoredResult.map(sr => ({
      latitude: sr.latitude,
      longitude: sr.longitude,
      name: sr.label,
      score: sr.score,
    }));

  private scoreResults = (
    queryResults: LocationQueryResult[],
    suggestionInput: LocationSuggestionInput,
  ): LocationRankingOut[] => queryResults.map(result => this.overallLocationRanker.score(result, suggestionInput));
}
