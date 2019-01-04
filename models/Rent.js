const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentSchema = new Schema(
  {
    place: {
      type: Schema.Types.ObjectId,
      ref: "Place"
    },
    lessee: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    arrival: {
      type: Date
    },
    departure: {
      type: Date
    },
    isAccepted: {
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

module.exports = mongoose.model("Rent", rentSchema);
