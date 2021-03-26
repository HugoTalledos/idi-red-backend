const mongoose = require("mongoose");
const { Schema } = mongoose;

const LendSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cellphone: {
      type: Number,
      required: false,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    author: { type: String, required: true },
    cover: {
      url: { type: String, required: false },
      alt: { type: String, required: false },
    },
    gender: { type: String, required: false },
    editorial: { type: String, required: false },
    deleted: { type: Boolean, required: false, default: false },
    isBorrowed: { type: Boolean, required: false, default: false },
    lendto: [LendSchema] ,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
BookSchema.set("collection", "Book");

module.exports = mongoose.model("Book", BookSchema);
