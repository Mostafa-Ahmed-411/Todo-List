// ''EARL Drsh'' [ToDo List App]
var doneCounter = 0;
var allList =[]  // arr to store all lists   
allList.push(doneCounter);
console.log(allList);
function update()
{
    if(localStorage.getItem("allList") == null)
        {
            allList =[]
            var doneCounter = 0;
            allList.push(doneCounter);
        }
    else{
        document.getElementById("wlecome").innerHTML =""
        allList =JSON.parse(localStorage.getItem("allList"))
        displayList()
        
    for (let index = 0; index < allList.length-1 ; index++) {
        if( allList[index].listDone == 1 ){
            document.querySelectorAll(".chk0")[index].checked  = true
            document.querySelectorAll(".chk0")[index].classList.add("chk"); 
            document.querySelectorAll(".input-title")[index].classList.add("add-list-done"); 
            document.querySelectorAll(".input-notes")[index].classList.add("add-list-done"); 
            document.querySelectorAll(".input-date")[index].classList.add("add-list-done"); 
        }
    }
}
}
update()

let newBtn = document.getElementById("new"); //--------------------------------------------------- new BTn
newBtn.addEventListener("click" , ()=>{

document.getElementById("title").value = " "
document.getElementById("notes").value= " "
document.getElementById("date").value= ""

document.getElementById("title").focus()

document.querySelector(".layout-bg").classList.replace("d-none" ,"d-block");
document.querySelector(".main-box").classList.replace("d-none" ,"d-block");
  update()  /* ///////////////////// */
})
//------------------------------------------------------------------------------------ add BTn and Enter key  // and it's func
let addBtn = document.getElementById("add")
addBtn.addEventListener("click", ()=>{
    addBtnFunc()
})

document.addEventListener("keyup",(e)=>{
    if(e.key == "Enter")
        addBtnFunc()
})

function addBtnFunc(){
    document.querySelector(".layout-bg").classList.replace("d-block" ,"d-none");
    document.querySelector(".main-box").classList.replace("d-block" ,"d-none");
    
    var title = document.getElementById("title").value
    var notes = document.getElementById("notes").value
    var date = document.getElementById("date").value
    addList();
    update() 
}

let cancelBtn = document.getElementById("cancel");//--------------------------------- cancel BTn and ESC Key // and it's func
cancelBtn.addEventListener("click" , ()=>{
    closeBtnFunc()
})

document.addEventListener("keyup",(e)=>{
    if(e.key == "Escape")
    {
        closeBtnFunc()
    }
})

function closeBtnFunc(){
    document.querySelector(".layout-bg").classList.replace("d-block" ,"d-none");
    document.querySelector(".main-box").classList.replace("d-block" ,"d-none");
    console.log("ESC");
}

/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

/* --------------------------------- addList -------------------------------- */
var list
function addList() {

    var list ={
        listTitle :title.value ,
        listNotes :notes.value ,
        listDate :date.value ,
        listDone : 0/* -------- */
    }
    console.log(allList); 
    allList.unshift(list)  
    console.log(allList); 

    localStorage.setItem("allList" , JSON.stringify(allList))  
    displayList()
    update()
}
/* ------------------------------- handleCheck() ------------------------------- */  /* ----------------------------------- */
/* ------------------------------- handleCheck() ------------------------------- */  /* ----------------------------------- */
function handleCheck(index){
    if(document.querySelectorAll(".chk0")[index].checked  == true){
        allList[index].listDone = 1 ;
        allList[allList.length-1]++
        
        document.querySelectorAll(".input-title")[index].classList.add("add-list-done");   
        document.querySelectorAll(".input-notes")[index].classList.add("add-list-done");  
        document.querySelectorAll(".input-date")[index].classList.add("add-list-done");  
        document.querySelectorAll(".chk0")[index].classList.add("chk"); 
    }else{
        
        allList[index].listDone =  0  ;
        allList[allList.length-1]--;
            document.querySelectorAll(".input-title")[index].classList.remove("add-list-done"); 
            document.querySelectorAll(".input-notes")[index].classList.remove("add-list-done"); 
            document.querySelectorAll(".input-date")[index].classList.remove("add-list-done"); 
            document.querySelectorAll(".chk0")[index].classList.remove("chk"); 
        }

        localStorage.setItem("allList" , JSON.stringify(allList))
        console.log(allList[allList.length-1]);
        update() 
}
/* ------------------------------ displayList() ----------------------------- */
function displayList() {
var cartona = ""
for (let i = 0; i < allList.length-1 ; i++) {
    cartona += `
    <tr>
    <td><input type="text" class="spcial-form-control  "   disabled readonly value="${i}"></td>
    <td><input type="text" class="form-control list-box input-title"   disabled readonly value="${allList[i].listTitle}"></td>
    <td><input type="text" class="form-control list-box input-notes"  disabled readonly value="${allList[i].listNotes}"></td>
    <td><input type="text" class="form-control list-box input-date"  disabled readonly value="${allList[i].listDate}"></td>

    <td>
    <button class="btn0 editBtn" onclick="editList(${i})" ondblclick="saveList(${i})">
    <i id="edit-1" class="fa-solid fa-pen icons edit form-control"></i></button>
    </td>

    <td>
    <button class="btn0" onclick="deleteList(${i})">
    <i class="fa-solid fa-trash-can icons delete form-control"></i> </button>
    </td>

    <td>
    <input type="checkbox" name="" id="myCheck" class="icons done chk0" onclick="handleCheck(${i})"></button>
    </td>
    </tr>  `
}
document.getElementById("counter").innerHTML = allList.length-1
document.getElementById("done-word").title = `+${allList[allList.length-1]}`;
document.querySelector("#rowData").innerHTML = cartona
}
/* ------------------------------- editList() ------------------------------- */
function editList(index){
    document.getElementById("edit").innerHTML = "Save"
    document.querySelectorAll(".edit")[index].classList.replace("fa-pen" ,"fa-floppy-disk")

    document.querySelectorAll(".input-title")[index].classList.add("editing-list-box"); 
    document.querySelectorAll(".input-notes")[index].classList.add("editing-list-box"); 
    document.querySelectorAll(".input-date")[index].classList.add("editing-list-box"); 

    document.querySelectorAll(".input-title")[index].removeAttribute("readonly")
    document.querySelectorAll(".input-title")[index].removeAttribute("disabled")

    document.querySelectorAll(".input-notes")[index].removeAttribute("readonly")
    document.querySelectorAll(".input-notes")[index].removeAttribute("disabled")

    document.querySelectorAll(".input-date")[index].removeAttribute("readonly") 
    document.querySelectorAll(".input-date")[index].removeAttribute("disabled")

}
/* ------------------------------- saveList() ------------------------------- */
function saveList(index){
    document.getElementById("edit").innerHTML = "Edit"
    document.querySelectorAll(".edit")[index].classList.replace("fa-floppy-disk" ,"fa-pen")

    document.querySelectorAll(".input-title")[index].classList.remove("editing-list-box"); 
    document.querySelectorAll(".input-notes")[index].classList.remove("editing-list-box"); 
    document.querySelectorAll(".input-date")[index].classList.remove("editing-list-box"); 

    document.querySelectorAll(".input-title")[index].setAttribute("readonly" ,"true")
    document.querySelectorAll(".input-title")[index].setAttribute("disabled" ,"true")

    document.querySelectorAll(".input-notes")[index].setAttribute("readonly","true")
    document.querySelectorAll(".input-notes")[index].setAttribute("disabled","true")

    document.querySelectorAll(".input-date")[index].setAttribute("readonly","true") 
    document.querySelectorAll(".input-date")[index].setAttribute("disabled","true")

    /*********  updated data  ***************/
    
    title = document.querySelectorAll(".input-title")[index]
    notes = document.querySelectorAll(".input-notes")[index]
    date  = document.querySelectorAll(".input-date")[index]
    list ={
        listTitle :title.value ,
        listNotes :notes.value ,
        listDate :date.value ,
        listDone : Number((allList[index].listDone === 1 )?  1 : 0 )
    }
        allList.splice(index,1,list)
        localStorage.setItem("allList" , JSON.stringify(allList))
    displayList()
    update()
}
/* ------------------------------ deleteList() ------------------------------ */
function deleteList(index){
        if( allList[index].listDone == 1)
            --allList[allList.length-1]
    
        allList.splice(index,1)
        localStorage.setItem("allList" , JSON.stringify(allList))
        displayList()
        update()
    }
    /* --------------------------------- reset() -------------------------------- */
    function reset()
    {
                allList =[]
                localStorage.removeItem("allList")
                displayList()
                document.location.reload()
                update()
    }