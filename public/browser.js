function itemTemplate(x) {
  console.log(x.name)
  return ` 
  <ul class="bg-teal-700 p-2 shadow-lg">
  <i class="fas fa-user w-min m-auto  rounded-full p-2 text-center text-white"></i>
    <li class="p-1 ml-2 mr-2">
      <p class="p-font  text-white">${x.name}</p>
      <i class="fas fa-pen edit-name p-2  rounded-full text-white" data-id="${x._id}"></i>
    </li>
    <li class="p-1 ml-2 mr-2 text-white">
    
    <p>${x.phone}</p>
    <i class="fas fa-pen edit-phone p-2  rounded-full text-white" data-id="${x._id}"></i>
  </li>
    <li class="p-1 ml-2 mr-2  text-white">
      <p>${x.email}</p>
      <i class="fas fa-pen edit-email p-2  rounded-full text-white" data-id="${x._id}"></i>
    </li>
   
    <li>
      <i class="fas fa-trash-alt text-teal-900 w- delete-me m-auto bg-white   p-2 text-center  shadow-lg" data-id="${x._id}"> delete</i>
      <a href="mailto:meetahaldar1001@gmail.com?subject=sending details of my contact &body=name =${x.name} , phone no.=${x.phone} , email=${x.email}"> <i class="fas fa-paper-plane text-teal-900  m-auto bg-white  p-2 text-center  shadow-lg" data-id="${x._id}"> send</i></a>

    </li>
  </ul>
`;
}


// initial page load render

// let ourHTML=items.map(function(item){
// return itemTemplate(item)
// }).join('')

// document
// .getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML)





// create feature 

let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let input3 = document.getElementById("input3");

document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();

  axios
    .post("/create-item", {
      text1: input1.value,
      text2: input2.value,
      text3: input3.value,
    })
    .then(function (response) {
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));
      input1.value = "";
      input2.value = "";
      input3.value = "";
    })
    .catch(function () {
      console.log("please try agin later");
    });
});

document.addEventListener("click", function (e) {
  //delete feature

  if (e.target.classList.contains("delete-me")) {
    if (confirm("do you really want to delete??")) {
      axios
        .post("/delete-item", { id: e.target.getAttribute("data-id") })
        .then(function () {
          e.target.parentElement.parentElement.remove();
        })
        .catch(function () {
          console.log("please try agin later");
        });
    }
  }

  //update feature
  if (e.target.classList.contains("edit-name")) {
    let userInput = prompt(
      "enter your new name",
      e.target.previousElementSibling.innerHTML
    );

    if (userInput) {
      axios
        .post("/update-name", {
          text: userInput,
          id: e.target.getAttribute("data-id"),
        })
        .then(function () {
          e.target.previousElementSibling.innerHTML = userInput;
          console.log(q);
        })
        .catch(function () {
          console.log("please try agin later");
        });
    }
  }

  if (e.target.classList.contains("edit-phone")) {
    let userInput = prompt(
      "enter your new phone number",
      e.target.previousElementSibling.innerHTML
    );

    if (userInput) {
      axios
        .post("/update-phone", {
          phoneNo: userInput,
          id: e.target.getAttribute("data-id"),
        })
        .then(function () {
          e.target.previousElementSibling.innerHTML = userInput;
        })
        .catch(function () {
          console.log("please try agin later");
        });
    }
  }
  if (e.target.classList.contains("edit-email")) {
    let userInput = prompt(
      "enter your new email",
      e.target.previousElementSibling.innerHTML
    );

    if (userInput) {
      axios
        .post("/update-email", {
          mail: userInput,
          id: e.target.getAttribute("data-id"),
        })
        .then(function () {
          e.target.previousElementSibling.innerHTML = userInput;
        })
        .catch(function () {
          console.log("please try agin later");
        });
    }
  }
});

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  var y = document.getElementsByTagName("input");
  var i;
  for (i = 0; i < y.length; i++) {
    y[i].value = "";
  }
}
