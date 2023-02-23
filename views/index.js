function handleEdit(id,element) {
    console.log(element);

    element.disabled = true ;
    document.getElementById("save-"+id).disabled = false;

    let description = document.getElementById("description-"+id);
    description.readOnly = false ;

    let select = document.getElementById("select-"+id);
    select.disabled = false ;

    let names = document.getElementById("name-"+id);
    
    names.readOnly = false ;
}

async function  test() {
    let value = document.getElementById("search-value").value;
    var list =[];
    var cols = document.getElementsByClassName('col')
    if(value==""){
        for (var elements of cols) {
          
            elements.style.display=""
            
        }
    }else{
        const response = await fetch('/api/find/'+value);
        const myJson = await response.json(); //extract JSON from the http response
        console.log(myJson);
        for (var elements of cols) {
            elements.style.display="none"
        }
        myJson.data.forEach(element => {
            list.push("bild-"+element.id);
        })
        list.forEach(element =>{
            for (const iterator of document.getElementsByClassName(element)) {
                iterator.style.display=""
            }
        });
        
    }
    console.log(cols);
}

/*
function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}
function handleSave(id,element) {
    console.log(element);
    element.disabled = true ;
    document.getElementById("edit-"+id).disabled = false;
    
    let description = document.getElementById("description-"+id);
    description.readOnly = true ;

    let select = document.getElementById("select-"+id);
    select.disabled = true ;
    
    let name = document.getElementById("name-"+id);
    name.disabled = true ;
} */