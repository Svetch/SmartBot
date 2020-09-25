import { Document, Model, model, Types, Schema, Query } from "mongoose";
export interface IPrefixSound extends Document {
    Prefix: {
        type: String
    },
    GuildID: String
};

export const PrefixSchema = new Schema({
    Prefix: String,
    GuildID: String
});

const Sound: model<IPrefixSound> = model<IPrefixSound>('prefixes', PrefixSchema);
export default Sound;