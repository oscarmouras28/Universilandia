import type { Sequelize } from "sequelize";
import { blog as _blog } from "./blog";
import type { blogAttributes, blogCreationAttributes } from "./blog";
import { carreraInstituto as _carreraInstituto } from "./carreraInstituto";
import type { carreraInstitutoAttributes, carreraInstitutoCreationAttributes } from "./carreraInstituto";
import { carreraUni as _carreraUni } from "./carreraUni";
import type { carreraUniAttributes, carreraUniCreationAttributes } from "./carreraUni";
import { colegio as _colegio } from "./colegio";
import type { colegioAttributes, colegioCreationAttributes } from "./colegio";
import { comentario as _comentario } from "./comentario";
import type { comentarioAttributes, comentarioCreationAttributes } from "./comentario";
import { comuna as _comuna } from "./comuna";
import type { comunaAttributes, comunaCreationAttributes } from "./comuna";
import { escuelaInstituto as _escuelaInstituto } from "./escuelaInstituto";
import type { escuelaInstitutoAttributes, escuelaInstitutoCreationAttributes } from "./escuelaInstituto";
import { escuelaUniversidad as _escuelaUniversidad } from "./escuelaUniversidad";
import type { escuelaUniversidadAttributes, escuelaUniversidadCreationAttributes } from "./escuelaUniversidad";
import { estudiante as _estudiante } from "./estudiante";
import type { estudianteAttributes, estudianteCreationAttributes } from "./estudiante";
import { instituto as _instituto } from "./instituto";
import type { institutoAttributes, institutoCreationAttributes } from "./instituto";
import { interesInsti as _interesInsti } from "./interesInsti";
import type { interesInstiAttributes, interesInstiCreationAttributes } from "./interesInsti";
import { interesUni as _interesUni } from "./interesUni";
import type { interesUniAttributes, interesUniCreationAttributes } from "./interesUni";
import { likeBlog as _likeBlog } from "./likeBlog";
import type { likeBlogAttributes, likeBlogCreationAttributes } from "./likeBlog";
import { multimedia as _multimedia } from "./multimedia";
import type { multimediaAttributes, multimediaCreationAttributes } from "./multimedia";
import { nivelEducacional as _nivelEducacional } from "./nivelEducacional";
import type { nivelEducacionalAttributes, nivelEducacionalCreationAttributes } from "./nivelEducacional";
import { pais as _pais } from "./pais";
import type { paisAttributes, paisCreationAttributes } from "./pais";
import { region as _region } from "./region";
import type { regionAttributes, regionCreationAttributes } from "./region";
import { suscripcion as _suscripcion } from "./suscripcion";
import type { suscripcionAttributes, suscripcionCreationAttributes } from "./suscripcion";
import { tipoColegio as _tipoColegio } from "./tipoColegio";
import type { tipoColegioAttributes, tipoColegioCreationAttributes } from "./tipoColegio";
import { universidad as _universidad } from "./universidad";
import type { universidadAttributes, universidadCreationAttributes } from "./universidad";
import { usuario as _usuario } from "./usuario";
import type { usuarioAttributes, usuarioCreationAttributes } from "./usuario";

export {
  _blog as blog,
  _carreraInstituto as carreraInstituto,
  _carreraUni as carreraUni,
  _colegio as colegio,
  _comentario as comentario,
  _comuna as comuna,
  _escuelaInstituto as escuelaInstituto,
  _escuelaUniversidad as escuelaUniversidad,
  _estudiante as estudiante,
  _instituto as instituto,
  _interesInsti as interesInsti,
  _interesUni as interesUni,
  _likeBlog as likeBlog,
  _multimedia as multimedia,
  _nivelEducacional as nivelEducacional,
  _pais as pais,
  _region as region,
  _suscripcion as suscripcion,
  _tipoColegio as tipoColegio,
  _universidad as universidad,
  _usuario as usuario,
};

export type {
  blogAttributes,
  blogCreationAttributes,
  carreraInstitutoAttributes,
  carreraInstitutoCreationAttributes,
  carreraUniAttributes,
  carreraUniCreationAttributes,
  colegioAttributes,
  colegioCreationAttributes,
  comentarioAttributes,
  comentarioCreationAttributes,
  comunaAttributes,
  comunaCreationAttributes,
  escuelaInstitutoAttributes,
  escuelaInstitutoCreationAttributes,
  escuelaUniversidadAttributes,
  escuelaUniversidadCreationAttributes,
  estudianteAttributes,
  estudianteCreationAttributes,
  institutoAttributes,
  institutoCreationAttributes,
  interesInstiAttributes,
  interesInstiCreationAttributes,
  interesUniAttributes,
  interesUniCreationAttributes,
  likeBlogAttributes,
  likeBlogCreationAttributes,
  multimediaAttributes,
  multimediaCreationAttributes,
  nivelEducacionalAttributes,
  nivelEducacionalCreationAttributes,
  paisAttributes,
  paisCreationAttributes,
  regionAttributes,
  regionCreationAttributes,
  suscripcionAttributes,
  suscripcionCreationAttributes,
  tipoColegioAttributes,
  tipoColegioCreationAttributes,
  universidadAttributes,
  universidadCreationAttributes,
  usuarioAttributes,
  usuarioCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const blog = _blog.initModel(sequelize);
  const carreraInstituto = _carreraInstituto.initModel(sequelize);
  const carreraUni = _carreraUni.initModel(sequelize);
  const colegio = _colegio.initModel(sequelize);
  const comentario = _comentario.initModel(sequelize);
  const comuna = _comuna.initModel(sequelize);
  const escuelaInstituto = _escuelaInstituto.initModel(sequelize);
  const escuelaUniversidad = _escuelaUniversidad.initModel(sequelize);
  const estudiante = _estudiante.initModel(sequelize);
  const instituto = _instituto.initModel(sequelize);
  const interesInsti = _interesInsti.initModel(sequelize);
  const interesUni = _interesUni.initModel(sequelize);
  const likeBlog = _likeBlog.initModel(sequelize);
  const multimedia = _multimedia.initModel(sequelize);
  const nivelEducacional = _nivelEducacional.initModel(sequelize);
  const pais = _pais.initModel(sequelize);
  const region = _region.initModel(sequelize);
  const suscripcion = _suscripcion.initModel(sequelize);
  const tipoColegio = _tipoColegio.initModel(sequelize);
  const universidad = _universidad.initModel(sequelize);
  const usuario = _usuario.initModel(sequelize);

  comentario.belongsTo(blog, { as: "idBlog_blog", foreignKey: "idBlog"});
  blog.hasMany(comentario, { as: "comentarios", foreignKey: "idBlog"});
  likeBlog.belongsTo(blog, { as: "idBlog_blog", foreignKey: "idBlog"});
  blog.hasMany(likeBlog, { as: "likeBlogs", foreignKey: "idBlog"});
  estudiante.belongsTo(colegio, { as: "idColegio_colegio", foreignKey: "idColegio"});
  colegio.hasMany(estudiante, { as: "estudiantes", foreignKey: "idColegio"});
  colegio.belongsTo(comuna, { as: "idComuna_comuna", foreignKey: "idComuna"});
  comuna.hasMany(colegio, { as: "colegios", foreignKey: "idComuna"});
  instituto.belongsTo(comuna, { as: "idComuna_comuna", foreignKey: "idComuna"});
  comuna.hasMany(instituto, { as: "institutos", foreignKey: "idComuna"});
  universidad.belongsTo(comuna, { as: "idComuna_comuna", foreignKey: "idComuna"});
  comuna.hasMany(universidad, { as: "universidads", foreignKey: "idComuna"});
  interesInsti.belongsTo(estudiante, { as: "idEstudiante_estudiante", foreignKey: "idEstudiante"});
  estudiante.hasMany(interesInsti, { as: "interesInstis", foreignKey: "idEstudiante"});
  interesUni.belongsTo(estudiante, { as: "idEstudiante_estudiante", foreignKey: "idEstudiante"});
  estudiante.hasMany(interesUni, { as: "interesUnis", foreignKey: "idEstudiante"});
  carreraInstituto.belongsTo(instituto, { as: "idInstituto_instituto", foreignKey: "idInstituto"});
  instituto.hasMany(carreraInstituto, { as: "carreraInstitutos", foreignKey: "idInstituto"});
  escuelaInstituto.belongsTo(instituto, { as: "idInstituto_instituto", foreignKey: "idInstituto"});
  instituto.hasMany(escuelaInstituto, { as: "escuelaInstitutos", foreignKey: "idInstituto"});
  interesInsti.belongsTo(instituto, { as: "idInstituto_instituto", foreignKey: "idInstituto"});
  instituto.hasMany(interesInsti, { as: "interesInstis", foreignKey: "idInstituto"});
  estudiante.belongsTo(nivelEducacional, { as: "idNivelEducacional_nivelEducacional", foreignKey: "idNivelEducacional"});
  nivelEducacional.hasMany(estudiante, { as: "estudiantes", foreignKey: "idNivelEducacional"});
  region.belongsTo(pais, { as: "idPais_pai", foreignKey: "idPais"});
  pais.hasMany(region, { as: "regions", foreignKey: "idPais"});
  comuna.belongsTo(region, { as: "idRegion_region", foreignKey: "idRegion"});
  region.hasMany(comuna, { as: "comunas", foreignKey: "idRegion"});
  colegio.belongsTo(tipoColegio, { as: "idTipoColegio_tipoColegio", foreignKey: "idTipoColegio"});
  tipoColegio.hasMany(colegio, { as: "colegios", foreignKey: "idTipoColegio"});
  carreraUni.belongsTo(universidad, { as: "idUniversidad_universidad", foreignKey: "idUniversidad"});
  universidad.hasMany(carreraUni, { as: "carreraUnis", foreignKey: "idUniversidad"});
  escuelaUniversidad.belongsTo(universidad, { as: "idUniversidad_universidad", foreignKey: "idUniversidad"});
  universidad.hasMany(escuelaUniversidad, { as: "escuelaUniversidads", foreignKey: "idUniversidad"});
  interesUni.belongsTo(universidad, { as: "idUniversidad_universidad", foreignKey: "idUniversidad"});
  universidad.hasMany(interesUni, { as: "interesUnis", foreignKey: "idUniversidad"});
  comentario.belongsTo(usuario, { as: "idUsuario_usuario", foreignKey: "idUsuario"});
  usuario.hasMany(comentario, { as: "comentarios", foreignKey: "idUsuario"});
  estudiante.belongsTo(usuario, { as: "idUsuario_usuario", foreignKey: "idUsuario"});
  usuario.hasMany(estudiante, { as: "estudiantes", foreignKey: "idUsuario"});
  likeBlog.belongsTo(usuario, { as: "idUsuario_usuario", foreignKey: "idUsuario"});
  usuario.hasMany(likeBlog, { as: "likeBlogs", foreignKey: "idUsuario"});
  suscripcion.belongsTo(usuario, { as: "idUsuario_usuario", foreignKey: "idUsuario"});
  usuario.hasMany(suscripcion, { as: "suscripcions", foreignKey: "idUsuario"});

  return {
    blog: blog,
    carreraInstituto: carreraInstituto,
    carreraUni: carreraUni,
    colegio: colegio,
    comentario: comentario,
    comuna: comuna,
    escuelaInstituto: escuelaInstituto,
    escuelaUniversidad: escuelaUniversidad,
    estudiante: estudiante,
    instituto: instituto,
    interesInsti: interesInsti,
    interesUni: interesUni,
    likeBlog: likeBlog,
    multimedia: multimedia,
    nivelEducacional: nivelEducacional,
    pais: pais,
    region: region,
    suscripcion: suscripcion,
    tipoColegio: tipoColegio,
    universidad: universidad,
    usuario: usuario,
  };
}
