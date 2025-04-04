import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { colegio, colegioId } from './colegio';

export interface tipoColegioAttributes {
  idTipoColegio: string;
  tipo: string;
}

export type tipoColegioPk = "idTipoColegio";
export type tipoColegioId = tipoColegio[tipoColegioPk];
export type tipoColegioOptionalAttributes = "idTipoColegio";
export type tipoColegioCreationAttributes = Optional<tipoColegioAttributes, tipoColegioOptionalAttributes>;

export class tipoColegio extends Model<tipoColegioAttributes, tipoColegioCreationAttributes> implements tipoColegioAttributes {
  idTipoColegio!: string;
  tipo!: string;

  // tipoColegio hasMany colegio via idTipoColegio
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

  static initModel(sequelize: Sequelize.Sequelize): typeof tipoColegio {
    return tipoColegio.init({
    idTipoColegio: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    tipo: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tipoColegio',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "tipo_colegio_PK",
        unique: true,
        fields: [
          { name: "idTipoColegio" },
        ]
      },
    ]
  });
  }
}
