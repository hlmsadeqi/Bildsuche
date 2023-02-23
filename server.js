const express = require('express');
const formidable = require('formidable');
const app = express();
const fs = require('fs');
const path = require("path")
const rootDirectory= "./data/bilderr.json" ;

let bilder = './data/bilder/';

//Hole alle JSON Daten
var data = JSON.parse(fs.readFileSync(rootDirectory));;

//befehl für connect to view
app.set('view engine' , 'ejs')
app.use(express.static(__dirname + "/views/"));
app.use('/data/bilder', express.static('data/bilder'));   
app.use(express.urlencoded({extended: false}));


/*
//readfile
fs.readFile(rootDirectory, "utf8", (err, jsonString) => {
    if (err) {
        console.log("Error reading the JSON file:", err);
        return;
    }
    try {
        const newPicture = JSON.parse(jsonString);
        console.log(newPicture);
    } catch (err) {
        console.log("Error parsing JSON string:", err);
    }
});
*/


// (ich rufe damit index.html(ejs) in server )  
app.get('/',(req,res )=>{
    res.render('index', {bild:data.results});
});


// ein Bild anzeigen
app.get('/bilder/get/:id', function(req,res){
    var bild = bilder.find(dataset =>{
        if(dataset.id == req.params.id){
            return dataset;
        }
    });
    if(bild === undefined){  //wenn keine bild mit params.id es gibt
        res.status(404).json({
            success : false
        })
    }
    else{
        res.status(200).json({
        data : bild ,
        success: true
    })}; 
    
})


//alle bilder wo isActive 
app.get('/bilder/active', function(req,res){
    let isactive = [] ;
    bilder.forEach(element => {
        if (element.active == true){
            isactive.push(element);
            console.log("isactive")
        }
    });
    res.status(200).json({
        data : isactive ,
        succuss: true
    }); 
    });


//alle bilder wo isNotActive 
app.get('/bilder/inactive', function(req,res){
    let isNotactive= [] ;
    bilder.forEach(element => {
        if (element.active == false){
            isNotactive.push(element);
            console.log("isNotactive")
        }
    });
    res.status(200).json({
        data : isNotactive ,
        succuss: true
    }); 
    });
//

/*
app.get('/', (req, res) => {
    res.send(`/views/index.ejs`);
});
 */

//edditiren von bild information
app.post('/api/edit/picture' ,(req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
    
            return;
        }

        data.results.forEach(element =>{
            
            if(element.id==fields.id){
              
                element.description = fields.description;
                element.name = fields.name;
                if(fields.select==="active"){
                    element.active = true;
                }else{
                    element.active = false;
                }
            }
        })
        fs.writeFileSync(rootDirectory,JSON.stringify(data), function(err) {
            if (err) throw err;
            console.log('complete');
        })
        
        return  res.redirect("/");//json({fields:fields});
       
        
      });
})

//upload neue bild
app.post('/api/upload/picture*', (req, res) => {
   // const form = formidable({ multiples: true });
    const form = new formidable.IncomingForm();
    var newPath = path.join(__dirname, "/"+bilder)
    form.parse(req, (err, fields, files) => {
    if (err) {
        return;
    }
    console.log(files);
    var rawData = fs.readFileSync(files.file.filepath)
    fs.writeFile(newPath+files.file.originalFilename, rawData, function(err){
        if(err) console.log(err)
        var newPicture = {
            id: getLastId()+1,
            name: fields.pictureName,
            active: true ,
            path : bilder+(files.file.originalFilename).toString() ,
            description: fields.description
        };
        
        data["results"].push(newPicture)
    
        console.log(data.results.length)
        fs.writeFileSync(rootDirectory,JSON.stringify(data), function(err) {
            if (err) throw err;
            console.log('complete');
            })

            console.log(req.url);
        return  res.redirect("/");//return  res.json({fields:fields});
    })
   
    
  });
});


function getLastId(){
    let ids = []; 
    data.results.forEach(element=>{
        ids.push(element.id)
    });
    console.log(data);
    return ids.sort((a,b)=>b-a)[0]
}


//web server herstellen
app.listen(3000,()=> console.log('listening on port 3000'));