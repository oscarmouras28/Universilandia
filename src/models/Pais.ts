import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js'; // Asegúrate de que este archivo configure correctamente la conexión a la base de datos


interface PaisAttributes {
  idPais: string;
  nombrePais: string;
}

//No tiene atributos opcionales
interface PaisCreationAttributes extends Optional<PaisAttributes, 'idPais'> {}

//Clase del modelo Pais
export class Pais extends Model<PaisAttributes, PaisCreationAttributes> implements PaisAttributes {
  public idPais!: string;
  public nombrePais!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

//No tiene asociaciones con otras tablas

//Inicializar el modelo
Pais.init({
  idPais: {
    type: DataTypes.STRING(16),
    allowNull: false,
    primaryKey: true
  },
  nombrePais: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Pais', // Nombre del modelo
  tableName: 'pais',
  timestamps: true,
});

//exportar el modelo Pais
export default Pais;