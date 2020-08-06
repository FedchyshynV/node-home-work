import * as express from 'express';
import routes from './src/routes/routes';
import * as bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

//body parser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);
// serving static files

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server running on post ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
);
