let express = require("express");

let mongodb = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;

let db;
let app = express();
app.use(express.static('public'))


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
  db.collection('items').find().toArray(function(err,items){
    // console.log(items)

      res.send(`<!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>

        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
          }
          * {
            box-sizing: border-box;
          }
    i{
      cursor: pointer;
    }
          /* Button used to open the contact form - fixed at the bottom of the page */
          .open-button {
            background-color: #555;
            color: white;
            padding: 16px 20px;
            border: none;
            cursor: pointer;
            opacity: 0.8;
            position: fixed;
            bottom: 23px;
            right: 28px;
            width: 280px;
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
            background-color: #04aa6d;
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
    
          /* Add some hover effects to buttons */
          .form-container .btn:hover,
          .open-button:hover {
            opacity: 1;
          }
        </style>
      </head>
      <body>
        <section class="bg-gray-100 h-screen">
     
        <button class="open-button" onclick="openForm()">Add Contact</button>
    
        <div class="form-popup" id="myForm">
          <form action="/create-item" method="POST" class="form-container >
            <h1>Add Contact List</h1>
            <label for="name"><b>Name</b></label>
            <input  name="item"  type="text" placeholder="Enter name" required />
            <label for="phn"><b>Phone no.</b></label>
            <input type="text" placeholder="Enter phoneno." name="phn" maxlength="12" required />
    
            <label for="email"><b>Email</b></label>
            <input type="email" placeholder="Enter Email" name="email" required />
          
    
            <button type="submit" class="btn">Save</button>
            <button type="button" class="btn cancel" onclick="closeForm()">
              Close
            </button>
          </form>
        </div>

        <h1 class="text-center text-3xl py-4 w-6/12 text-blue-700 mx-auto ">
        Contact Keeper App
      </h1>
      <table class="text-center py-4 w-max mx-auto my-4 text-black">
        <thead class="text-center py-4  w-max bg-blue-200 mx-auto my-4 text-black">
          <tr>
            <th >Name</th>
            <th>Phone no.</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
       ${items.map(function(x){
         return ` <tbody>
         <tr class="p-4">

           <td class="mx-4"><p>${x.name}</p><i class="fas fa-pen edit-name p-2" data-id="${x._id}"></i></td>
           <td>${x.phone} <i class="fas fa-pen edit-phone p-2" data-id="${x._id}"></i></td>
           <td>${x.email} <i class="fas fa-pen edit-email p-2" data-id="${x._id}"></i></td>
  
           <td><i class="fas fa-trash-alt delete-me" data-id="${x._id}"></i></td>
         </tr>
       </tbody>`
       }).join(" ")}
      </table>
  

    </section>
        <script src="/browser.js">
                                       
        </script>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
      </body>
    </html>
    `);
  })

});

app.post("/create-item", function (req, res) {
  db.collection("items").insertOne(
    { name: req.body.item, phone: req.body.phn, email: req.body.email },
    function () {
res.redirect('/')    }
  );
});



app.post('/update-item',function(req,res){
db.collection('items').findOneAndUpdate({_id:ObjectId(req.body.id)},{$set:{name:req.body.text}},function(){
 
  console.log(ObjectId(req.body.id))
      res.send("success")
    })
})


app.post('/delete-item',function(req,res){
  // db.collection('items').deleteOne({_id:ObjectId(req.body.id)},function(){
  //       res.send("success")
  //     })
  })