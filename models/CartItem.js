// models/CartItem.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartItemSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    description:{ type: String, required: true},
    price: { type: Number, required: true },
    image:{type: String, required: true}
});

const CartItem = mongoose.model('Cart', cartItemSchema);

export default CartItem;
