const mongoose= require('mongoose');
const validator= require('validator');

const patientSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Mandatory.."],
        validate:{
            validator: (val)=>{
                if(val.length<10) return 'minimum length of field name is 10'
            }
        }
    },
    address:{
        type:String,
        required:true,
        validate:{
            validator: (val)=>{
                if(val.length<10) return 'minimum length of field name is 10'
            }
        },
        trim:true
    },
    email:{
        type:String,
        required:true,
        validate: {
            validator: (val)=>{
              return validator.isEmail(val); // Using validator library to check email validity
            },
            message: 'Invalid email address'
          },
        trim:true
    },
    phone:{
        type:Number,
        validate:{
            validator:(val)=>{
                return validator.isPhone(val);
            },
            message: 'Invalid Phone Number'
        }
    },
    password:{
        type:String,
        trim:true,
        validate: {
            validator: (val)=>{
              return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/.test(val);
            },
            message: 'Password must contain one uppercase character, one lowercase character, and a number. Length must be between 8 and 15.'
          }

    },
    photo:{
        type:String,
        required:true
    }
},
{timestamps:true}
);

module.exports=mongoose.model('Patient',patientSchema)

