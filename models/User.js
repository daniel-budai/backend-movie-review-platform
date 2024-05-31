const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", enum: ["user", "admin"] },
});

module.exports = mongoose.model("User", UserSchema);

/* använd olika roller: user och admin. Alla kan hämta filmer samt läsa/skriva rescensioner men endast admin kan lägga till, uppdatera eller ta bort filmer.*/
