// TODO
import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
    return document.querySelector(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    // Se usa map().join(", ") para separar las etiquetas con comas.
    const salida = `<div class="gasto">
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${new Date(gasto.fecha).toISOString().slice(0, 10)}</div>
        <div class="gasto-valor">${gasto.valor}</div>
        <div class="gasto-etiquetas">
            ${gasto.etiquetas.map(etiqueta => `<span class="gasto-etiquetas-etiqueta">${etiqueta}</span>`).join(", ")}
        </div> 
    </div>`;
    //insrtAdjacentHTML añade el segundo parametro antes del final (beforeEnd) y lo interpreta como HTML
    document.querySelector(idElemento).insertAdjacentHTML("beforeEnd", salida);
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

function EditarHandle() {

}

function BorrarHandle() {

}

function BorraretiquetasHandle() {

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}