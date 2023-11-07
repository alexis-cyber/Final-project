const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
  },
});

const adminSchema = new mongoose.Schema({
  email:{
    type:String,
    required: true,
    unique: true,
    default: "alex@gmail.com",
  },
  password: {
    type: String,
    required: true,
    default: "123",
  },
})


const User = mongoose.model('User', UserSchema);
const adminUser = mongoose.model('adminUser', adminSchema);

// let admin = new adminUser()
// admin.save()



module.exports = {User, adminUser};

//products array