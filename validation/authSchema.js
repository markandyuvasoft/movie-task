import joi from '@hapi/joi'



const schema= {

    user: joi.object({
        name: joi.string().max(100).required(),
        gender:joi.string().valid("male", "female", "other").required(),
        dob:joi.string().required(),
//         dob:joi.date()
//   .max('now')
//   .min('1900-01-01')
//   .required(),
        bio: joi.string().max(100).required(),

})
}

export default schema