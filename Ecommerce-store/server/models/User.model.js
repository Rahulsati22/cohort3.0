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

    // 🏠 ADDRESS FIELDS - NO REQUIRED (User will add during checkout)
    addresses: [{
        street: { 
            type: String, 
            trim: true 
        },
        city: { 
            type: String, 
            trim: true 
        },
        state: { 
            type: String, 
            trim: true 
        },
        postalCode: { 
            type: String, 
            trim: true,
            validate: {
                validator: function(v) {
                    return /^\d{6}$/.test(v);
                },
                message: 'Please enter a valid 6-digit PIN code'
            }
        },
        country: { 
            type: String, 
            default: 'India' 
        },
        landmark: { 
            type: String, 
            trim: true 
        },
        addressType: { 
            type: String, 
            enum: ['home', 'office', 'other'], 
            default: 'home' 
        },
        isDefault: { 
            type: Boolean, 
            default: false 
        }
    }],

    defaultAddressId: {
        type: mongoose.Schema.Types.ObjectId
    },

    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    }
}, { timestamps: true })

// Pre save hook and methods remain same...
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

UserSchema.methods.comparePassword = async function (userPassword) {
    console.log('comparing password')
    return bcrypt.compare(userPassword, this.password)
}

const User = mongoose.model("User", UserSchema)

export default User
