import User from '../models/user.model'

export const getUsers = async (req, res) => {
    const users = await User.find().select("-password")
    res.json(users);
}