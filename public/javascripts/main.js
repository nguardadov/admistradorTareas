tareas();
function tareas()
{
    fetch('/users',
    {
        method:'GET'
    }).then(res=>res.json())
    .then(data=>{
       let filas = "";
       data.forEach(element => {
           console.log(element);
           filas = filas+`<tr>
           <td>${element.userName}</td>
           <td>${element.rol}</td>
           <td>
            <a href="/users/${element._id}" class="btn btn-danger">Actualizar</a>
            <a href="/users/${element._id}" class="btn btn-warning">Eliminae</a>
           </td>
           </tr>`
       });
       document.querySelector("#filas").innerHTML = filas;
    })
}