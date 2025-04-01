import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js';
import Estudiante from '../models/Estudiante.ts';
import Instituto from './instituto.ts'; 

interface InteresInstiAttributes {
  idInterIns: string;
  idEstudiante: string;
  idInstituto: string;
}

interface InteresInstiCreationAttributes extends Optional<InteresInstiAttributes, 'idInterIns'> {}

export class InteresInsti extends Model<InteresInstiAttributes, InteresInstiCreationAttributes> implements InteresInstiAttributes {
  public idInterIns!: string;
  public idEstudiante!: string;
  public idInstituto!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


//Relaciones con otros modelos
  static asociate() {
    InteresInsti.belongsTo(Estudiante, {
      foreignKey: 'idEstudiante',
      as: 'estudiante',
      //  targetKey: 'idEstudiante', para especificar que la relación se basa en la columna idEstudiante del modelo Estudiante.
    });
    InteresInsti.belongsTo(Instituto, {
      foreignKey: 'idInstituto',
      as: 'instituto',
    });
  }
}

InteresInsti.init(
  {
    idInterIns: {
      type: DataTypes.STRING(16),
      primaryKey: true,
    },
    idEstudiante: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    idInstituto: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'InteresInsti',
    tableName: 'interesinsti',
    timestamps: true,
  }
);
export default InteresInsti;
