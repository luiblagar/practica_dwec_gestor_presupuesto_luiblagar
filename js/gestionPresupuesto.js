// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// Funcion que comprueba que el valor introducido por parametro es un número positivo
function esNumeroPositivo(numero) {
    // Uso de isFinite en vez de isNaN o typeOf por que es más estricto que isNan y typeof ya que
    // solo aceptará números finitos filtrando la posibilidad de NaN, Infinity o -Infinity
    if (isFinite(numero) && numero >= 0) {
        return true;
    } else {
        return false;
    }
}

function actualizarPresupuesto(cantidad) {
    if (!esNumeroPositivo(cantidad)) {
        console.log(`El valor ${cantidad} no es válido. Debe ser un número no negativo`);
        return -1;
    } else {
        presupuesto = cantidad;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // Propiedades
    this.descripcion = descripcion;
    this.valor = esNumeroPositivo(valor) ? valor : 0;
    this.fecha = isNaN(Date.parse(fecha)) ? Date.now() : Date.parse(fecha);
    this.etiquetas = [];
    //this.etiquetas = this.anyadirEtiquetas(...etiquetas);
    // Establecer directamente las etiquetas sin poner una array en vacio no pasa los test

    // Metodos
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.mostrarGastoCompleto = function () {
        let salida = `Gasto correspondiente a ${this.descripcion} con valor ${valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`;
        for (let etiqueta of this.etiquetas) {
            salida += `- ${etiqueta}\n`
        }
        return salida;
    };

    this.actualizarDescripcion = function (nuevaDescripcion) {
        if (nuevaDescripcion != "") {
            this.descripcion = nuevaDescripcion;
        }
    };

    this.actualizarValor = function (nuevoValor) {
        if (esNumeroPositivo(nuevoValor)) {
            this.valor = nuevoValor;
        }
    };

    this.actualizarFecha = function (nuevaFecha) {
        const fechaParseada = Date.parse(nuevaFecha);
        if (!isNaN(fechaParseada)) {
            this.fecha = fechaParseada;
        }
    };

    this.anyadirEtiquetas = function (...valores) {
        for (let valor of valores) {
            if (!this.etiquetas.includes(valor)) {
                this.etiquetas.push(valor);
            }
        }
    };

    this.borrarEtiquetas = function (...valores) {
        for (let valor of valores) {
            const posicion = this.etiquetas.indexOf(valor);
            if (posicion >= 0) {
                this.etiquetas.splice(posicion, 1);
            }
        }

    };

    // Forma principal para obtener el periodo usando switch secuencial
    // Esta forma devolverá undefined si el parametro se omite o es incorrecto
    this.obtenerPeriodoAgrupacion = function (periodo) {
        let salida = "";
        const fecha = new Date(this.fecha);
        // Aprovechando la casuistica de switch sin breakes, voy componiendo la cadena desde el final
        // Dia siempre incluye mes y año
        // Mes siempre incluye año
        // Año tiene su return
        // Cualquier otro caso no hace nada
        switch (periodo) {
            case "dia":
                // Empieza la cadena por la derecha, los dias
                salida = `-${fecha.getDate().toString().padStart(2, "0")}`; //Relleno con ceros por delante para los dias menors a 10
            case "mes":
                // Obtiene el mes y añade al final el contenido anterior, si lo hay
                salida = `-${(fecha.getMonth() + 1).toString().padStart(2, "0")}${salida}`; // Relleno con ceros por delante para los meses menores a 10
            case "anyo":
                // Obtiene el año y añade al final el contenido anterior, si lo hay
                salida = `${fecha.getFullYear()}${salida}`;
                //console.log(`${periodo} -> ${salida}`);
                return salida;
            default:
                // La funcion devolverá undefined ya que no se ha introducido un valor correcto
                break;
        }
    }

    /*
    // Forma alternativa usando toISOString().Slice()
    // Esta forma devolvera un string vacío si el argumento se omite o es incorrecto
    // Se me ocurrió mientras terminaba las siguientes funciones
    this.obtenerPeriodoAgrupacion = function (periodo) {
        // Se usa el formato que proporciona toISOString que empieza por "aaaa-mm-dd" y se recortará su longitud
        // según sea el periodo establecido
        let longitud = 0;
        const fecha = new Date(this.fecha);
        switch (periodo) {
            case "dia":
                longitud = 10; // "aaaa-mm-dd" son 10 carácteres
                break
            case "mes":
                longitud = 7; // "aaaa-mm" son 7 carácteres
                break;
            case "anyo":
                longitud = 4; // "aaaa" son 4 carácteres
                break;
            default:
                // En caso de no introducir un valor correcto la longitud será 0 y se devolvera un string vacío
                break;
        }
        //console.log(`${periodo} -> ${fecha.toISOString().slice(0, longitud)}`);
        return fecha.toISOString().slice(0, longitud); // Recortamos la la fecha según el periodo
    }*/

    // Inicialización
    this.anyadirEtiquetas(...etiquetas);
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    const indice = gastos.findIndex(gasto => gasto.id == id);
    if (indice >= 0) {
        gastos.splice(indice, 1);
    }
}

function calcularTotalGastos() {
    let total = 0;
    for (let gasto of gastos) {
        total += gasto.valor;
    }
    return total;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtro) {
    // Creo un filtro con cada uno de los posibles casos.
    // Comprueba si el filtro pasado por argumento tiene cada una de las propiedades.
    // - Si la propiedad no se ha especificado (devuelve undefined=false->se niega y se vuelve true)
    // entonces no se crea un filtro para esa propiedad (devuelve true al conjunto del filtro).
    // - Si la propiedad si existe (al negarlo devuelve false) se crea el filtro que podrá devolver true si coincide
    // o false si no, descartandolo del filtro.
    // Todo el conjunto debe devolver true para que el elemento pase el filtro.
    let resultado = gastos.filter(gasto => {
        return (
            (!filtro.fechaDesde || new Date(gasto.fecha) >= Date.parse(filtro.fechaDesde)) && // La fecha del gasto es timestamp y la del filtro se parsea
            (!filtro.fechaHasta || new Date(gasto.fecha) <= Date.parse(filtro.fechaHasta)) &&
            (!filtro.valorMinimo || gasto.valor >= filtro.valorMinimo) &&
            (!filtro.valorMaximo || gasto.valor <= filtro.valorMaximo) &&
            (!filtro.descripcionContiene || gasto.descripcion.toLowerCase().includes(filtro.descripcionContiene.toLowerCase())) &&
            // El ultimo filtro busca alguna etiqueta del filtro (some) dentro de alguna etiqueta del gasto (some) y las compara en minusculas
            (!filtro.etiquetasTiene || filtro.etiquetasTiene.some(etiqueta => gasto.etiquetas.some(gastoEtiqueta => gastoEtiqueta.toLowerCase() == etiqueta.toLowerCase())))
        );
    });
    return resultado;
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesdeArg, fechaHastaArg) {
    // Creamos un filtro inicial con los datos pasados por argumentos
    let filtro = {
        etiquetasTiene: etiquetas,
        fechaDesde: fechaDesdeArg,
        // Fecha es por defecto, el formato ISO comienza con "aaaa-mm-dd", me quedo con los 10 primeros caracteres
        fechaHasta: fechaHastaArg || new Date().toISOString().slice(0, 10)
    };
    if (etiquetas == []) delete filtro.etiquetasTiene; // Elimino el argumento del filtro si es una array vacia

    // Obtengo todos los resultados filtrados
    let resultado = filtrarGastos(filtro).reduce((acc, gasto) => {
        // Este metodo de una sola linea funciona pero es ineficiente al llamar a la función 2 veces
        // acc[gasto.obtenerPeriodoAgrupacion(periodo)] = (acc[gasto.obtenerPeriodoAgrupacion(periodo)] || 0) + gasto.valor;

        // Si guardamos en una constante el periodo filtrado la ejecución se evita llamar 2 veces a la funcion obtenerPeriodoAgrupacion
        // reduciendo así el tiempo de ejecución. Recordemos que crea un Date() nuevo y hace operaciones de cadena, ambas acciones son costosas.
        // Además se puede depurar mejor.
        const periodoFiltrado = gasto.obtenerPeriodoAgrupacion(periodo);
        // Si el periodo no existe en acc lo crea con valor 0+gasto.valor. Si no inicializara la variable me daria un error NaN al ser undefined.
        acc[periodoFiltrado] = (acc[periodoFiltrado] || 0) + gasto.valor;
        return acc;
    }, {});


    return resultado;
}

function transformarListadoEtiquetas(texto) {
    const regex = /\w+/g;

    let resultado = texto.match(regex) || [];

    return resultado;
}

function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
  
    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento
        // al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"
          
        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado)
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}
