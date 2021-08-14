const sequelize = require('./conexion.js');

const findUsers = async() =>{ 

    let usuarios = [];
    try {
        const data = await sequelize
        .query("SELECT * FROM usuarios"/* "SELECT * FROM `usuarios` INNER JOIN `pais` ON `usuarios`.`pais_id` = `pais`.`id`" */,{type:sequelize.QueryTypes.SELECT});
        usuarios = data;
    } catch (error) {
        console.log('Error: ', error);
    }finally {//siempre va a devolver usuarios
        return usuarios;
    }
};

const crearUsuario = async(nuevoUsuario) => {
    const nuevoUsuarioValues = [];
    nuevoUsuarioValues.push(nuevoUsuario.nombre_usuario);
    nuevoUsuarioValues.push(nuevoUsuario.nombre_completo);
    nuevoUsuarioValues.push(nuevoUsuario.email);
    nuevoUsuarioValues.push(nuevoUsuario.telefono);
    nuevoUsuarioValues.push(nuevoUsuario.direccion);
    nuevoUsuarioValues.push(nuevoUsuario.contrasena);
  
  
    // MODO ASYNC AWAIT
    try {
      const data = await sequelize.query(
        "INSERT INTO usuarios (nombre_usuario, nombre_completo, email, telefono, direccion,contrasena) VALUES (?,?,?,?,?,?)",
        { replacements: nuevoUsuarioValues, type: sequelize.QueryTypes.INSERT }
      );
      const usuarioGuardado = {
        ...nuevoUsuario,
        id: data[0]
      };
  
      return usuarioGuardado;
    } catch (error) {
      console.log('Error: ', error);
    }
};

const updateUsuario = async(user) => {
    console.log(user);
    await sequelize.query(`UPDATE usuarios SET nombre_usuario =? WHERE id =?;`, { replacements: [user.nombre_usuario], type: sequelize.QueryTypes.UPDATE });
  
    const data = await sequelize.query(`
      SELECT id, nombre_usuario
      FROM usuarios
      WHERE id=?
    `, { replacements: [user.id,user.nombre_usuario], type: sequelize.QueryTypes.SELECT });
  
    console.log({data});
  
    const usuario = data[0] ? data[0] : {};
    console.log(usuario);
    return usuario;
  };
module.exports = {
    findUsers,
    crearUsuario,
    updateUsuario
    
};