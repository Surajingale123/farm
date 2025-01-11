
 document.addEventListener('DOMContentLoaded', function () {
   
    fetch('http://127.0.0.1:7000/orders/show')
    .then(response => response.json())
    .then(data => {
        
        loadOrdersTable(Array.isArray(data) ? data : data.data || []);
})
    .catch(error => {
        console.log('Fetch error:', error)
    });
});


const placeorderButton=document.getElementById("placeorder");


placeorderButton.addEventListener("click",function(){

const username = document.getElementById('username').value;
    const vegetable = document.getElementById('Vegetable').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const conveyance = document.getElementById('conveyance').value;
    const address = document.getElementById('address').value;

 fetch("http://127.0.0.1:7000/orders/save",{
    method:"POST",
    headers:{
       'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        Username:username,
        Vegetable:vegetable,
        Quantity:quantity,
        Price:price,
        Conveyance:conveyance,
        Address:address
    })
 }).then(response=>response.json())
 .then(data=>{
    if(data.data){
        insertRow(data.data);
        document.getElementById("orderForm").reset()
    }
 })
   .catch(error=>{
    console.log(error);
   })

});

function insertRow(data){
    const table =document.querySelector("table tbody");
    const row =document.createElement("tr");
    row.innerHTML=`
            <td>${data.Username}</td>
            <td>${data.Vegetable}</td>
            <td>${data.Quantity}</td>
            <td>${data.Price}</td>
            <td>${data.Conveyance}</td>
            <td>${data.Address}</td>
            
           

         <td><button class=" btn-sm update-btn " data-id="${data.Username}">Update</button></td>
          <td><button class=" btn-sm delete-btn" data-id="${data.Username}">Delete</button></td>
    `
    table.appendChild(row);
}

function loadOrdersTable(data){
const table=document.querySelector("table tbody");
table.innerHTML="";
data.forEach(item=>{
    insertRow(item);
});
}




document.querySelector("table tbody").addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains('delete-btn')) {
        const username = event.target.getAttribute('data-id');
        
        if (confirm("Are you sure you want to delete this order?")) {
            deleteOrder(username);
        }
    }
});


function deleteOrder(username) {
    fetch(`http://127.0.0.1:7000/orders/delete/${(username)}`, {  
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        
        if (data.message === "Order deleted successfully") {
           
            const rowToDelete = document.querySelector(`button[data-id='${username}']`).closest('tr');
            rowToDelete.remove();
        } else {
            alert("Failed to delete order: " + data.message);
        }
    })
    .catch(error => {
        console.error('Error deleting order:', error);
    });
}








document.querySelector("table tbody").addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains('update-btn')) {
        const row = event.target.closest('tr');
        const username = row.cells[0].innerText;


        const vegetable = row.cells[1].innerText;
        const quantity = row.cells[2].innerText;
        const price = row.cells[3].innerText;
        const conveyance = row.cells[4].innerText;
        const address = row.cells[5].innerText;

      
        document.getElementById('username').value = username;
        document.getElementById('Vegetable').value = vegetable;
        document.getElementById('quantity').value = quantity;
        document.getElementById('price').value = price;
        document.getElementById('conveyance').value = conveyance;
        document.getElementById('address').value = address;

        
        placeorderButton.textContent = "Update Order";
        placeorderButton.removeEventListener("click", placeOrder); 
        placeorderButton.addEventListener("click", function (e) {
            e.preventDefault(); 
            updateOrder(username, row); 
        });
    }
});


function updateOrder(username, row) {
    const vegetable = document.getElementById('Vegetable').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const conveyance = document.getElementById('conveyance').value;
    const address = document.getElementById('address').value;

   
    fetch(`http://127.0.0.1:7000/orders/update/${username}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Vegetable: vegetable,
            Quantity: quantity,
            Price: price,
            Conveyance: conveyance,
            Address: address
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Order updated successfully") {
            alert("Order updated successfully");

         
            row.cells[1].innerText = vegetable;
            row.cells[2].innerText = quantity;
            row.cells[3].innerText = price;
            row.cells[4].innerText = conveyance;
            row.cells[5].innerText = address;

            
            document.getElementById("orderForm").reset();
            placeorderButton.textContent = "Place Order";
            placeorderButton.removeEventListener("click", updateOrder);
            placeorderButton.addEventListener("click", placeOrder);
        }
    })
    .catch(error => {
        console.log('Error updating order:', error);
    });
}


document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();
});




