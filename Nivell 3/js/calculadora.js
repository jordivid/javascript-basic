/*
    Variables globals:

    total --------------> El resultat de les operacions
    operacioAnt --------> El codi d'operació a emprar en el càlcul
    primer_digit -------> Booleà que indica si el digit introduit és el primer després
                          de introduir un símbol d'operació.
    max_display_length -> El màxim de digits que caben al display
 */
var total = 0;
var operacioAnt = "";
var primer_digit = true;
var max_display_length = 15;

/* Mapa de tecles */
var teclas = new Map();
teclas.set("Digit1", "1");
teclas.set("Digit2", "2");
teclas.set("Digit3", "3");
teclas.set("Digit4", "4");
teclas.set("Digit5", "5");
teclas.set("Digit6", "6");
teclas.set("Digit7", "7");
teclas.set("Digit8", "8");
teclas.set("Digit9", "9");
teclas.set("Digit0", "0");
teclas.set("Numpad1", "1");
teclas.set("Numpad2", "2");
teclas.set("Numpad3", "3");
teclas.set("Numpad4", "4");
teclas.set("Numpad5", "5");
teclas.set("Numpad6", "6");
teclas.set("Numpad7", "7");
teclas.set("Numpad8", "8");
teclas.set("Numpad9", "9");
teclas.set("Numpad0", "0");
teclas.set("KeyC", "C");
teclas.set("Backspace", "<<");
teclas.set("Enter", "=");
teclas.set("NumpadEnter", "=");
teclas.set("Period", ".");
teclas.set("NumpadDecimal", ".");
teclas.set("NumpadDivide", "/");
teclas.set("NumpadMultiply", "*");
teclas.set("NumpadSubtract", "-");
teclas.set("NumpadAdd", "+");

/* Listeners per a tecles i mouse click */
$(document).ready(function(){
    total = 0;
    operacioAnt = "";
    primer_digit = true;
    
    $("body").keydown(function(e){
        if(teclas.has(e.originalEvent.code)) {
            processKey(teclas.get(e.originalEvent.code));
        }
    });

    $("input[type=button]").each(function() {
        $(this).click(function(e) {
            processKey($(e.target).val());
        });
    });

});

/* Es filtra la tecla premuda o clicada */
function processKey(tecla) {
    let display = $("#display").text();
    let operacio = $("#operacio").text();

    if (tecla >= "0" && tecla <= "9") {
        processDigit(tecla, display, operacio);
    } else if(tecla == ".") {
        processDot(display);
    } else if(tecla == "/" || tecla == "*" || tecla == "-" || tecla == "+"){
        processOperation(tecla, display, operacio);
    } else if(tecla == "=") {
        processEqual(display);
    } else if(tecla == "<<") {
        processDelete(display);
    } else if(tecla == "C") {
        processInit();
    }
}

/* Es processen els dígits */
function processDigit(tecla, display, operacio) {
    if(display == "E") {
        return;
    }

    if(primer_digit == false) {
        if(display.length < max_display_length) {
            if(display != "0") {
                $("#display").text(display + tecla);
            } else {
                $("#display").text(tecla);
            }
        }
    } else {
        $("#display").text(tecla);
    }

    primer_digit = false;
}

/* Punt decimal - S'afegeig si no hi és encara */
function processDot(display) {
    if(display == "E") {
        return;
    }

    if(display.length < (max_display_length - 1) && display.indexOf(".") == -1) {
        if(primer_digit == false) {
            $("#display").text(display + ".");
        } else {
            $("#display").text("0.");
            primer_digit = false;
        }
    }
}

/* Es canvia el símbol de la operació */
function processOperation(tecla, display, operacio) {
    if(display == "E") {
        return;
    }
    
    if(primer_digit == false) {
        if(operacioAnt != "") {
            let resultat = calculadora(total, operacioAnt, Number(display));
            if(!isNaN(resultat)) {
                total = resultat;
            } else {
                $("#display").text("E");
                return;
            }
            $("#display").text(total);
        } else {
            total = Number(display);
        }
        operacioAnt = tecla;
        display = "0";
    }

    primer_digit = true;
    $("#operacio").text(tecla);
}

function processEqual(display) {
    if(display == "E") {
        return;
    }
    
    if(primer_digit == false) {
        if(operacioAnt != "") {
            let resultat = calculadora(total, operacioAnt, Number(display));
            if(!isNaN(resultat)) {
                total = resultat;
            } else {
                $("#display").text("E");
                return;
            }
            $("#display").text(total);
        } else {
            total = Number(display);
        }
        display = "0";
    }

    primer_digit = true;
    operacioAnt = ""; // OJO
    $("#operacio").text("");
}

/* Tecla Backspace - S'esborra l'últim caràcter del display */
function processDelete(display) {
    if(display == "E") {
        return;
    }

    if(primer_digit == false) {
        if(display.length > 1) {
            $("#display").text(display.substr(0, display.length - 1));
        } else {
            $("#display").text("0");
        }
    }
}

/* Tecla C - Inicialització de la calculadora */
function processInit() {
    total = 0;
    operacioAnt = "";
    primer_digit = true;
    $("#operacio").text("");
    $("#display").text("0");
}

/* Funció de càlcul */
function calculadora(operand1, operation, operand2 ) {
    let resultat;
    let numero;

    switch (operation) {
        case "/":
            if (operand2 == 0) {
                return NaN;
            }
            resultat = operand1 / operand2;
            break;
        case "*":
            resultat = operand1 * operand2;
            break;
        case "+":
            resultat = operand1 + operand2;
            break;
        case "-":
            resultat = operand1 - operand2;
            break;
        default:
            return NaN;
    }

    numero = resultat.toString();
    partes = numero.split(".");

    if(partes[0].length > max_display_length) {
        return NaN;
    }

    if(partes.length == 2) {
        if(numero.length > max_display_length) {
            numero = numero.substr(0, 15);
            resultat = Number(numero);
        }
    }

    return resultat;
}