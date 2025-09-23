import { stripeClient } from "../lib/stripe.js";
import Order from "../models/Order.model.js";

export const createCheckOutSession = async (req, res) => {
    try {
        const products = req.body.products


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




        //now using stripe
        const session = await stripeClient.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
            metadata: {
                userId: req.user._id.toString(),
                products: JSON.stringify(
                    products.map((p) => ({
                        id: p._id,
                        quantity: p.quantity,
                        price: p.price
                    }))
                )
            }
        })

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
                message: "Payment successfull and order created",
                orderId: order._id
            })
        }

    } catch (error) {
        console.log("Error in check-out success controller", error.message)
        return res.status(500).json({ message: error.message })
    }
}



