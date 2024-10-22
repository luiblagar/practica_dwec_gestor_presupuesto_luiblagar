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
    this.descripcion = descripcion;
    this.valor = esNumeroPositivo(valor) ? valor : 0;
    this.fecha = isNaN(Date.parse(fecha)) ? Date.now() : Date.parse(fecha);
    this.etiquetas = [];
    //this.etiquetas = this.anyadirEtiquetas(...etiquetas);
    // Establecer directamente las etiquetas sin poner una array en vacio no pasa los test

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

    this.anyadirEtiquetas(...etiquetas);
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id=idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto() {

}

function calcularTotalGastos() {

}

function calcularBalance() {

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
    calcularBalance
}
