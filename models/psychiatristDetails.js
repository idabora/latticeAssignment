const mongoose=require('mongoose');

const psychiatristSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    patientCount:{
        type:Number,
        required:true,
    },
    hospitalId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hospital',
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model('Psychiatrist',psychiatristSchema);

