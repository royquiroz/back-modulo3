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
      unique: true,
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
    profile_pic: {
      type: String,
      default:
        "https://res.cloudinary.com/royquiroz/image/upload/v1541363947/Tfixeo/male.png"
    },
    description: String,
    places: {
      type: Schema.Types.ObjectId,
      ref: "Place"
    },
    rents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rent"
      }
    ],
    sent: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message"
      }
    ],
    received: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message"
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "update_at"
    }
  }
);

module.exports = mongoose.model("User", userSchema);
