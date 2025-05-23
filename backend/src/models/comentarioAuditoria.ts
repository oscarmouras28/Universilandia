import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { usuario, usuarioId } from './usuario';
import type { comentario, comentarioId } from './comentario';

export interface comentario_auditoriaAttributes {
  idAuditoria: string;
  idComentario: string;
  idUsuario: string;
  contenidoOriginal: string;
  fechaEliminacion?: Date;
  motivo?: string | null;
}

export type comentario_auditoriaPk = "idAuditoria";
export type comentario_auditoriaId = comentario_auditoria[comentario_auditoriaPk];
export type comentario_auditoriaOptionalAttributes = "idAuditoria" | "fechaEliminacion" | "motivo";
export type comentario_auditoriaCreationAttributes = Optional<comentario_auditoriaAttributes, comentario_auditoriaOptionalAttributes>;

export class comentario_auditoria extends Model<comentario_auditoriaAttributes, comentario_auditoriaCreationAttributes>
  implements comentario_auditoriaAttributes {
  idAuditoria!: string;
  idComentario!: string;
  idUsuario!: string;
  contenidoOriginal!: string;
  fechaEliminacion?: Date;
  motivo?: string | null;

  // Relaciones opcionales (si luego se desea acceder a los modelos asociados)
  idComentario_comentario!: comentario;
  getIdComentario_comentario!: Sequelize.BelongsToGetAssociationMixin<comentario>;
  setIdComentario_comentario!: Sequelize.BelongsToSetAssociationMixin<comentario, comentarioId>;
  createIdComentario_comentario!: Sequelize.BelongsToCreateAssociationMixin<comentario>;

  idUsuario_usuario!: usuario;
  getIdUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setIdUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createIdUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comentario_auditoria {
    return comentario_auditoria.init({
      idAuditoria: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      idComentario: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'comentario',
          key: 'idComentario'
        }
      },
      idUsuario: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'idUsuario'
        }
      },
      contenidoOriginal: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      fechaEliminacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('sysdatetime')
      },
      motivo: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'comentario_auditoria',
      schema: 'dbo',
      timestamps: false,
      indexes: [
        {
          name: "comentario_auditoria_PK",
          unique: true,
          fields: [{ name: "idAuditoria" }]
        }
      ]
    });
  }
}
