const express = require('express')
const { response } = require('express')
const cors = require('cors')
require('dotenv').config('.env')

const app = express()
app.use(cors())
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


app.get("/", (req, res) => { res.json("looool") })

app.post("/create-checkout-session", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "T-shirt",
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success.html?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/"
    });

    res.json({ id: session.id });
});

app.listen(4000, () => console.log('Server is running on port 4000'))