var buyingOrSellingArray = new Array();
buyingOrSellingArray["Buying"]=true;
buyingOrSellingArray["Selling"]=false;

//::::::::::::::::::::::::::::::::::::::::::::::::::::FUNCTIONS:::::::::::::::::::::::::::::::::::::::::::::::

/*<FUNCTION SUMMARY>
 
This function will return a bool depending on what radial is pressed in the form...
first I get a reference to the form
then i create a variable and set it to false
next i get a reference to the radial buttons with the id buyOrSell
last i loop through the reference i had just created and if something is ticked
i set the bool variable to the value found in the array element created aboves value
break out of the for loop because our buisness here is done
return buy.

</FUNCTION SUMMARY>*/

function FigureOutBuyingOrSelling(){
    var comForm = document.forms["StockTransactionForm"];
    var buy = false;
    var buyingOrSellingRef = comForm.elements["buyOrSell"];
    for(var i = 0; i < buyingOrSellingRef.length; i++){
        if(buyingOrSellingRef[i].checked){
            buy = buyingOrSellingArray[buyingOrSellingRef[i].value];
            break;
        }
    }
    return buy;
}

/*<FUNCTION SUMMARY>
 
This function will return the price the user input in the price of shares field
first i get a reference to the form
then i create a variable to store the priceOfShares element from the form
next i create a variable to store the price
check if the field value is not empty
if its not empty parse the text from the form element and set it to price
return the price

</FUNCTION SUMMARY>*/

function GetPriceOfShares(){
    var comForm = document.forms["StockTransactionForm"];
    var getPrice = comForm.elements["priceOfShares"];
    var price = 0;
    if(getPrice.value!=""){
        price = parseInt(getPrice.value);
    }
    return price;
}

/*<FUNCTION SUMMARY>
 
This function will return the number of shares the user input in the number of shares field
first i get a reference to the form
next get a reference to the element in the form
next create a variable to store the data in and set it to 0
check if the field is not empty
if its not empty parse the text from the form and set it to shares variable
return the shares

</FUNCTION SUMMARY>*/

function GetNumberOfShares(){
    var comForm = document.forms["StockTransactionForm"];
    var getNumShares = comForm.elements["numberOfShares"];
    var shares = 0;
    if(getNumShares.value!=""){
        shares = parseInt(getNumShares.value);
    }
    return shares;
}

/*<FUNCTION SUMMARY>
 
This function will return the commision the user input in the commision field
first i get a reference to the form
then i create a variable to store the commission element from the form
next i create a variable to store the commision
check if the field value is not empty
if its not empty parse the text from the form element and set it to commission
return the commission

</FUNCTION SUMMARY>*/

function GetCommissionCost(){
     var comForm = document.forms["StockTransactionForm"];
    var getCommission = comForm.elements["commission"];
    var commission = 0;
    if(getCommission.value!=""){
        commission = parseFloat(getCommission.value);
    }
    return commission;
}

/*<FUNCTION SUMMARY>
 
This function is called when the user selects a radial button on the form
This function takes the Number of shares, price of shares, and commision fields
and calculates the total cost or profit.
first i create a commission total variable and set it to the price * numofshares * commission
then i create a totalCost variable and set it to the price of shares * number of shares
then i create a variable and add the commission total and total cost variables together
lastly i format the total using toLocaleString function (built in) which gives me my comma
next i check if were buying or selling
console log the total, and then set the div element in the form to the total with some text
and set the color eithe red when its costing you money, and green when you have profit.

</FUNCTION SUMMARY>*/

function GetTotal(){
    var commissionTotal = GetPriceOfShares() * GetNumberOfShares() * GetCommissionCost();
    var totalCost = GetPriceOfShares() * GetNumberOfShares();
    var total = commissionTotal + totalCost;
    var totalFormatted = total.toLocaleString();
    
    if (FigureOutBuyingOrSelling() === true){
        console.log("Total cost of transaction: $" + totalFormatted);
        document.getElementById("totalAmount").innerHTML = "Total Cost: $" + totalFormatted;   
        document.getElementById("totalAmount").style.backgroundColor = "red";
    }
    else{
        console.log("Total profit of transaction: $" + totalFormatted)
        document.getElementById("totalAmount").innerHTML = "Total Profit: $" + totalFormatted;
        document.getElementById("totalAmount").style.backgroundColor = "green";
    }
}
