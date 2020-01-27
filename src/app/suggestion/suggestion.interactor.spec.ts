import { SuggestionInteractor } from './suggestion.interactor';
import { LocationSearcher } from './location/location.searcher';
import { mock } from 'jest-mock-extended';
import { LocationSuggestionInput } from './location/location.suggestion.in';
import { LocationSuggestionOutput } from './location/location.suggestion.out';

afterAll(() => {
  jest.resetAllMocks();
});

const locationSearcherMock = mock<LocationSearcher>();

const underTest = new SuggestionInteractor(locationSearcherMock);
const input: LocationSuggestionInput = { query: 'test', latitude: 3, longitude: 2 };
const output: LocationSuggestionOutput[] = [{ name: 'test', latitude: 1, longitude: 1, score: 1 }];

beforeEach(() => {
  locationSearcherMock.search.mockReturnValue(output);
});

describe('SuggestionInteractor', () => {
  describe('given location suggestion input', () => {
    describe('when execute', () => {
      it('should return location suggestionOutput', () => {
        const actual = underTest.execute(input);

        expect(actual).toEqual(output);
      });
    });
  });
});
