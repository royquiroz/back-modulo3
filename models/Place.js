const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema(
  {
    lessee: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    type: {
      type: String,
      enum: ["STORAGE", "ACOOMMODATION"],
      default: "STORAGE"
    },
    name: String,
    size: {
      type: String,
      enum: ["SMALL", "MEDIUM", "BIG"],
      default: "MEDIUM"
    },
    price: {
      type: Number,
      required: "El campo precio es obligatorio"
    },
    photos: [String],
    dimensions: {
      type: Number,
      required: "El campo dimensiones es obligatorio"
    },
    address: {
      type: String,
      required: "El campo direccion es obligatorio"
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review"
      }
    ],
    delete: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Place", placeSchema);
