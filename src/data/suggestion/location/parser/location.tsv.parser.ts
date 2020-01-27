import { LocationParser } from '../../../../app/parser/location/location.parser';
import { LocationData } from '../../../../app/suggestion/location/location.data';
import fs from 'fs';
import * as d3 from 'd3-dsv';

export class LocationTsvParser implements LocationParser {
  parse(path: string): LocationData[] {
    const fileContent = fs.readFileSync(path, 'utf8');
    return (d3.tsvParse(fileContent) as unknown) as LocationData[];
  }
}
