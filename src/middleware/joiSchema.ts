import joi from 'joi';

export async function joiValidateSignup(validate:any){
    const todoSignupSchema = joi
     .object({
         name: joi.string().trim().min(3).max(250).required(),
         password: joi.string().required(),
         repeat_password: joi.ref('password'),
         email: joi
           .string()
           .trim()
           .lowercase()
           .email({ minDomainSegments: 2})
     })
    .with('password', 'repeat_password');
    const validated = await todoSignupSchema.validate(validate);
    return validated
}


export async function joiValidatelogin(validate:any){
    const todoLoginSchema = joi.object({
        password: joi.string().required(),
        email: joi
          .string()
          .trim()
          .lowercase()
    });

    const validated = await todoLoginSchema.validate(validate, {
        abortEarly: false,
    });
    return validated
}