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

export const getGroupById = async (req, res) => {
    const { id } = req.params;

    const group = await Group.findById(id).populate("members", "name email");

    if (!group) {
        return res.status(404).json({ message: "Group not found" });
    }

    res.json(group);
}

export const updateGroup = async (req, res) => {
    const { id } = req.params;
    const { name, members } = req.body;

    if (typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ message: "Group name is required" });
    }

    if (!Array.isArray(members) || members.length === 0) {
        return res.status(400).json({ message: "At least one member is required" });
    }

    const group = await Group.findByIdAndUpdate(
        id,
        { name: name.trim(), members },
        { new: true, runValidators: true }
    ).populate("members", "name email");

    if (!group) {
        return res.status(404).json({ message: "Group not found" });
    }

    res.json(group);
}