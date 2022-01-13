import mongoose, { Schema } from 'mongoose';
import { ICity } from './City';


export interface IRestaurant {
    name: string,
    city: object,
    priority: number,
    description: string,
    // amenities
    socialMedia: string,
    // tags
    bookingLimit: number,
    // discount
    bankAccount: string,
    isDeleted: boolean,
    createAt: Date
}


const RestaurantSchema: Schema = new Schema(
    {
        name: { type: String },
        city: {
            _id: { type: String },
            name: { type: String },
        },
        priority: { type: Number },
        description: { type: String },
        socialMedia: { type: String },
        bookingLimit: { type: Number },
        bankAccount: { type: String },
        isDeleted: { type: Boolean, default: false },
        createAt: { type: Date, default: Date.now },
    }
);


export default mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);