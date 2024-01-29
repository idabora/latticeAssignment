const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongoose');
const multer=require('multer');
const db = require("../models/index");

const storage=multer.diskStorage(
    {
        destination: (req,file,cb)=>{
            console.log(file);
            cb(null,'./')
        },
        filename: (res,file,cb)=>{
            console.log(file);
            file.originalname=String(new Date().setDate(new Date().getDate()-1+1));
            cb(null, file.originalname+'.jpg') 
        }
    }
    );

const uploadFile=multer({storage:storage})


router.post('/registerPatients', uploadFile.single('photo') ,async (req, res, next) => {
    try {
        console.log(req.body);
        console.log(req.file)
        const { name, address, email, phone, password } = req.body;
        if (!name || !address || !email || !password || !req.file.filename) {
            return res.status(400).json({ message: 'Name , address,email password and photo are mandatory' })
        }

        const patient = await db.Patient.create({ name, address, email, phone, password , photo:req.file.filename });
        
        return res.status(201).json({ patient })
    } catch (err) {
        next(err)
    }

})

router.get('/hospitals', async (req, res,next) => {
    try{
        console.log(req.body);
        const { hospitalId } = req.body;
        if(!hospitalId){
            return res.status(400).json({message:'Hospital Id is Required.'})
        }
        const hospital = await db.Hospital.findOne({_id:hospitalId}).populate('psychiatristDetails', 'name patientCount hospitalId');
        return res.status(200).json({ hospital })
    }catch(err){
        next(err);
    }
});

router.post('/addHospital', async (req, res,next) => {
    try {

        const { hospitalName, totalPsychiatristCount, totalPatientCount } = req.body;
        if (!hospitalName) {
            return res.status(400).json({ message: 'Hospital Name is Required' });
        }

        const hospital = await db.Hospital.create({ hospitalName, totalPatientCount, totalPsychiatristCount });
        return res.status(201).json({
            message: 'Created Successfully',
            hospital
        })
    } catch (err) {
            next(err);
    }
});

router.post('/addPsychiatrist', async (req, res) => {
    try {
        console.log(req.body);
        const { name, hospitalId, patientCount } = req.body;

        if (!name || !typeof (patientCount) === 'number' || !hospitalId) {
            return res.status(400).json({
                message: 'Psychiatrist Name , Patient count(Integer) and Hospital Id is required'
            })
        }

        const hospital = await db.Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(400).json({ message: 'Invalid Hospital Id' })
        }

        const psychiatrist = await db.Psychiatrist.create({ name, patientCount, hospitalId });
        await db.Hospital.findOneAndUpdate({ _id: hospitalId }, { $inc: { totalPsychiatristCount: 1 }, $push: { psychiatristDetails: hospitalId } }, { new: true })

        return res.status(201).json({
            psychiatrist
        })

    } catch (err) {
        next(err)
    }
})

module.exports = router;


