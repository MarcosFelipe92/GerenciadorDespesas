import { Sequelize } from "sequelize";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initTipos } from "./tipos.model";
import { initCategorias } from "./categorias.model";
import { initMovimentacoes } from "./movimentacoes.model";

// 1. Resolver caminhos devido ao uso de ES Modules em TypeScript
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

// 2. Carregar as configurações do seu config.json
const env = process.env.NODE_ENV || "development";
const configPath = path.resolve(__dirname, "..", "config", "config.json");
const configs = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const config = configs[env];

// 3. Inicializar a instância do Sequelize com o Postgres
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  },
);

const db: any = {
  sequelize,
  Sequelize,
};

// 💡 Nota para o futuro:
// Quando você criar seu primeiro model (ex: despesa.model.ts), você vai importá-lo
// e inicializá-lo manualmente aqui, o que é muito melhor para o autocomplete do Zed funcionarem!
// Exemplo:
db.Tipos = initTipos(sequelize);
db.Categorias = initCategorias(sequelize);
db.Movimentacoes = initMovimentacoes(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associar) {
    db[modelName].associar(db);
  }
});

export { sequelize, Sequelize };
export default db;
