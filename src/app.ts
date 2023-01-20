import express, { Express } from 'express';
import { setupMysqlConnection, loadSeed } from './data-access-layer'; 
import { routes } from './routes';
import { authenticate } from './util';
 
const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupMysqlConnection();

loadSeed();

app.use(authenticate.unless({path: [{ url: "/api/users/register", methods: ["POST"] }, { url: "/api/users/login", methods: ["GET", "PUT", "POST"] }]}));

routes(app);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

