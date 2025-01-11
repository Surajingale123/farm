import { createConnectionObject } from "../config/DBConfig.js";

const connection =createConnectionObject()

export function saveOrders(request,response){
try{
      const data =request.body;
      const insertQuery = 'INSERT INTO orders (Username, Vegetable, Quantity, Price, Conveyance, Address) VALUES (?, ?, ?, ?, ?, ?)';
connection.query(insertQuery, [data.Username, data.Vegetable, data.Quantity, data.Price, data.Conveyance, data.Address], (error, result) => {
    if (error) {
        response.status(500).send({ message: "Error in inserting orders" });
    } else {
        response.status(201).send({
            message: "Orders successfully done",
            data: {
                Username: data.Username,
                Vegetable: data.Vegetable,
                Quantity: data.Quantity,
                Price: data.Price,
                Conveyance: data.Conveyance,
                Address: data.Address
            }
        });
    }
});
}
catch (error){
  console.log(error)
  response.status(500).send({message:"Error in inserting orders "});
  console.log("catch saveOrders")

}

}




export function showOrders(request,response){
    try{
        
          const selectQuery=`SELECT * FROM orders`;
          connection.query(selectQuery,(error,result)=>{
              if(error){
                console.error(error);
                response.status(500).send({message:"Error in Showing data "});
              }
               else{
                response.status(201).send({message:"Orders successfully shown",data: result});
               }
    
          });
    }
    catch (error){
    response.status(500).send({message:"Error in Showing orderscatch"});
    
    }
    }



 

 
    export function deleteOrder(request, response) {
        try {
            const username = request.params.username;
    
            const deleteQuery = `DELETE FROM orders WHERE username = ?`;
            connection.query(deleteQuery, [username], (error, result) => {
                if (error) {
                    console.error("Delete error:", error);
                    response.status(500).send({ message: "Error in deleting order" });
                } else if (result.affectedRows > 0) {
                    response.status(200).send({ message: "Order deleted successfully" });
                } else {
                    response.status(404).send({ message: "Order not found" });
                }
            });
        } catch (error) {
            console.error("Delete catch error:", error);
            response.status(500).send({ message: "Something went wrong" });
        }
    }
    




   
    export function updateOrder(request, response) {
        try {
            const username = request.params.username;
            const data = request.body; 
            const updateQuery = ` UPDATE orders SET Vegetable = ?, Quantity = ?, Price = ?, Conveyance = ?, Address = ? 
                WHERE Username = ?
            `;
            connection.query(
                updateQuery, 
                [data.Vegetable, data.Quantity, data.Price, data.Conveyance, data.Address, username], 
                (error, result) => {
                    if (error) {
                        console.error("Error updating order:", error);
                        response.status(500).send({ message: "Error updating order" });
                    } else if (result.affectedRows === 0) {
                        response.status(404).send({ message: "Order not found" });
                    } else {
                        response.status(200).send({ message: "Order updated successfully" });
                    }
                }
            );
        } catch (error) {
            console.error("Error in updateOrder function:", error);
            response.status(500).send({ message: "Something went wrong" });
        }
    }