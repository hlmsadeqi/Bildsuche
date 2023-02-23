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
}