



const addDoctor = async (req, res) => {

try{
    const { name, email, password, phone, address, image, disease, queue, travel, rating, about, available, date } = req.body;
    const imageFile = req.file

   if(!name || !email || !password || !phone || !address || !image || !disease || !queue || !travel || !rating || !about || !available || !date){
    return res.json({success:false, message:"Please fill all the fields"})
   }
    
}catch(error){

}

}

export {addDoctor}