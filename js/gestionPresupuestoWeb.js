// TODO
import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
    return document.querySelector(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    // He decidido crear el la estructura mediante una plantilla que
    // se clona e incorpora al DOM una vez se ha terminado de trabajar con ella
    const plantilla = document.createElement("template");
    // Se usa map().join(", ") para separar las etiquetas con comas.
    plantilla.innerHTML = `<div class="gasto">
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${new Date(gasto.fecha).toISOString().slice(0, 10)}</div>
        <div class="gasto-valor">${gasto.valor}</div>
        <div class="gasto-etiquetas">
            ${gasto.etiquetas.map(etiqueta => `<span class="gasto-etiquetas-etiqueta">${etiqueta}</span>`).join(", ")}
        </div>
        <button class="gasto-editar" type="button">Editar</button>
        <button class="gasto-borrar" type="button">Borrar</button>
    </div>`;
    // Antes usaba insertAdjacentHTML para incorporar la plantilla antes del final (beforeEnd) e interpretar el HTML
    //document.querySelector(idElemento).insertAdjacentHTML("beforeEnd", plantilla);
    // Ahora uso un template que clono para poder trabajar con el antes de incorporarlo al DOM

    // Clonar el contenido de la plantilla usando cloneNode lo que crea una interpretación del HTML de la misma
    const plantillaClonada = plantilla.content.cloneNode(true);
    // Ahora puedo realizar operaciones sobre la plantilla sin necesidad de incorporarla al DOM previamente

    // Creo el manejador para editar
    let editarGasto = new EditarHandle(gasto);
    // Agregamos el evento click al boton editar
    plantillaClonada.querySelector("button.gasto-editar").addEventListener("click", editarGasto);

    // Creo el manejador para editar
    let borrarGasto = new BorrarHandle(gasto);
    // Agregamos el evento click al boton editar
    plantillaClonada.querySelector("button.gasto-borrar").addEventListener("click", borrarGasto);

    // Añadir la plantillaClonada al DOM 
    document.querySelector(idElemento).appendChild(plantillaClonada);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    // Se formatea el periodo para su salida en la página: dia pasa a ser día y anyo pasa a ser año
    const periodoFormateado = { dia: "día", anyo: "año" }[periodo] || periodo;

    // Se usa map().join("") para separar las claves sin generar una coma.
    let salida = `
<div class="agrupacion">
    <h1>Gastos agrupados por ${periodoFormateado}</h1 >
        ${Object.keys(agrup).map((clave) =>
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${clave}</span>
            <span class="agrupacion-dato-valor">${agrup[clave]}</span>
        </div>`).join("")}
</div > `;

    document.querySelector(idElemento).insertAdjacentHTML("beforeEnd", salida);
}

function repintar() {
    // Mostrar el presupuesto
    mostrarDatoEnId("div#presupuesto", gestionPresupuesto.mostrarPresupuesto());
    // Mostrar los gastos totales
    mostrarDatoEnId("div#gastos-totales", gestionPresupuesto.calcularTotalGastos());
    // Mostrar el balance total
    mostrarDatoEnId("div#balance-total", gestionPresupuesto.calcularBalance());
    // Borra el contenido del listado de gastos completo...
    document.querySelector("div#listado-gastos-completo").innerHTML = "";
    // Y vuelve a mostrar el listado de gastos completo
    gestionPresupuesto.listarGastos().map(gasto => mostrarGastoWeb("div#listado-gastos-completo", gasto));
    console.log("Repintado finalizado!");
}

// Funcion del boton actualizarpresupuesto
function actualizarPresupuestoWeb() {
    // Guardamos el dato introducido por el usuario
    let presupuestoUsuario = prompt("Introduzca el presupuesto:");
    // Lo pasamos a número, no comprobamos si es positivo distinto de 0 ya que
    // esa comprobación ya la hace la función gestionPresupuesto.actualizarPresupuesto()
    presupuestoUsuario = Number(presupuestoUsuario);
    gestionPresupuesto.actualizarPresupuesto(presupuestoUsuario);
    // Repintamos para que se muestren los cambios
    repintar();
}

// Añadimos el evento clic al boton actualizarpresupuesto con un manejador de eventos
document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);

// Funcion del boton anyadirgasto
function nuevoGastoWeb() {
    // Solicitamos la descripción del gasto
    let descripcion = prompt("Introduce la descripción:");
    // El valor y lo transformamos en número
    let valor = Number(prompt("Introduce el valor:"));
    // La fecha del gasto
    let fecha = prompt("Introduce la fecha en formato yyy-mm-dd:");
    // Y las etiquetas que transofrmamos en un arral con split(",")
    let etiquetas = prompt("Introduce las etiquetas separadas por comas sin espacios:").split(",");
    // Creamos un gasto pasando el array de etiquetas con el comando spread (...)
    let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    // Añadimos el gasto
    gestionPresupuesto.anyadirGasto(gasto);
    // Repintamos para que se muestren los cambios
    repintar();
}

// Añadimos el evento clic al boton anyadirgasto con un manejador de eventos
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);

function EditarHandle(gastoArg) {
    this.gasto = gastoArg;
    this.handleEvent = (evento) => {
        console.log("Inicia handleEvent de EditarHandle");
        // Solicitamos la descripción del gasto
        this.gasto.actualizarDescripcion(prompt("Introduce la descripción:", this.gasto.descripcion));
        // El valor y lo transformamos en número
        this.gasto.actualizarValor(Number(prompt("Introduce el valor:", this.gasto.valor)));
        // La fecha del gasto
        this.gasto.actualizarFecha(prompt('Introduce la fecha en formato "yyyy-mm-dd":', new Date(this.gasto.fecha).toISOString().slice(0, 10)));
        // Y las etiquetas que transofrmamos en un arral con split(",")
        let nuevasEtiquetas = prompt("Introduce las etiquetas separadas por comas sin espacios:", this.gasto.etiquetas.join()).split(",");
        // Borramos las etiquetas existentes pues no tenemos un metodo que sustituya el contenido del array
        // similar a get/set. Para ello pasamos array de etiquetas actual
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        // Añadimos las nuevas etiquetas (que pueden ser las anteriores si no se indicó nada)
        this.gasto.anyadirEtiquetas(...nuevasEtiquetas);
        // Repintamos para que se muestren los cambios
        repintar();
        console.log("Fin handleEvent de EditarHandle");
    }
}

function BorrarHandle(gastoArg) {
    this.gasto = gastoArg;
    this.handleEvent = (evento) => {
        // Borramos el gasto con la función borrarGasto
        gestionPresupuesto.borrarGasto(this.gasto.id);
        // Repintamos para que se muestren los cambios
        repintar();
    }
}

function BorrarEtiquetasHandle(gastoArg, etiquetaArg) {
    this.gasto = gastoArg;
    this.etiqueta = etiquetaArg;
    this.handleEvent = (evento) => {
        // Borramos la etiqueta pasada por parametro
        this.gasto.borrarEtiquetas(this.etiqueta);
        // Repintamos para que se muestren los cambios
        repintar();
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}