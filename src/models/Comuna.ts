import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js'; // Asegúrate de que este archivo configure correctamente la conexión a la base de datos
import Region from '../models/Region.ts'; // Asegúrate de que este archivo defina correctamente el modelo Region

interface ComunaAttributes {
  idComuna: string;
  nombreComuna: string;
  idRegion: string;
}

//No tiene atributos opcionales, se agrega idComuna porque es la clave primaria. Esta clave se genera automáticamente en la base de datos.
interface ComunaCreationAttributes extends Optional<ComunaAttributes, 'idComuna'> {}

//Clase del modelo Comuna 
export class Comuna extends Model<ComunaAttributes, ComunaCreationAttributes> implements ComunaAttributes {
  public idComuna!: string;
  public nombreComuna!: string;
  public idRegion!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  //metodo estáticos para definir asociaciones 
static associate() {
    // Relación con TipoColegio
    Comuna.belongsTo(Region, {
      foreignKey: 'idRegion',
      as: 'region', // Alias para la relación
    });
  }
}

//Inicializar el modelo
Comuna.init(
  {
    idComuna: {
      type: DataTypes.STRING(16),
      primaryKey: true,
      allowNull: false,
    },
    nombreComuna: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    idRegion: {
      type: DataTypes.STRING(16),
      allowNull: false, // Clave foránea, no puede ser nula porque debe estar relacionada con una región
    },
  },
  {
    sequelize, // Conexión configurada
    modelName: 'Comuna', // Nombre del modelo
    tableName: 'comuna', // Nombre de la tabla en la base de datos
    timestamps: true, // Habilita createdAt y updatedAt
  }
);
//Exportar el modelo Comuna
export default Comuna;

