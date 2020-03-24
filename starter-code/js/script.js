/*Añade un evento de click a todos los elementos de la clase btn-delete
que asigna innerHTML = "" */
const addDeleteEvents = () => {
    //primero adquiere todos los elementos de la clase 'btn-delete'
    let btn = document.getElementsByClassName('btn-delete');
    /*luego itera a traves de los elementos usando un "forEach" y le asigna a cada elemento
    un "eventListener"*/
    Array.from(btn).forEach((element, index) => {
        element.addEventListener('click', () => {
            /*en el "callback" del "eventListener" captura captura el elemento a borrar
            y lo substituye por ""*/
            let rowToDelete = document.getElementsByClassName("row").item(index);
            rowToDelete.innerHTML = "";
            console.log('row ' + index + ' deleted');
        });
    });
}

//Añade una fila con los valores de las input "item-price-create" y "item-name-create"
const addRowEvent = () => {
    //primero adquiere el elemento correspondiente al boton 'create'
    let btnCreate = document.getElementById('creator');
    //despues crea un evento de click al boton "create" 
    btnCreate.addEventListener('click', () => {
        /*la funcion de "callback" adquiere primero los valores de los dos elementos introducidos
        por el usuario en los inputs de texto*/
        let price = document.getElementById('item-price-create');
        let name = document.getElementById('item-name-create');
        
        //mira si el usuario ha introducido un numero, si no, retorna -1
        if(isNaN(parseInt(price.value)))return -1;
        /*despues crea el elemento que va a ser rendeado en la pagina web y
        luego inserta la fila usando un "template literal" de esos xD*/
        let div = document.createElement('div');
        div.innerHTML =
            `<div class="row">
        <div class="col"><span class="item-name">${name.value}</span></div>
        <div class="col"><span class="item-price">${price.value}€</span></div>
        <div class="col"><label for="qty">qty:</label><input class="qty" type="text" name="quantity" id="qty"></div>
        <div class="col"><span class="total-item"></span></div>
        <div class="col"><button class="btn btn-delete">delete</button></div>
        </div>`;
        //Despues resetea los valores de los inputs
        price.value = "";
        name.value = "";
        //despues adquiere la fila "row-create" y inserta la nueva fila antes
        let rowToInsertBefore = document.getElementById("row-create");
        rowToInsertBefore.insertAdjacentElement('beforebegin', div);
        /*por ultimo vuelve a añadir los eventos de borrado a todos los botones
        PD: No se si asi es mucho meenos eficiente que hacerlo boton a boton, pero es mucho mas rapido de
        programar */
        addDeleteEvents();

    });
}
/*Añade un evento de click al boton de calcular precios que calcula el precio total 
y luego renderea el resultado en el span "result"*/
const addCalculatePricesEvent = () => {
    //primero adquiere el elemento "btn-sccs" que servit¡ra para calcular los precios
    let calcBtn = document.getElementById("btn-sccs");
    //luego le añade un evento de click
    calcBtn.addEventListener('click', () => {
        /*la funcion de callback captura todos los elementos de las clases 
        "item-price" y "qty", que contienen los precios y las cantidades de 
        cada item*/
        let prices = document.getElementsByClassName('item-price');
        let qty = document.getElementsByClassName("qty");
        /*utilizando un bucle map, multiplica el precio de cada item por su cantidad 
        y devuelve el producto a un nuevo array: totalAmount[n] = price[n]*qty[n] */
        let totalAmount = Array.from(qty).map((element,index)=>{
            return parseInt(element.value,10)*parseInt(prices[index].innerHTML);
        });
        //luego utilizando un reduce suma todos los elementos del array calculando la suma total
        let result = totalAmount.reduce((acumulator,element) => {
           return acumulator + element;
        },0);
        //mira si el resultado es un numero y si no lo es retorna -1
        if(isNaN(result))return -1;
        /*por ultimo, captura el elemento en el que aparece el total y le rendea el resultado */
        let resultInsert = document.getElementById("result");
        resultInsert.innerHTML = `${result}€`;
    });


}

let checkIfNumberError = (element) => {
if(isNaN(element))return -1;
}
const main = () => {
    addDeleteEvents();
    addRowEvent();
    addCalculatePricesEvent();
}

main();
