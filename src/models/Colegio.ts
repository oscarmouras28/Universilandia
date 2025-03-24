import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js'; // Asegúrate de que este archivo configure correctamente la conexión
import TipoColegio from './TipoColegio'; // Importa el modelo relacionado
import Comuna from './Comuna'; // Importa el modelo relacionado

// Interfaz para definir los atributos del modelo Colegio
interface ColegioAttributes {
  idColegio: string;
  nombre: string;
  idTipoColegio: string; // Clave foránea
  comuna_id: string; // Clave foránea
}

// No tiene atributos opcionales
interface ColegioCreationAttributes extends Optional<ColegioAttributes, 'idColegio'> {}

// Clase del modelo Colegio
class Colegio extends Model<ColegioAttributes, ColegioCreationAttributes> implements ColegioAttributes {
  public idColegio!: string;
  public nombre!: string;
  public idTipoColegio!: string;
  public comuna_id!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Métodos estáticos para definir asociaciones
  static associate() {
    // Relación con TipoColegio
    Colegio.belongsTo(TipoColegio, {
      foreignKey: 'idTipoColegio',
      as: 'tipoColegio', // Alias para la relación
    });

    // Relación con Comuna
    Colegio.belongsTo(Comuna, {
      foreignKey: 'comuna_id',
      as: 'comuna', // Alias para la relación
    });
  }
}

// Inicializar el modelo
Colegio.init(
  {
    idColegio: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4 // Genera un UUID automáticamente
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idTipoColegio: {
      type: DataTypes.STRING,
      allowNull: false, // Clave foránea, no puede ser nula
    },
    comuna_id: {
      type: DataTypes.STRING,
      allowNull: false, // Clave foránea, no puede ser nula
    },
  },
  {
    sequelize, // Conexión configurada
    tableName: 'colegio', // Nombre de la tabla en la base de datos
    timestamps: true, // Habilita createdAt y updatedAt
  }
);

// Exportar el modelo
export default Colegio;


