import { Anuncio } from "./Anuncio.js";

export class Anuncio_Auto extends Anuncio{
    constructor(id,titulo,transaccion,descripcion,precio,puertas,kms,potencia,fecha){
        super(id,titulo,transaccion,descripcion,precio);
        this.puertas = puertas;
        this.kms = kms;
        this.potencia = potencia
        this.fecha = fecha;
        
    }
};