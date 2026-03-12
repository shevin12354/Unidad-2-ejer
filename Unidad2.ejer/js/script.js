let docentes = [];
let editIndex = -1;

function obtenerDatosFormulario() {
    return {
    id: document.getElementById("idEstudiante").value.trim(),
    tipo: document.getElementById("tipoDocumento").value,
    nombre: document.getElementById("nombre").value.trim(),
    apellido: document.getElementById("apellido").value.trim(),
    fecha: document.getElementById("fechaNacimiento").value,
    nivel: document.getElementById("nivel").value,
    area: document.getElementById("area").value,
    grado: document.getElementById("grado").value,
    eps: document.getElementById("eps").value.trim(),
    salario: document.getElementById("salario").value
};
}

function esValido(d) {

    if (Object.values(d).some(v => v === "")) {
        alert("Por favor, complete todos los campos.");
        return false;
    }

    if (isNaN(parseFloat(d.salario)) || parseFloat(d.salario) <= 0) {
        alert("Ingrese un salario válido mayor a 0.");
        return false;
    }

    return true;
}

function guardarDocente() {

    const datos = obtenerDatosFormulario();

    if (esValido(datos)) {

        datos.salario = parseFloat(datos.salario);

        if (editIndex === -1) {
            docentes.push(datos);
        } else {
            docentes[editIndex] = datos;
            editIndex = -1;
            document.getElementById("btnGuardar").innerText = "Guardar";
        }

        actualizarPantalla();
        limpiarInterfaz();
    }
}

function actualizarPantalla() {

    const tabla = document.getElementById("tablaDocentes");
    tabla.innerHTML = "";

    docentes.forEach((d, i) => {

        tabla.innerHTML += `
<tr>
<td>${d.id}</td>
<td>${d.tipo}</td>
<td>${d.nombre}</td>
<td>${d.apellido}</td>
<td>${d.nivel}</td>
<td>${d.area}</td>
<td>${d.grado}</td>
<td>${d.eps}</td>
<td>$${d.salario.toLocaleString()}</td>
<td>
<button class="btn-edit" onclick="prepararEdicion(${i})">Editar</button>
<button class="btn-delete" onclick="eliminarDocente(${i})">Eliminar</button>
</td>
</tr>
        `;
    });

    //  ACTUALIZAR CONTADOR
    document.getElementById("contador").innerText = "Total docentes: " + docentes.length;
}

function limpiarInterfaz() {

    document.getElementById("formDocente").reset();
    editIndex = -1;
    document.getElementById("btnGuardar").innerText = "Guardar";
}

function prepararEdicion(index) {

    const d = docentes[index];

    document.getElementById("tipoDocumento").value = d.tipo;
    document.getElementById("nombre").value = d.nombre;
    document.getElementById("apellido").value = d.apellido;
    document.getElementById("fechaNacimiento").value = d.fecha;
    document.getElementById("nivel").value = d.nivel;
    document.getElementById("area").value = d.area;
    document.getElementById("grado").value = d.grado;
    document.getElementById("eps").value = d.eps;
    document.getElementById("salario").value = d.salario;

    editIndex = index;

    document.getElementById("btnGuardar").innerText = "Actualizar";
}

function eliminarDocente(index) {

    if (confirm("¿Eliminar este registro?")) {

        docentes.splice(index, 1);

        actualizarPantalla();
    }
}