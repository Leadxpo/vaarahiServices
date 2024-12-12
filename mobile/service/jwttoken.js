const jwt = require("jsonwebtoken")

const generateAccessToken = (id, name, role) => {
    const token = jwt.sign({ id, name, role }, process.env.JWT_TOKEN_SECRETE_KEY, { expiresIn: "3h" })
    return token
}

const generateRefreshToken = (id, name, role) => {
    const token = jwt.sign({ id, name, role }, process.env.JWT_REFRESH_SECRETE_KEY, { expiresIn: "1day" })
    return token
}

const verifyToken = (accessToken, secretKey) => {
    try {
        const formattedToken = accessToken.startsWith('Bearer ') ? accessToken.slice(7) : accessToken;

        // Check if the token is properly formatted
        if (!formattedToken || formattedToken.split('.').length !== 3) {
            throw new Error('Token is malformed');
        }
        const decoded = jwt.verify(formattedToken, secretKey);
        return decoded;
    } catch (error) {
        return "invalidtoken";
    }
}



module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken

}