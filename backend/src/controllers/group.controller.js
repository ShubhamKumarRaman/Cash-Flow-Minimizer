import Group from "../models/group.model.js";

export const createGroup = async (req, res) => {
    const { name, members } = req.body;

    const group = await Group.create({
        name,
        members,
    });

    res.json(group);
}

export const getGroups = async (req, res) => {
    const groups = await Group.find().populate("members", "name email");

    res.json(groups);
}