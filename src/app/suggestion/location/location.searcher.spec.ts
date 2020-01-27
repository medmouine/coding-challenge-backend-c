import { LocationSearcher } from './location.searcher';
import { mock } from 'jest-mock-extended';
import { LocationIndexer } from './indexer/location.indexer';
import { LocationRanker } from './ranking/location.ranker';
import { LocationSuggestionInput } from './location.suggestion.in';
import { LocationQueryResult } from './location.query.result';
import { LocationRankingOut } from './ranking/location.ranking.out';

afterEach(() => {
  jest.resetAllMocks();
});

const locationIndexerMock = mock<LocationIndexer>();

const locationRankerMock = mock<LocationRanker>();
const locationQueryResult: LocationQueryResult = { label: 'test 123', latitude: 1, longitude: 2 };
const rankedLocationSuggestion: LocationRankingOut = { label: 'test 123', latitude: 1, longitude: 2, score: 0.5 };

describe('LocationSearcher', () => {
  const underTest = new LocationSearcher(locationIndexerMock, locationRankerMock);

  describe('given location suggestion input', () => {
    const locationSuggestionInput: LocationSuggestionInput = { query: 'test', latitude: 3, longitude: 2 };

    describe('when search', () => {
      describe('if result exists', () => {
        it('should return scored suggested locations', () => {
          locationIndexerMock.getByQuery.mockReturnValue([locationQueryResult]);
          locationRankerMock.score.mockReturnValue(rankedLocationSuggestion);
          const actual = underTest.search(locationSuggestionInput);

          expect(actual).toEqual([
            {
              longitude: locationQueryResult.longitude,
              latitude: locationQueryResult.latitude,
              score: 0.5,
              name: locationQueryResult.label,
            },
          ]);
        });
      });
      describe('if result does not exist', () => {
        it('should return no suggestions', () => {
          locationIndexerMock.getByQuery.mockReturnValue([]);
          const actual = underTest.search(locationSuggestionInput);

          expect(actual).toEqual([]);
        });
      });
    });
  });
});
