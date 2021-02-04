function calculadora(operador, operando1, operando2) {
    var resultat = 0;

    switch(operador) {
        case "suma":
            return operando1 + operando2;
            break;
        case "resta":
            return operando1 - operando2;
            break;
        case "multiplicacion":
            return operando1 * operando2;
            break;
        default:
            return "Operador invàlid";
    }
}

var resultat = calculadora("resta", 4000, 350);
console.log("4000 - 350 = " + resultat);