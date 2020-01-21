import { Ranker } from '../../../core/definitions/ranker';
import { LocationQueryResult } from '../location.query.result';
import { LocationSuggestionInput } from '../location.suggestion.in';
import { LocationSuggestionOutput } from '../location.suggestion.out';
import * as _ from 'lodash';

export class LocationRanker implements Ranker {
  private rankingFunctions: Function[] = [this.calculateScoreByQueryAccuracy];
  score(queryResult: LocationQueryResult, suggestionInput: LocationSuggestionInput): LocationSuggestionOutput {
    return { ...queryResult, score: this.calculateScore(queryResult, suggestionInput) };
  }

  calculateScore = (queryResult: LocationQueryResult, suggestionInput: LocationSuggestionInput): number =>
    this.sumScores(queryResult, suggestionInput) / this.rankingFunctions.length;

  calculateScoreByQueryAccuracy(queryResult: LocationQueryResult, suggestionInput: LocationSuggestionInput): number {
    const { name } = queryResult;
    const { query } = suggestionInput;

    return this.getPercentageOfAccuracy(name, query);
  }

  getPercentageOfAccuracy = (resultName: string, query: string) =>
    1 - resultName.length / resultName.replace(query, '').length;

  sumScores = (queryResult: LocationQueryResult, suggestionInput: LocationSuggestionInput) =>
    _.reduce(this.rankingFunctions, (sum, f) => (sum += f(queryResult, suggestionInput)), 0);
}
