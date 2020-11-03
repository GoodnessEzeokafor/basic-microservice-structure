const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
// const Book = require("./Book")
require("./Order")
const Order = mongoose.model("Order")
const axios = require("axios")
app.use(bodyParser.json())


mongoose.connect("mongodb://localhost/orderservice", () => {
    console.log("service connected")
})


app.get("/order", async(req, res) => {
    try{
        const orders = await Order.find()
        return res.json(orders)
    }catch(e){
        return res.status(400).json(e.message)
    }
})


app.post("/order", async(req, res) => {
    try{
        const order = new Order({
            customerID:mongoose.Types.ObjectId(req.body.customerID),
            bookID:mongoose.Types.ObjectId(req.body.bookID),
            deliveryDate:new Date(2021,1,20)
        })
        await order.save()
        return res.json(order)
    }catch(e){
        return res.status(400).json(e.message)
    }
})

app.get("/order/:id", async(req, res) => {
    try{
        const order = await Order.findById(req.params.id)
        
        // if(order){
        //     console.log("Customer ID",order.customerID)
            const customer = await axios.get(`http://localhost:5555/customer/${order.customerID}`)
            const book =await axios.get(`http://localhost:8888/book/${order.bookID}`)
            const orderObject = {
                customerName:customer.data.name,
                bookTitle:book.data.title
            }
            res.json(orderObject)
            // return res.json(customer)
            //                       .then(async(customer) => {
            //                         return res.json(customer)
            //                       })


        // }else {
        //     return res.json("invalid order")

        // }
    }catch(e){
        return res.status(400).json(e.message)
    }
})


// app.delete("/customer/:id", async(req, res) => {
//     try{
//         const customer = await Customer.findByIdAndDelete(req.params.id)
//         return res.json(customer)
//     }catch(e){
//         return res.status(400).json(e.message)

//     }
// })

app.listen(6666, () => {
    console.log(`Up and Running => This is our customer services`)
})

