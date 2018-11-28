tareas();

console.log(document.forms.formRegistrar.user.value);

document.querySelector("#formRegistrar").addEventListener('submit',function(e)
{
    e.preventDefault();
    let data = {
        user : document.forms.formRegistrar.user.value,
        password : document.forms.formRegistrar.password.value,
        rol : document.forms.formRegistrar.rol.value
    }
    console.log(data);
    fetch('/users',{
        method:"POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(response =>{
        tareas();
    })
    .catch(err=> console.log(err))
});
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