import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

export class Server {
  private eApp: express.Application;
  private readonly port: number;

  constructor(port: string) {
    this.eApp = express();
    this.port = parseInt(port);
  }

  public listen(): void {
    this.eApp.listen(this.port, () => {
      console.log('Server running at http://127.0.0.1:%d/suggestions', this.port);
    });
  }

  public initRouters(controllers): Server {
    controllers.forEach(controller => {
      this.eApp.use('/', controller.router);
    });
    return this;
  }

  public initDefaultMiddleware(): Server {
    this.eApp.use(bodyParser.json());
    this.eApp.use(helmet());
    return this;
  }
}
