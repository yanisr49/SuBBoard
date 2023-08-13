const http = require("http");
const app = require("./src/server");

const { PORT } = process.env;

// server listening
app.listen(PORT || 4001, () => {
  console.log(`Server running on port ${PORT || 4001}`);
});