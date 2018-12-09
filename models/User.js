const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "Campo de nombre es obligatorio"
    },
    last_name: {
      type: String,
      required: "Campo de apellido es obligatorio"
    },
    email: {
      type: String,
      required: "Campo de email es obligatorio"
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["LESSOR", "CLIENT"],
      default: "CLIENT"
    },
    profile_pic: String,
    description: String,
    places: {
      type: Schema.Types.ObjectId,
      ref: "Place"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "update_at"
    }
  }
);

module.exports = mongoose.model("User", userSchema);
