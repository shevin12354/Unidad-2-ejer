function registrar() {

    let nombre = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;
    let correo = document.getElementById("correo").value;

    if (nombre === "" || edad === "" || correo === "") {
        document.getElementById("mensaje").textContent = "Error: complete todos los campos";
        return;
    }

    document.getElementById("mensaje").textContent =
        "Usuario registrado: " + nombre + " | Edad: " + edad + " | Correo: " + correo;
}