/**
 * 
 * @typedef {import("mongoose").Model} Model 
 */

/**
 * 
 * @param {Model} Token 
 */
module.exports = (Token) => {

    const create = (data) => {
        return new Promise((resolve, reject) => {
            // Delete tokens that belong to the user if exists
            Token.deleteMany({ userId: data.userId })
                .then(() => {
                    // Insert the token
                    Token.create(data)
                        .then(() => {
                            return resolve({
                                status: true,
                                message: "Token persisted."
                            });
                        }).catch(() => {
                            return reject({
                                status: false,
                                message: "Unable to create token"
                            });
                        });
                }).catch(() => {
                    return reject({
                        status: false,
                        message: "Unable to create token"
                    });
                });
        });
    };

    return { create };
};