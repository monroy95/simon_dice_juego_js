const niveles = 15
let teclas = generarTeclas(niveles)

//Funcion para generar los niveles
function siguienteNivel(nivelActual) {
    if (nivelActual == niveles) {
        return swal({
            title: 'GANASTE!',
            type: 'success'
        })
    }

    vex.defaultOptions.className = 'vex-theme-flat-attack'

    vex.dialog.alert({
        message: (`NIVEL ${nivelActual + 1}`),
        className: 'vex-theme-flat-attack'
    })

    setTimeout(() => vex.closeAll(), 2000)


    for (let i = 0; i <= nivelActual; i++) { // Va Activando las Teclas
        // Muestraas las teclas de una en una con un intervalo de tiempo
        setTimeout(() => activate(teclas[i]), 1000 * (i + 1) + 1800)
    }

    let i = 0
    let teclaActual = teclas[i]
    window.addEventListener('keydown', onkeydown)

    // Funcion par validar la tecla que se esta presionando
    function onkeydown(ev) {
        if (ev.keyCode == teclaActual) {
            activate(teclaActual, { success: true })
            i++
            if (i > nivelActual) {
                window.removeEventListener('keydown', onkeydown)
                setTimeout(() => siguienteNivel(i), 1000)
            }
            teclaActual = teclas[i]
        } else {
            activate(ev.keyCode, { fail: true })
            window.removeEventListener('keydown', onkeydown)

            swal({
                    type: "warning",
                    title: 'PERDISTE :(',
                    text: '¿Quieres Jugar de Nuevo?',
                    showCancelButton: true,
                    confirmButtonText: 'SI',
                    cancelButtonText: 'No',
                    closeOnConfirm: true
                },
                function(ok) {
                    if (ok) {
                        teclas = generarTeclas(niveles)
                        siguienteNivel(0)
                    }
                })

        }
    }
}

siguienteNivel(0)

function generarTeclas(niveles) {
    // Genera un array de tamaño niveles, llenando el array con codigos de tecla aleatorios
    return new Array(niveles).fill(0).map(generarTeclaAleatoria)
}

//Genera codigos de teclas aleatorios
function generarTeclaAleatoria() {
    const min = 65
    const max = 90

    return Math.round(Math.random() * (max - min) + min)
}

//Funcion para obtener el keycode de cada tecla
function getElementByKeyCode(keyCode) {
    return document.querySelector(`[data-key="${keyCode}"]`)
}

//Funcion para resaltar las teclas con color
function activate(keyCode, opts = {}) {
    const el = getElementByKeyCode(keyCode)
    el.classList.add('active') // Resalta la tecla en color Blanco

    if (opts.success) {
        el.classList.add('success') // Resalta la tecla en color Verde        
    } else if (opts.fail) {
        el.classList.add('fail') // Resalta la tecla en color Rojo        
    }
    setTimeout(() => deactivate(el), 500)

    // Devuelve a la normalidad el color de las teclas
    function deactivate(el) {
        el.className = 'key'
    }
}