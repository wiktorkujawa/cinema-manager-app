const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email : {
      type:String,
      required:true,
      unique: true
    },
    username: {
      type:String,
      required: true,
      unique: true
    },
    password:{
      type:String, 
      required:true
    },
    created_at:{
      type: Date, 
      default: Date.now()
    }
});

userSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

userSchema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User',userSchema);