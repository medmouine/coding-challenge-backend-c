import { SuggestionOutput } from '../suggestion.out';

export interface LocationSuggestionOutput extends SuggestionOutput {
  name: string;
  latitude: number;
  longitude: number;
}
