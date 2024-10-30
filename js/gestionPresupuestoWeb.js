// TODO

function mostrarDatoEnId(idElemento, valor) {
    return document.querySelector(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    console.log(`mostrarGastoWeb -> Elemento: ${idElemento}\nGasto: ${gasto.descripcion}`);
    let salida = `<div class="gasto">
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${new Date(gasto.fecha).toISOString().slice(0, 10)}</div>
        <div class="gasto-valor">${gasto.valor}</div>
        <div class="gasto-etiquetas">
            ${gasto.etiquetas.map(etiqueta => `<span class="gasto-etiquetas-etiqueta">${etiqueta}</span>`)}
        </div> 
    </div>`
    document.querySelector(idElemento).insertAdjacentHTML("beforeEnd", salida);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}