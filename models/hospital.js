const mongoose=require('mongoose');

const hospitalSchema= new mongoose.Schema({
    hospitalName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    totalPsychiatristCount:{
        type:Number,
        required:true,
        default:0,
    },
    totalPatientCount:{
        type:Number,
        required:true,
        default:0
    },
    psychiatristDetails:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Psychiatrist'
    }]
},
{timestamps:true});

module.exports=mongoose.model('Hospital',hospitalSchema);


