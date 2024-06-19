import { getData, getDocumento, remove, save, update } from './firestore.js';
let id = 0;

document.getElementById('btnSave').addEventListener('click', async (event) => {
    event.preventDefault();
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id);
    });

    if (document.querySelectorAll('.is-invalid').length == 0) {
        const run = document.getElementById('run').value;
        if (await verificarRunUnico(run, id)) {
            const ganador = {
                run: run,
                email: document.getElementById('email').value,
                fono: document.getElementById('fono').value,
                equipo: document.getElementById('equipo').value,
                fecha: document.getElementById('fecha').value,
                torneo: document.getElementById('torneo').value,
                premio: document.getElementById('premio').value,
                division: document.getElementById('division').value
            };

            if (id == 0) {
                save(ganador);
                Swal.fire('Guardado', '', 'success');
            } else {
                update(id, ganador);
            }
            id = 0;
            limpiar();
        } else {
            document.getElementById('run').classList.add('is-invalid');
            document.getElementById('e-run').innerHTML = '<span class="badge bg-danger">No se puede repetir el run</span>';
        }
    }
});

const verificarRunUnico = async (run, currentId) => {
    const datos = await getData();
    for (const ganador of datos) {
        if (ganador.data.run === run && ganador.id !== currentId) {
            return false;
        }
    }
    return true;
};

window.addEventListener('DOMContentLoaded', () => {
    getData().then(datos => {
        let tabla = '';
        datos.forEach((ganador) => {
            const item = ganador.data;
            tabla += `<tr>
                <td>${item.run}</td>
                <td>${item.email}</td>
                <td>${item.fono}</td>
                <td>${item.equipo}</td>
                <td>${item.fecha}</td>
                <td>${item.torneo}</td>
                <td>${item.premio}</td>
                <td>${item.division}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="${ganador.id}">Editar</button>
                    <button class="btn btn-danger" id="${ganador.id}">Eliminar</button>
                </td>
            </tr>`;
        });
        document.getElementById('contenido').innerHTML = tabla;
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id);
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        });
                    }
                });
            });
        });
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const doc = await getDocumento(btn.id);
                const ganador = doc.data();

                document.getElementById('run').value = ganador.run;
                document.getElementById('email').value = ganador.email;
                document.getElementById('fono').value = ganador.fono;
                document.getElementById('equipo').value = ganador.equipo;
                document.getElementById('fecha').value = ganador.fecha;
                document.getElementById('torneo').value = ganador.torneo;
                document.getElementById('premio').value = ganador.premio;
                document.getElementById('division').value = ganador.division;

                id = doc.id;

                document.getElementById('run').readOnly = true;
                document.getElementById('btnSave').value = 'Editar';
            });
        });
    });
});
