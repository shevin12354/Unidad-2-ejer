let docentes = [];
let editId = null;

const API_URL = "/par_2_unidad/Unidad2.ejer/php/docentes.php";

document.addEventListener("DOMContentLoaded", cargarDocentes);

function obtenerDatosFormulario() {
    return {
        id: parseInt(document.getElementById("id").value) || 0,
        tipo_documento: document.getElementById("tipoDocumento").value,
        nombre: document.getElementById("nombre").value.trim(),
        apellido: document.getElementById("apellido").value.trim(),
        fecha_nacimiento: document.getElementById("fechaNacimiento").value,
        nivel: document.getElementById("nivel").value,
        area: document.getElementById("area").value,
        grado: document.getElementById("grado").value,
        eps: document.getElementById("eps").value.trim(),
        salario: document.getElementById("salario").value
    };
}

function esValido(d) {

    if (Object.values(d).some(v => v === "" || v === 0)) {
        alert("Por favor complete todos los campos");
        return false;
    }

    if (isNaN(parseFloat(d.salario)) || parseFloat(d.salario) <= 0) {
        alert("Ingrese un salario válido");
        return false;
    }

    return true;
}

// FIX: Formatea la fecha de "YYYY-MM-DD" o "YYYY-MM-DDTHH:MM:SS" a "DD/MM/YYYY"
function formatearFecha(fechaStr) {
    if (!fechaStr) return "";
    // Tomar solo la parte de fecha (antes de la T si viene con hora)
    const soloFecha = fechaStr.split("T")[0];
    const partes = soloFecha.split("-");
    if (partes.length !== 3) return fechaStr;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

async function guardarDocente() {

    const datos = obtenerDatosFormulario();

    if (!esValido(datos)) return;

    // FIX: Convertir salario y id a números correctamente
    datos.salario = parseFloat(parseFloat(datos.salario).toFixed(2));
    datos.id = parseInt(datos.id);

    try {

        if (editId === null) {

            const res = await fetch(API_URL + "?action=create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });

            const text = await res.text(); // FIX: Leer como texto primero para detectar errores PHP
            let json;
            try {
                json = JSON.parse(text);
            } catch (e) {
                console.error("Respuesta no es JSON:", text);
                alert("Error del servidor. Revisa la consola.");
                return;
            }

            if (!json.success) {
                alert("Error al guardar: " + (json.message || "desconocido"));
                return;
            }

        } else {

            const payload = { ...datos, original_id: editId };

            const res = await fetch(API_URL + "?action=update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const text = await res.text();
            let json;
            try {
                json = JSON.parse(text);
            } catch (e) {
                console.error("Respuesta no es JSON:", text);
                alert("Error del servidor. Revisa la consola.");
                return;
            }

            if (!json.success) {
                alert("Error al actualizar: " + (json.message || "desconocido"));
                return;
            }
        }

        limpiarInterfaz();
        cargarDocentes();

    } catch (err) {
        console.error(err);
        alert("Error de comunicación con el servidor");
    }
}

async function cargarDocentes() {

    try {

        const res = await fetch(API_URL + "?action=list");
        const text = await res.text();
        let json;
        try {
            json = JSON.parse(text);
        } catch (e) {
            console.error("Respuesta no es JSON:", text);
            return;
        }

        if (!json.success) {
            alert("No se pudieron cargar los docentes");
            return;
        }

        docentes = json.data;
        renderTabla();

    } catch (err) {
        console.error(err);
    }
}

function renderTabla() {

    const tabla = document.getElementById("tablaDocentes");
    tabla.innerHTML = "";

    docentes.forEach(d => {

        tabla.innerHTML += `
        <tr>
            <td>${d.id}</td>
            <td>${d.tipo_documento}</td>
            <td>${d.nombre}</td>
            <td>${d.apellido}</td>
            <td>${formatearFecha(d.fecha_nacimiento)}</td>
            <td>${d.nivel}</td>
            <td>${d.area}</td>
            <td>${d.grado}</td>
            <td>${d.eps}</td>
            <td>$${Number(d.salario).toLocaleString("es-CO")}</td>
            <td class="acciones">
                <div class="acciones-container">
                    <button class="btn-edit" onclick="prepararEdicion('${d.id}')">Editar</button>
                    <button class="btn-delete" onclick="eliminarDocente('${d.id}')">Eliminar</button>
                </div>
            </td>
        </tr>
        `;
    });

    document.getElementById("contador").innerText =
        "Total docentes: " + docentes.length;
}

function prepararEdicion(id) {

    const d = docentes.find(x => x.id == id);
    if (!d) return;

    document.getElementById("id").value = d.id;
    document.getElementById("tipoDocumento").value = d.tipo_documento;
    document.getElementById("nombre").value = d.nombre;
    document.getElementById("apellido").value = d.apellido;
    // FIX: La fecha viene como "YYYY-MM-DD" desde MySQL, que es exactamente lo que necesita <input type="date">
    document.getElementById("fechaNacimiento").value = d.fecha_nacimiento.split("T")[0];
    document.getElementById("nivel").value = d.nivel;
    document.getElementById("area").value = d.area;
    document.getElementById("grado").value = d.grado;
    document.getElementById("eps").value = d.eps;
    document.getElementById("salario").value = d.salario;

    editId = d.id;

    document.getElementById("formTitle").innerText = "Editar Docente";
    document.getElementById("btnGuardar").innerText = "Actualizar";
    document.getElementById("formTitle").scrollIntoView({ behavior: "smooth" });
}

async function eliminarDocente(id) {

    if (!confirm("¿Eliminar este docente?")) return;

    try {

        const res = await fetch(API_URL + "?action=delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: parseInt(id) })
        });

        const text = await res.text();
        let json;
        try {
            json = JSON.parse(text);
        } catch (e) {
            console.error("Respuesta no es JSON:", text);
            return;
        }

        if (!json.success) {
            alert("Error al eliminar");
            return;
        }

        cargarDocentes();

    } catch (err) {
        console.error(err);
    }
}

function limpiarInterfaz() {

    document.getElementById("formDocente").reset();
    editId = null;
    document.getElementById("formTitle").innerText = "Registro";
    document.getElementById("btnGuardar").innerText = "Guardar";
}