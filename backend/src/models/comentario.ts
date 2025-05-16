import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { blog, blogId } from './blog';
import type { usuario, usuarioId } from './usuario';

export interface comentarioAttributes {
  idComentario: string;
  contenido: string;
  fechaCreacion: Date;
  idUsuario: string;
  idBlog: string;
  activo: boolean;
}

export type comentarioPk = "idComentario";
export type comentarioId = comentario[comentarioPk];
export type comentarioOptionalAttributes = "idComentario" | "fechaCreacion";
export type comentarioCreationAttributes = Optional<comentarioAttributes, comentarioOptionalAttributes>;

export class comentario extends Model<comentarioAttributes, comentarioCreationAttributes>
  implements comentarioAttributes {
  idComentario!: string;
  contenido!: string;
  fechaCreacion!: Date;
  idUsuario!: string;
  idBlog!: string;
  activo!: boolean;

  // comentario belongsTo blog via idBlog
  idBlog_blog!: blog;
  getIdBlog_blog!: Sequelize.BelongsToGetAssociationMixin<blog>;
  setIdBlog_blog!: Sequelize.BelongsToSetAssociationMixin<blog, blogId>;
  createIdBlog_blog!: Sequelize.BelongsToCreateAssociationMixin<blog>;

  // comentario belongsTo usuario via idUsuario
  idUsuario_usuario!: usuario;
  getIdUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setIdUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createIdUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comentario {
    return comentario.init({
      idComentario: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      contenido: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('sysdatetime')
      },
      idUsuario: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'idUsuario'
        }
      },
      idBlog: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'blog',
          key: 'idBlog'
        }
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {
      sequelize,
      tableName: 'comentario',
      schema: 'dbo',
      timestamps: false,
      indexes: [
        {
          name: "comentario_PK",
          unique: true,
          fields: [{ name: "idComentario" }]
        }
      ]
    });
  }
}
