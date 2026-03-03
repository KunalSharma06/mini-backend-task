require("dotenv").config();
const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("./dist"));

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const notes = await noteModel.create({
    title, description
  })

  res.status(201).json({
    message: "Note created successfully",
    notes
  })
})

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Note fetched successfully",
    notes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  const notes = await noteModel.findByIdAndDelete(id);

  res.status(201).json({
    message: "Note deleted successfully",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const notes = await noteModel.findByIdAndUpdate(id, { title, description });

  res.status(201).json({
    message: "Note updated successfully",
  });
});

app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/dist/index.html"));
})


module.exports = app;