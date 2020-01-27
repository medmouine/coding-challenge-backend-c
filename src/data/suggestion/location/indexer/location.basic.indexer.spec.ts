import { LocationBasicIndexer } from './location.basic.indexer';

let underTest;

beforeEach(() => {
  underTest = new LocationBasicIndexer();
});

const location1 = {
  id: 1,
  name: 'quebec City',
  lat: 1,
  long: 1,
};

const location2 = {
  id: 1,
  name: 'test TeSt quebec City',
  lat: 1,
  long: 1,
};
const location3 = {
  id: 2,
  name: 'TesT Montreal',
  lat: 3,
  long: 4,
};
const locationData = [location1, location2, location3];

describe('LocationBasicIndexer', () => {
  describe('given location data', () => {
    describe('when indexing data', () => {
      it('should index data properly', () => {
        // @ts-ignore
        const actual = underTest.index(locationData);

        expect(actual).toEqual({
          test: [location2, location3],
          quebec: [location1, location2],
          city: [location1, location2],
          montreal: [location3],
        });
      });
    });
  });
  describe('given query on indexed data', () => {
    describe('when get by query', () => {
      it('should return matching data', () => {
        // @ts-ignore
        underTest.index(locationData);
        const actual = underTest.getByQuery('quebec c');
        expect(actual).toEqual([
          { label: 'quebec City', latitude: 1, longitude: 1 },
          { label: 'test TeSt quebec City', latitude: 1, longitude: 1 },
        ]);
      });
    });
  });
});
