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

// Add New Customer
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

            alert("Customer Added Successfully!");

            loadCustomer();

            addCustomerClick();
        })
        .catch((error) => console.error(error));
}

function addCustomerClick() {
    document.getElementById("txtName").value = "";
    document.getElementById("txtAddress").value = "";
    document.getElementById("txtSalary").value = "";
}

// Delete Customer by ID
function searchCustomerByIDForDelete() {
    let searchValue = document.getElementById("customerID").value;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://localhost:8080/customer/search-by-id/" + searchValue, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            let id = document.getElementById("deleteID").value = searchValue;
            let name = document.getElementById("deleteName").value = result.name;
            let address = document.getElementById("deleteAddress").value = result.address;
            let salary = document.getElementById("deleteSalary").value = result.salary;

            deleteCustomerClick();
        })
        .catch((error) => console.error(error));
}

function deleteCustomer() {

    let idValue = document.getElementById("deleteID").value;

    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    fetch("http://localhost:8080/customer/delete/" + idValue, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result)

            alert("Customer Deleted Success")

            loadCustomer();

            closeClearDelete();
        })
        .catch((error) => console.error(error));
}

function deleteCustomerClick() {
    document.getElementById("customerID").value = "";
}

function closeClearDelete() {
    document.getElementById("deleteID").value = "";
    document.getElementById("deleteName").value = "";
    document.getElementById("deleteAddress").value = "";
    document.getElementById("deleteSalary").value = "";
}

// Update Customer
function searchCustomerByIDForUpdate() {
    let searchValue = document.getElementById("customerId").value;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://localhost:8080/customer/search-by-id/" + searchValue, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            let id = document.getElementById("updateID").value = searchValue;
            let name = document.getElementById("updateName").value = result.name;
            let address = document.getElementById("updateAddress").value = result.address;
            let salary = document.getElementById("updateSalary").value = result.salary;

            updateCustomerClick();
        })
        .catch((error) => console.error(error));
}

function updateCustomer() {
    let id = document.getElementById("updateID").value;
    let name = document.getElementById("updateName").value;
    let address = document.getElementById("updateAddress").value;
    let salary = document.getElementById("updateSalary").value;

    if (!confirm("Are you sure you want to update this customer?")) return;

    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, address, salary })
    };

    fetch("http://localhost:8080/customer/update-customer", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);

            alert("Customer Updated Successfully!");

            loadCustomer();

            closeClearUpdate()

        })
        .catch((error) => console.error(error));
}

function updateCustomerClick() {
    document.getElementById("customerId").value = "";
}

function closeClearUpdate() {
    document.getElementById("updateID").value = "";
    document.getElementById("updateName").value = "";
    document.getElementById("updateAddress").value = "";
    document.getElementById("updateSalary").value = "";
}

// Search Customer by ID
function searchCustomerByID() {
    let searchValue = document.getElementById("searchCustomerID").value;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://localhost:8080/customer/search-by-id/" + searchValue, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            let id = document.getElementById("searchID").value = searchValue;
            let name = document.getElementById("searchName").value = result.name;
            let address = document.getElementById("searchAddress").value = result.address;
            let salary = document.getElementById("searchSalary").value = result.salary;

            searchCustomerClick();
        })
        .catch((error) => console.error(error));
}

function searchCustomerClick() {
    document.getElementById("searchCustomerID").value = "";
}

function closeClearSearch() {
    document.getElementById("searchID").value = "";
    document.getElementById("searchName").value = "";
    document.getElementById("searchAddress").value = "";
    document.getElementById("searchSalary").value = "";
}