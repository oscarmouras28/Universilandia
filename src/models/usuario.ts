import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { comentario, comentarioId } from './comentario';
import type { estudiante, estudianteId } from './estudiante';
import type { likeBlog, likeBlogId } from './likeBlog';
import type { suscripcion, suscripcionId } from './suscripcion';

export interface usuarioAttributes {
  idUsuario: string;
  correo: string;
  password: string;
  fechaCreacion: Date;
  tipoUsuario: string;
  activo: boolean;
}

export type usuarioPk = "idUsuario";
export type usuarioId = usuario[usuarioPk];
export type usuarioOptionalAttributes = "idUsuario" | "fechaCreacion" | "activo";
export type usuarioCreationAttributes = Optional<usuarioAttributes, usuarioOptionalAttributes>;

export class usuario extends Model<usuarioAttributes, usuarioCreationAttributes> implements usuarioAttributes {
  idUsuario!: string;
  correo!: string;
  password!: string;
  fechaCreacion!: Date;
  tipoUsuario!: string;
  activo!: boolean;

  // usuario hasMany comentario via idUsuario
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
  // usuario hasMany estudiante via idUsuario
  estudiantes!: estudiante[];
  getEstudiantes!: Sequelize.HasManyGetAssociationsMixin<estudiante>;
  setEstudiantes!: Sequelize.HasManySetAssociationsMixin<estudiante, estudianteId>;
  addEstudiante!: Sequelize.HasManyAddAssociationMixin<estudiante, estudianteId>;
  addEstudiantes!: Sequelize.HasManyAddAssociationsMixin<estudiante, estudianteId>;
  createEstudiante!: Sequelize.HasManyCreateAssociationMixin<estudiante>;
  removeEstudiante!: Sequelize.HasManyRemoveAssociationMixin<estudiante, estudianteId>;
  removeEstudiantes!: Sequelize.HasManyRemoveAssociationsMixin<estudiante, estudianteId>;
  hasEstudiante!: Sequelize.HasManyHasAssociationMixin<estudiante, estudianteId>;
  hasEstudiantes!: Sequelize.HasManyHasAssociationsMixin<estudiante, estudianteId>;
  countEstudiantes!: Sequelize.HasManyCountAssociationsMixin;
  // usuario hasMany likeBlog via idUsuario
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
  // usuario hasMany suscripcion via idUsuario
  suscripcions!: suscripcion[];
  getSuscripcions!: Sequelize.HasManyGetAssociationsMixin<suscripcion>;
  setSuscripcions!: Sequelize.HasManySetAssociationsMixin<suscripcion, suscripcionId>;
  addSuscripcion!: Sequelize.HasManyAddAssociationMixin<suscripcion, suscripcionId>;
  addSuscripcions!: Sequelize.HasManyAddAssociationsMixin<suscripcion, suscripcionId>;
  createSuscripcion!: Sequelize.HasManyCreateAssociationMixin<suscripcion>;
  removeSuscripcion!: Sequelize.HasManyRemoveAssociationMixin<suscripcion, suscripcionId>;
  removeSuscripcions!: Sequelize.HasManyRemoveAssociationsMixin<suscripcion, suscripcionId>;
  hasSuscripcion!: Sequelize.HasManyHasAssociationMixin<suscripcion, suscripcionId>;
  hasSuscripcions!: Sequelize.HasManyHasAssociationsMixin<suscripcion, suscripcionId>;
  countSuscripcions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof usuario {
    return usuario.init({
    idUsuario: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4, // ✅ genera UUID en Node.js,
      primaryKey: true,
      validate:{
        notNull: {msg: 'tanulo el id'}
      }
    },
    correo: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: "UQ__usuario__2A586E0BBEB6FE17",
      validate:{
        notNull: {msg: 'tanulo el correo'},
        notEmpty: {msg: 'taempty el correo'}
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false, 
      validate:{
        notNull: {msg: 'null pasword'}
      }
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('sysdatetime'),
      validate:{
        notNull: {msg: 'tanulo la fecha'}
      }
    },
    tipoUsuario: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate:{
        notNull: {msg: 'tanulo el tipo'},
        notEmpty: {msg: 'taempty el tipo'}
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate:{
        notNull: {msg: 'tanulo el tipo'}
      }
    }
  }, {
    sequelize,
    tableName: 'usuario',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "UQ__usuario__2A586E0BBEB6FE17",
        unique: true,
        fields: [
          { name: "correo" },
        ]
      },
      {
        name: "user_PK",
        unique: true,
        fields: [
          { name: "idUsuario" },
        ]
      },
    ]
  });
  }
}
