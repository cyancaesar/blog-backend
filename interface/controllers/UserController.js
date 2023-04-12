module.exports = (UserService) => {

    const user_create = async (req, res) => {
        const response = await UserService.createUser(req.body);
        if (response.status === "FAILED") {
            return res.status(401).json(response)
        }
        return res.status(201).json(response);
    }

    const user_get_all = async (req, res) => {
        const response = await UserService.getAllUser();
        return res.json(response);
    }

    const user_change_password = async (req, res) => {
        const response = await UserService.changePassword(req.body);
        return res.json(response);
    }

    return {
        user_create,
        user_get_all,
        user_change_password
    }
}