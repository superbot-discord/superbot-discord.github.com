var express = require('express')()
const app = express();
var port = {
  'client_id': '796686363604680755',
  'client_secret': 'csnkpOhO8P5O-pU3NlM9zyrDdGYxp68S',
  'grant_type': 'authorization_code',
  'redirect_uri': 'http://127.0.0.1:5501',
}

app.get('/', (request, response) => {
  return response.sendFile('index.html', { root: '.' });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
console.log('1')
