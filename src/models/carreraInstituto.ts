import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { instituto, institutoId } from './instituto';

export interface carreraInstitutoAttributes {
  idCarrInstituto: string;
  nombreCarrera: string;
  modalidad?: number;
  arancel?: number;
  semestres?: number;
  idInstituto: string;
}

export type carreraInstitutoPk = "idCarrInstituto";
export type carreraInstitutoId = carreraInstituto[carreraInstitutoPk];
export type carreraInstitutoOptionalAttributes = "idCarrInstituto" | "modalidad" | "arancel" | "semestres";
export type carreraInstitutoCreationAttributes = Optional<carreraInstitutoAttributes, carreraInstitutoOptionalAttributes>;

export class carreraInstituto extends Model<carreraInstitutoAttributes, carreraInstitutoCreationAttributes> implements carreraInstitutoAttributes {
  idCarrInstituto!: string;
  nombreCarrera!: string;
  modalidad?: number;
  arancel?: number;
  semestres?: number;
  idInstituto!: string;

  // carreraInstituto belongsTo instituto via idInstituto
  idInstituto_instituto!: instituto;
  getIdInstituto_instituto!: Sequelize.BelongsToGetAssociationMixin<instituto>;
  setIdInstituto_instituto!: Sequelize.BelongsToSetAssociationMixin<instituto, institutoId>;
  createIdInstituto_instituto!: Sequelize.BelongsToCreateAssociationMixin<instituto>;

  static initModel(sequelize: Sequelize.Sequelize): typeof carreraInstituto {
    return carreraInstituto.init({
    idCarrInstituto: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    nombreCarrera: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    modalidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    arancel: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    semestres: {
      type: DataTypes.INTEGER,
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
    tableName: 'carreraInstituto',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "CarreraInsti_PK",
        unique: true,
        fields: [
          { name: "idCarrInstituto" },
        ]
      },
    ]
  });
  }
}
