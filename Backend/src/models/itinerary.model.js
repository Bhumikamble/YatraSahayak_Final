import mongoose from "mongoose";
import { Schema } from "mongoose";

const itinerarySchema = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true }
});

const itineraryaddSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [itinerarySchema],
}, { timestamps: true });

export const itinerary = mongoose.model("Itinerary",itineraryaddSchema)