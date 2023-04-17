module.exports = (AuthService) => {

    const auth_login = async (req, res) => {
        try {
            const response = await AuthService.auth_login(req.body);
            if (!response.message.refreshToken)
                return res.json({ ...response.message });
            const { refreshToken, ...result } = response.message;
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 1 * 24 * 60 * 60 * 1000
            });
            res.json({ ...result });
        } catch (err) {
            res.status(400).json(err);
        }

    };

    const auth_logout = async (req, res) => {
        try {
            const response = await AuthService.auth_logout(req.cookies);
            res.cookie("refreshToken", "", {
                httpOnly: true,
                maxAge: 0
            });
            res.json({ ...response });
        } catch (err) {
            res.status(400).json(err);
        }
    };

    const auth_refresh = async (req, res) => {
        try {
            const response = await AuthService.getRefreshToken(req.cookies);
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
        auth_login,
        auth_logout,
        auth_refresh
    };
};