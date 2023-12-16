import ConnectPg from "../../connection/connectPg";
import { Clientstype } from "../../types";

class Clients extends ConnectPg {

    constructor() {
        super();
    }
    getClients = async() => {
        try{
            const {rows}: { rows: Array<Clientstype> } = await this.sql.query(`SELECT * FROM clients`);
            return rows
        }
        catch(err){
            console.log(err);
            return []
        }
        
    }

    saveClient = ({ client }: { client: Clientstype }): string => {
        try {
            this.sql.query(`INSERT INTO clients(name, email, password, weight, plan) VALUES('${client.name}','${client.email}','${client.password}', ${client.weight},'${client.plan}')`, (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            })
            return "client save"
        }
        catch (err) {
            return `ocurred error ${err}`
        }
    }

    deleteClient = ({ id }: { id: number }): string => {
        try {
            this.sql.query(`DELETE FROM clients WHERE Id = ${id}`, (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            })

            return "client removed"
        }
        catch (err) {
            return `ocurred error ${err}`
        }
    }

    updateClient = async({id, client}: {id: number, client: Clientstype}): Promise<string> =>{
        try{
            const result = await this.sql.query(`UPDATE clients
            SET
                name = $1,
                email = $2,
                password = $3,
                weight = $4,
                plan = $5
            WHERE id = $6
        `, [client.name, client.email, client.password, client.weight, client.plan, id]);

        if (result.rowCount === 0) {
            // Check if any rows were affected by the update
            return `No client with ID ${id} found`;
        }

        return `Client with ID ${id} updated successfully`;
        }
        catch (err) {
            return `ocurred error ${err}`
        }
    }
}

export default Clients;