const express = require('express')
const cors = require('cors')
require('dotenv').config('.env')
const fs = require('fs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const app = express()
app.use(cors())
app.use(express.json())

let pendingOrders = []

app.get("/", (req, res) => { res.json("looool") })
app.post("/create-checkout-session", async (req, res) => {

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
    const response = await stripe.checkout.sessions.retrieve(
        req.body.id
    );
    let theRequestedId = req.body.id
    let isPaid = response.payment_status
    if (isPaid == "paid") {
        function OrderIsPaid(order) {
            return order.orderId == theRequestedId;
        }
        let foundOrder = pendingOrders.find(OrderIsPaid)
        fs.readFile('./orders.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err)
            } else {
                const file = JSON.parse(data);
                file.orders.push(foundOrder)
                const orderToJson = JSON.stringify(file)
                fs.writeFile('./orders.json', orderToJson, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                })
            }
        })
        res.json(true)
    } else {
        res.json(false)
    }
});

app.listen(4000, () => console.log('Server is running on port 4000'))