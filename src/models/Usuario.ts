import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js'; // Asegúrate de que este archivo configure correctamente la conexión

// Interfaz para definir los atributos del modelo Usuario
export interface UsuarioAttributes {
  idUsuario: string;
  correo: string;
  password: Buffer; // Cambiado a Buffer para almacenar el hash de la contraseña
  fechaCreacion: Date;
  tipoUsuario: string;
  activo: boolean;
}

// Interfaz para definir los atributos opcionales al crear un usuario ( Esto se puede utilizar asi en caso de que existan atributos que no sean requeridos al crear un usuario).
//interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'idUsuario' | 'fechaCreacion' | 'activo'> {}

// Interfaz para definir los atributos al crear un usuario (no son atributos opcionales).
interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'idUsuario'> { }

// Clase del modelo Usuario
export class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
  public idUsuario!: string;
  public correo!: string;
  public password!: Buffer; // Cambiado a Buffer para almacenar el hash de la contraseña
  public fechaCreacion!: Date;
  public tipoUsuario!: string;
  public activo!: boolean;

  // Timestamps opcionales (si usas createdAt y updatedAt)
  public readonly updatedAt!: Date;
}

// Inicializar el modelo
Usuario.init(
  {
    idUsuario: {
      type: DataTypes.STRING(16), // Cambiado a STRING(16) para limitar la longitud del UUID
      primaryKey: true,
      allowNull: false,
      // Genera un UUID v4 por defecto, comsultar si es necesario en este caso. Pero eso ya lo hace la base de datos. 
      //primaryKey: True está reemplazando a unique: true. Ya que es redundante tener ambas propiedades en la misma columna.
    },
    correo: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true, // Esto permite que el correo sea único en la base de datos.
    },
    password: {
      type: DataTypes.BLOB,//RAW se mapea a BLOB en mysql, pero se puede cambiar a STRING si se desea.
      allowNull: false,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    tipoUsuario: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    activo: {
      type: DataTypes.CHAR(1), // Cambiado a CHAR(1) para almacenar un valor booleano (0 o 1)
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize, // Conexión configurada en el archivo db.js
    modelName: 'Usuario', // Nombre del modelo
    tableName: 'usuario', // Nombre de la tabla en la base de datos mysql
    timestamps: true, // Cambia a true si usas createdAt y updatedAt
  }
);
export default Usuario;
