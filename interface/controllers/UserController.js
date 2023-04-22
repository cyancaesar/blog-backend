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
            const response = await UserService.deleteUser(req.user.sub);
            res.json({ ...response });
        } catch (err) {
            res.status(400).json(err);
        }
    };

    const user_update = async (req, res) => {
        try {
            const response = await UserService.updateUser(req.user.sub, req.body);
            res.json({ ...response });
        } catch (err) {
            res.status(400).json(err);
        }
    };

    const user_avatar = async (req, res) => {
        const { user } = req.params;
        try {
            const response = await UserService.getAvatar(user);
            res.json({ ...response });
        } catch (err) {
            res.status(400).json(err);
        }
    };

    const user_avatar_upload = async (req, res) => {
        try {
            const response = await UserService.uploadAvatar(req.user.sub, req.file.filename);
            res.json({ ...response });
        } catch (err) {
            res.status(400).json(err);
        }
    };

    return {
        user_create,
        user_delete,
        user_update,
        user_avatar,
        user_avatar_upload
    };
};