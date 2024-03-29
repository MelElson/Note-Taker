const express = require('express');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
//routes
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require('./routes/htmlRoutes');

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//listener
app.listen(PORT, () => {
  console.log(`App listening on: http://localhost:${PORT}`);
});


