module.exports = (UserRepository, TokenRepository) => {

    // refactor and clean this mess

    const crypto = require("crypto");
    const { genAccessToken, genRefreshToken } = require("./../../utils/jwtUtils");

    const auth_login = async (data) => {
        let user;
        try {
            user = await UserRepository.getByUsername(data.username);
            user = user.message;
        } catch (err) {
            if (err.status)
                return Promise.reject({
                    status: false,
                    message: "Invalid username/password"
                });
            else
                return Promise.reject({
                    status: false,
                    message: "Error while trying to login"
                });
        }

        const hashedPassword = crypto.createHash("sha256").update(data.password).digest("hex");
        const correctCredential = (
            user.username === data.username
            && user.password === hashedPassword
        );

        if (!correctCredential)
            return Promise.reject({
                status: false,
                message: "Invalid username/password"
            });

        const payload = {
            sub: user._id,
            username: user.username,
            role: user.role
        };

        const [accessToken, refreshToken] = [genAccessToken(payload), genRefreshToken(payload)];
        const token = {
            userId: user._id,
            token: refreshToken
        };

        try {
            await TokenRepository.create(token);
            return Promise.resolve({
                status: true,
                message: {
                    accessToken,
                    refreshToken
                }
            });
        } catch (err) {
            return Promise.reject({
                status: false,
                message: err
            });
        }

    };

    return { auth_login };
};