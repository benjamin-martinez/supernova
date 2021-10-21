const mongoose = require('mongoose')

const orderSchema = new Schema({
    orderId: {
        type: String
    },
    productId: {
        type: String
    },
    designs: [
        {
            image: {
                type: String
            },
            positions: {
                type: [Number]
            }
        }
    ],
    numDesigns: {
        type: Number
    },
    quantity: {
        type: Number
    },
    fulfilled: {
        type: Boolean
    },
    orderDate: {
        type: Date
    },
    ss_sku: {
        type: Number
    },
    productUrl: {
        type: String
    }
})

module.exports = mongoose.model('Order', orderSchema)