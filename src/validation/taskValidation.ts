const Joi = require('joi');

const closedTaskValidation = Joi.object({

    title: Joi.string().required().max(30).min(6).messages({
        "string.empty": "Please Fill In Title",
        "any.required": "Please Fill In Title",
        "string.max": "Title Can't Be Longer Than 30 Letters",
        "string.min": "Title Can't Be Shorter Than 6 Letters",
    }),
    description: Joi.string().required().max(100).min(6).messages({
        "string.empty": "Please Fill In Description",
        "any.required": "Please Fill In Description",
        "string.max": "Description Can't Be Longer Than 100 Letters",
        "string.min": "Description Can't Be Shorter Than 6 Letters",
    }),
    estimatedTime: Joi.string().required().max(10).min(0).messages({
        "string.empty": "Please Fill In Estimated Time",
        "any.required": "Please Fill In Estimated Time",
        "string.max": "Estimated Time Can't Be Longer Than 10 Letters",
        "string.min": "Estimated Time Can't Be Shorter Than 6 Letters",
    }),
    status: Joi.string().required().messages({
        "any.required": "Please Choose Status",
        "string.empty": "Please Choose Status",
    }),
    priority: Joi.string().required().messages({
        "any.required": "Please Choose Priority",
        "string.empty": "Please Choose Priority",
    }),

    review: Joi.string().min(10).max(120).messages({
        "string.empty": "Please Fill In Review",
        "any.required": "Please Fill In Review",
        "string.max": "Review Can't Be Longer Than 120 Letters",
        "string.min": "Review Can't Be Shorter Than 10 Letters",
    }),
    timeSpent: Joi.string().min(1).max(15).messages({
        "number.empty": "Please Fill In Amount of Time Spent",
        "any.required": "Please Fill In Amount of Time Spent",
        "number.greater": "Please Fill Amount Spent Which Is Greater Than 0",
    }),
    endTime: Joi.date().greater(Date.now()).messages({
        "date.empty": "Please Fill In Date",
        "date.greater": "Please Fill In Date Which Is Older Than Today",
    }),
});

const highPriorityTaskValidation = Joi.object({
    title: Joi.string().required().max(30).min(6).messages({
        "string.empty": "Please Fill In Title",
        "any.required": "Please Fill In Title",
        "string.max": "Title Can't Be Longer Than 30 Letters",
        "string.min": "Title Can't Be Shorter Than 6 Letters",
    }),
    description: Joi.string().required().max(100).min(6).messages({
        "string.empty": "Please Fill In Description",
        "any.required": "Please Fill In Description",
        "string.max": "Description Can't Be Longer Than 100 Letters",
        "string.min": "Description Can't Be Shorter Than 6 Letters",
    }),
    estimatedTime: Joi.string().required().max(10).min(0).messages({
        "string.empty": "Please Fill In Estimated Time",
        "any.required": "Please Fill In Estimated Time",
        "string.max": "Estimated Time Can't Be Longer Than 10 Letters",
        "string.min": "Estimated Time Can't Be Shorter Than 6 Letters",
    }),
    status: Joi.string().required().messages({
        "any.required": "Please Choose Status",
        "string.empty": "Please Choose Status",
    }),
    priority: Joi.string().required().messages({
        "any.required": "Please Choose Priority",
        "string.empty": "Please Choose Priority",
    }),
    endTime: Joi.date().greater(Date.now()).messages({
        "date.empty": "Please Fill In Date",
        "date.greater": "Please Fill In Date Which Is Older Than Today",
    }),
});

const generalTaskValidation = Joi.object({
    title: Joi.string().required().max(30).min(6).messages({
        "string.empty": "Please Fill In Title",
        "any.required": "Please Fill In Title",
        "string.max": "Title Can't Be Longer Than 30 Letters",
        "string.min": "Title Can't Be Shorter Than 6 Letters",
    }),
    description: Joi.string().required().max(100).min(6).messages({
        "string.empty": "Please Fill In Description",
        "any.required": "Please Fill In Description",
        "string.max": "Description Can't Be Longer Than 100 Letters",
        "string.min": "Description Can't Be Shorter Than 6 Letters",
    }),
    estimatedTime: Joi.string().required().max(10).min(0).messages({
        "string.empty": "Please Fill In Estimated Time",
        "any.required": "Please Fill In Estimated Time",
        "string.max": "Estimated Time Can't Be Longer Than 10 Letters",
        "string.min": "Estimated Time Can't Be Shorter Than 6 Letters",
    }),
    status: Joi.string().required().messages({
        "any.required": "Please Choose Status",
        "string.empty": "Please Choose Status",
    }),
    priority: Joi.string().required().messages({
        "any.required": "Please Choose Priority",
        "string.empty": "Please Choose Priority",
    }),

});

module.exports={
    closedTaskValidation,
    highPriorityTaskValidation,
    generalTaskValidation,
};