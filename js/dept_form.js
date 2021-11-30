window.onload = ()=>{
    if(localStorage.getItem("hasCodeRunBefore2") === null)
    {
        let deptArr = [];
        localStorage.setItem("dept_array", JSON.stringify(deptArr));
        localStorage.setItem("hasCodeRunBefore2", true);
    }
}

function addData(){
    var deptID = document.getElementById("dept-id").value;
    var deptName = document.getElementById("dept-name").value;

    if(deptID !== null && deptName !== null){
        let DEPARTMENT_INFO = {
            id : deptID, name : deptName
        };
    
        sessionStorage.setItem("curr_item2", JSON.stringify(DEPARTMENT_INFO));
    
    
        let dept_array = JSON.parse(localStorage.getItem("dept_array")|| "[]");
        dept_array.push(DEPARTMENT_INFO);
        localStorage.setItem("dept_array", JSON.stringify(dept_array));
    }
}


var fromEditRecord2 = JSON.parse(localStorage.getItem("fromEditRecord2"));
if(fromEditRecord2){
    let currObj = JSON.parse(localStorage.getItem("currObjfromDept"));
    document.getElementById("dept-id").value = currObj.id;
    document.getElementById("dept-name").value = currObj.name;
    
    localStorage.setItem("fromEditRecord2", JSON.stringify(false));
}
