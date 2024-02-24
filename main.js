import './style.css'
import axios from 'axios'
const url="http://localhost:3000/cats";
let cats=[];
const contenedorPerritos=document.querySelector("#contenedorPerritos");
const botonEliminar=document.querySelector("#boton-eliminar");
const cancelarEliminar=document.querySelector("#cancelar-eliminar");
const eliminarmensaje=document.querySelector("#mensaje-eliminar"); 

//Consumiendo Servicio  Get Axios
const reaCastAxios= async ()=>{
  try {
    const {data}=await axios.get(url);  

    cats=data;
    printHTML(cats);
  }
  catch (error){
    console.log(error);
  }
}
window.addEventListener("DOMContentLoaded",reaCastAxios());

function printHTML(cats){
    cats.forEach(cat => {  
        const row=document.createElement("div");
        row.innerHTML=` <div class="item-perrito">
        <div class="cabecera-perrito">
            <div class="edit-perrito">
              <img src="img/editar.svg" data-id=${cat.id}>
            </div>
            <div class="imagen-perrito">
              <img src=${cat.img}>
            </div>
            <div class="delete-perrito">
              <img src="img/eliminar.svg">
            </div>
        </div>
        <div class="texto-perrito">
            <div class="nombre-perrito">
                  Nombre ${cat.name}
            </div>
            <div class="datos-perrito">
              <div class="telefono-perrito">
                    Telefono ${cat.telefono}
              </div>
            </div>
            <div class="pais-perrito">
                  Pais ${cat.pais} 
            </div>
            <div class="descripcion-perrito">
              <p>${cat.descripcion} </p>
            </div>
        </div>
    </div>
        `;
        contenedorPerritos.appendChild(row);         
        const deletePerrito = row.querySelector(".delete-perrito");
        deletePerrito.addEventListener("click", eliminarCat);
    });
}

async function  eliminarCat(){
  eliminarmensaje.style.display = 'block';


  const eliminar =await axios.delete(`http://localhost:3000/cats/1`);  
  console.log(eliminar);
  //
 // printHTML(cats);
}


botonEliminar.addEventListener("click",()=>{
  eliminarmensaje.style.display = 'none';
});

cancelarEliminar.addEventListener("click",()=>{
  eliminarmensaje.style.display = 'none';

})
