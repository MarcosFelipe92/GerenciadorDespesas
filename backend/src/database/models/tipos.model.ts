import { DataTypes, Model, Sequelize } from "sequelize";

export interface ITipos {
  id: number;
  descricao: string;
}

class Tipos extends Model<ITipos> implements ITipos {
  declare id: number;
  declare descricao: string;
}

export function initTipos(sequelize: Sequelize): typeof Tipos {
  Tipos.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      descricao: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tipos",
      timestamps: true,
    },
  );

  return Tipos;
}

export default Tipos;
