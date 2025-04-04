import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { carreraUni, carreraUniId } from './carreraUni';
import type { comuna, comunaId } from './comuna';
import type { escuelaUniversidad, escuelaUniversidadId } from './escuelaUniversidad';
import type { interesUni, interesUniId } from './interesUni';

export interface universidadAttributes {
  idUniversidad: string;
  nombreUniversidad: string;
  idComuna: string;
}

export type universidadPk = "idUniversidad";
export type universidadId = universidad[universidadPk];
export type universidadOptionalAttributes = "idUniversidad";
export type universidadCreationAttributes = Optional<universidadAttributes, universidadOptionalAttributes>;

export class universidad extends Model<universidadAttributes, universidadCreationAttributes> implements universidadAttributes {
  idUniversidad!: string;
  nombreUniversidad!: string;
  idComuna!: string;

  // universidad belongsTo comuna via idComuna
  idComuna_comuna!: comuna;
  getIdComuna_comuna!: Sequelize.BelongsToGetAssociationMixin<comuna>;
  setIdComuna_comuna!: Sequelize.BelongsToSetAssociationMixin<comuna, comunaId>;
  createIdComuna_comuna!: Sequelize.BelongsToCreateAssociationMixin<comuna>;
  // universidad hasMany carreraUni via idUniversidad
  carreraUnis!: carreraUni[];
  getCarreraUnis!: Sequelize.HasManyGetAssociationsMixin<carreraUni>;
  setCarreraUnis!: Sequelize.HasManySetAssociationsMixin<carreraUni, carreraUniId>;
  addCarreraUni!: Sequelize.HasManyAddAssociationMixin<carreraUni, carreraUniId>;
  addCarreraUnis!: Sequelize.HasManyAddAssociationsMixin<carreraUni, carreraUniId>;
  createCarreraUni!: Sequelize.HasManyCreateAssociationMixin<carreraUni>;
  removeCarreraUni!: Sequelize.HasManyRemoveAssociationMixin<carreraUni, carreraUniId>;
  removeCarreraUnis!: Sequelize.HasManyRemoveAssociationsMixin<carreraUni, carreraUniId>;
  hasCarreraUni!: Sequelize.HasManyHasAssociationMixin<carreraUni, carreraUniId>;
  hasCarreraUnis!: Sequelize.HasManyHasAssociationsMixin<carreraUni, carreraUniId>;
  countCarreraUnis!: Sequelize.HasManyCountAssociationsMixin;
  // universidad hasMany escuelaUniversidad via idUniversidad
  escuelaUniversidads!: escuelaUniversidad[];
  getEscuelaUniversidads!: Sequelize.HasManyGetAssociationsMixin<escuelaUniversidad>;
  setEscuelaUniversidads!: Sequelize.HasManySetAssociationsMixin<escuelaUniversidad, escuelaUniversidadId>;
  addEscuelaUniversidad!: Sequelize.HasManyAddAssociationMixin<escuelaUniversidad, escuelaUniversidadId>;
  addEscuelaUniversidads!: Sequelize.HasManyAddAssociationsMixin<escuelaUniversidad, escuelaUniversidadId>;
  createEscuelaUniversidad!: Sequelize.HasManyCreateAssociationMixin<escuelaUniversidad>;
  removeEscuelaUniversidad!: Sequelize.HasManyRemoveAssociationMixin<escuelaUniversidad, escuelaUniversidadId>;
  removeEscuelaUniversidads!: Sequelize.HasManyRemoveAssociationsMixin<escuelaUniversidad, escuelaUniversidadId>;
  hasEscuelaUniversidad!: Sequelize.HasManyHasAssociationMixin<escuelaUniversidad, escuelaUniversidadId>;
  hasEscuelaUniversidads!: Sequelize.HasManyHasAssociationsMixin<escuelaUniversidad, escuelaUniversidadId>;
  countEscuelaUniversidads!: Sequelize.HasManyCountAssociationsMixin;
  // universidad hasMany interesUni via idUniversidad
  interesUnis!: interesUni[];
  getInteresUnis!: Sequelize.HasManyGetAssociationsMixin<interesUni>;
  setInteresUnis!: Sequelize.HasManySetAssociationsMixin<interesUni, interesUniId>;
  addInteresUni!: Sequelize.HasManyAddAssociationMixin<interesUni, interesUniId>;
  addInteresUnis!: Sequelize.HasManyAddAssociationsMixin<interesUni, interesUniId>;
  createInteresUni!: Sequelize.HasManyCreateAssociationMixin<interesUni>;
  removeInteresUni!: Sequelize.HasManyRemoveAssociationMixin<interesUni, interesUniId>;
  removeInteresUnis!: Sequelize.HasManyRemoveAssociationsMixin<interesUni, interesUniId>;
  hasInteresUni!: Sequelize.HasManyHasAssociationMixin<interesUni, interesUniId>;
  hasInteresUnis!: Sequelize.HasManyHasAssociationsMixin<interesUni, interesUniId>;
  countInteresUnis!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof universidad {
    return universidad.init({
    idUniversidad: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    nombreUniversidad: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    idComuna: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'comuna',
        key: 'idComuna'
      }
    }
  }, {
    sequelize,
    tableName: 'universidad',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "universidad_PK",
        unique: true,
        fields: [
          { name: "idUniversidad" },
        ]
      },
    ]
  });
  }
}
