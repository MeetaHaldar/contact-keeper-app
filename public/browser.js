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
