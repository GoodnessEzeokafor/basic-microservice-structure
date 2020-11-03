const mongoose = require("mongoose")

mongoose.model("Book", {
        title:{
            type:String
        },
        author:{
            type:String,
        },
        numberOfPages:{
            type:Number
        },
        publisher:{
            type:String
        }
})