import otpGenerator from 'otp-generator';
import { OTP } from '../models/otp.model';
import { User } from '../models/user.model';
import { asyncHandler, ApiResponse } from '../utils';

export const sendOTP = asyncHandler( async (req, res) => {
  try {
    const { email } = req.body;

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    await OTP.create(otpPayload);

    return res
    .status(200)
    .json(
        new ApiResponse(200, null, "OTP sent successfully", true)
    );

  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});