const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
  
    title: { type: String, required: false },
    description: { type: String, required: false },
    published: { type: Boolean, required: false },
    image :{type: String, required: false}
 
  /*  newsletter: {
        type: Schema.Types.ObjectId,
        ref: "Newsletter",
    },*/

}, { timestamps: true })

module.exports = mongoose.model('Tutorial', schema);