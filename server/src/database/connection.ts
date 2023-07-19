import knex from "knex";

import knexfile from "../../knexfile";

export default knex({
  client: knexfile.client,
  connection: knexfile.connection,
  useNullAsDefault: knexfile.useNullAsDefault,
});
