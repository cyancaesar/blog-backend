module.exports = (UserService) => {

    const user_create = async (req, res) => {
        try {
            const response = await UserService.createUser(req.body);
            return res.json({ ...response });
        } catch (err) {
            return res.status(400).json(err);
        }
    };

    const user_delete = async (req, res) => {
        try {
            const response = await UserService.deleteUser(req.params.id);
            res.json({ ...response });
        } catch (err) {
            res.status(400).json(err);
        }
    };

    const user_update = async (req, res) => {
        try {
            const response = await UserService.updateUser(req.params.id, req.body);
            res.json({ ...response });
        } catch(err) {
            res.status(400).json(err);
        }
    };

    return {
        user_create,
        user_delete,
        user_update
    };
};