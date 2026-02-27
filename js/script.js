function sumar() {

    let numeros = obtenerNumeros();
    if (numeros === null) return;

    let resultado = numeros.n1 + numeros.n2;

    mensajeSalida(resultado);
}

    function restar() {

    let numeros = obtenerNumeros();
    if (numeros === null) return;

    let resultado = numeros.n1 - numeros.n2;

    mensajeSalida(resultado);
}

function multiplicar() {

    let numeros = obtenerNumeros();
    if (numeros === null) return;

    let resultado = numeros.n1 * numeros.n2;

    mensajeSalida(resultado);
}
function dividir() {

    let numeros = obtenerNumeros();
    if (numeros === null) return;

    if (!validarDivision(numeros.n2)) return;

    let resultado = numeros.n1 / numeros.n2;
    mensajeSalida(resultado);
}
function porcentaje() {

    let numeros = obtenerNumeros();
    if (numeros === null) return;
    if (!validarDivision(numeros.n2)) return;

    let resultado = (numeros.n1 / numeros.n2) * 100;

   mensajeSalida(resultado + "%");
}
function obtenerNumeros() {

    let val1 = document.getElementById("numero1").value;
    let val2 = document.getElementById("numero2").value;

    let n1 = parseFloat(val1);
    let n2 = parseFloat(val2);

    if (isNaN(n1) || isNaN(n2)) {
        document.getElementById("resultado").textContent = "Error: ingrese ambos números";
        return null;
    }

    return { n1, n2 };
}

function validarDivision(n2) {
    if (n2 === 0) {
        document.getElementById("resultado").textContent = "Error: divisor no puede ser 0";
        return false;
    }
    return true;
}


function mensajeSalida(valor) {
    document.getElementById("resultado").textContent = valor;
}
