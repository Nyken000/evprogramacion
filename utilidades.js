
const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    document.getElementById('run').readOnly = false
    document.getElementById('btnSave').value = 'Guardar'
}

const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    } else {
        input.classList.add('is-valid') 
        div.innerHTML = ''
        if (id == 'run') {
            if (!validaRun(input.value.trim())) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run no es válido</span>'
            }
        }
        if (id == 'email') {
            if (!validarEmail(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto</span>'
            }
        }
        if (id == 'fecha') {
            const dia = calcularFecha(input.value)
            if (dia < 1) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">No se puede asignar una fecha futura</span>'
            }
        }
        if (id == 'premio') {
            if (input.value < 5000) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">no se puede asignar un valor menor a 5000 </span>'
            }
        }
        if (id == 'fono') {
            if (input.value.length != 9) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">Debe tener 9 dígitos </span>'
            }
        }
    }
}

const soloNumeros = (e) => {
    if (e.keyCode >= 48 && e.keyCode <= 57)
        return true
    return false 
}

const validarEmail = (email) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
    if (!formato.test(email))
        return false 
    return true
}

const calcularFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    const dia = resta / (1000 * 60 * 60 * 24)
    return dia.toFixed(0)
}