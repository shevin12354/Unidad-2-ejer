let docentes = [];

function guardarDocente(){

let tipo = document.getElementById("tipoDocumento").value;
let nombre = document.getElementById("nombre").value;
let apellido = document.getElementById("apellido").value;
let fecha = document.getElementById("fechaNacimiento").value;
let nivel = document.getElementById("nivel").value;
let area = document.getElementById("area").value;
let grado = document.getElementById("grado").value;
let eps = document.getElementById("eps").value;
let salario = document.getElementById("salario").value;

let docente = {
tipo: tipo,
nombre: nombre,
apellido: apellido,
fecha: fecha,
nivel: nivel,
area: area,
grado: grado,
eps: eps,
salario: salario
};

docentes.push(docente);

let tabla = document.getElementById("tablaDocentes");

tabla.innerHTML += `
<tr>
<td>${tipo}</td>
<td>${nombre}</td>
<td>${apellido}</td>
<td>${fecha}</td>
<td>${nivel}</td>
<td>${area}</td>
<td>${grado}</td>
<td>${eps}</td>
<td>${salario}</td>
<td>
<td>
<button onclick="editarDocente(this)">Editar</button>
<button onclick="eliminarDocente(this)">Eliminar</button>
</td></td>
</tr>
`;
document.querySelector("form").reset();

}
function eliminarDocente(boton){

let fila = boton.parentNode.parentNode;
fila.remove();

}
function editarDocente(boton){

let fila = boton.parentNode.parentNode;

let celdas = fila.children;

document.getElementById("tipoDocumento").value = celdas[0].innerText;
document.getElementById("nombre").value = celdas[1].innerText;
document.getElementById("apellido").value = celdas[2].innerText;
document.getElementById("fechaNacimiento").value = celdas[3].innerText;
document.getElementById("nivel").value = celdas[4].innerText;
document.getElementById("area").value = celdas[5].innerText;
document.getElementById("grado").value = celdas[6].innerText;
document.getElementById("eps").value = celdas[7].innerText;
document.getElementById("salario").value = celdas[8].innerText;

fila.remove();

}