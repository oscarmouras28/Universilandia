import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { blog, blogId } from './blog';
import type { usuario, usuarioId } from './usuario';

export interface likeBlogAttributes {
  idLikeBlog: string;
  fechaCreacion: Date;
  idBlog: string;
  idUsuario: string;
}

export type likeBlogPk = "idLikeBlog";
export type likeBlogId = likeBlog[likeBlogPk];
export type likeBlogOptionalAttributes = "idLikeBlog" | "fechaCreacion";
export type likeBlogCreationAttributes = Optional<likeBlogAttributes, likeBlogOptionalAttributes>;

export class likeBlog extends Model<likeBlogAttributes, likeBlogCreationAttributes> implements likeBlogAttributes {
  idLikeBlog!: string;
  fechaCreacion!: Date;
  idBlog!: string;
  idUsuario!: string;

  // likeBlog belongsTo blog via idBlog
  idBlog_blog!: blog;
  getIdBlog_blog!: Sequelize.BelongsToGetAssociationMixin<blog>;
  setIdBlog_blog!: Sequelize.BelongsToSetAssociationMixin<blog, blogId>;
  createIdBlog_blog!: Sequelize.BelongsToCreateAssociationMixin<blog>;
  // likeBlog belongsTo usuario via idUsuario
  idUsuario_usuario!: usuario;
  getIdUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setIdUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createIdUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof likeBlog {
    return likeBlog.init({
    idLikeBlog: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('sysdatetime')
    },
    idBlog: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'blog',
        key: 'idBlog'
      }
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
    tableName: 'likeBlog',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "like_PK",
        unique: true,
        fields: [
          { name: "idLikeBlog" },
        ]
      },
    ]
  });
  }
}
