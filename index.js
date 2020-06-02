const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const editUsersRoute = require("./routes/users.edit.route.js");
const authRoute = require("./routes/auth.route.js");
const bookRoute = require("./routes/books.route.js");
const sampleRoute = require("./routes/sample.js");
const express = require("express");
const app = express();
const cors = require('cors')

if (!config.get("privateKey")) {
  console.error("privateKey not available");
  process.exit(1);
}

//connect to mongodb. DB-access-name: application, DB-access-password: auxtkgbLpcfA11Gh
mongoose
  .connect(
    "mongodb+srv://application:auxtkgbLpcfA11Gh@cluster0-2rgim.mongodb.net/JournalDB?retryWrites=true&w=majority",
    { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

// packages
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//paths
app.use("/auth", authRoute);
app.use("/users/edit", editUsersRoute);
app.use("/channels", bookRoute);
app.use("/sample", sampleRoute);

app.get('/test',(req, res) =>{
  res.send('ok');
  console.log('fine');
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
