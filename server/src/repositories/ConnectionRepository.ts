import db from "../database/connection";

export default {
  async index() {
    return (await db("connections").count("* as total"))[0].total;
  },

  async create(user_id: string) {
    return await db("connections").insert({
      user_id,
    });
  },
};
