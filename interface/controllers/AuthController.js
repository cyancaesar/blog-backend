/* eslint-disable */

module.exports = () => {
    
    auth_login = async (req, res) => {
        // const { username, password } = req.body;
        // const result = await User.findOne({ username, password }, ["username", "role"]);
        // if (!result) return res.status(401).json("invalid credentials");
    
        // const user = {
        //     user: result.username,
        //     role: result.role
        // }
        // const [accessToken, refreshToken] = [tokenGenerator.generateAccessToken(user), tokenGenerator.generateRefreshToken(user)];
    
        // const token = new Token({
        //     token: refreshToken,
        //     userId: result._id.valueOf()
        // });
        // await token.save();
    
        // res.cookie("refresh_token", refreshToken, {
        //     httpOnly: true
        // });
    
        // res.json({ accessToken });
    };
    
    auth_refresh = (req, res) => {
        // const token = req.cookies["refresh_token"];
    
        // if (!token) return res.status(401).json("No provided refresh token");
        // if (!refreshTokens.includes(token)) return res.status(403).json("Invalid refresh token");
    
        // const { exp } = jwt.decode(token);
        // const currentTime = (new Date().getTime() / 1000).toFixed();
        // if (exp < currentTime) {
        //     refreshTokens.splice(refreshTokens.findIndex(item => item === token), 1);
        //     return res.status(401).json("Expired token");
        // }
    
        // const { user, role } = jwt.decode(token);
        // let accessToken = tokenGenerator.generateAccessToken({ user, role });
        // return res.json({ accessToken });
    };
    
    auth_logout = async (req, res) => {
        // const token = req.cookies["refresh_token"];
        // const result = await Token.findOne({ token })
    
        // if (!result) return res.status(401).json("invalid token");
    
        // await Token.deleteOne({ token: result.token });
    
        // return res.json("logout successful");
    };

    return {
        auth_login,
        auth_refresh,
        auth_logout
    };
};