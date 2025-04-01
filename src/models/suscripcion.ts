import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js';
import { Usuario } from './usuario.js';

interface SuscripcionAttributes {
    idSuscripcion: string;
    fechaInicio: Date;
    fechaTermino: Date;
    estado: string;
    idUsuario: string;
}

interface SuscripcionCreationAttributes extends Optional<SuscripcionAttributes, 'idSuscripcion'> { }


export class Suscripcion extends Model<SuscripcionAttributes, SuscripcionCreationAttributes> implements SuscripcionAttributes {
    public idSuscripcion!: string;
    public fechaInicio!: Date;
    public fechaTermino!: Date;
    public estado!: string;
    public idUsuario!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    //Metodos estaticos para definir asociaciones
    static associate() {
        Suscripcion.belongsTo(Usuario, {
            foreignKey: 'idUsuario',
            as: 'usuario'
        });
    }
}

//Inicializar el modelo Suscripcion
Suscripcion.init(
    {
        idSuscripcion: {
            type: DataTypes.STRING(16),
            primaryKey: true,
            allowNull: false,
        },
        fechaInicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fechaTermino: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        estado: {
            type: DataTypes.CHAR(1),
            allowNull: false,
        },
        idUsuario: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
    },
    {
        sequelize, // passing the `sequelize` instance is required
        modelName: 'Suscripcion', // We need to choose the model name
        tableName: 'suscripcion', // We need to choose the model name
        timestamps: true,
    }
);
//Exportar el modelo
export default Suscripcion;
