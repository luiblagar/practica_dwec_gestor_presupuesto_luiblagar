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

function repintar(){

}

// Funcion del boton actualizarpresupuesto
function actualizarPresupuestoWeb(){

} 

// Funcion del boton anyadirgasto
function nuevoGastoWeb(){

}

function EditarHandle(){

}

function BorrarHandle(){

}

function BorraretiquetasHandle(){

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}