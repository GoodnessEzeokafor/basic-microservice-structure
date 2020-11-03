const mongoose = require("mongoose")

mongoose.model("Customer", {
        name:{
            type:String
        },
        age:{
            type:Number
        },
        address:{
            type:String
        }
})