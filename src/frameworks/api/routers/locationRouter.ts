import express, { Request, Response, Router } from 'express';
import { LocationSuggestionInput } from '../../../app/suggestion/location/location.suggestion.in';
import { LocationSuggestionOutput } from '../../../app/suggestion/location/location.suggestion.out';
import { App } from '../../../app';

export class LocationRouter {
  private router: Router;
  private suggestionPresenter: any;

  constructor(private app: App) {
    this.router = express.Router();
    this.initRouter();
  }

  private initRouter() {
    this.router.get('suggestions', this.getSuggestions);
  }

  getSuggestions = (req: Request, res: Response) => {
    const locationSuggestionInput: LocationSuggestionInput = req.query;
    try {
      const suggestions: LocationSuggestionOutput[] = this.app.getSuggestions(locationSuggestionInput);
      const output = this.suggestionPresenter.present(suggestions);

      res.json(output);
    } catch (e) {
      res.end(e.toString());
    }
  };
}
