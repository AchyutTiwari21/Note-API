import { User } from "../models/user.model";
import { OTP } from "../models/otp.model";
import { asyncHandler, ApiResponse } from "../utils";

const generateAccessToken = async function(userId: string) {
    try {
        const user = await User.findById(userId);
        const accessToken = user?.generateAccessToken();

        return {accessToken};
    } catch (error) {
        console.error("Error generating access token:", error);
        throw new Error("Failed to generate access token");
    }
}

export const signIn = asyncHandler(async (req, res) => {
    try {
        const { email, otp } = req.body;
    
        if (!email || !otp) {
            res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        // Check if the user exists
        const user = await User.findOne({ email });

        if(!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        // Check if the OTP is valid
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0 || otp !== response[0].otp) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid.',
            });
        }

        // If user exists and OTP is valid, return jwt token and user details
        const { accessToken } = await generateAccessToken(user._id.toString());

        const options = {
            httpOnly: true,
            secure: true
        };

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user, accessToken
                },
                "User logged In Successfuly",
                true
            )
        );
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})