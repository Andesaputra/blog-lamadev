// first we need to import mongoose
// second we create a schema which we gonna use in our website.
// third we export the schema ("name", object)

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
