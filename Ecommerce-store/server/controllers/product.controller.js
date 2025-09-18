import { response } from "express";
import cloudinary from "../lib/cloudinary.js";
import client from "../lib/redisClient.js";
import Product from "../models/Product.model.js";

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({})
        return res.status(200).send({ allProducts })
    } catch (error) {
        console.log("Error in all products controller", error.message)
        return res.status(500).json({ message: error.message })
    }
}


const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await client.get('featured_products')
        if (featuredProducts)
            return res.json(JSON.parse(featuredProducts))
        //going to return a js object instead of mongodb document
        featuredProducts = await Product.find({ isFeatured: true }).lean()
        await client.set('featured_products', JSON.stringify(featuredProducts))
        return res.status(200).send(featuredProducts)
    } catch (error) {
        console.log("Error in get featured product controller", error.message)
        return res.status(500).send({ message: error.message })
    }
}

//create product controller
const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body

        if (!name || !description || !price || !category || !image)
            return res.status(400).send({ message: "All fields are required" })

        let cloudinaryResponse = null

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" })
        }

        let imgurl = ""
        if (cloudinaryResponse?.secure_url)
            imgurl = cloudinaryResponse.secure_url

        const product = await Product.create({ name, description, price, image: imgurl, category })
        return res.status(200).send(product)
    } catch (error) {
        console.log("Error in create product controller", error.message)
        return response.status(500).send({ message: error.message })
    }
}


//writing controller to delete the product
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0]
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
            } catch (error) {
                console.log("Error in delete product controller", error.message)
                return res.status(500).send({ message: error.message })
            }
        }
        await Product.findByIdAndDelete(id)
        return res.status(200).send({ message: "Successfully deleted the product" })

    } catch (error) {
        console.log("error in delete product controller", error.message)
        return response.status(500).send({ message: error.message })
    }
}



//writing controller for recommended products
const recommendedProducts = async (req, res) => {
    try {
        let recommendedProducts = Product.aggregate([
            { $sample: { size: 3 } },
            { $project: { _id: 1, name: 1, description: 1, image: 1, price: 1 } }
        ])

        return res.status(200).json(recommendedProducts)
    } catch (error) {
        console.log("Error in recommended products controller", error.message)
        return response.status(500).json({ message: error.message })
    }
}

//writing controller to get products by category
const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category
        const allProduct = await Product.find({ category })
        return res.status(200).send(allProduct)
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}


//writing controller to toggle featured products
const toggleFeatures = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        if (product) {
            try {
                product.isFeatured = !product.isFeatured
                await product.save()
                await updateFeaturedProductsCache()
                return response.status(200).send({ message: 'successfully updated the product' })
            } catch (error) {
                return res.status(500).send({ message: error.message })
            }
        }
        return res.status(404).send({ message: 'Product not found' })
    } catch (error) {
        console.log("Error in toggle feature controller", error.message)
        return res.status(500).json({ message: error.message })
    }

}

async function updateFeaturedProductsCache() {
    try {
        const products = await Product.find({ isFeatured: true }).lean()
        await client.set('featured_products', JSON.stringify(products))
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

export { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, recommendedProducts, getProductsByCategory, toggleFeatures }