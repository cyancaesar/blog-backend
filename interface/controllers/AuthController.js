module.exports = (AuthService) => {

    const auth_login = async (req, res) => {
        try {
            const response = await AuthService.auth_login(req.body);
            // Experimental, set cookie max-age for 1 day
            res.cookie("refreshToken", response.message.refreshToken, {
                httpOnly: true,
                maxAge: 1 * 24 * 60 * 60 * 1000
            });
            res.json({ ...response });
        } catch (err) {
            res.status(400).json(err);
        }

    };

    return {
        auth_login
    };
};