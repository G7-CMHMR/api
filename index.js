const server = require('./server.js');
const { conn } = require('./db.js');
const { api } = require('./config');
const { addProducts } = require('./aux_functions');

const host = api.host
const port = api.port

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(port, host,async () => {
    console.log(`Server is running at ${host}:${port}`);
    await addProducts();
})
});
