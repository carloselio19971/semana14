  import './style.css'
  import axios from 'axios'
  const url="http://localhost:3000/cats";
  let cats=[];
  const contenedorPerritos=document.querySelector("#contenedorPerritos");
  const botonEliminar=document.querySelector("#boton-eliminar");
  const botoncancelarEliminar=document.querySelector("#cancelar-eliminar");
  const eliminarmensaje=document.querySelector("#mensaje-eliminar"); 


  //Consumiendo Servicio  Get Axios
  const readCastAxios= async ()=>{
    try {
      const {data}=await axios.get(url);  
      cats=data;
      printHTML(cats);
    }
    catch (error){
      console.log(error);
    }
  }
  window.addEventListener("DOMContentLoaded",readCastAxios);

  function printHTML(cats){
      contenedorPerritos.innerHTML = '';
      cats.forEach(cat => {  
          const row=document.createElement("div");
          row.innerHTML=` <div class="item-perrito">
          <div class="cabecera-perrito">
              <div class="edit-perrito">
                <img src="imagenes/editar.svg" data-id="${cat.id}">
              </div>
              <div class="imagen-perrito">
                <img src=${cat.img}>
              </div>
              <div class="delete-perrito">
                <img src="imagenes/eliminar.svg" data-id="${cat.id}">
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
        const deletePerrito = row.querySelector("#contenedorPerritos .delete-perrito");
        deletePerrito.addEventListener("click", mostrarconfirmacion);
      });
  }

  //Mostrar cuadro confirmacion
  function mostrarconfirmacion(event){
    const id=event.target.dataset.id;
    eliminarmensaje.style.display = "block";
    console.log(id);
    botonEliminar.onclick = () => deleteDog(id);
    
  }

  //Botones Cuadro Confirmacion
  botoncancelarEliminar.addEventListener("click", cancelarEliminar);


  function  cancelarEliminar(){
    eliminarmensaje.style.display = 'none'
  }

  async function deleteDog(id){
    console.log(id);
    
    try {
        const response = await axios.delete(`http://localhost:3000/cats/${id}`);
        cats = cats.filter(cat => cat.id !== id);
        printHTML(cats);
        eliminarmensaje.style.display = 'none'
        
    }
    catch(error){
      console.error('Error al eliminar el gato:', error);
      
    }


  }
