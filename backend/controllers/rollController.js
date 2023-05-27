const Roll = require('../models/roll')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

//Create new roll => /api/v1/admin/roll/new
exports.newRoll = catchAsyncErrors(async (req, res, next) =>{

    req.body.user = req.user.id;
    const roll = await Roll.create(req.body);
    res.status(201).json({
        successs: true,
        roll
    })
})

//Get all rolls => /api/v1/rolls
exports.getRolls = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const rollsCount = await Roll.countDocuments();

    const apiFeatures = new APIFeatures(Roll.find(), req.query)
        .search()
        .filter()

    let rolls = await apiFeatures.query;
    let filteredRollsCount = rolls.length;

    apiFeatures.pagination(resPerPage)
    rolls = await apiFeatures.query.clone();


    res.status(200).json({
        success: true,
        rollsCount,
        resPerPage,
        filteredRollsCount,
        rolls
    })
})

// Get all products (Admin)  =>   /api/v1/admin/rolls
exports.getAdminRolls = catchAsyncErrors(async (req, res, next) => {

    const rolls = await Roll.find();

    res.status(200).json({
        success: true,
        rolls
    })

})

// Get single roll details => /api/v1/roll/:id
exports.getSingleRoll = catchAsyncErrors(async(req, res, next) => {
    const roll = await Roll.findById(req.params.id)

    if(!roll) {
        return next(new ErrorHandler('Roll not found', 404))
    }

    res.status(200).json({
        success: true,
        roll
    })
})

// Update Roll => /api/v1/admin/roll/:id

exports.updateRoll = catchAsyncErrors(async (req, res, next) => {

    let roll = await Roll.findById(req.params.id);

    if(!roll) {
        return next(new ErrorHandler('Roll not found', 404))
    }

    roll = await Roll.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        roll
    })
})

// Delete Roll by id => /api/v1/admin/roll/:id

exports.deleteRoll = catchAsyncErrors(async (req, res, next) => {

    const roll = await Roll.findById(req.params.id);

    if(!roll) {
        return next(new ErrorHandler('Roll not found', 404))
    }

    await roll.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Roll deleted successfuly'
    })
})

// Create new review   =>   /api/v1/review
exports.createRollReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, rollId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const roll = await Roll.findById(rollId);

    const isReviewed = roll.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        roll.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        roll.reviews.push(review);
        roll.numOfReviews = roll.reviews.length
    }

    roll.ratings = roll.reviews.reduce((acc, item) => item.rating + acc, 0) / roll.reviews.length

    await roll.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})

// Get Roll Reviews   =>   /api/v1/reviews
exports.getRollReviews = catchAsyncErrors(async (req, res, next) => {
    const roll = await Roll.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: roll.reviews
    })
})

// Delete Roll Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const roll = await Roll.findById(req.query.rollId);

    console.log(roll);
    const reviews = roll.reviews.filter(review => review._id.toString() !== req.query.id.
    toString());
    const numOfReviews = reviews.length;

    const ratings = roll.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Roll.findByIdAndUpdate(req.query.rollId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})