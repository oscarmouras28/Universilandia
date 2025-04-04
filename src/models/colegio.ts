import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuna, comunaId } from './comuna';
import type { estudiante, estudianteId } from './estudiante';
import type { tipoColegio, tipoColegioId } from './tipoColegio';

export interface colegioAttributes {
  idColegio: string;
  nombre: string;
  idTipoColegio: string;
  idComuna: string;
}

export type colegioPk = "idColegio";
export type colegioId = colegio[colegioPk];
export type colegioOptionalAttributes = "idColegio";
export type colegioCreationAttributes = Optional<colegioAttributes, colegioOptionalAttributes>;

export class colegio extends Model<colegioAttributes, colegioCreationAttributes> implements colegioAttributes {
  idColegio!: string;
  nombre!: string;
  idTipoColegio!: string;
  idComuna!: string;

  // colegio hasMany estudiante via idColegio
  estudiantes!: estudiante[];
  getEstudiantes!: Sequelize.HasManyGetAssociationsMixin<estudiante>;
  setEstudiantes!: Sequelize.HasManySetAssociationsMixin<estudiante, estudianteId>;
  addEstudiante!: Sequelize.HasManyAddAssociationMixin<estudiante, estudianteId>;
  addEstudiantes!: Sequelize.HasManyAddAssociationsMixin<estudiante, estudianteId>;
  createEstudiante!: Sequelize.HasManyCreateAssociationMixin<estudiante>;
  removeEstudiante!: Sequelize.HasManyRemoveAssociationMixin<estudiante, estudianteId>;
  removeEstudiantes!: Sequelize.HasManyRemoveAssociationsMixin<estudiante, estudianteId>;
  hasEstudiante!: Sequelize.HasManyHasAssociationMixin<estudiante, estudianteId>;
  hasEstudiantes!: Sequelize.HasManyHasAssociationsMixin<estudiante, estudianteId>;
  countEstudiantes!: Sequelize.HasManyCountAssociationsMixin;
  // colegio belongsTo comuna via idComuna
  idComuna_comuna!: comuna;
  getIdComuna_comuna!: Sequelize.BelongsToGetAssociationMixin<comuna>;
  setIdComuna_comuna!: Sequelize.BelongsToSetAssociationMixin<comuna, comunaId>;
  createIdComuna_comuna!: Sequelize.BelongsToCreateAssociationMixin<comuna>;
  // colegio belongsTo tipoColegio via idTipoColegio
  idTipoColegio_tipoColegio!: tipoColegio;
  getIdTipoColegio_tipoColegio!: Sequelize.BelongsToGetAssociationMixin<tipoColegio>;
  setIdTipoColegio_tipoColegio!: Sequelize.BelongsToSetAssociationMixin<tipoColegio, tipoColegioId>;
  createIdTipoColegio_tipoColegio!: Sequelize.BelongsToCreateAssociationMixin<tipoColegio>;

  static initModel(sequelize: Sequelize.Sequelize): typeof colegio {
    return colegio.init({
    idColegio: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    idTipoColegio: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tipoColegio',
        key: 'idTipoColegio'
      }
    },
    idComuna: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'comuna',
        key: 'idComuna'
      }
    }
  }, {
    sequelize,
    tableName: 'colegio',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "colegio_PK",
        unique: true,
        fields: [
          { name: "idColegio" },
        ]
      },
    ]
  });
  }
}
