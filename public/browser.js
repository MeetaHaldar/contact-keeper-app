function itemTemplate(x) {
  return ` 
  <tr class="p-4">

    <td class="mx-4"><p>${x.name}</p><i class="fas fa-pen edit-name p-2" data-id="${x._id}"></i></td>
    <td>${x.phone} <i class="fas fa-pen edit-phone p-2" data-id="${x._id}"></i></td>
    <td>${x.email} <i class="fas fa-pen edit-email p-2" data-id="${x._id}"></i></td>

    <td><i class="fas fa-trash-alt delete-me" data-id="${x._id}"></i></td>
  </tr>
`;
}

// create item
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
        input1.value=""
        input2.value=""
        input3.value=""
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
      e.target.previousSibling.innerHTML
    );

    let q = e.target.getAttribute("data-id");
    if (userInput) {
      axios
        .post("/update-item", { text: userInput, id: q })
        .then(function () {
          e.target.previousSibling.innerHTML = userInput;
          console.log(q);
        })
        .catch(function () {
          console.log("please try agin later");
        });
    }
  }

  if (e.target.classList.contains("edit-phone")) {
    let userInput = prompt("enter your new phone number");

    let q = e.target.getAttribute("data-id");
    axios
      .post("/update-item", { phoneNo: userInput, id: q })
      .then(function () {})
      .catch(function () {
        console.log("please try agin later");
      });
  }
  if (e.target.classList.contains("edit-email")) {
    let userInput = prompt("enter your new email");

    let q = e.target.getAttribute("data-id");
    axios
      .post("/update-item", { mail: userInput, id: q })
      .then(function () {})
      .catch(function () {
        console.log("please try agin later");
      });
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
