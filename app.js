console.log("promise");

var categories;
var types;
var products;
var displayDemo = "";
var displayFire = "";

// Create a simple user interface for your product catalog
//where a user can select a category from a dropdown.

$('#dropdown').click(function(){
    $('#myDropdown').toggle('show');
});


// When a category is selected, you must use Promises to read, first,
//from the categories.json to load that array of objects,

//--------------------------   PROMISE ONE  ----------
var promise1 = new Promise(function(resolve, reject){
    var request1 = new XMLHttpRequest();
    request1.addEventListener("load", function(){
        var list = JSON.parse(request1.responseText).categories;
        resolve(list);
    })
    request1.open("GET", "categories.json");
    request1.send();
})

console.log("promise1", promise1);


//--------------------------  PROMISE TWO ------------
var promise2 = new Promise(function(resolve, reject){
    var request2 = new XMLHttpRequest();
    request2.addEventListener("load", function(){
        var list = JSON.parse(request2.responseText).types;
        resolve(list);
    })
    request2.open("GET", "types.json");
    request2.send();
})

console.log("PROMISE2", promise2);


//--------------------------  PROMISE THREE ------------
var promise3 = new Promise(function(resolve, reject){
    var request3 = new XMLHttpRequest();
    request3.addEventListener("load", function(){
        var list = JSON.parse(request3.responseText).products;
        resolve(list);
    })
    request3.open("GET", "products.json");
    request3.send();
})

console.log("PROMISE3", promise3);


//--------------------------  THENS ------------
//
// promise1.then(
//         function(val){
//             categories = val
//             console.log("promise1 resolved : ", categories)
//             return promise2
//     })
//     .then(  // then load types.json,
//         function(val) {
//             types = val;
//             console.log("promise2 resolved : ", types);
//             return promise3
//         })
//     .then(  // then products.json.
//         function(val){
//             products = val;
//             console.log("promise3 resolved : ", products);
//         })
//     .then(chooseLoad)

Promise.all([promise1, promise2, promise3])
    .then(function(values){
        categories = values[0];
        console.log("promise1 resolved : ", categories)

        types = values[1];
        console.log("promise2 resolved : ", types);

        products = values[2];
        console.log("promise3 resolved : ", products);

        chooseLoad();
    })



// Once all data is loaded, you need to display the products in a Bootstrap grid.
// Each product must display the string name of its product type, and product category.
// Not the integer id value.

var productName = [];
function displayProductName(){
    for (var i = 0; i < products.length; i++) {
        var j = Object.keys(products[i])[0];
        productName.unshift(products[i][j]);
    }
}

function chooseLoad(){

    $('#fireworks').click(function(){
        $('.container').empty();
        displayFire = ""
        displayProductName();

        console.log(productName);
        for (var i = 0; i < productName.length; i++) {
            if (productName[i].type_id <= 2) {
                displayFire += `<div class="displayFire col-sm-4">
                                    <p>${productName[i].name}</p>
                                </div>`
            }
        }

        $('.container').append(displayFire);

    })


    $('#demolition').click(function(){
        displayDemo = ""
        $('.container').empty();
        displayProductName();

        console.log(productName);
        for (var i = 0; i < productName.length; i++) {
            if (productName[i].type_id >= 3) {
                displayDemo += `<div class="displayFire col-sm-4">
                                    <p>${productName[i].name}</p>
                                </div>`
            }
        }

        $('.container').append(displayDemo);

        })
}

function populateFireworks() {

}
