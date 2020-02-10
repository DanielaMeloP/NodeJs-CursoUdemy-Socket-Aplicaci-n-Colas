
const fs = require("fs");

class Ticket {

    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }

}

class TicketControl{

    constructor(){

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        // leer información de json
        let data = require("../data/data.json");

        if(data.hoy === this.hoy){

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        }else{

            this.reiniciarConteo();
        }

    }

    // Reinicia contro si no es el mismo dia
    reiniciarConteo() {
       this.ultimo = 0;
       this.tickets = [];
       this.ultimos4 = [];
       console.log("Se ha inicializado el sistema");
       this.grabarArchivo();
    }

    // incrementa en 1 el ultimo ticket
    siguiente(){
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4(){
        return this.ultimos4;
    }

    atenderTicket(escritorio){
        
        if (this.tickets.length === 0 ){
            return "No hay tickets";
        }

        let numeroTicket = this.tickets[0].numero;
        // Borra el primero de la lista
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        // sube el dato de posición en el arreglo, dejandolo al inicio
        this.ultimos4.unshift(atenderTicket);


        // Verifica que solo existan 4 datos en el arreglo
        if (this.ultimos4.length > 4 ){
            // Borra el ultimo elemento
            this.ultimos4.splice(-1,1);
        }

        console.log("ultimos 4");
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }

    // Graba la información en JSON
    grabarArchivo(){

        let jsonData  = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);

        // Grabara en JSON
        fs.writeFileSync("./server/data/data.json", jsonDataString);

    }


}

module.exports = {
    TicketControl
}