const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
// const Book = require("./Book")
require("./Customer")
const Customer = mongoose.model("Customer")
app.use(bodyParser.json())


mongoose.connect("mongodb://localhost/customerservice", () => {
    console.log("service connected")
})


app.get("/customer", async(req, res) => {
    try{
        const customers = await Customer.find()
        return res.json(customers)
    }catch(e){
        return res.status(400).json(e.message)
    }
})


app.get("/customer/:id", async(req, res) => {
    try{
        const customer = await Customer.findById(req.params.id)
        return res.json(customer)
    }catch(e){
        return res.status(400).json(e.message)
    }
})
app.post("/customer", async(req, res) => {
    try{
        const customer = new Customer({
            name:req.body.name,
            age:req.body.age,
            address:req.body.address
        })
        await customer.save()
        return res.json(customer)
    }catch(e){
        return res.status(400).json(e.message)
    }
})

app.delete("/customer/:id", async(req, res) => {
    try{
        const customer = await Customer.findByIdAndDelete(req.params.id)
        return res.json(customer)
    }catch(e){
        return res.status(400).json(e.message)

    }
})
// app.get("/", (req, res) => {
//     res.send("This is our main endpint")
// })

// app.post("/book", async(req, res) => {
//     console.log(req.body)
//     const book = new Book({
//         title:req.body.title,
//         author:req.body.author,
//         numberOfPages:req.body.numberOfPages,
//         publisher:req.body.publisher
//     })
//     await book.save()
//     res.json(book)
// })
// app.get("/book", async(req, res) => {
//     try{
//         const books = await Book.find()
//         res.json(books)
//     }catch(e){
//         res.status(400).json(e.message)
//     }
// })

// app.get("/book/:id", async(req, res) => {
//     try{
//         const book = await Book.findById(req.params.id)
//         res.json(book)
//     }catch(e){
//         res.status(400).json(e.message)
//     }
// })
app.listen(5555, () => {
    console.log(`Up and Running => This is our customer services`)
})

