import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { comuna, comunaId } from './comuna';
import type { pais, paisId } from './pais';

export interface regionAttributes {
  idRegion: string;
  nombreRegion: string;
  idPais: string;
}

export type regionPk = "idRegion";
export type regionId = region[regionPk];
export type regionOptionalAttributes = "idRegion";
export type regionCreationAttributes = Optional<regionAttributes, regionOptionalAttributes>;

export class region extends Model<regionAttributes, regionCreationAttributes> implements regionAttributes {
  idRegion!: string;
  nombreRegion!: string;
  idPais!: string;

  // region belongsTo pais via idPais
  idPais_pai!: pais;
  getIdPais_pai!: Sequelize.BelongsToGetAssociationMixin<pais>;
  setIdPais_pai!: Sequelize.BelongsToSetAssociationMixin<pais, paisId>;
  createIdPais_pai!: Sequelize.BelongsToCreateAssociationMixin<pais>;
  // region hasMany comuna via idRegion
  comunas!: comuna[];
  getComunas!: Sequelize.HasManyGetAssociationsMixin<comuna>;
  setComunas!: Sequelize.HasManySetAssociationsMixin<comuna, comunaId>;
  addComuna!: Sequelize.HasManyAddAssociationMixin<comuna, comunaId>;
  addComunas!: Sequelize.HasManyAddAssociationsMixin<comuna, comunaId>;
  createComuna!: Sequelize.HasManyCreateAssociationMixin<comuna>;
  removeComuna!: Sequelize.HasManyRemoveAssociationMixin<comuna, comunaId>;
  removeComunas!: Sequelize.HasManyRemoveAssociationsMixin<comuna, comunaId>;
  hasComuna!: Sequelize.HasManyHasAssociationMixin<comuna, comunaId>;
  hasComunas!: Sequelize.HasManyHasAssociationsMixin<comuna, comunaId>;
  countComunas!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof region {
    return region.init({
    idRegion: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    nombreRegion: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    idPais: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'pais',
        key: 'idPais'
      }
    }
  }, {
    sequelize,
    tableName: 'region',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "region_PK",
        unique: true,
        fields: [
          { name: "idRegion" },
        ]
      },
    ]
  });
  }
}
