const Booking = require('../model/booking')
const paseNasted = (data)=>{
  let res = {};
  for( let key in data) {
    if( key.includes('.')){
        const [ parent , children] = key.split('.');
        res [ parent] = [parent] || {};
        res[parent][children] = data[key];
    }else{
        res[key] = data[key];
    }
  }
  return res;
}
exports.get = async (req,res)=>{
    try{
        const bookings = await Booking.find()
        return res.json(bookings)
    }catch(err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}

exports.postBooking = async (req,res)=>{
     console.log(req.body)
    try{

    const {user,name,phone, email,relativeName, date, time ,address, typeofEmergency} = req.body;
    if ( !user || !name || !phone || !email || !relativeName || !date || !time || !typeofEmergency){
        return res.status(400).json({ message: 'Please fill all required fields' });
    }
    const booking = new Booking({
        user,
        name,
        phone,
        email,
        relativeName,
        date,
        time,
        address,
        typeofEmergency
    });
    const savedBooking = await booking.save();
   
    return res.json({
        statue : 'success',
        message : 'booking success',
        data : savedBooking
    })
}catch(err) {
    console.log(err)
    res.status(400).json({ message: err.message });
    }
}