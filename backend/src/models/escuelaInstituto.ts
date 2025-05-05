import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { instituto, institutoId } from './instituto';

export interface escuelaInstitutoAttributes {
  idEscuelaInstituto: string;
  escuela?: string;
  idInstituto: string;
}

export type escuelaInstitutoPk = "idEscuelaInstituto";
export type escuelaInstitutoId = escuelaInstituto[escuelaInstitutoPk];
export type escuelaInstitutoOptionalAttributes = "idEscuelaInstituto" | "escuela";
export type escuelaInstitutoCreationAttributes = Optional<escuelaInstitutoAttributes, escuelaInstitutoOptionalAttributes>;

export class escuelaInstituto extends Model<escuelaInstitutoAttributes, escuelaInstitutoCreationAttributes> implements escuelaInstitutoAttributes {
  idEscuelaInstituto!: string;
  escuela?: string;
  idInstituto!: string;

  // escuelaInstituto belongsTo instituto via idInstituto
  idInstituto_instituto!: instituto;
  getIdInstituto_instituto!: Sequelize.BelongsToGetAssociationMixin<instituto>;
  setIdInstituto_instituto!: Sequelize.BelongsToSetAssociationMixin<instituto, institutoId>;
  createIdInstituto_instituto!: Sequelize.BelongsToCreateAssociationMixin<instituto>;

  static initModel(sequelize: Sequelize.Sequelize): typeof escuelaInstituto {
    return escuelaInstituto.init({
    idEscuelaInstituto: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    escuela: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    idInstituto: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'instituto',
        key: 'idInstituto'
      }
    }
  }, {
    sequelize,
    tableName: 'escuelaInstituto',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "EscuelaInstituto_PK",
        unique: true,
        fields: [
          { name: "idEscuelaInstituto" },
        ]
      },
    ]
  });
  }
}
