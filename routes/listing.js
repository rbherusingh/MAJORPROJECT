const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing, isSiteOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require("multer")
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


router
.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    isSiteOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
);


// new route
router.get("/new", isLoggedIn, isSiteOwner, listingController.renderNewForm);

router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
    isLoggedIn,
    isSiteOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(
    isLoggedIn,
    isSiteOwner,
    wrapAsync(listingController.destroyListing)
);


// Edit Route
router.get(
    "/:id/edit",
    isLoggedIn,
    isSiteOwner,
    wrapAsync(listingController.renderEditForm));


module.exports = router;