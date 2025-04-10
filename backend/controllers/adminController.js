
import validator from "validator"
import DoctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import jwt from "jsonwebtoken"


const addDoctor = async (req, res) => {

try{
    const { name, email, password, phone, address, image, disease, queue, travel, rating, about, available, date } = req.body;
    const imageFile = req.file

   if(!name || !email || !password || !phone || !address || !image || !disease || !queue || !travel || !rating || !about || !available || !date){
    return res.json({success:false, message:"Please fill all the fields"})
   }

if(!validator.isEmail(email)){
    return res.json({success:false, message:"Please enter valid email"})
}

if(password.length< 8){
    return res.json({success:false, message:"Password should be at least 8 characters"})
}

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
const imageUrl = imageUpload.secure_url

const doctorData = {
    name,
    email,
    password: hashedPassword,
    phone,
    address:JSON.parse(address),
    image: imageUrl,
    disease,
    queue,
    travel,
    rating,
    about,
    available,
    date:Date.now()
}

const newDoctor = new DoctorModel(doctorData)
await newDoctor.save()

res.json({success:true, message:"Doctor added successfully"})
    
}catch(error){
console.log(error)
    res.json({success:false, message:"Something went wrong"})
}

}
const loginAdmin = async (req, res) => {
    try{
  const { email, password } = req.body;
  
if( email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
   
    const token = jwt.sign(email+password, process.env.JWT_SECRET)
    res.json({success:true, message:"Login successful", token:token})


}else{
    res.json({success:false, message:"Invalid credentials"})
}

    } catch(error){
        console.log(error)
        res.json({success:false, message:"Something went wrong"})
    }
}

export {addDoctor, loginAdmin}