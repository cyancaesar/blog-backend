module.exports = (UserRepository) => {

    const crypto = require("crypto");

    const createUser = async (data) => {
        // Check if username already exists
        try {
            await UserRepository.getByUsername(data.username);
            return Promise.reject({
                status: false,
                message: "Username already taken"
            });
        } catch (err) {
            if (!err.status) {
                return Promise.reject("Unable to create the user");
            }
        }
        // Hash the password
        const password = crypto.createHash("sha256")
            .update(data.password)
            .digest("hex");
        
        // Get the only needed fields, ignore the rest..
        data = {
            username: data.username,
            password
        };

        return UserRepository.create(data);
    };

    const deleteUser = (id) => {
        return UserRepository.deleteById(id);
    };

    const updateUser = (id, data) => {
        return UserRepository.update(id, data);
    };

    return {
        createUser,
        deleteUser,
        updateUser
    };

};