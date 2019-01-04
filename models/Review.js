const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    lessor: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    place: {
      type: Schema.Types.ObjectId,
      ref: "Place"
    },
    raiting: {
      type: Number,
      default: 0
    },
    comment: {
      type: String,
      required: "El campo comentario es requerido"
    },
    delete: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "update_at"
    }
  }
);

module.exports = mongoose.model("Review", reviewSchema);
