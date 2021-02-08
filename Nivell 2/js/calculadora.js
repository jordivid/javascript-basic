function calculadora(operador, valor1, valor2) {
    var resultat = 0;

    switch(operador) {
        case "suma":
            return valor1 + valor2;
            break;
        case "resta":
            return valor1 - valor2;
            break;
        case "multiplicacio":
            return valor1 * valor2;
            break;
        case "divisio":
            if (valor2 == 0) {
                return "Divisió per zero";
            }
            return valor1 / valor2;
            break;
        default:
            return "Operador invàlid";
    }
}

var x = 4000, y = 350;
var operacio = "resta";
var resultat = calculadora(operacio, 4000, 350);

// Incluyo esto comentado para probar diferentes casuísticas
// var operacio = "divisio";
// var resultat = calculadora(operacio, 4000, 0);

// var operacio = "operadorRaro";
// var resultat = calculadora(operacio, 4000, 0);

if(typeof(resultat) == "string") {
    console.log(resultat);
} else {
    console.log("El resultat de la operacio " + operacio + " entre " + x + " i " + y + " és " + resultat);
}