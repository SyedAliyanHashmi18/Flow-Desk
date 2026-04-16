import mongoose , {Schema,Document} from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    passwordHash: string;
    emailVerified: boolean;
    emailOtp?: number ;
    otpExpiry?: Date;
    role?: string;
    plan?: string;
    projectCount: number;

    createdAt: Date;
    aiUsageCount: number;
    aiUsageResetDate: Date;
}
//User SCHEMA
const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username must be less than 30 characters long']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
    },
    passwordHash: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    emailOtp: {
        type: Number,   
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    plan: {
        type: String,
        enum: ['free', 'pro'],
        default: 'free'
    },
    projectCount: {
        type: Number,
        default: 0
    },
    aiUsageCount: {
        type: Number,
        default: 0
    },
    aiUsageResetDate : {
        type: Date,
        default: null
        
    },

    createdAt: {
        type: Date,
        default: null
    }
});

const UserModel =  (mongoose.models.User as mongoose.Model<User>)||(mongoose.model<User>('User', userSchema));

export default UserModel;