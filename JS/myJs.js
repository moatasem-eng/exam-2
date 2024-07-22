let baseUrl = "www.themealdb.com/api/json/v1/1/"

function closeSideBar(){
    $(".sideBar").animate({left:"-240px"},500)
    $(".open").removeClass("fa-x").addClass("fa-bars")
    $(".closeBar ul li").animate({
        opacity : "0",
        top : "100px"
    },500)
}
function openSideBar(){
    $(".sideBar").animate({left:"0px"},500)
    $(".open").removeClass("fa-bars").addClass("fa-x")
    $(".closeBar ul li").animate({
        opacity : "1",
        top : "0"
    },500)
}

$(".open").on("click",function(){
    if($(".sideBar").css("left") == "0px"){
        closeSideBar()
    }else{
        openSideBar()

    }
})


function clearPage(){
    $("#meals").empty();
    $("#searchMeals").empty();

}
// ----------------------------------------------------------------

async function getMeals(){
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://${baseUrl}search.php?s=`)
    let finalRes = await response.json()
    displayMeals(finalRes.meals , "meals")
    getMealData(finalRes.meals)
    console.log(finalRes);
    $(".inner-loading-screen").fadeOut(300)
}

getMeals();


function displayMeals(y ,selector){
    let data = y
    cartona = ``;
    if (data.length > 20 && selector != "meals") {
        for (let i = 0; i < 20; i++) {
            cartona += `
            <div class="col-md-3 ">
                        <div class="imgBox position-relative overflow-hidden rounded-1" id="${i}">
                            <img src="${data[i].strMealThumb}" class="w-100" alt="">
                            <div class="imgText position-absolute ">
                                <h2 class="fs-1 translate-middle-y">${data[i].strMeal}</h2>
                            </div>
                        </div>
                        
                    </div>`
            
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            cartona += `
            <div class="col-md-3 ">
                        <div class="imgBox position-relative overflow-hidden rounded-1" id="${i}">
                            <img src="${data[i].strMealThumb}" class="w-100" alt="">
                            <div class="imgText position-absolute ">
                                <h2 class="fs-1 translate-middle-y">${data[i].strMeal}</h2>
                            </div>
                        </div>
                        
                    </div>`
            
        }
    }
    let x = document.querySelector(`#${selector}`)
    x.innerHTML = cartona;
    forHover()
    

}

function forHover(){
    $(".imgBox").hover(function(e){
        let {target} = e
        $(target).next().css({
            "top" : "0",
            
        })
    },function(){
        
        $(".imgText").css({
            "top" : "100%",
            
        })
    }
    )
}



function getMealData(x){
    $(".imgBox").on('click',function(e){
        clearPage()
        let index = this.id
        
        displayMealData(x,index);
        
        
    })
    
}

function btnClick(x) {
    window.location.href = x
}


function displayMealData(x , index){
    let i = index
    let data = x[i] ;
    
    cartona = ``
    
    for (let j = 1; j < 21; j++) {
        let ingredient = `strIngredient${j}`
        
        cartona += `
                <div class=" smallBox rounded-2 m-2 text-primary-emphasis bg-info-subtle">
                    <p class=" m-0">${data[ingredient]}</p>
                </div>
        `
        
    }

    mealData =`
                <div class="col-md-4" id="mealImg">
                    <img src="${data.strMealThumb}" class="w-100 rounded-1" alt="">
                    <h2 class="text-white">${data.strMeal}</h2>
                </div>
                <div class="col-md-8 " id="mealData">
                    <h1 class="text-white">Instructions</h1>
                    <p class="text-white">${data.strInstructions}</p>
                        <h2 class="text-white"><span class="fw-bold">Area</span> :${data.strArea} </h2>
                        <h2 class="text-white"><span class="fw-bold">Category</span> :${data.strCategory} </h2>
                        <h2 class="fw-bold text-white">Recipes :</h2>
                        <div class="recipsBox d-flex row ">
                            
                            
                        </div>
                        <h2 class="fw-bold mt-2 text-white">Tags :</h2>
                        <div class="tagsBox d-flex row ">
                            <div class=" smallBox rounded-2 m-2 text-danger-emphasis bg-danger-subtle">
                                <p class=" m-0"> ${data.strTags}</p>
                            </div>
                            
                        </div>
                        <div class=" mt-3">
                            <button type="button" onclick="btnClick('${data.strSource}')" class="btn btn-success ">Source</button>
                            <button type="button" onclick="btnClick('${data.strYoutube}')" class="btn btn-danger">Youtube</button>
                        </div>
                </div>
    `;
    
    
    let mData = document.querySelector("#meals");
    mData.innerHTML = mealData ;
    let recipes = document.querySelector(".recipsBox")
    recipes.innerHTML = cartona
    
}
// ---------------------------------------------------------------------------
// search


    $("#search").on('click',function(){
        clearPage()
        closeSideBar()
        displaySearch()
    })




function displaySearch(){
    let s =`
            <div class=" d-flex ">
                    <div class="col-md-6">
                        <div class="mb-3 container">
                            
                            <input type="text" onkeyup="searchName(this.value)" class="form-control bg-black text-white" id="searchName" placeholder="search by name">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3 container">
                            
                            <input type="text" onkeyup="searchLetter(this.value)" class="form-control bg-black text-white" id="searchLetter" placeholder="search by first letter">
                        </div>
                    </div>
                </div>
    `
    let inSearch = document.querySelector("#meals")
    inSearch.innerHTML = s ;
}

async function searchName(searchInput){
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://${baseUrl}search.php?s=${searchInput}`)
    let finalRes = await response.json()
    displayMeals(finalRes.meals , "searchMeals")
    getMealData(finalRes.meals)
    console.log(finalRes);
    $(".inner-loading-screen").fadeOut(300)
}


async function searchLetter(searchInput){

    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://${baseUrl}search.php?f=${searchInput}`)
    let finalRes = await response.json()
    displayMeals(finalRes.meals , "searchMeals")
    getMealData(finalRes.meals)
    console.log(finalRes);
    $(".inner-loading-screen").fadeOut(300)
}
// -------------------------------------------------------------------------
// category

$("#category").on('click', function(){
    clearPage();
    // displayCategory();
    closeSideBar()
    getCategory()
})

async function getCategory(){
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://${baseUrl}categories.php`)
    let finalRes = await response.json()

    console.log(finalRes.categories);
    displayCategory(finalRes.categories);
    getCatData(finalRes.categories.strCategory)
    // getCatData(finalRes.categories)
    $(".inner-loading-screen").fadeOut(300)
} 



function displayCategory(x){
    let data = x;
    cartona =``;

    for (let i = 0; i < data.length ; i++) {
        cartona += `
                    <div class="col-md-3 ">
                        <div class="imgBox position-relative overflow-hidden rounded-1 " onclick="getCategoryMeals('${data[i].strCategory}')" id="${i}">
                            <img src="${data[i].strCategoryThumb}" class="w-100" alt="">
                            <div class="imgText position-absolute d-flex flex-column justify-content-center align-items-center text-center">
                                <h2 class="fs-1 p-2 top-0 mb-2">${data[i].strCategory}</h2>
                                <p class="my-4">${data[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                            </div>
                        </div>
                        
                    </div>
        `
        
    }
    let y = document.querySelector("#meals")
    y.innerHTML = cartona;
    forHover()

}
function getCatData(x){
    $(".imgBox").on('click',function(e){
        clearPage()
        let index = this.id
        
        // getCategoryMeals()
        displayMealData(x , index)
        
    })
    
}
async function getCategoryMeals(data){
    clearPage()
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://${baseUrl}filter.php?c=${data}`)
    let finalRes = await response.json()
    
    catMeals(finalRes.meals)
    getCatData(finalRes.meals)
    console.log(finalRes)
    $(".inner-loading-screen").fadeOut(300)
}
function catMeals(x){
    let data = x
    cartona =``
    for (let i = 0; i < data.length; i++) {
        cartona += `
        <div class="col-md-3 ">
                    <div class="imgBox position-relative overflow-hidden rounded-1" id="${i}">
                        <img src="${data[i].strMealThumb}" class="w-100" alt="">
                        <div class="imgText position-absolute ">
                            <h2 class="fs-1 translate-middle-y">${data[i].strMeal}</h2>
                        </div>
                    </div>
                    
                </div>`
        
    }

    let y = document.querySelector("#meals")
    y.innerHTML = cartona
    forHover()
    // getCatData(data)
}
// ---------------------------------------------------------------------------------------------------------------
// area 

$("#area").on('click',function(){
    clearPage()
    closeSideBar()
    getAreaData();
})

async function getAreaData(){
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://${baseUrl}list.php?a=list`)
    let finalRes = await response.json()
    // console.log(finalRes.meals);
    displayArea(finalRes.meals)
    $(".inner-loading-screen").fadeOut(300)
}


function displayArea(x){
    let data = x;
    let cartona = ``;

    for (let i = 0; i < data.length; i++) {
        cartona += `<div class="col-md-3">
                        <div onclick="areaMeals('${data[i].strArea}')" class=" w-25 mx-auto text-white">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>${data[i].strArea}</h3>
                        </div>    
                    </div>`
    }
    let y = document.querySelector("#meals")
    y.innerHTML = cartona ;
}

async function areaMeals(data){
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://${baseUrl}filter.php?a=${data}`)
    let finalRes = await response.json()
    console.log(finalRes.meals)
    displayMeals(finalRes.meals , "meals")
    getCatData(finalRes.meals)
    $(".inner-loading-screen").fadeOut(300)
}

// --------------------------------------------------------------------------------------
// ingredients

$("#ingredients").on('click',function(){
    clearPage()
    closeSideBar()
    getInData();
})
async function getInData(){
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://${baseUrl}list.php?i=list`)
    let finalRes = await response.json()
    displayIng(finalRes.meals)
    // console.log(finalRes.meals)
    $(".inner-loading-screen").fadeOut(300)
}

function displayIng(x){
    let data = x
    cartona =``

    for (let i = 0; i < 20; i++) {
        cartona += `
            <div class="col-md-3">
                <div onclick="getIngMeals('${data[i].strIngredient}')" class=" rounded-2 text-center text-white">
                        <i class="fa-solid fa-drumstick-bite fa-4x mb-2"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>
        `
        
    }
    let y = document.querySelector("#meals")
    y.innerHTML = cartona
}

async function getIngMeals(data){
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://${baseUrl}filter.php?i=${data}`)
    let finalRes = await response.json()

    displayMeals(finalRes.meals , "meals")
    getCatData(finalRes.meals)
    $(".inner-loading-screen").fadeOut(300)
}
// -----------------------------------------------------------------------------------------
// contact us

$("#contactUs").on('click',function(){
    clearPage()
    closeSideBar()

    displayContactUs()
})


function displayContactUs(){
    x =
    `
    
                <div class="col-md-6">
                    <input id="name" onkeyup="validationInputs()" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 my-3 d-none">
                        Special Characters & Numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="email" onkeyup="validationInputs()" type="email" class="form-control " placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 my-3 d-none">
                        Enter a valid Email Ex: mail@testing.com
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="number" onkeyup="validationInputs()" type="text" class="form-control " placeholder="Enter Your Phone">
                    <div id="numAlert" class="alert alert-danger w-100 my-3 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="age" onkeyup="validationInputs()" type="number" class="form-control " placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 my-3 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="pass" onkeyup="validationInputs()" type="password" class="form-control " placeholder="Enter Your Password">
                    <div id="passAlert" class="alert alert-danger w-100 my-3 d-none">
                        Enter valid password which contain minimum 8 characters containing at least 1 letter and 1 number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="repass" onkeyup="validationInputs()" type="password" class="form-control " placeholder="Re-enter password">
                    <div id="repassAlert" class="alert alert-danger w-100 my-3 d-none">
                        Enter a valid password
                    </div>
                </div>
            
            <button id="submitBtn" disabled class="btn btn-outline-danger d-block mx-auto px-3 mt-5 btn-style">Submit</button>
    `
    let y = document.querySelector("#meals")
    y.innerHTML = x
}



let submitBtn = document.querySelector("#submitBtn");
let fname = document.querySelector("#name");
let email = document.querySelector("#email");
let number = document.querySelector("#number");
let age = document.querySelector("#age");
let pass = document.querySelector("#pass");
let repass = document.querySelector("#repass");
let nameAlert = document.querySelector("#nameAlert");
let emailAlert = document.querySelector("#emailAlert");
let numAlert = document.querySelector("#numAlert");
let ageAlert = document.querySelector("#ageAlert");
let passAlert = document.querySelector("#passAlert");
let repassAlert = document.querySelector("#repassAlert");

    $("#name").on("focus", function () { namePressed = true; })
    $("#email").on("focus", function () { emailPressed = true; })
    $("#number").on("focus", function () { numPressed = true; })
    $("#age").on("focus", function () { agePressed = true; })
    $("#pass").on("focus", function () { passPressed = true; })
    $("#repass").on("focus", function () { repassPressed = true; })

    
function validationInputs(){
    flag = 0 ;
    if (namePressed) {
        nameRegex = /^[a-zA-Z]+$/
        if (nameRegex.test(fname.value)) {
            nameAlert.classList.replace("d-block", "d-none")
            flag = 1;
        } else {
            nameAlert.classList.replace("d-none", "d-block")
            flag = 0 
        }
    }

    if (emailPressed) {
        emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
        if (emailRegex.test(email.value)) {
            emailAlert.classList.replace("d-block", "d-none")
            flag = 1
        } else {
            emailAlert.classList.replace("d-none", "d-block")
            flag = 0
        }
    }

    if (numPressed) {
        numRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        if (numRegex.test(number.value)) {
            phoneAlert.classList.replace("d-block", "d-none")
            flag = 1
        } else {
            phoneAlert.classList.replace("d-none", "d-block")
            flag = 0
        }
    }

    if (agePressed) {
        ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
        if (ageRegex.test(age.value)) {
            ageAlert.classList.replace("d-block", "d-none")
            flag = 1
        } else {
            ageAlert.classList.replace("d-none", "d-block")
            flag = 0

        }
    }

    if (passPressed) {
        passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        if (passRegex.test(pass.value)) {
            passAlert.classList.replace("d-block", "d-none")
            flag = 1
        } else {
            passAlert.classList.replace("d-none", "d-block")
            flag = 0
        }
    }

    if (repassPressed) {
        
        if (pass == repass) {
            repassAlert.classList.replace("d-block", "d-none")
            flag = 1
        } else {
            repassAlert.classList.replace("d-none", "d-block")
            flag = 0
        }
    }

    if (flag == 1) {
        submitBtn.removeAttribute("disabled")
    } else {
        
        submitBtn.setAttribute("disabled", true)
    }
}