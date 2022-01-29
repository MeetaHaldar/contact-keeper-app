let express = require("express");

let mongodb = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;

let db;
let app = express();
app.use(express.static("public"));

let connectionString =
  "mongodb+srv://tarang:AzOgcKjwqupEmWb6@cluster0.9s75g.mongodb.net/contactPageApp?retryWrites=true&w=majority";

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    if (err) throw err;
    else {
      db = client.db("contactPageApp");
      const port = process.env.PORT || 4000;
      app.listen(port);
    }
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  db.collection("items")
    .find()
    .toArray(function (err, items) {
      // console.log(items)

      res.send(`<!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Andada+Pro&family=Birthstone+Bounce:wght@500&family=Graduate&family=Handlee&family=Marcellus+SC&family=Merriweather&family=Pacifico&family=Rampart+One&family=Satisfy&family=Shadows+Into+Light&family=Space+Grotesk:wght@300&display=swap" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
          }
          * {
            box-sizing: border-box;
          }

          
      ul{
        display: grid;
        list-style: none;
        grid-template-columns: repeat(1,1fr);
           }
           ul:hover{
   
             cursor: pointer;
           }
ul li{
  padding: 10px;
  // border-bottom: 5px blue solid;
}
      ul p{
        float: left;
        text-decoration: underline;
        text-decoration-color: #fefefe;
        text-underline-position: under;
     
      }
      ul i {
        float: right;
      }

.grid{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  max-width: 1100px;
  margin: auto;
  grid-gap: 20px;
}
.grid2{
  display: grid;
  grid-template-columns: repeat(4,1fr);
  max-width: 500px;
  text-align: center;
  margin: auto;

}
    i{
      cursor: pointer;
    }
          /* Button used to open the contact form - fixed at the bottom of the page */
          .open-button {
            background-color: rgb(224 242 254);
            color: #222;
            padding: 16px 20px;
            border: none;
            cursor: pointer;
         
            position: fixed;
            bottom: 23px;
            right: 28px;
            width: 280px;
          }
    


.p-font{
  font-family: 'Graduate', cursive;
}

.delete-me{
  float: none;
  
}

          /* The popup form - hidden by default */
          .form-popup {
            display: none;
            position: fixed;
            bottom: 0;
            right: 15px;
            border: 3px solid #f1f1f1;
            z-index: 9;
          }
    
          /* Add styles to the form container */
          .form-container {
            max-width: 300px;
            padding: 10px;
            background-color: white;
          }
    
          /* Full-width input fields */
          .form-container input[type="text"],
          .form-container input[type="email"] {
            width: 100%;
            padding: 15px;
            margin: 5px 0 22px 0;
            border: none;
            background: #f1f1f1;
          }
    
          /* When the inputs get focus, do something */
          .form-container input[type="text"]:focus,
          .form-container input[type="email"]:focus {
            background-color: #ddd;
            outline: none;
          }
    
          /* Set a style for the submit/login button */
          .form-container .btn {
            // background-color: #04aa6d;
            color: white;
            padding: 16px 20px;
            border: none;
            cursor: pointer;
            width: 100%;
            margin-bottom: 10px;
            opacity: 0.8;
          }
    
          /* Add a red background color to the cancel button */
          .form-container .cancel {
            background-color: rgb(243, 98, 98);
          }
    
        </style>
      </head>
      <body class="bg-teal-900">
        <section class="h-min">
     
        <button class="open-button" onclick="openForm()">Add Contact</button>
    
        <div class="form-popup" id="myForm">
          <form action="/create-item" method="POST" id="create-form" class="form-container >
            <h1>Add Contact List</h1>
            <label for="name"><b>Name</b></label>
            <input   id="input1" name="item"  type="text" placeholder="Enter name" required />
            <label for="phn"><b>Phone no.</b></label>
            <input id="input2" type="text" placeholder="Enter phoneno." name="phn" maxlength="12" required />
    
            <label for="email"><b>Email</b></label>
            <input  id="input3" type="email" placeholder="Enter Email" name="email" required />
          
    
            <button type="submit" class="btn bg-teal-600">Save</button>
            <button type="button" class="btn cancel bg-yellow-600" onclick="closeForm()">
              Close
            </button>
          </form>
        </div>

        <h1 class="text-center text-3xl py-4 w-6/12 text-sky-50 mx-auto ">
        <i class="fas fa-address-book"></i> Contact Keeper App
      </h1>
    
          <div class="grid" id="item-list">
     
       ${items
         .map(function (x) {
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
             </li>
           </ul>
      `;
         })
         .join(" ")}
     </div>
  

    </section>
    <footer class="">
    

    <div class="flex justify-center mt-5">
      <a href="https://github.com/MeetaHaldar"
        ><i class="fab text-white  m-2 fa-github icon fa-2x"></i
      ></a>
      <a href="mailto:meetahaldar1001@gmail.com"
        ><i class="far text-white  m-2 fa-envelope icon fa-2x"></i
      ></a>

      <a
        href="https://www.linkedin.com/in/meeta-haldar-601b41203/?locale=en_US"
      >
        <i class="fab text-white  m-2 fa-linkedin icon fa-2x"></i
      ></a>

      <a href="https://twitter.com/Meeta_boss">
        <i class="fab text-white  icon m-2 fa-twitter-square fa-2x"></i
      ></a>
    </div>
    <div>
      <p class="text-center text-white">made with💛 by Meeta Haldar</p>
      <p class="text-center p-1 text-white m-0"> Copyright © 2021 All right reserved</p>
    </div>
  </footer>
        <script src="/browser.js">
                                       
        </script>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
      </body>
    </html>
    `);
    });
});

app.post("/create-item", function (req, res) {
  db.collection("items").insertOne(
    { name: req.body.text1, phone: req.body.text2, email: req.body.text3 },
    function () {
      //  res.json(info.ops[0])
    }
  );
});

app.post("/update-name", function (req, res) {
  db.collection("items").findOneAndUpdate(
    { _id: ObjectId(req.body.id) },
    { $set: { name: req.body.text } },
    function () {
      res.send("success");
    }
  );
});

app.post("/update-phone", function (req, res) {
  db.collection("items").findOneAndUpdate(
    { _id: ObjectId(req.body.id) },
    { $set: { phone: req.body.phoneNo} },
    function () {
      res.send("success");
    }
  );
});
app.post("/update-email", function (req, res) {
  db.collection("items").findOneAndUpdate(
    { _id: ObjectId(req.body.id) },
    { $set: { email: req.body.mail} },
    function () {
      res.send("success");
    }
  );
});


app.post("/delete-item", function (req, res) {
  db.collection("items").deleteOne({ _id: ObjectId(req.body.id) }, function () {
    res.send("success");
  });
});
