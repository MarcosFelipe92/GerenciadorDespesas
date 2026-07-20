import { DataTypes, Model, Sequelize } from "sequelize";

export interface IMovimentacoes {
  id: number;
  descricao: string;
  valor: number;
  data: Date;
  paga: boolean;
  idTipo: number;
  idCategoria: number;
}

class Movimentacoes extends Model<IMovimentacoes> implements IMovimentacoes {
  declare id: number;
  declare descricao: string;
  declare valor: number;
  declare data: Date;
  declare paga: boolean;
  declare idTipo: number;
  declare idCategoria: number;
  declare tipo?: any;
  declare categoria?: any;

  public static associar(models: any) {
    this.belongsTo(models.Tipos, {
      foreignKey: "idTipo",
      as: "tipo",
    });

    this.belongsTo(models.Categorias, {
      foreignKey: "idCategoria",
      as: "categoria",
    });
  }
}

export function initMovimentacoes(sequelize: Sequelize): typeof Movimentacoes {
  Movimentacoes.init(
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
      valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      data: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paga: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      idTipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "movimentacoes",
      timestamps: true,
    },
  );

  return Movimentacoes;
}

export default Movimentacoes;
