const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const model = require("./Models/DB-Schema");

mongoose.connect(
  "mongodb+srv://user:RvuiPHz5Dmp9VRC@cluster0.eyno9.mongodb.net/Skin-DB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.get("/", (req, res) => {
  model.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.post("/insert", async (req, res) => {
  const data = req.body.condition;
  const option = new model({ skinOption: data });

  try {
    await option.save();
  } catch (error) {
    console.log("error" + error);
  }
});

app.put("/update", async (req, res) => {
  const data = req.body.newValue;
  const id = req.body.id;

  try {
    await model.findById(id, (err, updated) => {
      updated.skinOption = data;
      updated.save();
      res.send("updated");
    });
  } catch (error) {
    console.log("error" + error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await model.findByIdAndRemove(id).exec();
    res.send("deleted");
  } catch (error) {
    console.log("error" + error);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
