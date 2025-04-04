import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { estudiante, estudianteId } from './estudiante';
import type { instituto, institutoId } from './instituto';

export interface interesInstiAttributes {
  idInterIns: string;
  idEstudiante: string;
  idInstituto: string;
}

export type interesInstiPk = "idInterIns";
export type interesInstiId = interesInsti[interesInstiPk];
export type interesInstiOptionalAttributes = "idInterIns";
export type interesInstiCreationAttributes = Optional<interesInstiAttributes, interesInstiOptionalAttributes>;

export class interesInsti extends Model<interesInstiAttributes, interesInstiCreationAttributes> implements interesInstiAttributes {
  idInterIns!: string;
  idEstudiante!: string;
  idInstituto!: string;

  // interesInsti belongsTo estudiante via idEstudiante
  idEstudiante_estudiante!: estudiante;
  getIdEstudiante_estudiante!: Sequelize.BelongsToGetAssociationMixin<estudiante>;
  setIdEstudiante_estudiante!: Sequelize.BelongsToSetAssociationMixin<estudiante, estudianteId>;
  createIdEstudiante_estudiante!: Sequelize.BelongsToCreateAssociationMixin<estudiante>;
  // interesInsti belongsTo instituto via idInstituto
  idInstituto_instituto!: instituto;
  getIdInstituto_instituto!: Sequelize.BelongsToGetAssociationMixin<instituto>;
  setIdInstituto_instituto!: Sequelize.BelongsToSetAssociationMixin<instituto, institutoId>;
  createIdInstituto_instituto!: Sequelize.BelongsToCreateAssociationMixin<instituto>;

  static initModel(sequelize: Sequelize.Sequelize): typeof interesInsti {
    return interesInsti.init({
    idInterIns: {
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
    tableName: 'interesInsti',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "Interes_Insti_PK",
        unique: true,
        fields: [
          { name: "idInterIns" },
        ]
      },
    ]
  });
  }
}
