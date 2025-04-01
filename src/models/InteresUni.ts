import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js'; // Asegúrate de que este archivo configure correctamente la conexión con tu base de datos
import Estudiante from '../models/Estudiante.ts'; // Asegúrate de que este archivo esté en la ubicación correcta
import Universidad from '../models/universidad.ts'; // Asegúrate de que este archivo esté en la ubicación correcta
interface InteresUniAttributes {
    idIntUni: string;
    idEstudiante: string;
    idUniversidad: String;
}

//No tiene atributos opcionales
interface InteresUniCreationAttributes extends Optional<InteresUniAttributes, 'idIntUni'> { }

//Clase del modelo
export class InteresUni extends Model<InteresUniAttributes, InteresUniCreationAttributes> implements InteresUniAttributes {
    public idIntUni!: string;
    public idEstudiante!: string;
    public idUniversidad!: String;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    
    // Métodos estáticos para definir asociaciones
    static associate() {
        InteresUni.belongsTo(Estudiante, {
            foreignKey: 'idEstudiante',
            as: 'estudiante',
        });

        InteresUni.belongsTo(Universidad, {
            foreignKey: 'idUniversidad',
            as: 'universidad',
        });
    }
}

//Inicializar el modelo 
InteresUni.init({
    idIntUni: {
        type: DataTypes.STRING(16),
        primaryKey: true,
    },
    idEstudiante: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    idUniversidad: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'interesUni', // Nombre de la tabla en la base de datos
    modelName: 'InteresUni',
    timestamps: true, // Cambia a true si usas createdAt y updatedAt
});
//Se exporta el modelo 
export default InteresUni;



