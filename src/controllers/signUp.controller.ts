import { User } from "../models/user.model";
import { OTP } from "../models/otp.model";
import { asyncHandler, ApiResponse } from "../utils";

export const signUp = asyncHandler ( async (req, res) => {
  try {
    const { fullName, email, otp, dob }  = req.body;
    
    // Check if all details are provided
    if (!fullName || !email || !otp || !dob) {
        return res.status(403).json({
          success: false,
          message: 'All fields are required',
        });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid.',
      });
    }

      const user = await User.create({
        fullName: fullName,
        email: email,
        dob: dob
      });
      
      res
      .status(200)
      .json(new ApiResponse(201, user, "User created successfully!", true));

      return;
    } catch(e: any) {
      console.log(e.message);
      res.status(500).json({
        success: false,
        message: e.message || "Internal Server Error"
      });
      return;
    }
});