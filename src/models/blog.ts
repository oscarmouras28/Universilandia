import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js';


 interface BlogAttributes {
  idBlog: string;
  contenido: string;
}

interface BlogCreationAttributes extends Optional<BlogAttributes, 'idBlog'> {}

export class Blog extends Model<BlogAttributes, BlogCreationAttributes> implements BlogAttributes {
  public idBlog!: string;
  public contenido!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Blog.init(
  {
    idBlog: {
      type: DataTypes.STRING(16),
      primaryKey: true,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.STRING(255),//Cambiar a blob cuando se haya cambiado en la base de datos. 
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Blog',
    tableName: 'blog',
    timestamps: true,
  }
);
export default Blog;