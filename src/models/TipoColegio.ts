import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js'; // Asegúrate de que este archivo configure correctamente la conexión

interface TipoColegioAttributes {
    idTipoColegio: string;
    nombre: string;
}

//No tiene atributos opcionales
interface TipoColegioCreationAttributes extends Optional<TipoColegioAttributes, 'idTipoColegio'> { }

//Clase de modelo TipoColegio
export class TipoColegio extends Model<TipoColegioAttributes, TipoColegioCreationAttributes> implements TipoColegioAttributes {
    idTipoColegio: string;
    nombre: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

//Inicializar el modelo
TipoColegio.init(
    {
        idTipoColegio: {
            type: DataTypes.STRING(16),
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
    sequelize,
    modelName: 'TipoColegio', //Nombre del modelo
    tableName: 'tipoColegio', //Nombre de la tabla en la base de datos
    timestamps: true,
});

//Exportar el modelo
export default TipoColegio;
