import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { region, regionId } from './region';

export interface paisAttributes {
  idPais: string;
  nombrePais: string;
}

export type paisPk = "idPais";
export type paisId = pais[paisPk];
export type paisOptionalAttributes = "idPais";
export type paisCreationAttributes = Optional<paisAttributes, paisOptionalAttributes>;

export class pais extends Model<paisAttributes, paisCreationAttributes> implements paisAttributes {
  idPais!: string;
  nombrePais!: string;

  // pais hasMany region via idPais
  regions!: region[];
  getRegions!: Sequelize.HasManyGetAssociationsMixin<region>;
  setRegions!: Sequelize.HasManySetAssociationsMixin<region, regionId>;
  addRegion!: Sequelize.HasManyAddAssociationMixin<region, regionId>;
  addRegions!: Sequelize.HasManyAddAssociationsMixin<region, regionId>;
  createRegion!: Sequelize.HasManyCreateAssociationMixin<region>;
  removeRegion!: Sequelize.HasManyRemoveAssociationMixin<region, regionId>;
  removeRegions!: Sequelize.HasManyRemoveAssociationsMixin<region, regionId>;
  hasRegion!: Sequelize.HasManyHasAssociationMixin<region, regionId>;
  hasRegions!: Sequelize.HasManyHasAssociationsMixin<region, regionId>;
  countRegions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof pais {
    return pais.init({
    idPais: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    nombrePais: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pais',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pais_PK",
        unique: true,
        fields: [
          { name: "idPais" },
        ]
      },
    ]
  });
  }
}
