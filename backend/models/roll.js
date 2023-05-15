const mongoose = require('mongoose')

const rollSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter roll name'],
        trim: true,
        maxLength: [1000, 'Roll name <= 50']
    },
    price: {
        type: Number,
        required: [true, 'Please enter roll price'],
        maxLength: [3, 'Roll name <= 100'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter roll description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }    
    ],
    category: {
        type : String,
        required: [true, 'Please select category for this roll'],
        enum : {
            values: [
                `baked`,
                `spicy`,
                `fried`,
                `sweet`
            ],
            message: `Please, select correct category for roll`
        }
    },
    seller: {
        type: String,
        required: [true, `Please enter roll seller`]
    },
    stock: {
        type: Number,
        required: [true, `Please enter roll stock`],
        maxLength: [5, `Roll name cannot be more than 3 char-s`],
        default :0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                equired: true
            },   
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        equired: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Roll', rollSchema)