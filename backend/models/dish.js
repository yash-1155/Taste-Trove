const mongoose=require('mongoose')
const list=require('./listing.js')
const dish=mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
            minlength:1,
            maxlength:50,
            trim:true,
             match: /^[a-zA-Z\s]+$/,

        },
        image:{
            type:String,
            default:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D"
        },
        description:{
            type:String,
            trim:true,
            minlength:1,
            maxlength:300
        },
        rating:{
            type: Number,
            min: 0,
            max: 5,
            validate: {
                validator: function(value) {
                    return /^(\d*\.)?\d{1}$/.test(value);
                },
                message: 'Invalid rating format. Should be a number with at most one decimal place.',
            },
        },
        price:{
            type:Number,
            min:0,
        },
        listing:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'list'
            }
        ]

    }
)
module.exports=mongoose.model("Dish",dish)