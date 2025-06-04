import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';

export interface multimediaAttributes {
  idMultimedia: string;
  url: string;
  descripcion?: string;
}

export type multimediaPk = "idMultimedia";
export type multimediaId = multimedia[multimediaPk];
export type multimediaOptionalAttributes = "idMultimedia";
export type multimediaCreationAttributes = Optional<multimediaAttributes, multimediaOptionalAttributes>;

export class multimedia extends Model<multimediaAttributes, multimediaCreationAttributes> implements multimediaAttributes {
  idMultimedia!: string;
  url!: string;
  descripcion!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof multimedia {
    return multimedia.init({
    idMultimedia: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'multimedia',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "multimedia_PK",
        unique: true,
        fields: [
          { name: "idMultimedia" },
        ]
      },
    ]
  });
  }
}
