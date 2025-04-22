import mongoose , { Document,Schema, Types } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

export interface IUser extends Document{
    _id: Types.ObjectId,
    email:string,
    password:string,
    confirmPassword?:string,
    username:string,
    isActive:boolean
}

const userSchema:Schema<IUser> = new mongoose.Schema({
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

export const USER = mongoose.model<IUser>('Users',userSchema);