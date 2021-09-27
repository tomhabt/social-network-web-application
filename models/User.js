const {Schema, model, Types} = require('mongoose');

const UserSchema = new Schema (
{
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        //validate
    },
    thoughts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
          }
    ],
    //self-reference
    friends:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
          }
       ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
        },
    id:false
}
);

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});
// create User model using UserSchema
const User = model ('User', UserSchema);

// export the User model
module.exports = User;


