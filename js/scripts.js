//import { Anuncio } from "./Anuncio";
import { Anuncio_Auto } from "./Anuncio_Auto.js";
const Anuncios = JSON.parse(localStorage.getItem("lista")) || [];

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

// MAP/REDUCE/FILTER


// const nuevoArray2 = Anuncios.map(bj=>{
//   let aux = new Object;
//   if(true){
//     aux.titulo = bj.titulo;
//     aux.descripcion = bj.descripcion;
//   }
//   return aux;
// });
// const precios = Anuncios.map(obj=>{
//   return obj.precio;
// })
// const nuevoArray3 = precios.reduce((prev,actual)=>{
//   return  parseInt(prev)  + parseInt(actual) / precios.length;
// });



// // console.log(nuevoArray);
// // console.log(nuevoArray2);
//  console.log(nuevoArray3);

if (Anuncios.length > 0) {
  handlerLoadTabla(Anuncios);
}

function altaAnuncio(anuncio) {
  Anuncios.push(anuncio);
  almacenarDatos(Anuncios);
}

function almacenarDatos(data) {
  localStorage.setItem("lista", JSON.stringify(data));
  handlerLoadTabla();
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

}

function filtrarPorTransaccion(){
  //console.log(document.getElementById("filtrar").value);
  if(document.getElementById("filtrar").value == "Venta"){

    const nuevoArray = Anuncios.filter(bj=>{
      
      return bj.transaccion == "Venta" ;
    });
    renderizarTabla(crearTabla(nuevoArray), document.getElementById("divTabla"));
  }

  if(document.getElementById("filtrar").value == "Alquiler"){

    const nuevoArray1 = Anuncios.filter(bj=>{
      
      return bj.transaccion == "Alquiler";
    });
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
      agregarSpinner();
      setTimeout(() => {
        modificarAnuncio(anuncioEditado);
        eliminarSpinner();
      }, 3000);
    }
  } else {
    const nuevoAnuncio = new Anuncio_Auto(
        Date.now(),
        frm.titulo.value,
        frm.transaccion.value,
        frm.descripcion.value,
        frm.precio.value,
        frm.puertas.value,
        frm.kms.value,
        frm.potencia.value
    );
    agregarSpinner();
    setTimeout(() => {
      altaAnuncio(nuevoAnuncio);
      eliminarSpinner();
    }, 3000);
    
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
      //personas.findIndex((el)=> el.id == id) esta funcion me devuelve el indice de un elemento del array
      agregarSpinner();
      setTimeout(() => {
        Anuncios.splice(
          Anuncios.findIndex((el) => el.id == id),
          1
        ); // esta funcion saca del array un elemento o la cantidad de elementos que yo quiera pasandoselo como param , el primer param es el index y el segundo la cantidad de elementos que quiero que borre
        almacenarDatos(Anuncios);
        limpiarFormulario(document.forms[0]);
        eliminarSpinner();
      }, 3000);
    } else {
      limpiarFormulario(document.forms[0]);
    }
  }else if(e.target.matches("#btnModificar")){
    let frm = document.forms[0];
    const AnuncioAModificar = new Anuncio_Auto(
      frm.id.value,
     frm.titulo.value,
     frm.transaccion.value,
     frm.descripcion.value,
     frm.precio.value,
     frm.puertas.value,
     frm.kms.value,
     frm.potencia.value);
    if (confirm("confirma Modificacion")) {      
      agregarSpinner();
      setTimeout(() => {        
        console.log(AnuncioAModificar);
        modificarAnuncio(AnuncioAModificar);
        limpiarFormulario(document.forms[0]);
        eliminarSpinner();
      }, 3000);
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
