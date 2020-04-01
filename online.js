function items(name, price, image) {
    this.name = name;
    this.price = price;
    this.image = image;
}

let cap = new items("Palm Tree Cap", 80, "images/cap.jpg");
let outfit = new items("SuPa Outfit", 400, "images/outfit.jpg");
let jacket = new items("Denim Jacket", 500, "images/jacket.jpg");
let tShirt = new items("Skeleton-hand T-shirt", 150, "images/tee.jpg");
let jean = new items("Black Denim Jean", 300, "images/pants.jpg");

let tot = null;
let item = null;
let meItems = [];
let VAT = 15 / 100;
let discount = 10 / 100;
let discountInfo = [];

function disp() {
    if (sessionStorage.getItem("codeRan") === null) {
        sessionStorage.setItem("cart", JSON.stringify(meItems));
        sessionStorage.setItem("total", JSON.stringify(tot));
        sessionStorage.setItem("items", JSON.stringify(item));
        sessionStorage.setItem("codeRan", true);
        sessionStorage.setItem("discount", 0);
    } else {
        meItems = JSON.parse(sessionStorage.getItem("cart"));
        tot = JSON.parse(sessionStorage.getItem("total"));
        item = JSON.parse(sessionStorage.getItem("items"));
        let i = 0;
        meItems.forEach(function(x) {
            let opt = document.createElement("option");
            let mySelect = document.getElementById("added");
            let images = document.getElementById("images");
            let info = document.getElementById("info");
            let pic = document.createElement("img");
            let pTag = document.createElement("li");
            opt.innerHTML = x.name;
            opt.value = x.price;
            i += 1;
            let foto = x.image;
            pic.src = foto;
            pTag.innerHTML = x.name + "  =   R " + x.price;
            mySelect.appendChild(opt);
            images.appendChild(pic);
            info.appendChild(pTag);
        });
        document.getElementById("VATincl").innerHTML = "Your total including VAT is :R" + tot;
        document.getElementById("onlyVAT").innerHTML = "& your VAT is :R" + VAT * tot;
        document.getElementById("itemCounter").innerHTML = item + "item(s)";
    }
}

function capCart() {
    tot += cap.price;
    alert("You've added the " + cap.name + " to your cart & Your total is now: R" + tot);
    item += 1;
    document.getElementById("itemCounter").innerHTML = item + " item(s)";
    meItems.push(cap);
    sessionStorage.setItem("cart", JSON.stringify(meItems));
    sessionStorage.setItem("total", JSON.stringify(tot));
    sessionStorage.setItem("items", JSON.stringify(item));
}

function outfitCart() {
    tot += outfit.price;
    alert("You've added the " + outfit.name + " to your cart & Your total is now: R" + tot);
    item += 1;
    document.getElementById("itemCounter").innerHTML = item + " item(s)";
    meItems.push(outfit);
    sessionStorage.setItem("cart", JSON.stringify(meItems));
    sessionStorage.setItem("total", JSON.stringify(tot));
    sessionStorage.setItem("items", JSON.stringify(item));
}

function jacketCart() {
    tot += jacket.price;
    alert("You've added the " + jacket.name + " to your cart & Your total is now: R" + tot);
    item += 1;
    document.getElementById("itemCounter").innerHTML = item + " item(s)";
    meItems.push(jacket);
    sessionStorage.setItem("cart", JSON.stringify(meItems));
    sessionStorage.setItem("total", JSON.stringify(tot));
    sessionStorage.setItem("items", JSON.stringify(item));
}

function tShirtCart() {
    tot += tShirt.price;
    alert("You've added the " + tShirt.name + " to your cart & Your total is now: R" + tot);
    item += 1;
    document.getElementById("itemCounter").innerHTML = item + " item(s)";
    meItems.push(tShirt);
    sessionStorage.setItem("cart", JSON.stringify(meItems));
    sessionStorage.setItem("total", JSON.stringify(tot));
    sessionStorage.setItem("items", JSON.stringify(item));
}

function jeanCart() {
    tot += jean.price;
    alert("You've added the " + jean.name + " to your cart & Your total is now: R" + tot);
    item += 1;
    document.getElementById("itemCounter").innerHTML = item + " item(s)";
    meItems.push(jean);
    sessionStorage.setItem("cart", JSON.stringify(meItems));
    sessionStorage.setItem("total", JSON.stringify(tot));
    sessionStorage.setItem("items", JSON.stringify(item));
}

function remove() {
    meItems = JSON.parse(sessionStorage.getItem("cart"));
    tot = JSON.parse(sessionStorage.getItem("total"));
    item = JSON.parse(sessionStorage.getItem("items"));
    let mySelect = document.getElementById("added");
    let myIndex = mySelect.selectedIndex;
    let myPrice = mySelect.options[mySelect.selectedIndex].value;
    meItems.splice(myIndex, 1);
    item = item - 1;
    tot = tot - myPrice;
    sessionStorage.setItem("cart", JSON.stringify(meItems));
    sessionStorage.setItem("total", JSON.stringify(tot));
    sessionStorage.setItem("items", JSON.stringify(item));
    location.reload();
}

function myDiscount() {
    myDiscount = JSON.parse(sessionStorage.getItem("discount"));
    if (myDiscount === 0) {
        tot = JSON.parse(sessionStorage.getItem("total"));
        tot -= discount * tot;
        document.getElementById("VATincl").innerHTML = "Your total including VAT is :R" + tot;
        document.getElementById("onlyVAT").innerHTML = "& your VAT is :R" + VAT * tot;
        alert("Thank You!! Youv've recieved a discount of 10%, now your total is:R" + tot);
        sessionStorage.setItem("total", JSON.stringify(tot));
        sessionStorage.setItem("discount", 1);
    } else {
        alert("Sorry you have already cashed in on your discount");
    }
}

$(document).ready(function() {
    tot = JSON.parse(sessionStorage.getItem("total"));
    if (tot <= 500) {
        $("#discount").slideUp();
    } else {
        $("#discount").css({ "visibility": "visible" });
    }
    let meMap = new Map();

    meMap.set("collection", 0);
    meMap.set("standard delivery", 30);
    meMap.set("premuim delivery", 100);

    let htmlSelect = document.getElementById("htmlSelect");

    for ([key, value] of meMap) {
        let newOption = document.createElement("option");
        newOption.value = value;
        htmlSelect.add(newOption);
        newOption.text = [key];
    }
    $("#animate").animate({"width":"100%"},"slow");
    $("#chain").slideUp().slideDown();
});

function changeTot() {
    tot = JSON.parse(sessionStorage.getItem("total"));
    let select = document.getElementById("htmlSelect");
    let added = select.options[select.selectedIndex].value;
    tot += parseFloat(added);
    document.getElementById("VATincl").innerHTML = "Your total including VAT is :R" + tot;
    document.getElementById("onlyVAT").innerHTML = "& your VAT is :R" + VAT * tot;
    sessionStorage.setItem("total");
}

function confirmOrder() {
    tot = JSON.parse(sessionStorage.getItem("total"));
    let refNo = Math.floor(Math.random() * 10000);
    alert("Your order has been successful!!" + "\n" + "Your total is: R" + tot + "\n" + "Your reference number is: " + refNo);
}