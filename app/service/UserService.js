module.exports = (UserRepository) => {

    // Refactor this service layer to correspond
    // to SRP

    const createUser = async (data) => {
        const { username, password, role = "guest" } = data;
        const isExist = await UserRepository.find({ username });
        if (isExist.length) return {
            status: "FAILED",
            message: "USER EXIST"
        }
        await UserRepository.create({
            username,
            password,
            role
        });
        return {
            status: "SUCCESS",
            message: "USER CREATED"
        }
    }

    const getAllUser = async () => {
        const users = await UserRepository.find({}, ["username"]);
        const formatted = users.map(user => {
            return {
                id: user._id,
                username: user.username
            }
        });
        return {
            status: "SUCCESS",
            message: formatted
        }
    }

    const changePassword = async (data) => {
        const response = {
            status: false,
            message: ""
        }
        const { id, newPassword, oldPassword } = data;

        const validateOldPassword = await UserRepository.findById(id, ["password"]);
        if (validateOldPassword.password === oldPassword) {
            const updated = await UserRepository.update(id, { password: newPassword });
            response.status = true;
            response.message = "PASSWORD CHANGED"
        } else {
            response.status = false;
            response.message = "OLD PASSWORD DOESN'T MATCH"
        }

        return response
    }

    return {
        getAllUser,
        createUser,
        changePassword
    }

}