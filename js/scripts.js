//import { Anuncio } from "./Anuncio";
import { Anuncio_Auto } from "./Anuncio_Auto.js";
const anunciosLocal = JSON.parse(localStorage.getItem("lista")) || [];
let Anuncios = [];

document.forms[0].addEventListener("submit", handlerSubmit);
document.addEventListener("click", handlerClick);
document.getElementById("btnGuardar").addEventListener("click",handlerLoadTabla);
document.getElementById("btnModificar").addEventListener("click",modificarAnuncio);
document.getElementById("checkbox").childNodes[1].addEventListener("click",filtrarTabla);
document.getElementById("transaccionch").addEventListener("click",filtrarTabla);
document.getElementById("descripcionch").addEventListener("click",filtrarTabla);
document.getElementById("precioch").addEventListener("click",filtrarTabla);
document.getElementById("puertasch").addEventListener("click",filtrarTabla);
document.getElementById("kmsch").addEventListener("click",filtrarTabla);
document.getElementById("potenciach").addEventListener("click",filtrarTabla);
document.getElementById("filtrar").addEventListener("change",filtrarPorTransaccion);



if (Anuncios.length != null) {
  
    getDatosFech();
    handlerLoadTabla();
 
  // document.querySelector(".pepe").value = 2;
  // console.log(document.querySelector(".pepe").value);
  
}

function cargarInput(){
  let precios = Anuncios.map(obj=>{
    return obj.precio;
  })
  console.log(precios);
   const numeros = precios.reduce((prev,actual)=>{
    return  parseInt(prev)  + parseInt(actual) / precios.length;
  });   

  document.querySelector(".pepe").value = 23;
}

function altaAnuncio(anuncio) {
  anunciosLocal.push(anuncio);
  almacenarDatos(anunciosLocal);
}

function almacenarDatos(data) {
  localStorage.setItem("lista", JSON.stringify(data));
  //handlerLoadTabla();
}

function handlerLoadTabla() {
  renderizarTabla(crearTabla(Anuncios), document.getElementById("divTabla"));
}

function renderizarTabla(tabla, contenedor) {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild);
  }
  if (tabla) {
    contenedor.appendChild(tabla);
  }
}

function limpiarFormulario(frm) {
  frm.reset();
  document.getElementById("btnEliminar").classList.add("oculto");
  document.getElementById("btnModificar").classList.add("oculto");
  //document.getElementById("btnGuardar").textContent = 'Guardar';
  document.forms[0].id.value = "";
}

function modificarAnuncio(p) {
  let index = Anuncios.findIndex((per) => per.id == p.id);
  Anuncios.splice(index, 1, p);//primer param es para el index a modificar, segundo param es para cuatos desde ese indice queres modificar y el tercer param es para si queres remplazarlo con otro le decis con que objet
  almacenarDatos(Anuncios);
}

function agregarSpinner() {
  let spinner = document.createElement("img");
  spinner.setAttribute("src", "./assets/spenner-Velocimetro.gif");
  spinner.setAttribute("alt", "imagen spinner");

  document.getElementById("spinner-container").appendChild(spinner);
}

function eliminarSpinner() {
  document.getElementById("spinner-container").innerHTML = "";
}

function cargarFormulario(id) {
    const { titulo, transaccion, descripcion,precio,puertas,kms,potencia } = Anuncios.filter((a) => a.id == id)[0];
   // console.log(Persona);
  
    const frm = document.forms[0];
    frm.titulo.value = titulo;
    frm.descripcion.value = descripcion;
    frm.transaccion.value = transaccion;
    frm.precio.value = precio;
    frm.puertas.value = puertas;
    frm.kms.value = kms;
    frm.potencia.value = potencia;
    frm.id.value = id;
    //document.getElementById("btnGuardar").textContent = "Modificar";
    document.getElementById("btnModificar").classList.remove("oculto");
    document.getElementById("btnEliminar").classList.remove("oculto");
    document.getElementById("btnEliminar").setAttribute("class","btn btn-danger");
    document.getElementById("btnModificar").setAttribute("class","btn btn-warning");
  }

  function filtrarTabla(){
     let aux = new Object;
     const nuevoArray = Anuncios.map(obj=>{
        aux.id = obj.id;

        if(document.getElementById("tituloch").checked == true){
          aux.titulo = obj.titulo;
        }
        if(document.getElementById("transaccionch").checked == true){
          aux.transaccion = obj.transaccion;
        }
        if(document.getElementById("descripcionch").checked == true){
          aux.descripcion = obj.descripcion;
        }
        if(document.getElementById("precioch").checked == true){
          aux.precio = obj.precio;
        }
        if(document.getElementById("puertasch").checked == true){
          aux.puertas = obj.puertas;
        }
        if(document.getElementById("kmsch").checked == true){
          aux.kms = obj.kms;
        }
        if(document.getElementById("potenciach").checked == true){
          aux.potencia = obj.potencia;
        }

        return aux;
     })
     renderizarTabla(crearTabla(nuevoArray), document.getElementById("divTabla"));
     altaAnuncio(aux);

}

function filtrarPorTransaccion(){
  //console.log(document.getElementById("filtrar").value);
  if(document.getElementById("filtrar").value == "Venta"){

    const nuevoArray = Anuncios.filter(bj=>{
      
      return bj.transaccion == "Venta" ;
    });
    const arrayPrecios = nuevoArray.map(bj=>{
      return bj.precio ;
    });
    console.log(arrayPrecios);
    const precio = arrayPrecios.reduce((prev,actual)=>{
         return  parseInt(prev)  + parseInt(actual) / arrayPrecios.length;
       });
    
       const arrayprecio2 = nuevoArray.map(bj=>{
        return bj.precio ;
      });
      const precio2 = arrayprecio2.reduce((prev,actual)=>{
        let minimo =parseInt(prev);
        if(minimo > parseInt(actual) ){
          minimo = parseInt(actual);
        }
           return  minimo;
         });

       document.querySelector(".pepe").value = precio;
       document.querySelector(".pepa").value = precio2;

    renderizarTabla(crearTabla(nuevoArray), document.getElementById("divTabla"));
  }

  if(document.getElementById("filtrar").value == "Alquiler"){

    const nuevoArray1 = Anuncios.filter(bj=>{
      
      return bj.transaccion == "Alquiler";
    });
    const arrayPrecios1 = nuevoArray1.map(bj=>{
      return bj.precio ;
    });

    const precio1 = arrayPrecios1.reduce((prev,actual)=>{
         return  parseInt(prev)  + parseInt(actual) / arrayPrecios.length;
       });

       const arrayprecio2 = nuevoArray1.map(bj=>{
        return bj.precio ;
      });
      const precio2 = arrayprecio2.reduce((prev,actual)=>{
        let minimo =parseInt(prev);
        if(minimo > parseInt(actual) ){
          minimo = parseInt(actual);
        }
           return  minimo;
         });

       document.querySelector(".pepe").value = precio1;
       document.querySelector(".pepa").value = precio2;
    renderizarTabla(crearTabla(nuevoArray1), document.getElementById("divTabla"));
  }

  if(document.getElementById("filtrar").value == "N/A"){

    handlerLoadTabla();
  }

}


function handlerSubmit(e) {
  e.preventDefault();

  handlerLoadTabla();

  const frm = e.target;

  if (frm.id.value !== "") {
    const anuncioEditado = new Anuncio_Auto(
      parseInt(frm.id.value),
      frm.descripcion.value,
      frm.transaccion.value,
      frm.descripcion.value,
      frm.precio.value,
      frm.puertas.value,
      frm.kms.value,
      frm.potencia.value
    );
    if (confirm("Desea modificar a este anuncio")) {
      putDatosFech(anuncioEditado,parseInt(frm.id.value));
      console.log("paso");
      // agregarSpinner();
      // setTimeout(() => {
      //   modificarAnuncio(anuncioEditado);
      //   eliminarSpinner();
      // }, 3000);
    }
  } else {
    let fecha = new Date;
    const nuevoAnuncio = new Anuncio_Auto(Date.now(),
        frm.titulo.value,
        frm.transaccion.value,
        frm.descripcion.value,
        frm.precio.value,
        frm.puertas.value,
        frm.kms.value,
        frm.potencia.value,
        fecha
    );
    postDatosFech(nuevoAnuncio);
    // agregarSpinner();
    // setTimeout(() => {
    //   altaAnuncio(nuevoAnuncio);
    //   eliminarSpinner();
    // }, 3000);
    
  }
  limpiarFormulario(e.target);
}

function handlerClick(e) {
  //console.log(e.target);
  if (e.target.matches("td")) {
    // se maneja igual que los querysellector con las expreciones de css
    //let id = e.target.parentNode.dataset.id;
    let id = e.target.parentNode.firstChild.innerHTML;
    console.log(id);
    //console.log(e.target.parentNode.dataset.id);
    cargarFormulario(id);
  } else if (e.target.matches("#btnEliminar")) {
    let id = parseInt(document.forms[0].id.value);
    if (confirm("confirma eliminacion")) {
      deleteDatosFech(id);
    } else {
      limpiarFormulario(document.forms[0]);
    }
  }else if(e.target.matches("#btnModificar")){
    let frm = document.forms[0];
    let fecha = new Date;
    const AnuncioAModificar = new Anuncio_Auto(
      frm.id.value,
     frm.titulo.value,
     frm.transaccion.value,
     frm.descripcion.value,
     frm.precio.value,
     frm.puertas.value,
     frm.kms.value,
     frm.potencia.value,
     fecha);
    if (confirm("confirma Modificacion")) { 
      putDatosFech( AnuncioAModificar,parseInt(frm.id.value));
      console.log("paso");     
    }else{
      limpiarFormulario(document.forms[0]);
    }
  }
}

function crearTabla(items) {
  const tabla = document.createElement("table");
  //tabla.setAttribute("class", "table table-dark"); 
  tabla.className+= "table table-bordered table-hover";
  tabla.appendChild(CreatThead(items[0]));
  tabla.appendChild(CreatBody(items));

  return tabla;
}

function CreatThead(items) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  for (const key in items) {
    //if (key !== "id") {
      const th = document.createElement("th");
      //const texto = document.createTextNode(key);  //esta es la forma larga la deje comentada
      //th.appendChild(texto);
      th.textContent = key;
      tr.appendChild(th);
    //}
  }
  thead.appendChild(tr);
  thead.className+= "rosa";
  return thead;
}

function CreatBody(items) {
  const tbopdy = document.createElement("tbody");
  items.forEach((items) => {
    const tr = document.createElement("tr");
    //tr.setAttribute("data-id",);
    for (const key in items) {
      // if (key === "id") {
      //   tr.setAttribute("data-id", items[key]);
      // } else {
        const td = document.createElement("td");
        td.textContent = items[key];
        //tr.addEventListener("click", handlerClickTD);
        tr.appendChild(td);
      //}
    }
    tbopdy.appendChild(tr);
  });
  return tbopdy;
}

function getDatosFech (){
  
  fetch("http://localhost:3000/Anuncios")
  .then((res)=>{
    //console.log(res);
    return res.ok ? res.json(): Promise.reject(res); 
  })
  .then((data)=>{
    Anuncios = data;
    handlerLoadTabla(Anuncios);                        
  }) 
  .catch(err=>{
    console.error(`Error: ${err.status}:${err.statusText}`);
  })
  
}


function postDatosFech (nuevoA){

document.querySelector("#spinner-container").appendChild(geteSpinner());

const options = {
  method:"POST",
  headers:{
    "Content-Type":"application/json;charset=utf-8"
  },
  body:JSON.stringify(nuevoA)
};

fetch("http://localhost:3000/Anuncios", options)
.then((res)=>{
  //console.log(res);
  return res.ok ? res.json(): Promise.reject(res); 
})
.then((data)=>{
  console.log(data);                        
})  
.catch(err=>{
  console.error(`Error: ${err.status}:${err.statusText}`);
})
.finally(()=>{
  document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
})


}

function deleteDatosFech (id){

document.querySelector("#spinner-container").appendChild(geteSpinner());

const options = {
  method:"DELETE",
  headers:{
    "Content-Type":"application/json;charset=utf-8"
  }
};

fetch("http://localhost:3000/Anuncios/"+id, options)
.then((res)=>{
  //console.log(res);
  return res.ok ? res.json(): Promise.reject(res); 
})
.then((data)=>{
  console.log(data);                        
})  
.catch(err=>{
  console.error(`Error: ${err.status}:${err.statusText}`);
})
.finally(()=>{
  document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
})


}

function putDatosFech (aEditado,id){

document.querySelector("#spinner-container").appendChild(geteSpinner());

const options = {
  method:"PUT",
  headers:{
    "Content-Type":"application/json;charset=utf-8"
  },
  body:JSON.stringify(aEditado)
};

fetch("http://localhost:3000/Anuncios/"+id, options)
.then((res)=>{
  //console.log(res);
  return res.ok ? res.json(): Promise.reject(res); 
})
.then((data)=>{
  //console.log(data);                        
})  
.catch(err=>{
  console.error(`Error: ${err.status}:${err.statusText}`);
})
.finally(()=>{
  document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
})


}


const geteSpinner = ()=>{
const spinner = document.createElement("img");
spinner.setAttribute("src","./assets/spenner-Velocimetro.gif");
spinner.setAttribute("alt" , "imagen spinner");
return spinner;
}

