import mongoose from 'mongoose';

const PrefixSchema = new mongoose.Schema({
    Prefix: {
        type: String
    },
    GuildID: String
});

export default mongoose.model('prefixes', PrefixSchema);