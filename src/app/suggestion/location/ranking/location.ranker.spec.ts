import { mock } from 'jest-mock-extended';
import { LocationSubRanker } from './location.sub.ranker';
import { LocationRanker } from './location.ranker';
import { LocationSuggestionInput } from '../location.suggestion.in';
import { LocationQueryResult } from '../location.query.result';
import { LocationRankingOut } from './location.ranking.out';

afterEach(() => {
  jest.resetAllMocks();
});

const notApplicableSubRanker = mock<LocationSubRanker>();
const applicableSubRankerWithWeightOne = mock<LocationSubRanker>();
const applicableSubRankerWithWeightTwo = mock<LocationSubRanker>();
const rankedLocationSuggestion1: LocationRankingOut = { label: 'test 123', latitude: 1, longitude: 2, score: 1 };
const rankedLocationSuggestion2: LocationRankingOut = { label: 'test 123', latitude: 1, longitude: 2, score: 0.25 };

beforeEach(() => {
  notApplicableSubRanker.isApplicable.mockReturnValue(false);
  applicableSubRankerWithWeightOne.isApplicable.mockReturnValue(true);
  applicableSubRankerWithWeightTwo.isApplicable.mockReturnValue(true);
  applicableSubRankerWithWeightOne.getWeight.mockReturnValue(1);
  applicableSubRankerWithWeightTwo.getWeight.mockReturnValue(2);
  applicableSubRankerWithWeightOne.score.mockReturnValue(rankedLocationSuggestion1);
  applicableSubRankerWithWeightTwo.score.mockReturnValue(rankedLocationSuggestion2);
});

describe('LocationRanker', () => {
  const underTest = new LocationRanker([
    notApplicableSubRanker,
    applicableSubRankerWithWeightOne,
    applicableSubRankerWithWeightTwo,
  ]);

  describe('given query results and suggestion input', () => {
    const locationQueryResult: LocationQueryResult = { label: 'test 123', latitude: 1, longitude: 2 };
    const locationSuggestionInput: LocationSuggestionInput = { query: 'test', latitude: 3, longitude: 2 };

    describe('when score', () => {
      it('should return ranked suggestions with valid score', () => {
        const actual = underTest.score(locationQueryResult, locationSuggestionInput);

        expect(actual).toEqual({ label: 'test 123', latitude: 1, longitude: 2, score: 0.5 }); // 1 * 1 + 0.25 * 2 = 1.5 / (1 + 2) = 0.5
      });
      describe('when sub ranker is not applicable', () => {
        it('should not call sub ranker', () => {
          underTest.score(locationQueryResult, locationSuggestionInput);

          expect(notApplicableSubRanker.score).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
});
