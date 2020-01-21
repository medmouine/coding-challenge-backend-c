import { RankingOutput } from '../../../core/definitions/ranking.output';
import { LocationQueryResult } from '../location.query.result';

export interface LocationRankingOut extends RankingOutput, LocationQueryResult {}
