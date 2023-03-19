const documentHTML = document;

const LoadingIcon = documentHTML.getElementById("LoadingIcon");
const workContainer = documentHTML.getElementById("workContainer");
const searchContainer = documentHTML.getElementById("searchContainer");



//Action Btns
const searchBtn = documentHTML.getElementById("searchBtn");
const categoriesBtn = documentHTML.getElementById("categoriesBtn");
const areaBtn = documentHTML.getElementById("areaBtn");
const ingrediantesBtn = documentHTML.getElementById("ingrediantesBtn");
const contactBtn = documentHTML.getElementById("contactBtn");
const returnHome = documentHTML.getElementById("returnHome");
const modeBtn = documentHTML.getElementById("mode");

//Contact Btns {to be used later}
//Form fields Flags {to be used later}

let submitBtn;
let submitForm;
let toggler;
let closeBtn;
let togglerRepass;
let nameInputTouched = false;
let emailInputTouched = false;
let teleInputTouched = false;
let ageInputTouched = false;
let passInputTouched = false;
let rePassInputTouched = false;


/*****************************Functions******************************** */

/***********Home Page Meals Section********************** */

async function getStartMeals() {
  LoadingIcon.classList.remove("d-none");
  searchContainer.classList.add("d-none");

  const options = {
    method: "GET",
  };
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`,
    options
  );

  const response = await api.json();
  // console.log(response.meals);
  displayStartMeals(response.meals);
  LoadingIcon.classList.add("d-none");
}

function displayStartMeals(data) {
  let cardContainer = ``;
  for (let i = 0; i < data.length; i++) {
    cardContainer += `
      <div class="col-lg-3 col-md-4 ">
      <div onclick="getMealDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${data[i].strMealThumb}" alt="">
          <div class="meal-layer position-absolute d-flex align-items-center justify-content-center p-2">
              <h3 class='text-center text-capitalize'>${data[i].strMeal}</h3>
          </div>
      </div>
</div>
`;
  }

  workContainer.innerHTML = `
  <div class='fw-bold w-100'>
  <h2 class='text-center'>Most Popular Meals Choosen For You</h2>
  </div>
  
  ${cardContainer}`;
  workContainer.style.marginLeft = "60px";
}

/***********Get Categories Section********************** */

async function getCategories() {
  workContainer.innerHTML = "";
  LoadingIcon.classList.remove("d-none");
  searchContainer.classList.add("d-none");

  const options = {
    method: "GET",
  };

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`,
    options
  );
  response = await response.json();

  //console.log(response);

  displayCategories(response.categories);
  LoadingIcon.classList.add("d-none");
}

function displayCategories(categories) {
  let cardContainer = ``;

  for (let i = 0; i < categories.length; i++) {
    cardContainer += `
    
    <div class="col-lg-3 col-md-4">
            <div onclick="getCategoryMeals('${
              categories[i].strCategory
            }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${
                  categories[i].strCategoryThumb
                }" alt="">
                <div class="meal-layer position-absolute text-center p-2">
                    <h3>${categories[i].strCategory}</h3>
                    <p>${
                      categories[i].strCategoryDescription.split(".", 1)[0]
                    }</p>
                </div>
            </div>
    </div>
    `;
  }

  workContainer.innerHTML = `
  <div class='position-relative w-100'>
  <i class="fa-solid fa-xmark me-2 fa-xl position-absolute end-0 top-25" id='closeBtn'></i>
  </div>
  
  ${cardContainer}`;
  workContainer.style.marginLeft = "50px";

  closeBtn = documentHTML.getElementById("closeBtn");
  closeBtn.addEventListener("click", getStartMeals);
}

async function getCategoryMeals(category) {
  workContainer.innerHTML = "";
  LoadingIcon.classList.remove("d-none");
  // searchContainer.innerHTML = "";

  const options = {
    method: "GET",
  };

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    options
  );
  response = await response.json();

  //console.log(response);

  displayCategoryMeals(response.meals);
  LoadingIcon.classList.add("d-none");
}

function displayCategoryMeals(data) {
  let cardContainer = ``;
  for (let i = 0; i < data.length; i++) {
    cardContainer += `
      <div class="col-lg-3 col-md-4 ">
      <div onclick="getMealDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${data[i].strMealThumb}" alt="">
          <div class="meal-layer position-absolute d-flex align-items-center justify-content-center p-2">
              <h3 class='text-center text-capitalize'>${data[i].strMeal}</h3>
          </div>
      </div>
</div>
`;
  }

  workContainer.innerHTML = `
  <div class='position-relative w-100'>
  <i class="fa-solid fa-xmark me-2 fa-xl position-absolute end-0 top-25" id='closeBtn'></i>
  </div>
  
  ${cardContainer}`;
  workContainer.style.marginLeft = "60px";

  closeBtn = documentHTML.getElementById("closeBtn");
  closeBtn.addEventListener("click", getCategories);
}

/***********Area Categories Section********************** */

async function getArea() {
  workContainer.innerHTML = "";
  LoadingIcon.classList.remove("d-none");
  searchContainer.classList.add("d-none");

  const options = {
    method: "GET",
  };

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`,
    options
  );
  response = await response.json();

  //console.log(response.meals);

  displayArea(response.meals);
  LoadingIcon.classList.add("d-none");
}

function displayArea(area) {
  let cardContainer = ``;

  for (let i = 0; i < area.length; i++) {
    cardContainer += `
    
    <div class="col-lg-3 col-md-4">
                <div onclick="getAreaMeals('${area[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-flag fa-5x flagIcon"></i>
                        <h3>${area[i].strArea}</h3>
                </div>
        </div>
    `;
  }

  workContainer.innerHTML = `
  <div class='position-relative w-100'>
  <i class="fa-solid fa-xmark me-2 fa-xl position-absolute end-0 top-25" id='closeBtn'></i>
  </div>
  
  ${cardContainer}`;
  workContainer.style.marginLeft = "50px";

  closeBtn = documentHTML.getElementById("closeBtn");
  closeBtn.addEventListener("click", getStartMeals);
}

async function getAreaMeals(area) {
  workContainer.innerHTML = "";
  LoadingIcon.classList.remove("d-none");

  const options = {
    method: "GET",
  };

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`,
    options
  );
  response = await response.json();

  //console.log(response);

  displayAreaMeals(response.meals);
  LoadingIcon.classList.add("d-none");
}

function displayAreaMeals(data) {
  let cardContainer = ``;
  for (let i = 0; i < data.length; i++) {
    cardContainer += `
      <div class="col-lg-3 col-md-4 ">
      <div onclick="getMealDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${data[i].strMealThumb}" alt="">
          <div class="meal-layer position-absolute d-flex align-items-center justify-content-center p-2">
              <h3 class='text-center text-capitalize'>${data[i].strMeal}</h3>
          </div>
      </div>
</div>
`;
  }

  workContainer.innerHTML = `
  <div class='position-relative w-100'>
  <i class="fa-solid fa-xmark me-2 fa-xl position-absolute end-0 top-25" id='closeBtn'></i>
  </div>
  
  ${cardContainer}`;
  workContainer.style.marginLeft = "60px";

  closeBtn = documentHTML.getElementById("closeBtn");
  closeBtn.addEventListener("click", getArea);
}

/***********Get Ingredients Section********************** */

async function getIngredients() {
  workContainer.innerHTML = "";
  LoadingIcon.classList.remove("d-none");
  searchContainer.classList.add("d-none");

  const options = {
    method: "GET",
  };

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`,
    options
  );
  response = await response.json();

  // console.log(response.meals);

  displayIngredient(response.meals);
  LoadingIcon.classList.add("d-none");
}

function displayIngredient(data) {
  let cardContainer = ``;

  for (let i = 0; i < 20; i++) {
    cardContainer += `
    
    <div class="col-lg-3 col-md-4 ">
      <div onclick="getIngredientMeals('${
        data[i].strIngredient
      }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="https://www.themealdb.com/images/ingredients/${
            data[i].strIngredient
          }.png" alt="">
          <div class="meal-layer position-absolute text-center d-flex flex-column justify-content-center align-items-center p-2">
              <h3 class='text-center text-capitalize'>${
                data[i].strIngredient
              }</h3>
              <p>${data[i].strDescription?.split(".", 1)[0]}</p>
          </div>
      </div>
</div>
    `;
  }

  workContainer.innerHTML = `
  <div class='position-relative w-100'>
  <i class="fa-solid fa-xmark me-2 fa-xl position-absolute end-0 top-25" id='closeBtn'></i>
  </div>
  
  ${cardContainer}`;
  workContainer.style.marginLeft = "60px";

  closeBtn = documentHTML.getElementById("closeBtn");
  closeBtn.addEventListener("click", getStartMeals);
}

async function getIngredientMeals(ingredient) {
  workContainer.innerHTML = "";
  LoadingIcon.classList.remove("d-none");
  // searchContainer.classList.add("d-none");

  const options = {
    method: "GET",
  };

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    options
  );
  response = await response.json();

  //console.log(response.meals);

  displayIngredientMeals(response.meals);
  LoadingIcon.classList.add("d-none");
}

function displayIngredientMeals(data) {
  let cardContainer = ``;
  for (let i = 0; i < data.length; i++) {
    cardContainer += `
      <div class="col-lg-3 col-md-4 ">
      <div onclick="getMealDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${data[i].strMealThumb}" alt="">
          <div class="meal-layer position-absolute d-flex align-items-center justify-content-center p-2">
              <h3 class='text-center text-capitalize'>${data[i].strMeal}</h3>
          </div>
      </div>
</div>
`;
  }

  workContainer.innerHTML = `
  <div class='position-relative w-100'>
  <i class="fa-solid fa-xmark me-2 fa-xl position-absolute end-0 top-25" id='closeBtn'></i>
  </div>
  
  ${cardContainer}`;
  workContainer.style.marginLeft = "60px";

  closeBtn = documentHTML.getElementById("closeBtn");
  closeBtn.addEventListener("click", getIngredients);
}

/***********Get Search Section********************** */
async function fetchSearch() {
  searchContainer.classList.remove("d-none");
  workContainer.innerHTML = ``;
  documentHTML.getElementById('searchName').value='';
  documentHTML.getElementById('searchLetter').value='';
}


async function searchByName(name) {
  documentHTML.getElementById('searchLetter').value=''
  workContainer.innerHTML = ""
  LoadingIcon.classList.remove("d-none");
  

  const options = {
    method: "GET",
  };

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
    options
  );
  response = await response.json();

  //console.log(response.meals);
 
  response.meals ? displaySMeals(response.meals) : displaySMeals([])

  LoadingIcon.classList.add("d-none");
}

async function searchByFLetter(letter) {
  documentHTML.getElementById('searchName').value=''
  workContainer.innerHTML = "";
  LoadingIcon.classList.remove("d-none");

const options = {
  method: "GET",
};

//to solve the { error uncaught (in promise) syntaxerror unexpected end of json input}
//caused by the EndPoint 
letter == ''? letter = 'r' : ''

let response = await fetch(
  `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,options
);

response = await response.json();

//console.log(response.meals);

response.meals ? displaySMeals(response.meals) : displaySMeals([]);

LoadingIcon.classList.add("d-none");

}

function displaySMeals(data) {
  if (data === null) {
    workContainer.innerHTML = ``;
  } else {
    let cardSContainer = ``;
    for (let i = 0; i < data.length; i++) {
      cardSContainer += `
      <div class="col-lg-3 col-md-4 ">
      <div onclick="getMealDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${data[i].strMealThumb}" alt="">
          <div class="meal-layer position-absolute d-flex align-items-center justify-content-center p-2">
              <h3 class='text-center text-capitalize'>${data[i].strMeal}</h3>
          </div>
      </div>
</div>
`;

      workContainer.innerHTML = cardSContainer;

      workContainer.style.marginLeft = "60px";
    }
  }
}

/********************************* Meal Details**************************** */

async function getMealDetails(id){
  workContainer.innerHTML = ""
  LoadingIcon.classList.remove("d-none");
  searchContainer.classList.add("d-none");
  

  const options = {
    method: "GET",
  };

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    options
  );
  response = await response.json();

  //console.log(response.meals[0]);
 
  displayMealDetails(response.meals[0]);

  LoadingIcon.classList.add("d-none");
}

function displayMealDetails(data){

  workContainer.innerHTML = ``;

  let ingredients = ``

  for (let i = 1; i <= 20; i++) {
      if (data[`strIngredient${i}`]) {
          ingredients += `<li class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
      }
  }


  let steps = ``
  let stepsArr = data.strInstructions.split(/\r?\n|\r|\n/g)

  for (let i = 0; i <stepsArr.length; i++) {
    if (stepsArr[i]) {
          steps += `<li class="m-2 p-1">${stepsArr[i]}</li>`
    }
  }

  let tags = data.strTags?.split(",")
 
  if (!tags) tags = []

  let tagsContainer = ''
  for (let i = 0; i < tags.length; i++) {
    if (tags[i]) {
    tagsContainer += `
      <li class="alert alert-info m-2 p-1">${tags[i]}</li>`
    }
  }

  let cardContainer = `

  <div class="col-md-4">
  <img class="w-100 rounded-3" src="${data.strMealThumb}"
      alt="">
      <h2>${data.strMeal}</h2>
    </div>
          <div class="col-md-8">
              <h2>Instructions</h2>
              ${steps}
              <h3><span class="fw-bolder">Area : </span>${data.strArea}</h3>
              <h3><span class="fw-bolder">Category : </span>${data.strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
              </ul>

              <h3>Tags :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                 ${tagsContainer}
              </ul>

              <a target="_blank" href="${data.strSource}" class="btn main-btn">Source</a>
              <a target="_blank" href="${data.strYoutube}" class="btn main-btn">Youtube</a>
          </div>`

   workContainer.innerHTML = `
  <div class='position-relative w-100'>
  <i class="fa-solid fa-xmark me-2 fa-xl position-absolute end-0 top-25" id='closeBtn'></i>
  </div>
  
  ${cardContainer}`;
  workContainer.style.marginLeft = "60px";

  closeBtn = documentHTML.getElementById("closeBtn");
  closeBtn.addEventListener("click", getStartMeals);

}

/*****************************Local Storage******************************** */

//theme color configurations
function themeConfiguration() {
  if (localStorage.getItem("theme")) {
    const theme = localStorage.getItem("theme");
    //console.log(theme);
    document.documentElement.dataset.theme = localStorage.getItem("theme");
    if (theme === "light") {
      modeBtn.classList.replace("fa-sun", "fa-moon");
    } else {
      modeBtn.classList.replace("fa-moon", "fa-sun");
    }
  } else {
    localStorage.setItem("theme", "dark");
    modeBtn.classList.replace("fa-moon", "fa-sun");
  }
}

/*****************************Toggle Behaviour********************************* */

function themeToggle(element) {
  const rootElement = documentHTML.documentElement; //will always be an <html> element.
  if (element.classList.contains("fa-sun")) {
    element.classList.replace("fa-sun", "fa-moon");
    rootElement.dataset.theme = "light";
    //console.log("set");
    localStorage.setItem("theme", "light");
  } else {
    element.classList?.replace("fa-moon", "fa-sun");
    rootElement.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
  }
}

function openSideBar() {
  $(".side-nav-menu").animate(
    {
      left: 0,
    },
    800
  );

  // $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-xmark");

  for (let i = 0; i < 5; i++) {
    $(".nav-links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
}

function closeSideBar() {
  let navWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate(
    {
      left: -navWidth,
    },
    800
  );

  // $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-xmark");

  $(".nav-links li").animate(
    {
      top: 300,
    },
    800
  );
}

$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideBar();
  } else {
    openSideBar();
  }
});

/**************************************** Validations ******************************* */

function ContactUS() {
  searchContainer.classList.add("d-none");
  workContainer.innerHTML = `
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  
   <div class="container w-75 text-center mx-auto position-relative pt-5">
   <i class="fa-solid fa-xmark me-2 fa-xl position-absolute end-0 top-0" id='closeBtn'></i>
   <form id="submitForm">
   
      <div class="row g-4 ms-3">
      
          <div class="col-md-6">
              <input id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number *+(123) - 456-78-90
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6 position-relative">
              <input  id="passInput" type="password" class="form-control  " placeholder="Enter Your Password">
              <span><i id="toggler" class="fa-regular fa-eye-slash"></i></span>
              <div id="passAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6 position-relative">
              <input  id="repassInput" type="password" class="form-control " placeholder="Repassword">
              <span><i id="togglerRepass" class="fa-regular fa-eye-slash"></i></span>
              <div id="repassAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn main-btn px-2 mt-3">Submit</button>
      </form>
  </div>
</div> `;

  submitBtn = documentHTML.getElementById("submitBtn");

  submitForm = documentHTML.getElementById("submitForm");

  closeBtn = documentHTML.getElementById("closeBtn");

  toggler = documentHTML.getElementById("toggler");
  togglerRepass = documentHTML.getElementById("togglerRepass");

  documentHTML
    .getElementById("nameInput")
    .addEventListener("keyup", nameValidation);
  documentHTML
    .getElementById("emailInput")
    .addEventListener("keyup", emailValidation);
  documentHTML
    .getElementById("phoneInput")
    .addEventListener("keyup", phoneValidation);
  documentHTML
    .getElementById("ageInput")
    .addEventListener("keyup", ageValidation);
  documentHTML
    .getElementById("passInput")
    .addEventListener("keyup", passwordValidation);
  documentHTML
    .getElementById("repassInput")
    .addEventListener("keyup", rePasswordValidation);

  //[Name],[Email],[Phone],[Age],[Password],[repassword]
  documentHTML.getElementById("nameInput").addEventListener("input", () => {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  });

  documentHTML.getElementById("emailInput").addEventListener("input", () => {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  });

  documentHTML.getElementById("phoneInput").addEventListener("input", () => {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  });

  documentHTML.getElementById("ageInput").addEventListener("input", () => {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  });

  documentHTML.getElementById("passInput").addEventListener("input", () => {
    if (passwordValidation()) {
      document
        .getElementById("passAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passAlert")
        .classList.replace("d-none", "d-block");
    }
  });

  documentHTML.getElementById("repassInput").addEventListener("input", () => {
    if (rePasswordValidation()) {
      document
        .getElementById("repassAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repassAlert")
        .classList.replace("d-none", "d-block");
    }
  });

  toggler.addEventListener("click", function () {
    showHidePassword(documentHTML.getElementById("passInput"));
  });

  togglerRepass.addEventListener("click", function () {
    showHideRePassword(documentHTML.getElementById("repassInput"));
  });

  submitForm.addEventListener("input", function () {
    inputsAreValid();
  });

  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (inputsAreValid()) {
      setForm();
    }
  });

  closeBtn.addEventListener("click", getStartMeals);
}

/************************************Hide/Show Password**************************************** */

function showHidePassword(password) {
  if (password.type == "password") {
    password.setAttribute("type", "text");
    toggler.classList.replace("fa-eye-slash", "fa-eye");
    //console.log("here", password);
  } else {
    toggler.classList.replace("fa-eye", "fa-eye-slash");
    password.setAttribute("type", "password");
  }
}

function showHideRePassword(password) {
  if (password.type == "password") {
    password.setAttribute("type", "text");
    togglerRepass.classList.replace("fa-eye-slash", "fa-eye");
    //console.log("repass");
  } else {
    togglerRepass.classList.replace("fa-eye", "fa-eye-slash");
    password.setAttribute("type", "password");
  }
}

/****************************Reset Form Functions******************************* */

function setForm() {
  documentHTML.getElementById("nameInput").value = "";
  documentHTML.getElementById("emailInput").value = "";
  documentHTML.getElementById("phoneInput").value = "";
  documentHTML.getElementById("ageInput").value = "";
  documentHTML.getElementById("passInput").value = "";
  documentHTML.getElementById("repassInput").value = "";
}

/****************************Validation Functions******************************* */

function nameValidation() {
  //regex that supports Arabic and English letters & Characters
  const regex = /^[a-zA-Z ]+$/;
  if (regex.test(documentHTML.getElementById("nameInput").value)) {
    nameInputTouched = true;
  } else {
    nameInputTouched = false;
  }
  return nameInputTouched;
}

function emailValidation() {
  //Another valid regex to check on E-mails Input
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regex.test(documentHTML.getElementById("emailInput").value)) {
    emailInputTouched = true;
  } else {
    emailInputTouched = false;
  }
  return emailInputTouched;
}

function phoneValidation() {
  var regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

  if (regex.test(documentHTML.getElementById("phoneInput").value)) {
    teleInputTouched = true;
  } else {
    teleInputTouched = false;
  }
  return teleInputTouched;
}

function passwordValidation() {
  //Another valid regex to check on Password Input
  const regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;

  if (regex.test(documentHTML.getElementById("passInput").value)) {
    passInputTouched = true;
  } else {
    passInputTouched = false;
  }

  return passInputTouched;
}

function rePasswordValidation() {
  if (
    documentHTML.getElementById("passInput").value ===
    documentHTML.getElementById("repassInput").value
  ) {
    rePassInputTouched = true;
  } else {
    rePassInputTouched = false;
  }

  return rePassInputTouched;
}

function ageValidation() {
  //Regex that only supports players from 10-80 years old
  const ageRegex = /^([1-7][0-9]|80)$/;

  if (ageRegex.test(documentHTML.getElementById("ageInput").value)) {
    ageInputTouched = true;
  } else {
    ageInputTouched = false;
  }
  return ageInputTouched;
}

//total Validation check
function inputsAreValid() {
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    passwordValidation() &&
    ageValidation() &&
    rePasswordValidation()
  ) {
    // alertValid.classList.replace('d-block','d-none')
    submitBtn.removeAttribute("disabled");
    return true;
  } else {
    submitBtn.setAttribute("disabled", true);
    // alertValid.classList.replace('d-none','d-block')
    return false;
  }
}

/****************************Event Listeners******************************* */

documentHTML.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    $("#LoadingIcon").hide(5000);
  }, 5000);
  LoadingIcon.classList.add("d-none");
  closeSideBar();
  getStartMeals();
  themeConfiguration();
});

modeBtn.addEventListener("click", function (e) {
  themeToggle(e.target);
});

searchBtn.addEventListener("click", function (e) {
  closeSideBar();
  fetchSearch();
  // documentHTML.getElementById('searchName').value='';
  // documentHTML.getElementById('searchLetter').value='';
});

categoriesBtn.addEventListener("click", function (e) {
  closeSideBar();
  getCategories();
  // documentHTML.getElementById('searchName').value='';
  // documentHTML.getElementById('searchLetter').value='';
});

areaBtn.addEventListener("click", function (e) {
  closeSideBar();
  getArea();
  // documentHTML.getElementById('searchName').value='';
  // documentHTML.getElementById('searchLetter').value='';
});

ingrediantesBtn.addEventListener("click", function (e) {
  closeSideBar();
  getIngredients();
  // documentHTML.getElementById('searchName').value='';
  // documentHTML.getElementById('searchLetter').value='';
});

contactBtn.addEventListener("click", function (e) {
  closeSideBar();
  ContactUS();
  // documentHTML.getElementById('searchName').value='';
  // documentHTML.getElementById('searchLetter').value='';
});

returnHome.addEventListener("click", getStartMeals);


