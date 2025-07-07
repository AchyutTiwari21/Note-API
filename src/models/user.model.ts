import mongoose, {Types, Schema, Document } from "mongoose";
import jwt, { SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';

export interface IUser extends Document {
  email: string;
  fullName: string;
  avatar?: string;
  notes: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String
        },
        notes: [{
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }]
    },
    {timestamps: true}
);

userSchema.methods.generateAccessToken = function () {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const expiry = process.env.ACCESS_TOKEN_EXPIRY;

  if (!secret || !expiry) {
    throw new Error('Missing access token configuration');
  }

  const options: SignOptions = {
    expiresIn: expiry as StringValue,
  };

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    secret,
    options
  );
};


// userSchema.methods.generateRefreshToken = function() {
//     const secret = process.env.REFRESH_TOKEN_SECRET;
//     const expiry = process.env.REFRESH_TOKEN_EXPIRY;

//     if (!secret || !expiry) {
//         throw new Error('Missing refresh token configuration');
//     }

//     const options: SignOptions = {
//         expiresIn: expiry as StringValue,
//     };

//     return jwt.sign(
//         {
//             _id: this._id,
//         },
//         secret,
//         options
//     )
// }

export const User = mongoose.model<IUser>("User", userSchema);