import { DataTypes, Model, Sequelize } from "sequelize";

export interface ICategorias {
  id: number;
  descricao: string;
}

class Categorias extends Model<ICategorias> implements ICategorias {
  declare id: number;
  declare descricao: string;
}

export function initCategorias(sequelize: Sequelize): typeof Categorias {
  Categorias.init(
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
      tableName: "categorias",
      timestamps: true,
    },
  );

  return Categorias;
}

export default Categorias;
