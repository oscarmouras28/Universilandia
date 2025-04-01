import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js'; // Asegúrate de que este archivo configure correctamente la conexión a la base de datos
import Pais from '../models/Pais.ts' ; // Asegúrate de que este archivo esté correctamente configurado y exportado

interface RegionAttributes {
  idRegion: string;
  nombreRegion: string;
  idPais: string;
}

//No tiene atributos opcionales
interface RegionCreationAttributes extends Optional<RegionAttributes, 'idRegion'> {}

//Clase del modelo Region
export class Region extends Model<RegionAttributes, RegionCreationAttributes> implements RegionAttributes {
  public idRegion!: string;
  public nombreRegion!: string;
  public idPais!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

    // Métodos estáticos para definir asociaciones
    static associate() {
        // Relación con TipoColegio
        Region.belongsTo(Pais, {
          foreignKey: 'idPais',
          as: 'pais', // Alias para la relación
        });
      }
}

//Inicializar el modelo
Region.init(
  {
    idRegion: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true,
    },
    nombreRegion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    idPais: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'region', // Nombre de la tabla en la base de datos
    modelName: 'Region',
    timestamps: true, // Evitar que se creen los columnas createdAt y updatedAt
  }
);

//Exportar el modelo para ser utilizado en otros archivos.
export default Region;




