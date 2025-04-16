import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { colegio, colegioId } from './colegio';
import type { interesInsti, interesInstiId } from './interesInsti';
import type { interesUni, interesUniId } from './interesUni';
import type { nivelEducacional, nivelEducacionalId } from './nivelEducacional';
import type { usuario, usuarioId } from './usuario';

export interface estudianteAttributes {
  idEstudiante: string;
  telefono: string;
  primerNombre: string;
  segundoNombre: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  rut: string;
  fechaNacimiento: string;
  fechatermino?: string;
  idUsuario: string;
  idColegio: string;
  idNivelEducacional: string;
}

export type estudiantePk = "idEstudiante";
export type estudianteId = estudiante[estudiantePk];
export type estudianteOptionalAttributes = "idEstudiante" | "fechatermino";
export type estudianteCreationAttributes = Optional<estudianteAttributes, estudianteOptionalAttributes>;

export class estudiante extends Model<estudianteAttributes, estudianteCreationAttributes> implements estudianteAttributes {
  idEstudiante!: string;
  telefono!: string;
  primerNombre!: string;
  segundoNombre!: string;
  apellidoMaterno!: string;
  apellidoPaterno!: string;
  rut!: string;
  fechaNacimiento!: string;
  fechatermino?: string;
  idUsuario!: string;
  idColegio!: string;
  idNivelEducacional!: string;

  // estudiante belongsTo colegio via idColegio
  idColegio_colegio!: colegio;
  getIdColegio_colegio!: Sequelize.BelongsToGetAssociationMixin<colegio>;
  setIdColegio_colegio!: Sequelize.BelongsToSetAssociationMixin<colegio, colegioId>;
  createIdColegio_colegio!: Sequelize.BelongsToCreateAssociationMixin<colegio>;
  // estudiante hasMany interesInsti via idEstudiante
  interesInstis!: interesInsti[];
  getInteresInstis!: Sequelize.HasManyGetAssociationsMixin<interesInsti>;
  setInteresInstis!: Sequelize.HasManySetAssociationsMixin<interesInsti, interesInstiId>;
  addInteresInsti!: Sequelize.HasManyAddAssociationMixin<interesInsti, interesInstiId>;
  addInteresInstis!: Sequelize.HasManyAddAssociationsMixin<interesInsti, interesInstiId>;
  createInteresInsti!: Sequelize.HasManyCreateAssociationMixin<interesInsti>;
  removeInteresInsti!: Sequelize.HasManyRemoveAssociationMixin<interesInsti, interesInstiId>;
  removeInteresInstis!: Sequelize.HasManyRemoveAssociationsMixin<interesInsti, interesInstiId>;
  hasInteresInsti!: Sequelize.HasManyHasAssociationMixin<interesInsti, interesInstiId>;
  hasInteresInstis!: Sequelize.HasManyHasAssociationsMixin<interesInsti, interesInstiId>;
  countInteresInstis!: Sequelize.HasManyCountAssociationsMixin;
  // estudiante hasMany interesUni via idEstudiante
  interesUnis!: interesUni[];
  getInteresUnis!: Sequelize.HasManyGetAssociationsMixin<interesUni>;
  setInteresUnis!: Sequelize.HasManySetAssociationsMixin<interesUni, interesUniId>;
  addInteresUni!: Sequelize.HasManyAddAssociationMixin<interesUni, interesUniId>;
  addInteresUnis!: Sequelize.HasManyAddAssociationsMixin<interesUni, interesUniId>;
  createInteresUni!: Sequelize.HasManyCreateAssociationMixin<interesUni>;
  removeInteresUni!: Sequelize.HasManyRemoveAssociationMixin<interesUni, interesUniId>;
  removeInteresUnis!: Sequelize.HasManyRemoveAssociationsMixin<interesUni, interesUniId>;
  hasInteresUni!: Sequelize.HasManyHasAssociationMixin<interesUni, interesUniId>;
  hasInteresUnis!: Sequelize.HasManyHasAssociationsMixin<interesUni, interesUniId>;
  countInteresUnis!: Sequelize.HasManyCountAssociationsMixin;
  // estudiante belongsTo nivelEducacional via idNivelEducacional
  idNivelEducacional_nivelEducacional!: nivelEducacional;
  getIdNivelEducacional_nivelEducacional!: Sequelize.BelongsToGetAssociationMixin<nivelEducacional>;
  setIdNivelEducacional_nivelEducacional!: Sequelize.BelongsToSetAssociationMixin<nivelEducacional, nivelEducacionalId>;
  createIdNivelEducacional_nivelEducacional!: Sequelize.BelongsToCreateAssociationMixin<nivelEducacional>;
  // estudiante belongsTo usuario via idUsuario
  idUsuario_usuario!: usuario;
  getIdUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setIdUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createIdUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof estudiante {
    return estudiante.init({
    idEstudiante: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4, // ✅ genera UUID en Node.js,
      primaryKey: true
    },
    telefono: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    primerNombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    segundoNombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellidoMaterno: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellidoPaterno: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    rut: {
      type: DataTypes.STRING(9),
      allowNull: false,
      unique: "UQ__estudian__C2B74E7608A181E5"
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fechatermino: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    idUsuario: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    },
    idColegio: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'colegio',
        key: 'idColegio'
      }
    },
    idNivelEducacional: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'nivelEducacional',
        key: 'idNivel'
      }
    }
  }, {
    sequelize,
    tableName: 'estudiante',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "estudiante_PK",
        unique: true,
        fields: [
          { name: "idEstudiante" },
        ]
      },
      {
        name: "UQ__estudian__C2B74E7608A181E5",
        unique: true,
        fields: [
          { name: "rut" },
        ]
      },
    ]
  });
  }
}
