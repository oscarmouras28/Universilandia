import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { universidad, universidadId } from './universidad';

export interface carreraUniAttributes {
  idCarrUni: string;
  nombreCarrera: string;
  modalidad?: number;
  arancel?: number;
  semestres?: number;
  idUniversidad: string;
}

export type carreraUniPk = "idCarrUni";
export type carreraUniId = carreraUni[carreraUniPk];
export type carreraUniOptionalAttributes = "idCarrUni" | "modalidad" | "arancel" | "semestres";
export type carreraUniCreationAttributes = Optional<carreraUniAttributes, carreraUniOptionalAttributes>;

export class carreraUni extends Model<carreraUniAttributes, carreraUniCreationAttributes> implements carreraUniAttributes {
  idCarrUni!: string;
  nombreCarrera!: string;
  modalidad?: number;
  arancel?: number;
  semestres?: number;
  idUniversidad!: string;

  // carreraUni belongsTo universidad via idUniversidad
  idUniversidad_universidad!: universidad;
  getIdUniversidad_universidad!: Sequelize.BelongsToGetAssociationMixin<universidad>;
  setIdUniversidad_universidad!: Sequelize.BelongsToSetAssociationMixin<universidad, universidadId>;
  createIdUniversidad_universidad!: Sequelize.BelongsToCreateAssociationMixin<universidad>;

  static initModel(sequelize: Sequelize.Sequelize): typeof carreraUni {
    return carreraUni.init({
    idCarrUni: {
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
    idUniversidad: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'universidad',
        key: 'idUniversidad'
      }
    }
  }, {
    sequelize,
    tableName: 'carreraUni',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "carrera_PK",
        unique: true,
        fields: [
          { name: "idCarrUni" },
        ]
      },
    ]
  });
  }
}
