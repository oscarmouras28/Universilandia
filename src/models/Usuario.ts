import { DataTypes, Model, Optional } from 'sequelize';
import  sequelize  from '../config/db.js'; // Asegúrate de que este archivo configure correctamente la conexión

// Interfaz para definir los atributos del modelo Usuario
interface UsuarioAttributes {
  idUsuario: string;
  correo: string;
  password: string;
  fechaCreacion: Date;
  tipoUsuario: string;
  activo: boolean;
}

// Interfaz para definir los atributos opcionales al crear un usuario ( Esto se puede utilizar asi en caso de que existan atributos que no sean requeridos al crear un usuario).
//interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'idUsuario' | 'fechaCreacion' | 'activo'> {}

// Interfaz para definir los atributos al crear un usuario (no son atributos opcionales).
interface UsuarioCreationAttributes extends Optional <UsuarioAttributes,'idUsuario'> {}

// Clase del modelo Usuario
export class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
  public idUsuario!: string;
  public correo!: string;
  public password!: string;
  public fechaCreacion!: Date;
  public tipoUsuario!: string;
  public activo!: boolean;

  // Timestamps opcionales (si usas createdAt y updatedAt)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicializar el modelo
Usuario.init(
  {
    idUsuario: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4, // Genera un UUID v4 por defecto, comsultar si es necesario en este caso.
      //primaryKey: True está reemplazando a unique: true. Ya que es redundante tener ambas propiedades en la misma columna.
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Esto permite que el correo sea único en la base de datos.
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    tipoUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize, // Conexión configurada en el archivo db.js
    tableName: 'usuarios', // Nombre de la tabla en la base de datos mysql
    timestamps: false, // Cambia a true si usas createdAt y updatedAt
  }
);

export default Usuario;
