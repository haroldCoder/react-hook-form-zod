import { Clientstype } from "../../types";

class Clients{
    clients: Array<Clientstype>

    constructor(){
        this.clients = [{
            name: "Harold",
            email: "haroldc2005@gmail.com",
            password: "123harold",
            weight: 180,
            plan: "Basic"
        }]
    }
    getClients = () : Array<Clientstype> =>{
        return this.clients;
    }

    saveClient = ({client}: {client: Clientstype}) : string =>{
        try{
            this.clients.push(client);
            return "Client added"
        }
        catch(err){
            return "An ocurred Error"
        }
    }
}

export default Clients;