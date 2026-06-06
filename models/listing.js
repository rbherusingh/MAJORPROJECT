const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        // url: {
            url: String,
            filename: String,
        },
        filename: {
            type: String,
            default: "listingimage",
        // },
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    reviews: [
        {
          type:Schema.Types.ObjectId,
          ref: "Review",
        },
    ],
    owner: {
        type:Schema.Types.ObjectId,
        ref: "User",
    },
    owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
},


category: {
    type: String,
    enum: ["trending", "rooms", "iconic cities", "mountains", "castles", "amazing pools", "camping", "farms", "arctic"],
    default: "trending",
},


});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await review.deleteMany({ _id: { $in: listing.reviews } });
    }

});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;