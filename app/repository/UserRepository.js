const { Model } = require("mongoose");

/**
 * 
 * @param {Model} User 
*/
module.exports = (User) => {

    const find = async (query, projection) => {
        let queryResult;
        if (projection) {
            queryResult = await User.find(query, projection);
        }
        else {
            queryResult = await User.find(query);
        }
        return queryResult;
    }

    const findById = async (id, projection) => {
        if (projection) {
            return User.findById(id, projection).exec();
        } else {
            return User.findById(id).exec();
        }
    }

    const update = async (id, data) => {
        return User.findByIdAndUpdate(id, data).exec();
    }

    const create = async (data) => {
        let newUser = new User(data);
        return await newUser.save();
    }

    const remove = async (data) => {
        User.deleteOne(data);
    }

    return {
        find,
        update,
        create,
        remove,
        findById
    }
};