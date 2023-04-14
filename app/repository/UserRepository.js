/**
 * @typedef {import("mongoose").Model} Model
 */

/**
 * 
 * @param {Model} User 
*/

module.exports = (User) => {

    const create = (data) => {
        return new Promise((resolve, reject) => {
            User.create(data).then(() => {
                return resolve({
                    status: true,
                    message: "User created."
                });
            }).catch(() => {
                return reject({
                    status: true,
                    message: "Unable to create user."
                });
            });
        });
    };

    const deleteById = (id) => {
        return new Promise((resolve, reject) => {
            User.findByIdAndDelete(id).then(doc => {
                if (!doc)
                    return reject({
                        status: false,
                        message: "Can't delete User: not found."
                    });
                return resolve({
                    status: true,
                    message: "User deleted."
                });
            }).catch(() => {
                return reject({
                    status: true,
                    message: "Unable to delete user."
                });
            });
        });
    };

    const getByUsername = (username) => {
        return new Promise((resolve, reject) => {
            User.findOne({})
                .where({ username })
                .exec()
                .then(doc => {
                    if (!doc)
                        return reject({
                            status: true,
                            message: "User not found."
                        });
                    return resolve({
                        status: true,
                        message: doc
                    });
                }).catch(() => {
                    return reject({
                        status: false,
                        message: "Unable to find user."
                    });
                });
        });
    };

    const update = (id, data) => {
        return new Promise((resolve, reject) => {
            User.findOne({ _id: id }).then(doc => {
                if (!doc)
                    return reject({
                        status: false,
                        message: "Update Error: User not found."
                    });
                doc.set(data);
                doc.save().then(() => {
                    return resolve({
                        status: true,
                        message: "User updated."
                    });
                }).catch(() => {
                    return reject({
                        status: false,
                        message: "Unable to update user."
                    });
                });
            }).catch(() => {
                return reject({
                    status: false,
                    message: "Error while updating user."
                });
            });
        });
    };

    return {
        create,
        deleteById,
        getByUsername,
        update
    };

};