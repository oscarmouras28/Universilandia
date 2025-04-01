import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js';

interface MultimediaAttributes {
  idMultimedia: string;
  url: string;
}


interface MultimediaCreationAttributes extends Optional<MultimediaAttributes, 'idMultimedia'> { }

export class Multimedia extends Model<MultimediaAttributes, MultimediaCreationAttributes> implements MultimediaAttributes {
  public idMultimedia!: string;
  public url!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

//Inicializar el modelo 
Multimedia.init(
  {
    idMultimedia: {
      type: DataTypes.STRING(16),
      primaryKey: true,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Multimedia',
    tableName: 'multimedia',
    timestamps: true, // disable timestamps
  }
);
// Exportar el modelo
export default Multimedia;