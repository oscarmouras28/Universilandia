import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js';
import Universidad from './universidad.ts';

interface EscuelaUniversidadAttributes {
    idEscUniversidad: string;
    escuela: string;
    idUniversidad: string;
}


interface EscuelaUniversidadCreationAttributes extends Optional<EscuelaUniversidadAttributes, 'idEscUniversidad'> { }

export class EscuelaUniversidad extends Model<EscuelaUniversidadAttributes, EscuelaUniversidadCreationAttributes> implements EscuelaUniversidadAttributes {
    public idEscUniversidad!: string;
    public escuela!: string;
    public idUniversidad!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    //Metodos estaticos para definir asociaciones
    // Métodos estáticos para definir asociaciones
    static associate() {
        // Relación con TipoColegio
        EscuelaUniversidad.belongsTo(Universidad, {
            foreignKey: 'idUniversidad',
            as: 'universidad', // Alias para la relación
        });
    }
}
//Inicializar el modelo
EscuelaUniversidad.init(
    {
        idEscUniversidad: {
            type: DataTypes.STRING(16),
            primaryKey: true,
            allowNull: false,
        },
        escuela: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        idUniversidad: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'EscuelaUniversidad',
        tableName: 'escuelaUniversidad',
        timestamps: true,
    }
);


// Exportar el modelo
export default EscuelaUniversidad;

    
