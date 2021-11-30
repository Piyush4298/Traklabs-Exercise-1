
let state = {
    'querySet': JSON.parse(localStorage.getItem("dept_array") || "[]"),

    'page': 1,
    'rows': 5,
    'window': 5,
};
//----------------------------Add & Display Section-----------------------------//
/**
 * 
 * @param {Array} querySet array of objects(data)
 * @param {Number} page number of pages
 * @param {Number} rows number of rows
 * @returns  trimmed data for a particular page
 *
 */
function pagination(querySet, page, rows) {

    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows

    var trimmedData = querySet.slice(trimStart, trimEnd)

    var pages = Math.ceil(querySet.length / rows);

    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}



function pageButtons(pages) {
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ``
	console.log('Pages:', pages)

    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        
        if (maxLeft < 1){
        	maxLeft = 1
        }
        maxRight = pages
    }
    
    

    for (var page = maxLeft; page <= maxRight; page++) {
    	wrapper.innerHTML += `<button value=${page} class="page btn">${page}</button>`
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn">&#171; First</button>` + wrapper.innerHTML
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn">Last &#187;</button>`
    }

    
    $('.page').on('click', function() {
        $('#tbody').empty()

        state.page = Number($(this).val())
        localStorage.setItem("deptPageNo", JSON.stringify(state.page));
        buildTable(state)
    })
}


function buildTable(state) {
    var table = document.getElementById("tbody");
    state.page = JSON.parse(localStorage.getItem("deptPageNo"));
    var data = pagination(state.querySet, state.page, state.rows)
    var myList = data.querySet
    let dataHTML = '';
    for (var i = 1 in myList) {
        dataHTML += `<tr>
                        <td>${myList[i].id}</td>
                        <td>${myList[i].name}</td>
                        <td><input type="button" value="EDIT" onclick="editRecord(this)" class="edit-yellow">
                        <input type="button" value="DELETE" onclick="deleteRecord(this)" class="delete-red"></td>
                    </tr>`;
    }
    table.innerHTML = dataHTML;
    pageButtons(data.pages)
}

window.onload = function() {
    buildTable(state);
};

//----------------------------Sorting Section-----------------------------//
let sortDirection = true;
/**
 * 
 * @param {String} columnName name of the column to which sorting is to be done.
 */
function sortByColumnName(columnName){
    let dept_array = JSON.parse(localStorage.getItem("dept_array",) || "[]");
    if(sortDirection === true){
        dept_array.sort((a, b)=>{
            var textA = a[columnName].toUpperCase();
            var textB = b[columnName].toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }
    else{
        dept_array.sort((a, b)=>{
            var textA = a[columnName].toUpperCase();
            var textB = b[columnName].toUpperCase();
            return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
        });
    }
    state.querySet = dept_array;
    localStorage.setItem("dept_array", JSON.stringify(dept_array));
    //addDataToTable();
    buildTable(state);
    sortDirection = !sortDirection;
}

//----------------------------Searching Section-----------------------------//
function searchByIdOrName(){
    let dept_arr = JSON.parse(localStorage.getItem("dept_array",) || "[]");
    var searchValue = document.getElementById("search-bar").value;
    let found = false;
    if(String(searchValue).match(/^[A-Za-z0-9]+$/) && String(searchValue).startsWith("DP")){
        for(let obj of dept_arr){
            if(obj.id === searchValue.toUpperCase()){
                var tableBody = document.getElementById("tbody");
                tableBody.innerHTML = `<tr><td>${obj.id}</td><td>${obj.name}</td>
                        <td><input type="button" value="EDIT" onclick="editRecord(this)" class="edit-yellow">
                        <input type="button" value="DELETE" onclick="deleteRecord(this)" class="delete-red"></td></tr>`;
                found = true;
                break;
            }
        }
        if(!found)
            alert("This ID is not present! Try again..");
    }
    else{
        const handleSearch = (arr, searchInput) => (
            arr.filter((obj) => (
                Object.values(obj)
                    .flat()
                    .some((v) => (
                        `${v}`.toLowerCase().includes(`${searchInput}`.toLowerCase())
                    ))
            ))
        );

        let tdept = handleSearch(dept_arr, searchValue);

        var tableBody = document.getElementById("tbody");
        let dataHTML = '';
        for(let obj of tdept){
            dataHTML += `<tr><td>${obj.id}</td><td>${obj.name}</td>
                        <td><input type="button" value="EDIT" onclick="editRecord(this)" class="edit-yellow">
                        <input type="button" value="DELETE" onclick="deleteRecord(this)" class="delete-red"></td></tr>`;
        }
        tableBody.innerHTML = dataHTML;
    }
}

function clearSearchBar(){
    var searchBar = document.getElementById("search-bar");
    searchBar.value = '';
    buildTable(state);
    //addDataToTable();
}

//----------------------------Delete Section-----------------------------//
/**
 * 
 * @param {HTMLTableCellElement} obj Table cell element whose DELETE button has been clicked
 */
function deleteRecord(obj){
    var confirmed = confirm("Do you want to delete this record?");
    if(confirmed){
        // var idx = obj.parentNode.parentNode.rowIndex;
        var dept_id = obj.parentNode.parentNode.children[0].innerText;
        let dept_arr = JSON.parse(localStorage.getItem("dept_array",) || "[]");
        let filtered_arr = dept_arr.filter(obj => obj.id !== dept_id);
        //console.log(filtered_arr);
        localStorage.setItem("dept_array", JSON.stringify(filtered_arr));
        state.querySet = JSON.parse(localStorage.getItem("dept_array") || "[]");
        buildTable(state);
    }
}

//----------------------------Edit Section-----------------------------//
/**
 * 
 * @param {HTMLTableCellElement} obj Table cell element whose EDIT button has been clicked
 */
function editRecord(obj){
    var dept_id = obj.parentNode.parentNode.children[0].innerText;
    var dept_name = obj.parentNode.parentNode.children[1].innerText;

    localStorage.setItem("currObjfromDept", JSON.stringify({
        id : dept_id,
        name: dept_name
    }));

    localStorage.setItem("fromEditRecord2", JSON.stringify(true));
    window.location.href = "./dept_form.html";

    let dept_arr = JSON.parse(localStorage.getItem("dept_array",) || "[]");
    let filtered_arr = dept_arr.filter(obj => obj.id !== dept_id);
    //console.log(filtered_arr);
    localStorage.setItem("dept_array", JSON.stringify(filtered_arr));
    state.querySet = JSON.parse(localStorage.getItem("dept_array") || "[]");
}