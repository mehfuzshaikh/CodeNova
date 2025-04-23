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
    isActive:boolean
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
        required:[true,'Confirm password is required'],
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
        required:[true,'Username is required']
    },
    isActive:{
        type:Boolean,
        default:true,
        select:false
    }
})

userSchema.pre('save',async function(next)
{
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.confirmPassword = undefined;
    next()
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

// This below line is for error solving of controller
export type UserDocument = IUser & mongoose.Document & IUserMethods;
export const USER = mongoose.model<IUser, UserModel>('Users',userSchema);