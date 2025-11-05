import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/user.types";

export interface IUserDocument extends IUser{
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



export const User = mongoose.model<IUserDocument>("User", UserSchema);

