const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "todos",
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
