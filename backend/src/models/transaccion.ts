import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { usuario, usuarioId } from './usuario';
import type { suscripcion, suscripcionId } from './suscripcion';

export interface transaccionAttributes {
  idTransaccion: string;
  idUsuario: string;
  monto: number;
  fechaPago: Date;
  idSuscripcion?: string;
  estado: string;
  metodoPago: string;
  referenciaExterna?: string;
}

export type transaccionPk = "idTransaccion";
export type transaccionId = transaccion[transaccionPk];
export type transaccionOptionalAttributes = "idTransaccion" | "idSuscripcion" | "referenciaExterna";
export type transaccionCreationAttributes = Optional<transaccionAttributes, transaccionOptionalAttributes>;

export class transaccion extends Model<transaccionAttributes, transaccionCreationAttributes> implements transaccionAttributes {
  idTransaccion!: string;
  idUsuario!: string;
  monto!: number;
  fechaPago!: Date;
  estado!: string;
  metodoPago!: string;
  referenciaExterna?: string;
  idSuscripcion?: string;

  // Relaciones
  idUsuario_usuario!: usuario;
  getIdUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setIdUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createIdUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  idSuscripcion_suscripcion?: suscripcion;
  getIdSuscripcion_suscripcion!: Sequelize.BelongsToGetAssociationMixin<suscripcion>;
  setIdSuscripcion_suscripcion!: Sequelize.BelongsToSetAssociationMixin<suscripcion, suscripcionId>;
  createIdSuscripcion_suscripcion!: Sequelize.BelongsToCreateAssociationMixin<suscripcion>;

  static initModel(sequelize: Sequelize.Sequelize): typeof transaccion {
    return transaccion.init({
      idTransaccion: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      idUsuario: {
        type: DataTypes.UUID,
        allowNull: false
      },
      idSuscripcion: {
        type: DataTypes.UUID,
        allowNull: true
      },
      monto: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      metodoPago: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      estado: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      referenciaExterna: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      fechaPago: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('GETDATE')
      }
    }, {
      sequelize,
      tableName: 'transaccion',
      schema: 'dbo',
      timestamps: false,
      indexes: [
        {
          name: "transaccion_PK",
          unique: true,
          fields: [
            { name: "idTransaccion" },
          ]
        }
      ]
    });
  }
}