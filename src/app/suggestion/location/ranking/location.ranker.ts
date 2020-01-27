import { Ranker } from '../../../core/definitions/ranker';
import { LocationQueryResult } from '../location.query.result';
import { LocationSuggestionInput } from '../location.suggestion.in';
import { LocationRankingOut } from './location.ranking.out';
import { LocationSubRanker } from './location.sub.ranker';

export class LocationRanker implements Ranker {
  constructor(private subRankers: LocationSubRanker[]) {}

  public score = (queryResult: LocationQueryResult, suggestionInput: LocationSuggestionInput): LocationRankingOut =>
    this.calculateScore(queryResult, suggestionInput);

  private calculateScore = (
    queryResult: LocationQueryResult,
    suggestionInput: LocationSuggestionInput,
  ): LocationRankingOut => ({
    ...queryResult,
    score: this.processSubrankings(queryResult, suggestionInput),
  });

  private processSubrankings(queryResult: LocationQueryResult, suggestionInput: LocationSuggestionInput) {
    const applicableSubRankers: LocationSubRanker[] = this.subRankers.filter(sr => sr.isApplicable(suggestionInput));
    const totalScore = this.getTotalScore(applicableSubRankers, queryResult, suggestionInput);
    return this.calculateRelativeScore(totalScore, applicableSubRankers);
  }

  private calculateRelativeScore = (totalScore: number, applicableSubRankers: LocationSubRanker[]) =>
    totalScore / this.getTotalWeight(applicableSubRankers);

  private getTotalScore = (
    applicableSubRankers: LocationSubRanker[],
    queryResult: LocationQueryResult,
    suggestionInput: LocationSuggestionInput,
  ) => applicableSubRankers.reduce((t, sr) => (t += sr.score(queryResult, suggestionInput).score * sr.getWeight()), 0);

  private getTotalWeight = (subRankers: LocationSubRanker[]) =>
    subRankers.reduce((t, sr): number => (t += sr.getWeight()), 0);
}
