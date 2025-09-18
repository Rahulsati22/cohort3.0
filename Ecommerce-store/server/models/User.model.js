import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Minimum length of password should be 6"]
    },
    cart: [{
        quantity: {
            type: Number,
            default: 1
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    }],

    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    }
    //created at updated at
}, { timestamps: true })



//pre save hook to save password before saving to database
UserSchema.pre('save', async function (next) {
    if (!this.isModified("password"))
        return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }

})



//now we will write a userSchema method
UserSchema.methods.comparePassword = async function (userPassword) {
    console.log('comparing password')
    return bcrypt.compare(userPassword, this.password)
}


const User = mongoose.model("User", UserSchema)



export default User