import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId


export const TowerEventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverImg: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true, min: 0 },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, default: false, required: true },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true, },
    creatorId: { type: ObjectId, required: true, ref: 'Account' }
},
    { timestamps: true, toJSON: { virtuals: true } }
)

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})