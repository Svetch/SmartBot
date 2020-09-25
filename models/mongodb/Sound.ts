import { Document, Model, model, Types, Schema, Query } from "mongoose";
export interface IUserSound extends Document {
    enabled: {
        type: Boolean
    };
    owner: String;
};

export const UserSchema = new Schema({
    enabled: Boolean,
    owner: String
});

const Sound: model<IUserSound> = model<IUserSound>('userSounds', UserSchema);
export default Sound;