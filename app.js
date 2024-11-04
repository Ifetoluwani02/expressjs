const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const workingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.send('The web application is only available Monday to Friday, from 9 to 17.');
  }
};

app.use(workingHours);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'home.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, 'public', 'services.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
