const mongoose = require("mongoose")

mongoose.model("Order", {
        customerID:{
            type:mongoose.SchemaTypes.ObjectId,
        
        },
        bookID:{
            type:mongoose.SchemaTypes.ObjectId,
        },
        initialDate:{
            type:Date,
            default:Date.now
        },
        deliveryDate:{
            type:Date
        }
})