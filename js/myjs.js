
var Regec = /^[A-Z][a-zA-Z]{3,6}$/;

var ProductName = document.getElementById('ProductName')




var ProductPrice = document.getElementById('ProductPrice')
var ProductCategory = document.getElementById('ProductCategory')
var ProductDesc = document.getElementById('ProductDesc')
var Btn = document.getElementById('BTN')
CurrentIndex = 0;

Btn.addEventListener('click', function () {
    if (Btn.innerHTML == 'Add Product') {
        AddProduct()
    } else {
        UpdateProduct(CurrentIndex);

    }
})

if (localStorage.getItem('MyProducts') == null) {
    var ProductContainer = []
} else {
    var ProductContainer = JSON.parse(localStorage.getItem('MyProducts'))
}

function AddProduct() {
    var product = {
        name: ProductName.value,
        price: ProductPrice.value,
        category: ProductCategory.value,
        desc: ProductDesc.value

    }
    ProductContainer.push(product);
    localStorage.setItem('MyProducts', JSON.stringify(ProductContainer))


    showproduct();

}

function showproduct() {
    var Container = ''
    for (i = 0; i < ProductContainer.length; i++) {


        Container += `<tr>
        <td>` + ProductContainer[i].name + `</td>
        <td>` + ProductContainer[i].price + `</td>
        <td>` + ProductContainer[i].category + `</td>
        <td>` + ProductContainer[i].desc + `</td>
        <td><button onclick="UpdateScr(` + i + `)" class="btn btn-warning">update</button></td>
        <td><button onclick="DeleteProduct(` + i + `)" class="btn btn-danger">delete</button></td>
        </tr>`

    }
    document.getElementById('productsum').innerHTML = Container
}


function SearchProduct() {

    var SearchContainer = ''
    var SearchSugContainer = ''

    for (i = 0; i < ProductContainer.length; i++) {


        if ((ProductContainer[i].name.includes(term.value) == true) && (term.value !== '')) {
            SearchContainer += `<tr><td>` + ProductContainer[i].name + `</td>
            <td>` + ProductContainer[i].price + `</td>
            <td>` + ProductContainer[i].category + `</td>
            <td>` + ProductContainer[i].desc + `</td>
            <td><button onclick="UpdateScr(` + i + `)" class="btn btn-warning">update</button></td>
        <td><button onclick="DeleteProduct(` + i + `)" class="btn btn-danger">delete</button></td>
            </tr>`
            NewTxt = ProductContainer[i].name.replace(term.value, `<span style="color: red;" >` + term.value + `</span>`)
            SearchSugContainer += `<p class='my-2 bg-ligth'>` + NewTxt + `</p>`
        }


    }
    document.getElementById('productsum').innerHTML = SearchContainer
    document.getElementById('SearchSug').innerHTML = SearchSugContainer
    if (term.value == '') {
        showproduct();
    }
}

function DeleteProduct(index) {
    ProductContainer.splice(index, 1)
    localStorage.setItem('MyProducts', JSON.stringify(ProductContainer))
    showproduct();

}

function UpdateScr(index) {
    ProductName.value = ProductContainer[index].name;
    ProductPrice.value = ProductContainer[index].price;
    ProductCategory.value = ProductContainer[index].category;
    ProductDesc.value = ProductContainer[index].desc;

    document.getElementById('BTN').innerHTML = 'Update'
    CurrentIndex = index;
}

function UpdateProduct(Index) {
    var product = {
        name: ProductName.value,
        price: ProductPrice.value,
        category: ProductCategory.value,
        desc: ProductDesc.value

    }
    ProductContainer[Index] = product;
    localStorage.setItem('MyProducts',JSON.stringify(ProductContainer));
    Btn.innerHTML='Add Product'
    showproduct();


}