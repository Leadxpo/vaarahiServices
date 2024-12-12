const { sequelize } = require('../../db')
const reviewModel = require('../../model/review')(sequelize)
const { Op, where } = require("sequelize");
const { errorResponse } = require('../service/response');


// CREATE review

const createReview = async  (reviewData) => {
    try {
        const newReview = await reviewModel.create (reviewData);
        return newReview;
    }
    catch (error) {
        console.error("Error in createReview details in controller", error);
        throw new Error("Error in createReview in controller");
    }
};


// UPDATE reviewS

const updateReview = async  (review_id, reviewData) => {
    try {
        const newReview = await reviewModel.update (reviewData, {
            where: {
                id: review_id
            }
        });
        return newReview;
    }
    catch (error) {
        console.error("Error in update review in controller", error);
        throw new Error("Error update review");
    }
};

// GET review

const getReviewById = async  (review_id) => {
    try {
        const review = await reviewModel.findOne({
            where: {
                id: review_id
            }
        })
        return review
    }
    catch (error) {
        console.log("error in get review in controller..!", error);
        throw new Error('enable to create review error')
    }
};



// GET ALL review

const getAllReview = async () => {
    try {

        const review = await reviewModel.findAll();
        return review
    }
    catch (error) {
        console.log("error in get review in controller..!", error);
        throw new Error('enable to create review error')
    }
}

const searchReviewDetails = async  (reviewData) => {
    try {

        const data = {};
        if  (reviewData.name) {
            data.name = reviewData.name
        }

        if  (reviewData.id) {
            data.id = reviewData.id
        }

        if  (reviewData.phone_no) {
            data.phone_no = reviewData.phone_no
        }

        const review = await reviewModel.findAll({

            where: data

        });
        return review


    } catch (error) {
        console.log("erorr in surch review in controller", error)
        errorResponse("error in surch review in controller")
    }
};

//  COUNT

const countReviewDetails = async () => {

    try {
        const totalReview = await reviewModel.count();
        const totalMembership = await reviewModel.count({
            where: {
                isMembership: true
            }
        });
        var counts={Reviews:totalReview,membership:totalMembership}
        return counts;
    }
    catch (error) {
        console.error("Error in count review in controller", error);
        throw new Error("Error count review Details");
    }
}


module.exports = {
    createReview,
    updateReview,
    getReviewById,
    getAllReview,
    searchReviewDetails,
    countReviewDetails,
}