import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { colegio, colegioId } from './colegio';
import type { instituto, institutoId } from './instituto';
import type { region, regionId } from './region';
import type { universidad, universidadId } from './universidad';

export interface comunaAttributes {
  idComuna: string;
  nombreComuna: string;
  idRegion: string;
}

export type comunaPk = "idComuna";
export type comunaId = comuna[comunaPk];
export type comunaOptionalAttributes = "idComuna";
export type comunaCreationAttributes = Optional<comunaAttributes, comunaOptionalAttributes>;

export class comuna extends Model<comunaAttributes, comunaCreationAttributes> implements comunaAttributes {
  idComuna!: string;
  nombreComuna!: string;
  idRegion!: string;

  // comuna hasMany colegio via idComuna
  colegios!: colegio[];
  getColegios!: Sequelize.HasManyGetAssociationsMixin<colegio>;
  setColegios!: Sequelize.HasManySetAssociationsMixin<colegio, colegioId>;
  addColegio!: Sequelize.HasManyAddAssociationMixin<colegio, colegioId>;
  addColegios!: Sequelize.HasManyAddAssociationsMixin<colegio, colegioId>;
  createColegio!: Sequelize.HasManyCreateAssociationMixin<colegio>;
  removeColegio!: Sequelize.HasManyRemoveAssociationMixin<colegio, colegioId>;
  removeColegios!: Sequelize.HasManyRemoveAssociationsMixin<colegio, colegioId>;
  hasColegio!: Sequelize.HasManyHasAssociationMixin<colegio, colegioId>;
  hasColegios!: Sequelize.HasManyHasAssociationsMixin<colegio, colegioId>;
  countColegios!: Sequelize.HasManyCountAssociationsMixin;
  // comuna hasMany instituto via idComuna
  institutos!: instituto[];
  getInstitutos!: Sequelize.HasManyGetAssociationsMixin<instituto>;
  setInstitutos!: Sequelize.HasManySetAssociationsMixin<instituto, institutoId>;
  addInstituto!: Sequelize.HasManyAddAssociationMixin<instituto, institutoId>;
  addInstitutos!: Sequelize.HasManyAddAssociationsMixin<instituto, institutoId>;
  createInstituto!: Sequelize.HasManyCreateAssociationMixin<instituto>;
  removeInstituto!: Sequelize.HasManyRemoveAssociationMixin<instituto, institutoId>;
  removeInstitutos!: Sequelize.HasManyRemoveAssociationsMixin<instituto, institutoId>;
  hasInstituto!: Sequelize.HasManyHasAssociationMixin<instituto, institutoId>;
  hasInstitutos!: Sequelize.HasManyHasAssociationsMixin<instituto, institutoId>;
  countInstitutos!: Sequelize.HasManyCountAssociationsMixin;
  // comuna hasMany universidad via idComuna
  universidads!: universidad[];
  getUniversidads!: Sequelize.HasManyGetAssociationsMixin<universidad>;
  setUniversidads!: Sequelize.HasManySetAssociationsMixin<universidad, universidadId>;
  addUniversidad!: Sequelize.HasManyAddAssociationMixin<universidad, universidadId>;
  addUniversidads!: Sequelize.HasManyAddAssociationsMixin<universidad, universidadId>;
  createUniversidad!: Sequelize.HasManyCreateAssociationMixin<universidad>;
  removeUniversidad!: Sequelize.HasManyRemoveAssociationMixin<universidad, universidadId>;
  removeUniversidads!: Sequelize.HasManyRemoveAssociationsMixin<universidad, universidadId>;
  hasUniversidad!: Sequelize.HasManyHasAssociationMixin<universidad, universidadId>;
  hasUniversidads!: Sequelize.HasManyHasAssociationsMixin<universidad, universidadId>;
  countUniversidads!: Sequelize.HasManyCountAssociationsMixin;
  // comuna belongsTo region via idRegion
  idRegion_region!: region;
  getIdRegion_region!: Sequelize.BelongsToGetAssociationMixin<region>;
  setIdRegion_region!: Sequelize.BelongsToSetAssociationMixin<region, regionId>;
  createIdRegion_region!: Sequelize.BelongsToCreateAssociationMixin<region>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comuna {
    return comuna.init({
    idComuna: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    nombreComuna: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    idRegion: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'region',
        key: 'idRegion'
      }
    }
  }, {
    sequelize,
    tableName: 'comuna',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "comuna_PK",
        unique: true,
        fields: [
          { name: "idComuna" },
        ]
      },
    ]
  });
  }
}
