import mongoose from 'mongoose'

const ProductModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name of the product is required']
    },
    description: {
        type: String,
        required: [true, 'Description of the product is required']
    },
    price: {
        type: Number,
        required: [true, 'Price of the product is required']
    },
    image: {
        type: [String],
        required: [true, 'Image of the product is required']
    },
    category: {
        type: String,
        required: [true, 'Category of the product is required']
    },
    isFeatured: {
        type: Boolean,
        dafault: false
    },
    stock :{
        type : Number,
        required: [true, 'Stock of the product is required']
    }
}, { timestamps: true })


const Product = mongoose.model('Product', ProductModel)
export default Product
