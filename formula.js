for(let i=0;i<allCells.length;i++){

    allCells[i].addEventListener("blur",function (){
        let data=allCells[i].innerText;
        let address=addressInput.value;
        let {rid,cid}=getRIDCIDfromAddress(address);
        sheetDB[rid][cid].value=data;
    })
}

formulaBar.addEventListener("keydown",function (e){
    if(e.key =="Enter" && formulaBar.value){
        let cformula=formulaBar.value;
        let value=evaluateFormula(cformula);
        setCell(value,cformula);
    }
})
function evaluateFormula(formula){
    let formulaTokens=formula.split(" ");
    for(let i=0;i<formulaTokens.length;i++){
        let ascii=formulaTokens[i].charCodeAt(0);
        if(ascii>= 65 && ascii <=90){
            let {rid,cid}=getRIDCIDfromAddress(formulaTokens[i]);
            let value=sheetDB[rid][cid].value;
            formulaTokens[i]=value;
        }
    }
    let evaluatedFormula=formulaTokens.join(" ");

    return eval(evaluatedFormula);
}

function setCell(value,formula){

    let uicellElem=findUICellElement();

    uicellElem.innerText=value;

    let {rid,cid}=getRIDCIDfromAddress(addressInput.value);
    sheetDB[rid][cid].value=value;
    sheetDB[rid][cid].formula=formula;
}
function findUICellElement(){
    let address=addressInput.value;
    let ricidObj=getRIDCIDfromAddress(address);
    let rid=ricidObj.rid;
    let cid=ricidObj.cid;
    let uiCellElement=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    return uiCellElement;
}

function getRIDCIDfromAddress(address){
    let cid=Number(address.charCodeAt(0)-65);
    let rid=Number(address.slice(1))-1;
    return{
        rid,cid
    }
}