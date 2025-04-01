import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js';
import { Usuario } from './usuario.ts';
import { Blog } from './blog.ts';

// Definición del modelo Comentario
interface ComentarioAttributes {
  idComentario: string;
  contenido: string;
  fechaCreacion: Date;
  idUsuario: string;
  idBlog: string;
}


interface ComentarioCreationAttributes extends Optional<ComentarioAttributes, 'idComentario'> {}

export class Comentario extends Model<ComentarioAttributes, ComentarioCreationAttributes> implements ComentarioAttributes {
  public idComentario!: string;
  public contenido!: string;
  public fechaCreacion!: Date;
  public idUsuario!: string;
  public idBlog!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  //relaciones 
  static associate() { 
    Comentario.belongsTo(Usuario, {
      foreignKey: 'idUsuario',
      as: 'usuario',
    });
    Comentario.belongsTo(Blog, {
      foreignKey: 'idBlog',
      as: 'blog',
    });
  }
}

Comentario.init(
  {
    idComentario: {
      type: DataTypes.STRING(16),
      primaryKey: true,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idUsuario: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    idBlog: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
  },
  {
    sequelize, 
    modelName: 'Comentario',
    tableName: 'comentario',
    timestamps: true,
  }
);
export default Comentario;