let leftCol = document.querySelector(".left_col");
let topRow = document.querySelector(".top_row");
let grid = document.querySelector(".grid");
let addressInput=document.querySelector(".address-input");
let boldBtn=document.querySelector(".bold");
let underlineBtn=document.querySelector(".underline");
let italicBtn=document.querySelector(".italic");
let rows = 100;
let cols = 26
for (let i = 0; i < rows; i++) {
    let colBox = document.createElement("div");
    colBox.innerText = i + 1;
    colBox.setAttribute("class", "box");
    leftCol.appendChild(colBox);

}
for (let i = 0; i < cols; i++) {
    let cell = document.createElement("div");
    cell.innerText = String.fromCharCode(65 + i);
    // setAttribute
    cell.setAttribute("class", "cell");
    topRow.appendChild(cell);
}
for (let i = 0; i < rows; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < cols; j++) {
        let cell = document.createElement("div");
        // cell.innerText = `${String.fromCharCode(65 + j)}  ${i+1}`
        cell.setAttribute("class", "cell");
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        cell.setAttribute("contenteditable","true");
        row.appendChild(cell);
    }
    grid.appendChild(row);
}

let allCells=document.querySelectorAll(".grid .cell");

for(let i=0 ; i < allCells.length; i++){
    allCells[i].addEventListener("click",function(){

        let rid=allCells[i].getAttribute("rid");
        let cid=allCells[i].getAttribute("cid");
        rid=Number(rid);
        cid=Number(cid);
        let address=`${String.fromCharCode(65 + cid)}${rid + 1} `;
        addressInput.value = address;
    })
}


boldBtn.addEventListener("click",function(){
    
   let uiCellElement=findUIElement();
    uiCellElement.style.fontWeight = "bold"; 
    
})

underlineBtn.addEventListener("click",function(){
    
    let uiCellElement=findUIElement();
     uiCellElement.style.textDecoration = "underline"; 
     
})
italicBtn.addEventListener("click",function(){
    
    let uiCellElement=findUIElement();
     uiCellElement.style.fontStyle = "italic"; 
     
})

function findUIElement(){
    let address =addressInput.value;
    let riciobj=getRIDCIDfromAddress(address);
    let rid=riciobj.rid;
    let cid=riciobj.cid;
    let uiCellElement=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    return uiCellElement;
}

function getRIDCIDfromAddress(address){
    let cid=Number(address.charCodeAt(0))-65;
    let rid=Number(address.slice(1))-1;
    
    return {
        "rid" : rid,"cid" : cid
    };
    
}
allCells[0].click();