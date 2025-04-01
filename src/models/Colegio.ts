import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js'; // Asegúrate de que este archivo configure correctamente la conexión
import TipoColegio from '../models/TipoColegio.ts'; // Importa el modelo relacionado se debe hacer para que funcione.
import Comuna from '../models/Comuna.ts'; // Importa el modelo relacionado se debe hacer para que funcione la relación.

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
export class Colegio extends Model<ColegioAttributes, ColegioCreationAttributes> implements ColegioAttributes {
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
      type: DataTypes.STRING(16),
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    idTipoColegio: {
      type: DataTypes.STRING(16),
      allowNull: false, // Clave foránea, no puede ser nula
    },
    comuna_id: {
      type: DataTypes.STRING(16),
      allowNull: false, // Clave foránea, no puede ser nula
    },
  },
  {
    sequelize, // Conexión configurada
    modelName: 'Colegio', // Nombre del modelo
    tableName: 'colegio', // Nombre de la tabla en la base de datos
    timestamps: true, // Habilita createdAt y updatedAt
  }
);

// Exportar el modelo
export default Colegio;


