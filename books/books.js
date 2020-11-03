const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
// const Book = require("./Book")
require("./Book")
const Book = mongoose.model("Book")
app.use(bodyParser.json())


mongoose.connect("mongodb://localhost/bookservice", () => {
    console.log("service connected")
})



app.get("/", (req, res) => {
    res.send("This is our main endpint")
})

app.post("/book", async(req, res) => {
    console.log(req.body)
    const book = new Book({
        title:req.body.title,
        author:req.body.author,
        numberOfPages:req.body.numberOfPages,
        publisher:req.body.publisher
    })
    await book.save()
    res.json(book)
})
app.get("/book", async(req, res) => {
    try{
        const books = await Book.find()
        res.json(books)
    }catch(e){
        res.status(400).json(e.message)
    }
})

app.get("/book/:id", async(req, res) => {
    try{
        const book = await Book.findById(req.params.id)
        res.json(book)
    }catch(e){
        res.status(400).json(e.message)
    }
})
app.listen(8888, () => {
    console.log(`Up and Running => This is our book services`)
})

