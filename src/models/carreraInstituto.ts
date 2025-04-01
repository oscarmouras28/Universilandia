import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js';
import { Instituto } from './instituto.ts';

interface CarreraInstitutoAttributes {
  idCarInstituto: string;
    nombreCarrera: string;
    modalidad: number;
    arancel: number;
    semestres: number;
    idInstituto: string;
}

interface CarreraInstitutoCreationAttributes extends Optional<CarreraInstitutoAttributes, 'idCarInstituto' | 'modalidad'|'arancel'|'semestres'> {}

export class CarreraInstituto extends Model<CarreraInstitutoAttributes, CarreraInstitutoCreationAttributes> implements CarreraInstitutoAttributes {
    public idCarInstituto!: string;
    public nombreCarrera!: string;
    public modalidad!: number;
    public arancel!: number;
    public semestres!: number;
    public idInstituto!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static asociate() {
        CarreraInstituto.belongsTo(Instituto, {
            foreignKey: 'idInstituto',
            //targetKey: 'idInstituto',
            as: 'instituto'
        });
    }
}
CarreraInstituto.init(
    {
        idCarInstituto: {
            type: DataTypes.STRING(16),
            primaryKey: true,
            allowNull: false,
        },
        nombreCarrera: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        modalidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        arancel: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        semestres: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idInstituto: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
    },
    {
        sequelize, 
        modelName: 'CarreraInstituto',
        tableName: 'carreraInstituto',
        timestamps: true,
    }
);
export default CarreraInstituto;