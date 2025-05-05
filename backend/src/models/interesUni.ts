import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { estudiante, estudianteId } from './estudiante';
import type { universidad, universidadId } from './universidad';

export interface interesUniAttributes {
  idIntUni: string;
  idEstudiante: string;
  idUniversidad: string;
}

export type interesUniPk = "idIntUni";
export type interesUniId = interesUni[interesUniPk];
export type interesUniOptionalAttributes = "idIntUni";
export type interesUniCreationAttributes = Optional<interesUniAttributes, interesUniOptionalAttributes>;

export class interesUni extends Model<interesUniAttributes, interesUniCreationAttributes> implements interesUniAttributes {
  idIntUni!: string;
  idEstudiante!: string;
  idUniversidad!: string;

  // interesUni belongsTo estudiante via idEstudiante
  idEstudiante_estudiante!: estudiante;
  getIdEstudiante_estudiante!: Sequelize.BelongsToGetAssociationMixin<estudiante>;
  setIdEstudiante_estudiante!: Sequelize.BelongsToSetAssociationMixin<estudiante, estudianteId>;
  createIdEstudiante_estudiante!: Sequelize.BelongsToCreateAssociationMixin<estudiante>;
  // interesUni belongsTo universidad via idUniversidad
  idUniversidad_universidad!: universidad;
  getIdUniversidad_universidad!: Sequelize.BelongsToGetAssociationMixin<universidad>;
  setIdUniversidad_universidad!: Sequelize.BelongsToSetAssociationMixin<universidad, universidadId>;
  createIdUniversidad_universidad!: Sequelize.BelongsToCreateAssociationMixin<universidad>;

  static initModel(sequelize: Sequelize.Sequelize): typeof interesUni {
    return interesUni.init({
    idIntUni: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    idEstudiante: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'estudiante',
        key: 'idEstudiante'
      }
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
    tableName: 'interesUni',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "interes_PK",
        unique: true,
        fields: [
          { name: "idIntUni" },
        ]
      },
    ]
  });
  }
}
