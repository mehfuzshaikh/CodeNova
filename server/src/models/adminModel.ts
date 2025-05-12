import mongoose , { Schema, Types,Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

export interface IAdmin {
    _id: Types.ObjectId,
    username:string,
    password:string,
    name:string,
    isActive:boolean,
    createdAt:Date,
    updatedAt:Date,
}

export interface IAdminMethods {
    correctPassword(enteredPassword:string,adminPassword:string): Promise<boolean>;
}

type AdminModel = Model<IAdmin, {}, IAdminMethods>;


const adminSchema = new Schema<IAdmin,AdminModel>({
    username:{
        type:String,
        required:[true,'Username is required.'],
        unique:[true,'Username must be unique.'],
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[8,'Password must contain 8 character'],
        validate:[validator.isStrongPassword,'Password must be strong'],
        select:false
    },
    name:{
        type:String,
        required:[true,'Name is required'],
    },
    isActive:{
        type:Boolean,
        default:true,
        select:false
    }
},{timestamps:true});

adminSchema.pre('save',async function(next)
{
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    next();
});

adminSchema.methods.correctPassword = async function(enteredPassword:string,adminPassword:string):Promise<boolean>
{
    return await bcrypt.compare(enteredPassword,adminPassword);
}

export type AdminDocument = IAdmin & mongoose.Document & IAdminMethods;
export const ADMIN = mongoose.model<IAdmin,AdminModel>('Admin',adminSchema);