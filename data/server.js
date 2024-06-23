const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors()); 
app.use(bodyParser.json());




app.get('/api/home_player_data', (req, res) => {
    const dataJson = fs.readFileSync('./home_player.data.json');
  const data = JSON.parse(dataJson);
  res.json(data);
});
app.get('/api/away_player_data', (req, res) => {
    const dataJson = fs.readFileSync('./away_player.data.json');
  const data = JSON.parse(dataJson);
  res.json(data);
});

app.get('/api/line_data', (req, res) => {
    const lineDataJson = fs.readFileSync('./line.data.json');
  const data = JSON.parse(lineDataJson);
  res.json(data);
});
app.get('/api/polygon_data', (req, res) => {
    const polygonDataJson = fs.readFileSync('./polygon.data.json');
  const data = JSON.parse(polygonDataJson);
  res.json(data);
});

app.post('/update_home_player_data', (req, res) => {
    fs.writeFile('home_player.data.json', JSON.stringify(req.body), (err) => {
        res.send('Data updated.');
    });
});
app.post('/update_away_player_data', (req, res) => {
    fs.writeFile('away_player.data.json', JSON.stringify(req.body), (err) => {
        res.send('Data updated.');
    });
});
app.post('/update_line_data', (req, res) => {
    fs.writeFile('line.data.json', JSON.stringify(req.body), (err) => {
        res.send('Data updated.');
    });
});
app.post('/update_polygon_data', (req, res) => {
    fs.writeFile('polygon.data.json', JSON.stringify(req.body), (err) => {
        res.send('Data updated.');
    });
});
app.get('/api/polygon_data', (req, res) => {
    const lineDataJson = fs.readFileSync('./polygon.data.json');
  const data = JSON.parse(lineDataJson);
  res.json(data);
});

app.listen(3056, () => console.log('Server listening'));
