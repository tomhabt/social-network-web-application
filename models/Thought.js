const {Schema, model} = require('mongoose');

const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema (
{
    thoughtText:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username:{
            type: String,
            required: true
    },
    // use ReactionSchema to validate data for a thought
    reactions:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
        },
    id: false
}
);

// get total count of reaction on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length      
});

// create Thought model using UserSchema
const Thought = model ('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;

