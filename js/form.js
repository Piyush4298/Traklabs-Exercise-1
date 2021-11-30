window.onload = ()=>{
    if(localStorage.getItem("hasCodeRunBefore") === null)
    {
        let emp_arr = [];
        localStorage.setItem("emp_array", JSON.stringify(emp_arr));
        localStorage.setItem("hasCodeRunBefore", true);
    }
}

function addData(){
    var empId = document.getElementById("emp-id").value;
    var empName = document.getElementById("emp-name").value;
    var empAge = document.getElementById("emp-age").value;

    if(empId !== null && empName !== null && empName !== null){
        let EMPLOYEE_INFO = {
            id : empId, name : empName, age : empAge
        };
    
        sessionStorage.setItem("curr_item", JSON.stringify(EMPLOYEE_INFO));
    
    
        let emp_arr = JSON.parse(localStorage.getItem("emp_array")|| "[]");
        emp_arr.push(EMPLOYEE_INFO);
        localStorage.setItem("emp_array", JSON.stringify(emp_arr));
    }
}


var fromEditRecord = JSON.parse(localStorage.getItem("fromEditRecord"));
if(fromEditRecord){
    let currObj = JSON.parse(localStorage.getItem("currObj"));
    document.getElementById("emp-id").value = currObj.id;
    document.getElementById("emp-name").value = currObj.name;
    document.getElementById("emp-age").value = currObj.age;
    
    localStorage.setItem("fromEditRecord", JSON.stringify(false));
}
