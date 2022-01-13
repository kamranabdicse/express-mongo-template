import mongoose, { Schema } from "mongoose";
import { Base } from "./Base";

export interface IUser extends Base{
    name: string,
    phoneNumber: string,
    password: string,
    isDeleted: boolean,
    createAt: Date
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String },
        phoneNumber: { type: String , unique: true},
        password: { type: String },
        isDeleted: { type: Boolean, default: false },
        createAt: { type: Date, default: Date.now },
    }
);

export default mongoose.model<IUser>("User", UserSchema);