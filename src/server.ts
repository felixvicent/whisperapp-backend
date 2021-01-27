import express from 'express';

import './database/index';

const app = express();

app.get('/', (request, response) => response.json({ message: 'Hello World' }));

app.listen(3333);
