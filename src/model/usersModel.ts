import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

export interface obj {
  name: string;
  email: string;
  password: string;
  tokens: { [key: string]: string }[];
}

const todoSignupSchema = new mongoose.Schema<obj>({
  name: {
    type: String,
    required: [true, 'Name is needed'],
  },
  email: {
    type: String,
    required: [true, 'Email is needed'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Not a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password needed'],
    minlength: 5,
    select: false,
  },
  tokens: [
    {
      token: String,
    },
  ],
});
todoSignupSchema.pre('save', async function (next: () => void) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('todoUsers', todoSignupSchema);
