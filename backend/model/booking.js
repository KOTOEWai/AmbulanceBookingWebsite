const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name : { type: String,required:true},
    phone : { type: String,required:true},
    email : { type: String, required:true},
    relativeName : { type: String, required:true},
    date : { type: Date, required:true},
    time : { type: String, required:true},
    address : { 
             type: String, required: true 
     } ,
     typeofEmergency: { type: String, required: true }
})

module.exports = mongoose.model('Booking', BookingSchema);