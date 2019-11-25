import { Schema } from "mongoose";

export const UserSchema = new Schema({
     firstName: String,
     lastName: String,
     rut: String,
     chilenRUT: String,
     gender: String,
     address: [String],
     phone: String,
    createdAt: { type: Date, default: Date.now }
});

