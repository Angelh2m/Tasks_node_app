const fs = require('fs');

let listadoPorHacer = [];

/* *
 *  Guardar en la base de datos
 */
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            console.log('No se pudo grabar');
        }
    })
}

/* *
 *  Cargar la base de datos
 */
const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
    console.log(listadoPorHacer);
}

/* *
 *  Creat una tarea
 */
const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false,
    }
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}


/* *
 *  Obtener listado
 */
const getListado = () => {
    cargarDB();
    return listadoPorHacer
}

/* *
 *  Actualizar
 */
const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true
    }

    return false
}

/* *
 *  Borrar
 */

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length == nuevoListado.length) {
        return false
    }

    listadoPorHacer = nuevoListado;
    guardarDB();
    return true



}



/* *
 *  Exports
 */
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}