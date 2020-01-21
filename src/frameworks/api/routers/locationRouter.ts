import express, { Request, Response, Router } from 'express';
import { LocationSuggestion } from '../../../app/suggestion/locationSuggestion';
import { LocationSuggestionInput } from '../../../app/suggestion/location/location.suggestion.in';

export class LocationRouter {
  private router: Router;
  private searchEngine: App;
  private suggestionPresenter: any;

  constructor() {
    this.router = express.Router();
    this.initRouter();
  }

  private initRouter() {
    this.router.get('suggestions', this.getSuggestions);
  }

  getSuggestions = (req: Request, res: Response) => {
    const locationSuggestionInput: LocationSuggestionInput = req.query;
    try {
      const suggestions: LocationSuggestion[] = this.searchEngine.getSuggestions(locationSuggestionInput);
      const output = this.suggestionPresenter.present(suggestions);

      res.json(output);
    } catch (e) {
      res.end(e.toString());
    }
  };
}
