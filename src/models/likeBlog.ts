import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js';
import { Blog } from './blog.ts';
import { Usuario } from './usuario.ts';


interface LikeBlogAttributes {
    idLikeBlog: string;
    fechaCreacion: Date;
    idBlog: string;
    idUsuario: string;
}

interface LikeBlogCreationAttributes extends Optional<LikeBlogAttributes, 'idLikeBlog'> { }

export class LikeBlog extends Model<LikeBlogAttributes, LikeBlogCreationAttributes> implements LikeBlogAttributes {
    public idLikeBlog!: string;
    public fechaCreacion!: Date;
    public idBlog!: string;
    public idUsuario!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static asociate() {
        LikeBlog.belongsTo(Blog, {
            foreignKey: 'idBlog',
            as: 'blog',
        });
        LikeBlog.belongsTo(Usuario, {
            foreignKey: 'idUsuario',
            as: 'usuario',
        });
    }
}
LikeBlog.init(
    {
        idLikeBlog: {
            type: DataTypes.STRING(16),
            primaryKey: true,
            allowNull: false,
        },
        fechaCreacion: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        idBlog: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        idUsuario: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'LikeBlog',
        tableName: 'likeBlog',
        timestamps: true,
    }
);
export default LikeBlog;