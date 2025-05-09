import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

export interface tokenInvalidadoAttributes {
  token: string;
  expiracion: Date;
}

export type tokenInvalidadoPk = "token";
export type tokenInvalidadoId = tokenInvalidado[tokenInvalidadoPk];
export type tokenInvalidadoCreationAttributes = tokenInvalidadoAttributes;

export class tokenInvalidado extends Model<tokenInvalidadoAttributes, tokenInvalidadoCreationAttributes> implements tokenInvalidadoAttributes {
  token!: string;
  expiracion!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof tokenInvalidado {
    return tokenInvalidado.init({
      token: {
        type: DataTypes.STRING(512), // JWT máximo ~500 caracteres
        allowNull: false,
        primaryKey: true
      },
      expiracion: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'TokenInvalidado',
      schema: 'dbo',
      timestamps: false,
      indexes: [
        {
          name: "TokenInvalidado_PK",
          unique: true,
          fields: [
            { name: "token" },
          ]
        }
      ]
    });
  }
}