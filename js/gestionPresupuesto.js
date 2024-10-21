// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// Variable global
let presupuesto = 0;
let Gasto = {
    descripcion: "",
    valor: 0,
    mostrarGasto: function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    },
    actualizarDescripcion: function (nuevaDescripcion){
        if(nuevaDescripcion!="")
        {
            this.descripcion=nuevaDescripcion;
        }
    },
    actualizarValor: function(nuevoValor){
        if (isNaN(nuevoValor)==false && nuevoValor <= 0) {
            this.valor=nuevoValor;
        }
    }
};


function actualizarPresupuesto(cantidad) {
    if (isNaN(cantidad) || cantidad < 0) {
        console.log("El valor no es un número no negativo");
        return -1;
    } else {
        presupuesto = cantidad;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, cantidad) {
    if (isNaN(cantidad) || cantidad < 0) {
        cantidad=0;
    }
    let gasto = new Gasto();
    gasto.actualizarDescripcion(descripcion);
    gasto.actualizarValor(cantidad);
    return gasto;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
