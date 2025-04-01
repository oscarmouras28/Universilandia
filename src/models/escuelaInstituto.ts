import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js';
import { Instituto } from './instituto.ts';

interface EscuelaInstitutoAttributes {
  idEscuelaInstituto: string;
  escuela: string;
  idInstituto: string;
}

interface EscuelaInstitutoCreationAttributes extends Optional<EscuelaInstitutoAttributes, 'idEscuelaInstituto'|'escuela'> {}


export class EscuelaInstituto extends Model<EscuelaInstitutoAttributes, EscuelaInstitutoCreationAttributes> implements EscuelaInstitutoAttributes {
  public idEscuelaInstituto!: string;
  public escuela!: string;
  public idInstituto!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    EscuelaInstituto.belongsTo(Instituto, {
      foreignKey: 'idInstituto',
      as: 'instituto'
    });
  }
}

EscuelaInstituto.init(
  {
    idEscuelaInstituto: {
      type: DataTypes.STRING(16),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    escuela: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    idInstituto: {
      type: DataTypes.STRING(16),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'EscuelaInstituto',
    tableName: 'escuelaInstituto',
    timestamps: true,
  }
);
export default EscuelaInstituto;
