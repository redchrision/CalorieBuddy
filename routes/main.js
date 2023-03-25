const { name } = require("ejs");
const { fields } = require("mysql");

module.exports = function(app, con) {

    //This route renders the Home web page
    app.get("/index",function(req, res){
        res.render("index.html", {
            title: "Home Page"
        });
    });

    //This route renders the About web page
    app.get("/about",function(req, res){
        res.render("about.html", {
            title: "About CalorieBuddy"
        });
    });

   //This route renders the Add web page
   app.get("/add",function(req, res){
    res.render("add.html", {
        title: "Add Food"
        });
    });

    //This route is meant to save data in the database, using the POST method. 

    app.post("/registered", function (req,res) {
        // Saving data in database
        let sqlquery = "INSERT INTO food (name, typical_values, unit_of_typical_value, calories, carbs, fat, protein, salt, sugar) VALUES (?,?,?,?,?,?,?,?,?)"; // Executing the sql query
        let newfood = [req.body.name, req.body.typical_values, req.body.unit_of_typical_value, req.body.calories, req.body.carbs, req.body.fat, req.body.protein, req.body.salt, req.body.sugar]; 
        con.query(sqlquery, newfood, (err, result) => {
            if (err) {
                return console.error(err.message);
            } else {
                //Displaying a message indicating that add operation has been done.
                res.send("This food item is added to CalorieBuddy. Name of food: " + req.body.name + " | " +
                "Typical values: " + req.body.typical_values + " | " +
                "Unit of the typical value: " + req.body.unit_of_typical_value + " | " +
                "Calories (kilocalories): " + req.body.calories + " | " +
                "Carbs: " + req.body.carbs + " | " +
                "Fat: " + req.body.fat + " | " +
                "Protein: " + req.body.protein + " | " +
                "Salt: " + req.body.salt + " | " +
                "Sugar: " + req.body.sugar);
            };
        });
    });

    //This route renders the Search web page
    app.get("/search",function(req, res){
        res.render("search.html", {
            title: "Search Food"
        });
    });

    //This route is meant to be used to search in the database, using the GET method. 
    //For the moment it simply collects the data passed along with the form inside req.query. 
    app.get("/search-result-db", function (req, res) { 
        res.send(req.query);
    });

    /*
    //This route is meant to be used to search in the database, using the GET method. 
    //Currently it crashes the application and needs debugging. 

    app.get("/search-result-db", function (req, res) {
        //searching in the database
        let word = [req.query.keyword];
        let sqlquery = "SELECT * FROM `food` WHERE name like ?";
        //execute sql query 
        con.query(sqlquery,word, (err, result) => {
        if (err) {
        return console.error("No food item found with the keyword you have entered" + req.query.keyword + "error: "+ err.message);
        //res.redirect("./search"); //this can also be used in case of an error instead of the above line
        }else{
        //step 1:(this will only shows the collected form-data) for debugging purpose only res.send(req.query);
        //step 2: (this shows keyword in collected form-data) for debugging purpose only 
        res.send("This is the keyword you entered: "+ req.query.keyword+ ".<br><br>This is the result of the search:<br>");
        //step3: (this will show the result of the search) for debugging purpose only 
        //res.send(result);
        //step4: (this will show the result of the search using an ejs template file, list.ejs can be used here)
        res.render ('list.html'{availableFood:result})
        } });
    });
    */

    //This route renders the Update web page
    app.get("/update",function(req, res){
        res.render("update.html", {
            title: "Update Food"
        });
    });

    //This route querries the database calorieBuddy, displays all the entries by name in an alphabetical order (ASC) and renders the List webpage
    app.get("/list",function(req, res){
        con.query("SELECT * FROM food ORDER BY name ASC", function (err, fields) {
            if(err) {
                res.render('list.html',{data:''});   
            } else {
                res.render('list.html',{
                    data:fields,
                    title: "List Food"
                });
            };
        });
    });
}