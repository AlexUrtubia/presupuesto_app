import { DetalleGastos } from "./detalleGastos.js";

let botonPresupuesto = document.getElementById("enviarPresupuesto");
let botonGasto = document.getElementById("enviarGasto");
let cantidadPresupuesto = document.getElementById("cantidadPresupuesto");
let presupuesto = document.getElementById("presupuestoInput");
let gasto = document.getElementById("gastoInput");
let cantidad = document.getElementById("cantidadInput");

let arrayGastos = [];
let presupuestoTotal = [];

function agregarPresupuesto() {
  let presupuestoValue = presupuesto.value;
  let total = 0;
  if (presupuestoValue != "" && !isNaN(presupuestoValue)) {
    presupuestoTotal.push(presupuestoValue);
    for (let i = 0; i < presupuestoTotal.length; i++) {
      let suma = Number(presupuestoTotal[i]);
      total += suma;
      console.log("total", total);
    }
    cantidadPresupuesto.innerText = total.toLocaleString()
    presupuesto.value = "";
    saldo();
  }
}

botonPresupuesto.addEventListener("click", agregarPresupuesto);

function agregarGastos() {
  let gastoValue = gasto.value;
  let cantidadValue = cantidad.value;

  if (
    gastoValue != "" &&
    cantidadValue != "" &&
    !isNaN(cantidadValue) &&
    cantidadValue > 0
  ) {
    let objetoGasto = new DetalleGastos(gastoValue, cantidadValue);
    arrayGastos.push(objetoGasto);
    cantidad.value = "";
    gasto.value = "";
  }
  tablaGastos();
}

function eliminar(indice) {
  arrayGastos.splice(indice, 1);
  tablaGastos();
  saldo();
}

botonGasto.addEventListener("click", agregarGastos);

function tablaGastos() {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  for (let i = 0; i < arrayGastos.length; i++) {
    let precio = parseFloat(arrayGastos[i].precio);
    let nombre = arrayGastos[i].nombre;

    let row = document.createElement("tr");
    let nombreCell = document.createElement("td");

    nombreCell.textContent = nombre;
    nombreCell.classList.add("text-center");
    row.appendChild(nombreCell);

    let precioCell = document.createElement("td");
    precioCell.textContent = `$ ${precio.toLocaleString()}`;
    precioCell.classList.add("text-center");
    row.appendChild(precioCell);

    let eliminarCell = document.createElement("td");
    let eliminarLink = document.createElement("a");
    eliminarLink.href = "#";
    eliminarLink.className = "btn btn-danger btn-sm btn-eliminar";
    eliminarLink.innerHTML = '<i class="bi bi-trash"></i>';
    eliminarLink.addEventListener("click", () => {
      eliminar(i);
    });
    eliminarCell.appendChild(eliminarLink);
    eliminarCell.classList.add("text-center");
    row.appendChild(eliminarCell);
    tbody.appendChild(row);
  }
  saldo();
}


function saldo() {
  let totalGastos = 0;
  let totalPresupuesto = 0;
  for (let i = 0; i < presupuestoTotal.length; i++) {
    let suma = Number(presupuestoTotal[i]);
    totalPresupuesto += suma;
  }
  for (let i = 0; i < arrayGastos.length; i++) {
    let sumaGasto = Number(arrayGastos[i].precio);
    totalGastos += sumaGasto;
  }
  let saldo = totalPresupuesto - totalGastos;
  document.getElementById("cantidadGasto").innerHTML = totalGastos.toLocaleString();
  document.getElementById("cantidadBalance").innerHTML = saldo.toLocaleString();
}
