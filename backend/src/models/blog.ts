import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { comentario, comentarioId } from './comentario';
import type { likeBlog, likeBlogId } from './likeBlog';

export interface blogAttributes {
  idBlog: string;
  titulo: string;
  contenido: string;
}

export type blogPk = "idBlog";
export type blogId = blog[blogPk];
export type blogOptionalAttributes = "idBlog";
export type blogCreationAttributes = Optional<blogAttributes, blogOptionalAttributes>;

export class blog extends Model<blogAttributes, blogCreationAttributes> implements blogAttributes {
  idBlog!: string;
  titulo!: string;
  contenido!: string;

  // blog hasMany comentario via idBlog
  comentarios!: comentario[];
  getComentarios!: Sequelize.HasManyGetAssociationsMixin<comentario>;
  setComentarios!: Sequelize.HasManySetAssociationsMixin<comentario, comentarioId>;
  addComentario!: Sequelize.HasManyAddAssociationMixin<comentario, comentarioId>;
  addComentarios!: Sequelize.HasManyAddAssociationsMixin<comentario, comentarioId>;
  createComentario!: Sequelize.HasManyCreateAssociationMixin<comentario>;
  removeComentario!: Sequelize.HasManyRemoveAssociationMixin<comentario, comentarioId>;
  removeComentarios!: Sequelize.HasManyRemoveAssociationsMixin<comentario, comentarioId>;
  hasComentario!: Sequelize.HasManyHasAssociationMixin<comentario, comentarioId>;
  hasComentarios!: Sequelize.HasManyHasAssociationsMixin<comentario, comentarioId>;
  countComentarios!: Sequelize.HasManyCountAssociationsMixin;

  // blog hasMany likeBlog via idBlog
  likeBlogs!: likeBlog[];
  getLikeBlogs!: Sequelize.HasManyGetAssociationsMixin<likeBlog>;
  setLikeBlogs!: Sequelize.HasManySetAssociationsMixin<likeBlog, likeBlogId>;
  addLikeBlog!: Sequelize.HasManyAddAssociationMixin<likeBlog, likeBlogId>;
  addLikeBlogs!: Sequelize.HasManyAddAssociationsMixin<likeBlog, likeBlogId>;
  createLikeBlog!: Sequelize.HasManyCreateAssociationMixin<likeBlog>;
  removeLikeBlog!: Sequelize.HasManyRemoveAssociationMixin<likeBlog, likeBlogId>;
  removeLikeBlogs!: Sequelize.HasManyRemoveAssociationsMixin<likeBlog, likeBlogId>;
  hasLikeBlog!: Sequelize.HasManyHasAssociationMixin<likeBlog, likeBlogId>;
  hasLikeBlogs!: Sequelize.HasManyHasAssociationsMixin<likeBlog, likeBlogId>;
  countLikeBlogs!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof blog {
    return blog.init({
      idBlog: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      titulo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'Título pendiente'
      },
      contenido: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'blog',
      schema: 'dbo',
      timestamps: false,
      indexes: [
        {
          name: "blog_PK",
          unique: true,
          fields: [
            { name: "idBlog" },
          ]
        },
      ]
    });
  }
}
