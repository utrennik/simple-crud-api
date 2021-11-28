require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('\x1b[33m%s\x1b[0m', `Server started on port: ${PORT}`); // eslint-disable-line no-console
});
