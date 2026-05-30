import jwt from "jsonwebtoken";

const authHospital = async (req, res, next) => {
  try {
    const htoken = req.headers.htoken || req.headers.hToken;

    if (!htoken) {
      return res.json({ success: false, message: "Please login first" });
    }

    const tokenDecoded = jwt.verify(htoken, process.env.JWT_SECRET);

    if (!tokenDecoded?.hospitalId) {
      return res.json({ success: false, message: "Invalid login token" });
    }

    req.hospitalId = tokenDecoded.hospitalId;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Something went wrong" });
  }
};

export default authHospital;