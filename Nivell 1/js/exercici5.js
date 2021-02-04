var nota_examen = 4.5;
var mensaje;

if (nota_examen < 5) {
    mensaje = "Ohh has suspendido el examen con un " + nota_examen;
} else {
    mensaje = "Has aprobado el examen con un " + nota_examen;
}

alert(mensaje);