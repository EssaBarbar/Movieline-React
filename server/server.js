const express = require('express')
const { response } = require('express')
const cors = require('cors')
require('dotenv').config('.env')

const app = express()
app.use(cors())
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


app.get("/", (req, res) => { res.json("looool") })


app.use(express.json())


let pendingOrders = []

app.post("/create-checkout-session", async (req, res) => {

    console.log(req.body.totalPrice)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "SEK",
                    product_data: {
                        name: "Payment for Movieline",
                    },
                    unit_amount: req.body.totalPrice * 100,
                },
                quantity: 1,
            }
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/"
    });

    let pendingOrder = {
        orderId: session.id,
        order: req.body.cart,
    }

    pendingOrders.push(pendingOrder)


    res.json({ id: session.id });
});


app.post("/check-if-paid", async (req, res) => {
    const isPaid = await stripe.checkout.sessions.retrieve(
        req.body.id
    ).payment_status;
    if (isPaid) {
        res.json(true)
    } else {
        res.json(false)
    }
});



app.listen(4000, () => console.log('Server is running on port 4000'))