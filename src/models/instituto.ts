import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js';
import Comuna from './Comuna.ts';

interface InstitutoAttributes {
    idInstituto: string;
    nombreInstituto: string;
    idComuna: string;
}

interface InstitutoCreationAttributes extends Optional<InstitutoAttributes, 'idInstituto'> { }

export class Instituto extends Model<InstitutoAttributes, InstitutoCreationAttributes> implements InstitutoAttributes {
    public idInstituto!: string;
    public nombreInstituto!: string;
    public idComuna!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    //Relaciones con otros modelos
    static asociate() {
        Instituto.belongsTo(Comuna, {
            foreignKey: 'idComuna',
            as: 'comuna', // Alias para la relación
            //  targetKey: 'idEstudiante', para especificar que la relación se basa en la columna idEstudiante del modelo Estudiante.
        });
    }
}
Instituto.init(
    {
        idInstituto: {
            type: DataTypes.STRING(16),
            primaryKey: true,
            allowNull: false,
        },
        nombreInstituto: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        idComuna: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Instituto',
        tableName: 'instituto',
        timestamps: true,// Desactivar los timestamps automáticos de Sequelize
    }
);
export default Instituto;
