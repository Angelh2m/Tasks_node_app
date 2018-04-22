const argv = require('./config/yargs').argv;
const porHacer = require('./porHacer/por-hacer');
const colors = require('colors');


let comando = argv._[0];

switch (comando) {
    case 'crear':
        // console.log('Crear tarea por hacer');
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);

        break;
    case 'listar':
        // node app listar
        let listado = porHacer.getListado();

        for (const tarea of listado) {
            console.log('=== Por hacer ==='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('=================='.green);
        }

        break;
    case 'actualizar':

        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;

    case 'borrar':
        // node app borrar -d "pasear al perro"

        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);

        break;
    default:
        console.log('Comando no reconocido');

        break;
}