function sumar() {
   

    let val1 = document.getElementById("numero1").value;
    let val2 = document.getElementById("numero2").value;

    let n1 = parseFloat(val1);
    let n2 = parseFloat(val2);

     if (isNaN(n1) || isNaN(n2)) {
        document.getElementById("resultado").textContent = "Error: ingrese ambos números";
        return;
    }

    let resultado = n1 + n2;

     

    document.getElementById("resultado").textContent = resultado;
}

    function restar() {

    let val1 = document.getElementById("numero1").value;
    let val2 = document.getElementById("numero2").value;

    let n1 = parseFloat(val1);
    let n2 = parseFloat(val2);

    if (isNaN(n1) || isNaN(n2)) {
        document.getElementById("resultado").textContent = "Error: ingrese ambos números";
        return;
    }

    let resultado = n1 - n2;

    document.getElementById("resultado").textContent = resultado;
}




