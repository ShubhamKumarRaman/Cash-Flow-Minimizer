import jwt from 'jsonwebtoken'

export const protect = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token)
        return res.status(401).json("No Token");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json("Invalid token");
    }
}