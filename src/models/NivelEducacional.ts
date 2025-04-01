import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js'; // Asegúrate de que este archivo configure correctamente la conexión con tu base de datos

interface NivelEducacionalAttributes {
  idNivel: string;
  nivel: string;
}


interface NivelEducacionalCreationAttributes extends Optional<NivelEducacionalAttributes, 'idNivel'> {}

export class NivelEducacional extends Model<NivelEducacionalAttributes, NivelEducacionalCreationAttributes> implements NivelEducacionalAttributes {
  public idNivel!: string;
  public nivel!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

//Inicializar el modelo
NivelEducacional.init({
  idNivel: {
    type: DataTypes.STRING(16),
    allowNull: false,
    primaryKey: true
  },
  nivel: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'nivelEducacional', // Nombre de la tabla en la base de datos
  modelName: 'NivelEducacional', //Quizas se deba cambiar mas adelante para que sea igual al nombre de la tabla
  timestamps: true,
});

//Exportar el modelo
export default NivelEducacional;