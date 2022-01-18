let currentCash = 0;
const exchangeRate = 1800;
let wonClicked = 0;
let dollarClicked = 0;
const item = document.getElementsByClassName("item");
const price = document.getElementsByClassName("price");
const buttons = document.querySelectorAll(".btn_money button");

function handleCash(inputMoney) {
    if(parseFloat(inputMoney.target.value) > 50 ) { //won
        if(dollarClicked === 1) {
            alert("you cannot click won");
            return ;
        }
        wonClicked = 1;
    	updateCash(inputMoney.target.value);   
    } else { //dollar
        if(wonClicked === 1 ) {
            alert("you cannot click dollar");
	        return ;
        }
        dollarClicked = 1;
	    updateCash(inputMoney.target.value);
    }		
    
    changeActive();
}

function updateCash(val) {
    currentCash += parseFloat(val); // 20 -> 10900 구매해볼것(13.94, parseFloat대신 Math.floor)
    console.log(currentCash + " " + val + "  " + Math.floor(val * 100) / 100);
    console.log(val);
    if(wonClicked === 1) {
        document.getElementById("moneycount").value = currentCash;
        document.getElementById("dollarmoneycount").value = Math.floor(currentCash / exchangeRate * 100) / 100;
    } else {
        document.getElementById("dollarmoneycount").value = Math.floor(currentCash * 100) / 100;
        document.getElementById("moneycount").value = Math.floor(currentCash*exchangeRate * 100) / 100;
    }
}

function changeActive() {
    let val = currentCash;
    if(dollarClicked == 1) {
        val = val * exchangeRate;
    }

    for (var i = 0; i < price.length; i++) {
        if (val >= parseInt(price[i].innerHTML)) {
            item[i].classList.add("on");
        } else {
            item[i].classList.remove("on");
        }
    }
}

function buy(goods) {
    if (goods.classList.contains("on")) {
        alert("구매 완료");
        printPurchaseImage(goods.id);
        if(wonClicked === 1) {
            updateCash(goods.getElementsByClassName("price")[0].innerHTML * -1);
        } else {
            updateCash(goods.getElementsByClassName("price")[0].innerHTML / exchangeRate* -1);
        }
    } else {
        alert("잔액이 부족합니다. 현금을 넣어주세요.");
    };
    changeActive();
}

function restReturn() {
    printReturnValue();
    updateCash(-1 * currentCash);
    changeActive();
    clearImage();
    wonClicked = 0 ;
    dollarClicked = 0;
}

function clearImage() {
    let imagebody = document.getElementById("receive_list");
    console.log(imagebody.childNodes);
    while(imagebody.childNodes.length > 2){
        imagebody.removeChild(imagebody.lastChild);
    }
}

function initReturnInfo() {
    let imagebody = document.getElementById("retValuebody").getElementsByTagName("tbody")[0];
    console.log("xxxxx");
    console.log(imagebody.childNodes);
    while(imagebody.childNodes.length !== 0){
        imagebody.removeChild(imagebody.lastChild);
    }
}

function printPurchaseImage(id) {
    let attr = id;
    imagebody = document.getElementById("receive_list");
    console.log(attr);
    attr = attr.replace("item","album"); 
    const newImage = document.createElement("img");
    newImage.setAttribute("src","img/"+attr+".png");
    console.log(newImage);
    imagebody.appendChild(newImage);
}

function printReturnValue() {

    let tablebody = document.getElementById("retValuebody").getElementsByTagName('tbody')[0];
    let val = Math.floor(currentCash*100);
    let dividor;
    document.getElementById("returnTotal").innerHTML = Math.floor(currentCash * 100) / 100;    
    initReturnInfo();
   
    let retType;
    if(wonClicked === 1) {
        retType = " (원)";
        dividor = new Array(100,500,1000,5000,10000,50000);
    } else {
        retType = " ($)";
        dividor = new Array(0.01,0.05,0.10,0.25,0.5,1,2,5,10,20,50);
    }
    document.getElementsByClassName("type").innerHTML = retType;

    for( let i = dividor.length -1 ;  i >= 0 ; i--) {       
        let amount = parseInt(dividor[i] * 100);
        if(parseInt(val / amount) !== 0) {
            const row = document.createElement("tr");
            const d1 = document.createElement("td");
            const d2 = document.createElement("td");

            d1.appendChild(document.createTextNode(dividor[i]));
            d2.appendChild(document.createTextNode( parseInt(val / amount)) );
            row.appendChild(d1);
            row.appendChild(d2);
            tablebody.appendChild(row);
            val -= (amount * parseInt(val/amount)); 
        }
    }
    document.getElementById("moneyname").innerHTML = retType;
}

buttons.forEach(button => button.addEventListener('click', handleCash));
