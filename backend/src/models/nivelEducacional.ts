import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { estudiante, estudianteId } from './estudiante';

export interface nivelEducacionalAttributes {
  idNivel: string;
  nivel: string;
}

export type nivelEducacionalPk = "idNivel";
export type nivelEducacionalId = nivelEducacional[nivelEducacionalPk];
export type nivelEducacionalOptionalAttributes = "idNivel";
export type nivelEducacionalCreationAttributes = Optional<nivelEducacionalAttributes, nivelEducacionalOptionalAttributes>;

export class nivelEducacional extends Model<nivelEducacionalAttributes, nivelEducacionalCreationAttributes> implements nivelEducacionalAttributes {
  idNivel!: string;
  nivel!: string;

  // nivelEducacional hasMany estudiante via idNivelEducacional
  estudiantes!: estudiante[];
  getEstudiantes!: Sequelize.HasManyGetAssociationsMixin<estudiante>;
  setEstudiantes!: Sequelize.HasManySetAssociationsMixin<estudiante, estudianteId>;
  addEstudiante!: Sequelize.HasManyAddAssociationMixin<estudiante, estudianteId>;
  addEstudiantes!: Sequelize.HasManyAddAssociationsMixin<estudiante, estudianteId>;
  createEstudiante!: Sequelize.HasManyCreateAssociationMixin<estudiante>;
  removeEstudiante!: Sequelize.HasManyRemoveAssociationMixin<estudiante, estudianteId>;
  removeEstudiantes!: Sequelize.HasManyRemoveAssociationsMixin<estudiante, estudianteId>;
  hasEstudiante!: Sequelize.HasManyHasAssociationMixin<estudiante, estudianteId>;
  hasEstudiantes!: Sequelize.HasManyHasAssociationsMixin<estudiante, estudianteId>;
  countEstudiantes!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof nivelEducacional {
    return nivelEducacional.init({
    idNivel: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    nivel: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'nivelEducacional',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "nivel_estudio_PK",
        unique: true,
        fields: [
          { name: "idNivel" },
        ]
      },
    ]
  });
  }
}
