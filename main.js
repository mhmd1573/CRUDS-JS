let price = document.getElementById('price');
let tax = document.getElementById('tax');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let create = document.getElementById('btn')
let count = document.getElementById('count')
let category = document.getElementById('category')
let title = document.getElementById('title')
let mode = 'create'
let tmp;

// Calculate Total Section Starts Here

function getTotal(params) {

    if (price.value != '') {
        let result = (+price.value + +tax.value + +ads.value) - discount.value
        total.innerHTML = result;
        total.style.background = 'green'
    } else {
        total.innerHTML = '';
        total.style.background = 'red'
    }
}
// Calculate Total Section Ends Here





// Create Method (Saving objects in arrays)

let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}


create.onclick = function(params) {

        let newPro = {

            title: title.value.toLowerCase(),
            price: price.value,
            tax: tax.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase(),
        }

        if (title.value != '' && price.value != '' && category.value != '' && count.value < 100) {
            if (mode === 'create') {
                if (newPro.count > 1) {
                    for (let i = 0; i < newPro.count; i++) {
                        dataPro.push(newPro)
                    }
                } else {
                    dataPro.push(newPro)
                }

            } else {
                dataPro[tmp] = newPro;
                mode = 'create'
                create.innerHTML = 'Create'
                count.style.display = 'block'
                getTotal()
            }
            clearData()
        }

        localStorage.setItem('product', JSON.stringify(dataPro))

        readData()

    }
    // Create Method Ends Here





// Clear Data After Pressing Create Button Starts Here
function clearData() {
    title.value = ''
    price.value = ''
    tax.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
}
// Clear Data After Pressing Create Button Ends Here




// Read Data In Table Section Starts Here
function readData() {
    getTotal()
    let table = '';

    for (let i = 0; i < dataPro.length; i++) {


        table += `
         
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].tax}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td> <button onclick = 'updateItem(${i})' class="tab-btn">Update</button></td>
        <td> <button onclick='deleteData(${i})' class="tab-btn">Delete</button></td>
        
    </tr>
        
        `

    }
    document.getElementById('tbody').innerHTML = table;


    dis = document.getElementById('deleteicon')
    console.log(dis)
    if (dataPro.length > 0) {

        dis.classList.remove('hide')
    } else {
        dis.classList.add('hide')
    }

}

readData()
    // Read Data In Table Section Ends Here





// Delete Item From Table Using Button
function deleteData(i) {

    console.log(i)
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    readData()
}
// Delete Item From Table Using Button Ends Here





// Delete All Items Section Start Here

function deleteItems(params) {

    localStorage.clear()
    dataPro.splice(0)
    readData()
}
// Delete All Items Section Ends Here



//Update Section Starts Here

function updateItem(i) {

    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    tax.value = dataPro[i].tax;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none'
    category.value = dataPro[i].category;
    create.innerHTML = 'Update'
    mode = 'update'
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}
//Update Section Ends Here


//Search Section Starts Here

searchbtn = document.getElementById('sea')
let searchmode = 'title';

function getsearchMode(id) {

    if (id == 'searchtitle') {
        searchmode = 'title'
        searchbtn.placeholder = 'Search By Title'
    } else {
        searchmode = 'searcchcategory'
        searchbtn.placeholder = 'Search By Category'
    }
    searchbtn.focus()
}


function searchData(value) {

    let table = '';
    if (searchmode == 'title') {

        for (let i = 0; i < dataPro.length; i++) {

            if (dataPro[i].title.includes(value.toLowerCase())) {

                table += `
         
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].tax}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td> <button onclick = 'updateItem(${i})' class="tab-btn">Update</button></td>
        <td> <button onclick='deleteData(${i})' class="tab-btn">Delete</button></td>
        
    </tr>
        
        `
            }

        }

    } else {
        for (let i = 0; i < dataPro.length; i++) {

            if (dataPro[i].category.includes(value.toLowerCase())) {

                table += `
         
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].tax}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td> <button onclick = 'updateItem(${i})' class="tab-btn">Update</button></td>
        <td> <button onclick='deleteData(${i})' class="tab-btn">Delete</button></td>
        
    </tr>
        
        `
            }

        }


    }

    document.getElementById('tbody').innerHTML = table;

}