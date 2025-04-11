import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { carreraInstituto, carreraInstitutoId } from './carreraInstituto';
import type { comuna, comunaId } from './comuna';
import type { escuelaInstituto, escuelaInstitutoId } from './escuelaInstituto';
import type { interesInsti, interesInstiId } from './interesInsti';

export interface institutoAttributes {
  idInstituto: string;
  nombreInstituto: string;
  idComuna: string;
}

export type institutoPk = "idInstituto";
export type institutoId = instituto[institutoPk];
export type institutoOptionalAttributes = "idInstituto";
export type institutoCreationAttributes = Optional<institutoAttributes, institutoOptionalAttributes>;

export class instituto extends Model<institutoAttributes, institutoCreationAttributes> implements institutoAttributes {
  idInstituto!: string;
  nombreInstituto!: string;
  idComuna!: string;

  // instituto belongsTo comuna via idComuna
  idComuna_comuna!: comuna;
  getIdComuna_comuna!: Sequelize.BelongsToGetAssociationMixin<comuna>;
  setIdComuna_comuna!: Sequelize.BelongsToSetAssociationMixin<comuna, comunaId>;
  createIdComuna_comuna!: Sequelize.BelongsToCreateAssociationMixin<comuna>;
  // instituto hasMany carreraInstituto via idInstituto
  carreraInstitutos!: carreraInstituto[];
  getCarreraInstitutos!: Sequelize.HasManyGetAssociationsMixin<carreraInstituto>;
  setCarreraInstitutos!: Sequelize.HasManySetAssociationsMixin<carreraInstituto, carreraInstitutoId>;
  addCarreraInstituto!: Sequelize.HasManyAddAssociationMixin<carreraInstituto, carreraInstitutoId>;
  addCarreraInstitutos!: Sequelize.HasManyAddAssociationsMixin<carreraInstituto, carreraInstitutoId>;
  createCarreraInstituto!: Sequelize.HasManyCreateAssociationMixin<carreraInstituto>;
  removeCarreraInstituto!: Sequelize.HasManyRemoveAssociationMixin<carreraInstituto, carreraInstitutoId>;
  removeCarreraInstitutos!: Sequelize.HasManyRemoveAssociationsMixin<carreraInstituto, carreraInstitutoId>;
  hasCarreraInstituto!: Sequelize.HasManyHasAssociationMixin<carreraInstituto, carreraInstitutoId>;
  hasCarreraInstitutos!: Sequelize.HasManyHasAssociationsMixin<carreraInstituto, carreraInstitutoId>;
  countCarreraInstitutos!: Sequelize.HasManyCountAssociationsMixin;
  // instituto hasMany escuelaInstituto via idInstituto
  escuelaInstitutos!: escuelaInstituto[];
  getEscuelaInstitutos!: Sequelize.HasManyGetAssociationsMixin<escuelaInstituto>;
  setEscuelaInstitutos!: Sequelize.HasManySetAssociationsMixin<escuelaInstituto, escuelaInstitutoId>;
  addEscuelaInstituto!: Sequelize.HasManyAddAssociationMixin<escuelaInstituto, escuelaInstitutoId>;
  addEscuelaInstitutos!: Sequelize.HasManyAddAssociationsMixin<escuelaInstituto, escuelaInstitutoId>;
  createEscuelaInstituto!: Sequelize.HasManyCreateAssociationMixin<escuelaInstituto>;
  removeEscuelaInstituto!: Sequelize.HasManyRemoveAssociationMixin<escuelaInstituto, escuelaInstitutoId>;
  removeEscuelaInstitutos!: Sequelize.HasManyRemoveAssociationsMixin<escuelaInstituto, escuelaInstitutoId>;
  hasEscuelaInstituto!: Sequelize.HasManyHasAssociationMixin<escuelaInstituto, escuelaInstitutoId>;
  hasEscuelaInstitutos!: Sequelize.HasManyHasAssociationsMixin<escuelaInstituto, escuelaInstitutoId>;
  countEscuelaInstitutos!: Sequelize.HasManyCountAssociationsMixin;
  // instituto hasMany interesInsti via idInstituto
  interesInstis!: interesInsti[];
  getInteresInstis!: Sequelize.HasManyGetAssociationsMixin<interesInsti>;
  setInteresInstis!: Sequelize.HasManySetAssociationsMixin<interesInsti, interesInstiId>;
  addInteresInsti!: Sequelize.HasManyAddAssociationMixin<interesInsti, interesInstiId>;
  addInteresInstis!: Sequelize.HasManyAddAssociationsMixin<interesInsti, interesInstiId>;
  createInteresInsti!: Sequelize.HasManyCreateAssociationMixin<interesInsti>;
  removeInteresInsti!: Sequelize.HasManyRemoveAssociationMixin<interesInsti, interesInstiId>;
  removeInteresInstis!: Sequelize.HasManyRemoveAssociationsMixin<interesInsti, interesInstiId>;
  hasInteresInsti!: Sequelize.HasManyHasAssociationMixin<interesInsti, interesInstiId>;
  hasInteresInstis!: Sequelize.HasManyHasAssociationsMixin<interesInsti, interesInstiId>;
  countInteresInstis!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof instituto {
    return instituto.init({
    idInstituto: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    nombreInstituto: {
      type: DataTypes.STRING(50),
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
    tableName: 'instituto',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "instituto_PK",
        unique: true,
        fields: [
          { name: "idInstituto" },
        ]
      },
    ]
  });
  }
}
