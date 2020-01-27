import { EditDistanceBasedSubRanker } from './editDistanceBased.sub.ranker';

const underTest = new EditDistanceBasedSubRanker();

describe('EditDistanceBasedSubRanker', () => {
  describe('given query result and suggestion input', () => {
    const queryResult = { label: 'test 123' };
    const suggestionInput = { query: 'test' };
    it('should return ranked output', () => {
      const actual = underTest.score(queryResult, suggestionInput);

      expect(actual).toEqual({ label: 'test 123', score: 0.5 }); // 'test 123' - 'test' = ' 123' = 4 / 'test 123' = 0.5,
    });
  });
  describe('when get weight', () => {
    it('should return weight', () => {
      const actual = underTest.getWeight();

      expect(actual).toEqual(1);
    });
  });
  describe('when isApplicable', () => {
    it('always return true', () => {
      expect(underTest.isApplicable({ query: 'any' })).toBeTruthy();
    });
  });
});
