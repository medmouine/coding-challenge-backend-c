import { Ranker } from '../../../../app/core/definitions/ranker';
import { SuggestionInput } from '../../../../app/suggestion/suggestion.in';
import { RankingOutput } from '../../../../app/core/definitions/ranking.output';
import { QueryResult } from '../../../../app/core/entities/queryResult';

export class EditDistanceBasedSubRanker implements Ranker {
  private static WEIGHT = 1;

  public getWeight(): number {
    return EditDistanceBasedSubRanker.WEIGHT;
  }

  public isApplicable = (_: SuggestionInput): boolean => true;

  public score = (queryResult: QueryResult, suggestionInput: SuggestionInput): RankingOutput => ({
    ...queryResult,
    score: EditDistanceBasedSubRanker.getAccuracyPercentage(queryResult, suggestionInput),
  });

  private static getAccuracyPercentage = (queryResult: QueryResult, suggestionInput: SuggestionInput) =>
    1 - queryResult.label.replace(suggestionInput.query, '').length / queryResult.label.length;
}
