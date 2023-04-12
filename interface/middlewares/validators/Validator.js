module.exports = () => {
    const { validationResult } = require("express-validator");
    const validate = validations => {
        return async (req, res, next) => {
            if (validations instanceof Array) {
                for (let validation of validations) {
                    const result = await validation.run(req);
                    if (result.errors.length) break;
                }
            } else
                await validations.run(req);
            
            const errors = validationResult(req);
            if (errors.isEmpty()) return next();

            res.status(400).json({ message: errors.array() });
        }
    }

    return validate;
}