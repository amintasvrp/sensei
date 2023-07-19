import ConnectionsRepository from "../repositories/ConnectionRepository";

export default {
  async index() {
    return { total: await ConnectionsRepository.index() };
  },

  async create(user_id: string) {
    return await ConnectionsRepository.create(user_id);
  },
};
