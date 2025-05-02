import mongoose , { Schema, Types,Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

export interface IUser{
    _id: Types.ObjectId,
    email:string,
    password:string,
    confirmPassword?:string,
    passwordChangedAt?: Date;
    username:string,
    isActive:boolean,
    isVerified: boolean;
    verificationCode?: string | null;
    otpExpires?: Date | null;
    otpRequestedAt?:Date | null;
    passwordResetToken?: string | null;
    passwordResetExpires?:Date | null;
    createdAt?:Date | null;
    updatedAt?:Date | null
}
export interface IUserMethods {
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    changedPasswordAfter(JWTTimestamp: number | undefined): boolean;
}
type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel>({
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:[true,'Email must be unique'],
        lowercase:true,
        validate:[validator.isEmail,'Enter valid email']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:8,
        validate:[validator.isStrongPassword,'Password must be strong'],
        select:false
    },
    confirmPassword:{
        type:String,
        required: [function (this: mongoose.Document) {
            return this.isNew; // Only required when creating
        }, 'Confirm password is required'],
        validate:{
            validator:function(element){
                return element == this.password
            },
            message:'Password and confirm password should match'
        }
    },
    passwordChangedAt:Date,
    username:{
        type:String,
        required:[true,'Username is required'],
        unique:[true,'Username must be unique']
    },
    isActive:{
        type:Boolean,
        default:true,
        select:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationCode:{
        type: String,
        default:null,
        select:false
    },
    otpExpires:{
        type:Date,
        default:null,
        select:false
    },
    otpRequestedAt: {
        type: Date,
        default: null,
        select: false
    },
    passwordResetToken: {
        type: String,
        default: null,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        default: null,
        select: false,
    }

},{timestamps:true})

userSchema.pre('save',async function(next)
{
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.confirmPassword = undefined;
    next()
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = new Date(Date.now() - 1000);
    next();
});


userSchema.methods.correctPassword = async function(candidatePassword:string,userPassword:string):Promise<boolean>
{
    return await bcrypt.compare(candidatePassword,userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp: number):boolean
{
    if(this.passwordChangedAt)
    {
        const changedTimestamp = Math.floor(this.passwordChangedAt.getTime()/1000);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}

userSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: 600, partialFilterExpression: { isVerified: false } } // only unverified accounts auto-delete
);


// This below line is for error solving of controller
export type UserDocument = IUser & mongoose.Document & IUserMethods;
export const USER = mongoose.model<IUser, UserModel>('Users',userSchema);