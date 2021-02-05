function calculadora(operador, valor1, valor2) {
    var resultat = 0;

    switch(operador) {
        case "suma":
            return valor1 + valor2;
            break;
        case "resta":
            return valor1 - valor2;
            break;
        case "multiplicacion":
            return valor1 * valor2;
            break;
        case "division":
            if (valor2 == 0) {
                return "No es pot dividir per 0";
            }
            return valor1 / valor2;
            break;
        default:
            return "Operador invàlid";
    }
}

var resultat = calculadora("resta", 4000, 350);
console.log("4000 / 350 = " + resultat);