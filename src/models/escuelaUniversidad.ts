import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { universidad, universidadId } from './universidad';

export interface escuelaUniversidadAttributes {
  idEscUniversidad: string;
  escuela: string;
  idUniversidad: string;
}

export type escuelaUniversidadPk = "idEscUniversidad";
export type escuelaUniversidadId = escuelaUniversidad[escuelaUniversidadPk];
export type escuelaUniversidadOptionalAttributes = "idEscUniversidad";
export type escuelaUniversidadCreationAttributes = Optional<escuelaUniversidadAttributes, escuelaUniversidadOptionalAttributes>;

export class escuelaUniversidad extends Model<escuelaUniversidadAttributes, escuelaUniversidadCreationAttributes> implements escuelaUniversidadAttributes {
  idEscUniversidad!: string;
  escuela!: string;
  idUniversidad!: string;

  // escuelaUniversidad belongsTo universidad via idUniversidad
  idUniversidad_universidad!: universidad;
  getIdUniversidad_universidad!: Sequelize.BelongsToGetAssociationMixin<universidad>;
  setIdUniversidad_universidad!: Sequelize.BelongsToSetAssociationMixin<universidad, universidadId>;
  createIdUniversidad_universidad!: Sequelize.BelongsToCreateAssociationMixin<universidad>;

  static initModel(sequelize: Sequelize.Sequelize): typeof escuelaUniversidad {
    return escuelaUniversidad.init({
    idEscUniversidad: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    escuela: {
      type: DataTypes.STRING(50),
      allowNull: false
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
    tableName: 'escuelaUniversidad',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "escuela_PK",
        unique: true,
        fields: [
          { name: "idEscUniversidad" },
        ]
      },
    ]
  });
  }
}
