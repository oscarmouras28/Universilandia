import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { usuario, usuarioId } from './usuario';

export interface suscripcionAttributes {
  idSuscripcion: string;
  fechaInicio: Date;
  fechaTermino: Date;
  estado: boolean;
  idUsuario: string;
}

export type suscripcionPk = "idSuscripcion";
export type suscripcionId = suscripcion[suscripcionPk];
export type suscripcionOptionalAttributes = "idSuscripcion" | "fechaInicio" | "estado";
export type suscripcionCreationAttributes = Optional<suscripcionAttributes, suscripcionOptionalAttributes>;

export class suscripcion extends Model<suscripcionAttributes, suscripcionCreationAttributes> implements suscripcionAttributes {
  idSuscripcion!: string;
  fechaInicio!: Date;
  fechaTermino!: Date;
  estado!: boolean;
  idUsuario!: string;

  // suscripcion belongsTo usuario via idUsuario
  idUsuario_usuario!: usuario;
  getIdUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setIdUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createIdUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof suscripcion {
    return suscripcion.init({
    idSuscripcion: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('sysdatetime')
    },
    fechaTermino: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    idUsuario: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    }
  }, {
    sequelize,
    tableName: 'suscripcion',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "suscripcion_PK",
        unique: true,
        fields: [
          { name: "idSuscripcion" },
        ]
      },
    ]
  });
  }
}
