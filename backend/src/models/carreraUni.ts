import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { universidad, universidadId } from './universidad';
import type { multimedia, multimediaId } from './multimedia'; // ⬅ importar multimedia

export interface carreraUniAttributes {
  idCarrUni: string;
  nombreCarrera: string;
  modalidad?: number;
  arancel?: number;
  semestres?: number;
  idUniversidad: string;
  descripcion?: string;
  idMultimedia?: string; // ⬅ nuevo campo
}

export type carreraUniPk = "idCarrUni";
export type carreraUniId = carreraUni[carreraUniPk];
export type carreraUniOptionalAttributes = "idCarrUni" | "modalidad" | "arancel" | "semestres" | "descripcion" | "idMultimedia";
export type carreraUniCreationAttributes = Optional<carreraUniAttributes, carreraUniOptionalAttributes>;

export class carreraUni extends Model<carreraUniAttributes, carreraUniCreationAttributes> implements carreraUniAttributes {
  idCarrUni!: string;
  nombreCarrera!: string;
  modalidad?: number;
  arancel?: number;
  semestres?: number;
  idUniversidad!: string;
  descripcion?: string;
  idMultimedia?: string;

  // Relación con universidad
  idUniversidad_universidad!: universidad;
  getIdUniversidad_universidad!: Sequelize.BelongsToGetAssociationMixin<universidad>;
  setIdUniversidad_universidad!: Sequelize.BelongsToSetAssociationMixin<universidad, universidadId>;
  createIdUniversidad_universidad!: Sequelize.BelongsToCreateAssociationMixin<universidad>;

  // Relación con multimedia
  multimedia?: multimedia;
  getMultimedia!: Sequelize.BelongsToGetAssociationMixin<multimedia>;
  setMultimedia!: Sequelize.BelongsToSetAssociationMixin<multimedia, multimediaId>;
  createMultimedia!: Sequelize.BelongsToCreateAssociationMixin<multimedia>;

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
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      idMultimedia: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'multimedia',
          key: 'IDMultimedia'
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
