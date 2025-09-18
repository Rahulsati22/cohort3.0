import Coupon from "../models/Coupon.model.js";
import { stripeClient } from "../lib/stripe.js";
import Order from "../models/Order.model.js";

export const createCheckOutSession = async (req, res) => {
    try {
        const products = req.body.products
        const couponCode = req.body.couponCode

        if (!Array.isArray(products) || products.length == 0)
            return res.status(400).send({ message: "Please add a task" });

        let totalAmount = 0
        let lineItems = products.map(product => {
            let amount = Math.round(product.price * 100)
            totalAmount += amount * product.quantity
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        images: [product.image]
                    },
                    unit_amount: amount
                },
                quantity: product.quantity
            }
        })


        let coupon = null
        if (couponCode) {
            coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true })
            if (coupon) {
                totalAmount -= (totalAmount * coupon.discountPercentage) / 100
                totalAmount = Math.round(totalAmount)
            }
        }

        //now using stripe
        const session = await stripeClient.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
            discounts: coupon ? [{ coupon: await createStripeCoupon(coupon.discountPercentage) }] : [],
            metadata: {
                userId: req.user._id.toString(),
                couponCode: couponCode ? couponCode : null,
                products: JSON.stringify(
                    products.map((p) => ({
                        id: p._id,
                        quantity: p.quantity,
                        price: p.price
                    }))
                )
            }
        })

        //coupon logic here (agar do hzar se jyada shopping krega to coupon add kr denge future mein)
        return res.status(200).json({ id: session._id, totalAmount: totalAmount / 100 })
    } catch (error) {
        console.log("error in create checkout session controller", error.message)
        return res.status(200).send({ message: error.message })
    }
}



export const checkOutSuccess = async (req, res) => {
    try {
        const { sessionId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            if (session.metadata.couponCode) {
                await Coupon.findOneAndUpdate({ code: session.metadata.couponCode, userId: session.metadata.userId }, { isActive: false })
            }

            //create a new order
            const products = JSON.parse(session.metadata.products)
            const order = new Order({
                user: session.metadata.userId,
                products: products.map(product => ({
                    product: product.id,
                    quantity: product.quantity,
                    price: product.price
                })),
                totalAmount: session.amount_total / 100, //convert from cents to dollars
                stripeSessionId: sessionId
            })

            await order.save()
            res.status(200).json({
                success: true,
                message: "Payment successfull, order created, and coupon deactivated if used.",
                orderId: order._id
            })
        }

    } catch (error) {
        console.log("Error in check-out success controller", error.message)
        return res.status(500).json({ message: error.message })
    }
}

async function createStripeCoupon(discountPercentage) {
    const coupon = await stripeClient.coupons.create({
        percent_off: discountPercentage,
        duration: "once",
    });
    return coupon.id
}

