import agent from "../api/agent";

export const getTopList = async () => {
    const res = await agent.PrizePool.getTopList();

    return res;
}