import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, `Le nom d'utilateur`],
    },
    password: {
      type: String,
      required: [true, `Le mot de passe de l'utilisateur`],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
