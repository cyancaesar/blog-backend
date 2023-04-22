module.exports = (UserRepository) => {

    const { hash } = require("./../../utils/hashUtils");

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
        const password = hash(data.password);

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
        data.password = hash(data.password); // hash the password
        return UserRepository.update(id, data);
    };

    const getAvatar = (id) => {
        return UserRepository.getById(id);
    };

    const uploadAvatar = (id, data) => {
        return UserRepository.update(id, { avatar: data });
    };

    return {
        createUser,
        deleteUser,
        updateUser,
        getAvatar,
        uploadAvatar
    };

};