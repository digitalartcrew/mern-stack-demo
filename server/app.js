const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const { DestinationRouter } = require("./routes");
const db = require("./db");
const axios = require("axios");
require("dotenv").config();

// render server side template
app.set("view engine", "ejs");
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  db.collection("destinations")
    .find()
    .toArray()
    .then((results) => {
      results.map((res, index) => {
        // helper props
        res.updateModalId = `modal-update-${res._id}`;
        res.deleteModalId = `modal-delete-${res._id}`;
        res.entityIndex = index;

        return res;
      });

      res.render("index.ejs", { destinations: results });
    })
    .catch((err) => res.render("Yo an errror occured", err));
});

app.get("/api/unsplash", async (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const searchTerm = "cars";
  const resource = `https://api.unsplash.com/search/photos/?query=${searchTerm}&per_page=20&client_id=${clientId}`;

  try {
    const response = await axios.get(resource, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });

    res.json({ success: true, data: response.data });
  } catch (e) {
    throw new Error(e);
  }
});

app.use("/api", DestinationRouter);

app.listen(PORT, () => {
  // Making a small code change
  // I just created a list container
  // Adding API
  console.log(`App listening on PORT: ${PORT}`);
});
