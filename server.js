const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/api/celebrity', (req, res) => {
  const name = req.query.name;
  const apiUrl = 'https://api.api-ninjas.com/v1/celebrity';
  const apiKey = '/UfzHexOu5rGCafaGeKIwA==kvYJh7a8ufor2moL'; 

  const request = require('request');
  request.get({
    url: `${apiUrl}?name=${name}`,
    headers: {
      'X-Api-Key': apiKey
    }
  }, (error, response, body) => {
    if (error) {
      res.status(500).send({ error: 'Request failed' });
    } else if (response.statusCode!== 200) {
      res.status(response.statusCode).send({ error: body.toString('utf8') });
    } else {
      res.send(JSON.parse(body));
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});