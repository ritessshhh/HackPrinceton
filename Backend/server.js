const app = require("./app");

port = process.env.PORT || 5001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
