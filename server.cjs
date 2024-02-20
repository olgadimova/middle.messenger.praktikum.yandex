const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

app.use(express.static(`${__dirname}/dist`));
app.use(express.static(`${__dirname}/dist/assets`));

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/register.html'));
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/chat.html'));
});

app.get('/password-update', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/password-update.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/profile.html'));
});

app.get('/profile-update', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/password-update.html'));
});

app.get('/404', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/404.html'));
});

app.get('/500', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/500.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log('Сервер слушает!');
});
