import { optimizeWithMCMF } from "../services/mcmf.service.js";

export const getMCMFSettlement = async (req, res) => {
    const { groupId } = req.params;

    const result = await optimizeWithMCMF(groupId);

    res.json(result);
}