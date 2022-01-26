let express = require("express");
let app = express();
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send(`<!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
          }
          * {
            box-sizing: border-box;
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
          <h1 class="text-center text-3xl py-4 w-6/12 text-blue-700 mx-auto ">
            Contact Keeper App
          </h1>
          <table class="text-center py-4 w-max mx-auto my-4 text-black">
            <thead class="text-center py-4 w-max bg-blue-200 mx-auto my-4 text-black">
              <tr>
                <th >Name</th>
                <th>Phone no.</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Meeta</td>
                <td>89695794797</td>
                <td>meet@4.</td>
                <td><button>edit</button></td>
                <td><button>delete</button></td>
              </tr>
            </tbody>
          </table>
      
    
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
    </section>
        <script>
        function openForm() {
            document.getElementById("myForm").style.display = "block";
          }
          
          function closeForm() {
            document.getElementById("myForm").style.display = "none";
          }
        </script>
      </body>
    </html>
    `);
});

app.post("/create-item", function (req, res) {
  console.log(req.body.item);
  console.log(req.body.phn);
  console.log(req.body.email);

  res.send("thankyou for submission");
});

app.listen(5000, function () {
  console.log("your app is running on port 5000");
});
