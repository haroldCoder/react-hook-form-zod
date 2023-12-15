import { number, string } from "zod";
import ConnectPg from "../../connection/connectPg";
import { Clientstype } from "../../types";

class Clients extends ConnectPg {

    constructor() {
        super();
    }
    getClients = (): Array<Clientstype> | undefined => {
        try {
            this.sql.query(`SELECT * FROM clients`, (err, { rows }: { rows: Array<Clientstype> }) => {
                return rows;
            });
        }
        catch (err) {
            return [];
        }
    }

    saveClient = ({ client }: { client: Clientstype }): string => {
        try {
            this.sql.query(`INSERT INTO clients(name, email, password, weight, plan) VALUES("${client.name}","${client.email}","${client.password}",${client.password},"${client.plan}")`, (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                return "client save"
            })
        }
        catch (err) {
            return `ocurred error ${err}`
        }

        return ""
    }

    deleteClient = ({ id }: { id: number }): string => {
        try {
            this.sql.query(`DELETE FROM clients WHERE Id = ${id}`, (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                return "client removed"
            })
        }
        catch (err) {
            return `ocurred error ${err}`
        }

        return ""
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