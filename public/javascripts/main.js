tareas();

console.log(document.forms.formRegistrar.user.value);
//formulario para registrar
document.querySelector("#formRegistrar").addEventListener('submit', function (e) {
    e.preventDefault();
    let data = {
        user: document.forms.formRegistrar.user.value,
        password: document.forms.formRegistrar.password.value,
        rol: document.forms.formRegistrar.rol.value
    }
    console.log(data);
    fetch('/users', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Tarea insertada con exito");
            tareas();
        })
        .catch(err => {
            alert("Por favor revise los datos ingresados");
            console.log(err);
        });
});
//formulario para actualizar
document.forms.formUpdate.addEventListener("submit", function (e) {
    e.preventDefault();
    let data = {
        user: document.forms.formUpdate.userU.value,
        rol: document.forms.formUpdate.rolU.value
    }
    //peticion
    fetch('/users/' + document.forms.formUpdate._id.value, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Tarea Actualizada con exito");
            tareas();
        })
        .catch(err => {
            alert("Por favor revise los datos ingresados");
            console.log(err);
        });
});
//crear tareas
function tareas() {
    fetch('/users',
        {
            method: 'GET'
        }).then(res => res.json())
        .then(data => {
            let filas = "";
            data.forEach(element => {
                //console.log(element);
                filas = filas + `<tr>
           <td>${element.userName}</td>
           <td>${element.rol}</td>
           <td>
            <a href="/users/${element._id}" class="update btn btn-warning" data-toggle="modal" data-target="#exampleModal">Actualizar</a>
            <a href="/users/${element._id}" class="delete btn btn-danger">Eliminar</a>
           </td>
           </tr>`
            });
            document.querySelector("#filas").innerHTML = filas;
            //agregando los eventos para actualizar 
            let btn_update = document.querySelectorAll('.update');
            btn_update.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let url = this["href"];
                    console.log(url);
                    fetch(url, {
                        method: "GET"
                    }).then(res => res.json())
                        .catch(err => console.error(err))
                        .then(response => {
                            document.forms.formUpdate._id.value = response._id;
                            document.forms.formUpdate.userU.value = response.userName;
                            document.forms.formUpdate.rolU.value = response.rol;
                        });
                });
            });
            let btn_delete = document.querySelectorAll('.delete');
            btn_delete.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let url = this["href"];
                    //peticion para eliminar
                    fetch(url, {
                        method: "DELETE",
                    }).then(res => res.json())
                        .then(response => {
                            alert("Tarea eliminada con exito");
                            tareas();
                        })
                        .catch(err => {
                            alert("Ocurrio un error al eliminar la tarea");
                            console.log(err);
                        });
                });
            })
        })
}