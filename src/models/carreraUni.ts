import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js';
import universidad from './universidad.js';

interface CarreraUniAttributes {
    idCarrUni: string;
    nombreCarrera: string;
    modalidad: number;
    arancel: number;
    semestres: number;
    idUniversidad: string;
}

interface CarreraUniCreationAttributes extends Optional<CarreraUniAttributes, 'idCarrUni'|'modalidad'|'arancel'|'semestres'> {}

export class carreraUni extends Model<CarreraUniAttributes, CarreraUniCreationAttributes> implements CarreraUniAttributes {
    public idCarrUni!: string;
    public nombreCarrera!: string;
    public modalidad!: number;
    public arancel!: number;
    public semestres!: number;
    public idUniversidad!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static asociate () {
        carreraUni.belongsTo(universidad, {
            foreignKey: 'idUniversidad',
            //targetKey: 'idUniversidad',
            as: 'universidad'
        });
    }
}

carreraUni.init(
    {
        idCarrUni: {
            type: DataTypes.STRING(16),
            primaryKey: true,
            allowNull: false
        },
        nombreCarrera: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        modalidad: {
            type: DataTypes.INTEGER,
            allowNull: true //esta permitiendo null, como en la base de datos
        },
        arancel: {
            type: DataTypes.INTEGER, //esta permitiendo null, como en la base de datos
            allowNull: true
        },
        semestres: {
            type: DataTypes.INTEGER, //esta permitiendo null, como en la base de datos
            allowNull: true
        },
        idUniversidad: {
            type: DataTypes.STRING(16),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'carreraUni',
        tableName: 'carreraUni',
        timestamps: true,
    }
);

export default carreraUni;