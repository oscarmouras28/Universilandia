import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js'; // Asegúrate de que este archivo configure correctamente la conexión con tu base de datos
import Usuario from './usuario.ts';
import Colegio from './Colegio.ts';
import NivelEducacional from '../models/NivelEducacional.ts';

interface EstudianteAttributes {
    idEstudiante: string;
    telefono: string;
    primerNombre: string;
    segundoNombre: string;
    apellidoMaterno: string;
    apellidoPaterno: string;
    rut: string;
    fechaNacimiento: Date;
    fechatermino: Date;
    idUsuario: string;
    idColegio: string;
    idNivelEducacional: string;
}


interface EstudianteCreationAttributes extends Optional<EstudianteAttributes, 'idEstudiante' | 'fechatermino'> { }


export class Estudiante extends Model<EstudianteAttributes, EstudianteCreationAttributes> implements EstudianteAttributes {
    public idEstudiante!: string;
    public telefono!: string;
    public primerNombre!: string;
    public segundoNombre!: string;
    public apellidoMaterno!: string;
    public apellidoPaterno!: string;
    public rut!: string;
    public fechaNacimiento!: Date;
    public fechatermino!: Date;
    public idUsuario!: string;
    public idColegio!: string;
    public idNivelEducacional!: string;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    //Metodos estaticos para definir asociaciones
    static associate() {
        Estudiante.belongsTo(Usuario,
            {
                foreignKey: 'idUsuario',
                as: 'usuario',
            });

        //Relacion con Colegio
        Estudiante.belongsTo(Colegio,
            {
                foreignKey: 'idColegio',
                as: 'colegio',
            });
        //Relacion con NivelEducacional
        Estudiante.belongsTo(NivelEducacional,
            {
                foreignKey: 'idNivelEducacional', // Debe coincidir con el nombre de la columna en la tabla de origen (Estudiante)
                as: 'nivelEducacional', // Alias para la relación
            });

    }
    //Inicializar el modelo 
    static initModel(): void {
        Estudiante.init({
            idEstudiante: {
                type: DataTypes.STRING(16),
                primaryKey: true,
                allowNull: false,
            },
            telefono: {
                type: DataTypes.STRING(11),
                allowNull: false,
            },
            primerNombre: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            segundoNombre: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            apellidoMaterno: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            apellidoPaterno: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            rut: {
                type: DataTypes.STRING(9),
                allowNull: false,
            },
            fechaNacimiento: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            fechatermino: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            idUsuario: {
                type: DataTypes.STRING(16),
                allowNull: false,
            },
            idColegio: {
                type: DataTypes.STRING(16),
                allowNull: false,
            },
            idNivelEducacional: {
                type: DataTypes.STRING(16),
                allowNull: false,
            }
        }, {
            sequelize,
            modelName: 'Estudiante',
            tableName: 'Estudiante',
            timestamps: true, // Cambia a true si usas createdAt y updatedAt en tu base de datos
        });
    }
}

//Exportar el modelo
export default Estudiante;

