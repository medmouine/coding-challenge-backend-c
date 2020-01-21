import { Server } from './frameworks/api';

const port = process.env.PORT || '2345';

new Server(port).initDefaultMiddleware().listen();
