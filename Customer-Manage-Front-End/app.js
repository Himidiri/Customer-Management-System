loadCustomer();

function loadCustomer() {
    fetch("http://localhost:8080/customer/get-all")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            let tableRow = `
                <caption>2025 Customers</caption>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Salary</th>
                </tr>
        `;

            let customerTable = document.getElementById("tblCustomers");

            data.forEach(customer => {
                tableRow += `    
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.salary}</td>
                </tr>
            `;
            });

            customerTable.innerHTML = tableRow;
        })
}

function addCustomerClick() {
    document.getElementById("txtName").value = "";
    document.getElementById("txtAddress").value = "";
    document.getElementById("txtSalary").value = "";
}

function addCustomer() {
    let name = document.getElementById("txtName").value;
    let address = document.getElementById("txtAddress").value;
    let salary = document.getElementById("txtSalary").value;

    if (name === "" || address === "" || salary === "") {
        alert("Please fill in all fields!");
        return;
    }

    console.log(name);
    console.log(address);
    console.log(salary);
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "name": name,
        "address": address,
        "salary": salary
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };
    
    fetch("http://localhost:8080/customer/add", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            
            alert("Customer added successfully!");

            location.reload();
            
            document.getElementById("txtName").value = "";
            document.getElementById("txtAddress").value = "";
            document.getElementById("txtSalary").value = "";
        })
        .catch((error) => console.error(error));
}

function deleteCustomerClick() {
    document.getElementById("customerID").value = "";
}

function searchCustomerByID() {
    let searchValue = document.getElementById("customerID").value;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://localhost:8080/customer/search-by-id/" + searchValue, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            let id = document.getElementById("id").value = searchValue;
            let name = document.getElementById("name").value = result.name;
            let address = document.getElementById("address").value = result.address;
            let salary = document.getElementById("salary").value = result.salary;

            deleteCustomerClick();
        })
        .catch((error) => console.error(error));
}

function deleteCustomer() {
    
    let idValue = document.getElementById("id").value;

    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    fetch("http://localhost:8080/customer/delete/" + idValue, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result)

            alert("Customer Deleted Success")

            location.reload();

            document.getElementById("id").value = "";
            document.getElementById("name").value = "";
            document.getElementById("address").value = "";
            document.getElementById("salary").value = "";
        })
        .catch((error) => console.error(error));
}