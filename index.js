const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json({ type: 'application/json' }));

app.use(require('./routes/index.routes.js'));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
