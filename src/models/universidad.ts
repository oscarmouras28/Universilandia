import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js'; // Asegúrate de que este archivo configure correctamente la conexión con tu base de datos
import Comuna from './Comuna.ts';

interface UniversidadAttributes {
  idUniversidad: string;
  nombreUniversidad: string;
  idComuna: string;
  }

interface UniversidadCreationAttributes extends Optional<UniversidadAttributes, 'idUniversidad'> {}

//Clase del modelo universidad

export class Universidad extends Model<UniversidadAttributes, UniversidadCreationAttributes> implements UniversidadAttributes {
  public idUniversidad!: string;
  public nombreUniversidad!: string;
  public idComuna!: string;

  // timestamps! Esto es util para mantener un registro historico de los datos, se mantiene tambien un registro de la fecha de creacion y actualizacion de los datos.
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

   // Métodos estáticos para definir asociaciones ForeignKey.
   static associate() {
    // Relación con TipoColegio
    Universidad.belongsTo(Comuna, {
      foreignKey: 'idComuna',
      as: 'comuna', // Alias para la relación
    });
}


}
//Inicializar el modelo
Universidad.init({
    idUniversidad: {
      type: DataTypes.STRING(16),
      primaryKey: true,
      allowNull: false,
    },
    nombreUniversidad: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    idComuna: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
  }, {
    sequelize, // Conectar a la base de datos
    tableName: 'universidad', // Nombre de la tabla en la base de datos
    modelName: 'Universidad', // Nombre de la tabla en la base de datos
    timestamps: true, // Fecha de creación y actualización

  });
  export default Universidad;