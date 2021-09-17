let filterColors={pink:"#fdc0ca",blue:"#b6e7f8",green:"#adffad",black:"#ffffff"}
let filterColorKeys=Object.keys(filterColors)
let filterColorActiveBooleanObject={pink:false,blue:false,green:false,black:false}
let body=document.querySelector("body")
let grid=document.querySelector(".grid")
let filterColorButtons=document.querySelectorAll(".filter div")
let add=document.querySelector(".add")
let deleteButton=document.querySelector(".delete")
let activeDeleteButtonText=document.querySelector(".active-delete-button-text")
let ticketColorsDisplayed=document.querySelectorAll(".ticket-color")
let ticketBoxesDisplayed=document.querySelectorAll(".ticket-box")
let ticketsDisplayedHtmlList=document.querySelectorAll(".ticket")
activeDeleteButtonText.style.visibility="hidden"
let suid = new ShortUniqueId()
let newSuid
let modalDisplayed=false
let deleteButtonState=false
let ticketColorClicked
let ticketColorClickedIndex
let ticketColorClickCount
let ticketColorChanged
let filterColorClick
let modal
let modalFilters
let activeModalFilterColor
let ticket
let ticketColorClass
let writingArea
let writingAreaInnerText
let firstKeyPressOver
let shiftPressed
let ticketsInLocalStorageArray
let ticketsInLocalStorageKey
let ticketColor
let ticketId
let ticketBox
let ticketsDisplayedArray
let ticketDeletedId
let countOfColorsToDisplay
let ticketColorChangedId
let changedTicketText
let changedTicketId
let localStorageInitializer=()=>{
    ticketsInLocalStorageArray=JSON.parse(localStorage.getItem("ticketsInLocalStorageKey"))
    if(ticketsInLocalStorageArray!=undefined && ticketsInLocalStorageArray!=null){
        for(let i=0;i<ticketsInLocalStorageArray.length;i++){
            ticketColorClass=`ticket-color `+ticketsInLocalStorageArray[i].color
            ticket=document.createElement("div")
            ticket.classList.add("ticket")
            ticket.innerHTML=`<div class="${ticketColorClass}"></div><div class="ticket-id">${ticketsInLocalStorageArray[i].id}</div>
            <div class="ticket-box" contenteditable>${ticketsInLocalStorageArray[i].box}</div>`
            grid.appendChild(ticket)
        }
    }
    ticketsDisplayedHtmlList=document.querySelectorAll(".ticket")
    for(let i=0;i<ticketsDisplayedHtmlList.length;i++){
        ticketsDisplayedHtmlList[i].addEventListener("dblclick",ticketDoubleClickHandler)
    }
    ticketColorsDisplayed=document.querySelectorAll(".ticket-color")
    for(let i=0;i<ticketColorsDisplayed.length;i++){
        ticketColorsDisplayed[i].addEventListener("click",ticketColorClickHandler)
    }
    ticketBoxesDisplayed=document.querySelectorAll(".ticket-box")
    for(let i=0;i<ticketBoxesDisplayed.length;i++){
        ticketBoxesDisplayed[i].addEventListener("keyup",ticketEditHandler)
    }
}
let localStorageAdder=(activeModalFilterColor,newSuid,writingAreaInnerText)=>{
    ticketObject={color:activeModalFilterColor,id:newSuid,box:writingAreaInnerText}
    if(ticketsInLocalStorageArray==undefined || ticketsInLocalStorageArray==null){
        localStorage.setItem("ticketsInLocalStorageKey",JSON.stringify([]))
    }
    ticketsInLocalStorageArray=JSON.parse(localStorage.getItem("ticketsInLocalStorageKey"))
    ticketsInLocalStorageArray.push(ticketObject)
    localStorage.setItem("ticketsInLocalStorageKey",JSON.stringify(ticketsInLocalStorageArray))
}
let localStorageDeleter=(ticketDeletedId)=>{
    ticketsInLocalStorageArray=JSON.parse(localStorage.getItem("ticketsInLocalStorageKey"))
    for(let i=0;i<ticketsInLocalStorageArray.length;i++){
        if(ticketsInLocalStorageArray[i].id==ticketDeletedId){
            ticketsInLocalStorageArray.splice(i,1)
        }
    }
    localStorage.setItem("ticketsInLocalStorageKey",JSON.stringify(ticketsInLocalStorageArray))
}
let filterColorClickHandler=(eventFilterColorClick)=>{
    filterColorClick=eventFilterColorClick.target.classList[0].split("-")[0]
    filterColorActiveBooleanObject[filterColorClick]=!filterColorActiveBooleanObject[filterColorClick]

    if(filterColorActiveBooleanObject[filterColorClick]){
        eventFilterColorClick.target.style.border="solid white 2px"
    }
    else{
        eventFilterColorClick.target.style.border="none"
    }
    filterTickets()
}
let filterTickets=()=>{
    countOfColorsToDisplay=0
    for(let i=0;i<filterColorKeys.length;i++){
        if(filterColorActiveBooleanObject[filterColorKeys[i]]){
            countOfColorsToDisplay++
        }
    }
    if(countOfColorsToDisplay==0){
        body.style.backgroundColor="white"
        ticketsDisplayedArray=document.querySelectorAll(".ticket")
        for(let i=0;i<ticketsDisplayedArray.length;i++){
            ticketsDisplayedArray[i].remove()
        }
        localStorageInitializer()
        return
    }
    if(countOfColorsToDisplay!=1){
        body.style.backgroundColor="white"
    }
    else{
        for(let i=0;i<filterColorKeys.length;i++){
            if(filterColorActiveBooleanObject[filterColorKeys[i]]){
                body.style.backgroundColor=filterColors[filterColorKeys[i]]
            }
        }
    }
    ticketsDisplayedArray=document.querySelectorAll(".ticket")
    for(let i=0;i<ticketsDisplayedArray.length;i++){
        ticketsDisplayedArray[i].remove()
    }
    for(let i=0;i<filterColorKeys.length;i++){
        if(filterColorActiveBooleanObject[filterColorKeys[i]]){
            ticketsInLocalStorageArray=JSON.parse(localStorage.getItem("ticketsInLocalStorageKey"))
            if(ticketsInLocalStorageArray!=undefined && ticketsInLocalStorageArray!=null){
                for(let j=0;j<ticketsInLocalStorageArray.length;j++){
                    if(ticketsInLocalStorageArray[j].color==filterColorKeys[i]){
                        ticketColorClass=`ticket-color `+ticketsInLocalStorageArray[j].color
                        ticket=document.createElement("div")
                        ticket.classList.add("ticket")
                        ticket.innerHTML=`<div class="${ticketColorClass}"></div><div class="ticket-id">${ticketsInLocalStorageArray[j].id}</div>
                        <div class="ticket-box" contenteditable>${ticketsInLocalStorageArray[j].box}</div>`
                        grid.appendChild(ticket)
                    }
                }
            }
        }
    }
    ticketsDisplayedHtmlList=document.querySelectorAll(".ticket")
    for(let i=0;i<ticketsDisplayedHtmlList.length;i++){
        ticketsDisplayedHtmlList[i].addEventListener("dblclick",ticketDoubleClickHandler)
    }
    ticketColorsDisplayed=document.querySelectorAll(".ticket-color")
    for(let i=0;i<ticketColorsDisplayed.length;i++){
        ticketColorsDisplayed[i].addEventListener("click",ticketColorClickHandler)
    }
    ticketBoxesDisplayed=document.querySelectorAll(".ticket-box")
    for(let i=0;i<ticketBoxesDisplayed.length;i++){
        ticketBoxesDisplayed[i].addEventListener("keyup",ticketEditHandler)
    }
}
let modalFilterClickHandler=(eventModalFilterClick)=>{
    for(let j=0;j<modalFilters.length;j++){
        modalFilters[j].classList.remove("active-modal-filter")
    }
    eventModalFilterClick.currentTarget.classList.add("active-modal-filter")
    modalFilterClickedColor=eventModalFilterClick.currentTarget.classList[1]
    writingArea.style.backgroundColor=filterColors[modalFilterClickedColor]
}
let eventWriteHandler=(eventWriteKeyPress)=>{
    if(!firstKeyPressOver){
        eventWriteKeyPress.currentTarget.innerText=""
    }
    firstKeyPressOver=true
    shiftPressed=eventWriteKeyPress.shiftKey
    if(!shiftPressed && eventWriteKeyPress.keyCode==13){
        for(let i=0;i<modalFilters.length;i++){
            if(modalFilters[i].classList[2]=="active-modal-filter"){
                activeModalFilterColor=modalFilters[i].classList[1]
            }
        }
        ticketColorClass=`ticket-color `+activeModalFilterColor
        newSuid="#"+suid()
        writingAreaInnerText=writingArea.innerText
        ticket=document.createElement("div")
        ticket.classList.add("ticket")
        ticket.innerHTML=`<div class="${ticketColorClass}"></div><div class="ticket-id">${newSuid}</div>
        <div class="ticket-box" contenteditable>${writingAreaInnerText}</div>`
        grid.appendChild(ticket)        
        modal.remove()
        modalDisplayed=false
        add.style.backgroundColor="#ffff7e"

        ticketColorsDisplayed=document.querySelectorAll(".ticket-color")
        for(let i=0;i<ticketColorsDisplayed.length;i++){
            ticketColorsDisplayed[i].addEventListener("click",ticketColorClickHandler)
        }
        ticketsDisplayedHtmlList=document.querySelectorAll(".ticket")
        for(let i=0;i<ticketsDisplayedHtmlList.length;i++){
            ticketsDisplayedHtmlList[i].addEventListener("dblclick",ticketDoubleClickHandler)
        }
        localStorageAdder(activeModalFilterColor,newSuid,writingAreaInnerText)
    }
}
let eventAddHandler=(eventAddClick)=>{
    if(modalDisplayed)return
    eventAddClick.currentTarget.style.backgroundColor="#ffff3c"
    modal=document.createElement("div")
    modal.classList.add("modal-container")
    modal.innerHTML=`<div class="writing-area" contenteditable>
                        Enter your task here.<br> 
                        Press shift + enter to go to next line.<br>
                        Select the color & press enter to create a new ticket.
                    </div> 
                    <div class="filter-area"> 
                        <div class="modal-filter pink"></div>
                        <div class="modal-filter blue"></div>
                        <div class="modal-filter green"></div>
                        <div class="modal-filter black active-modal-filter"></div>
                    </div>`
    body.append(modal)
    modalDisplayed=true
    modalFilters=document.querySelectorAll(".modal-filter")
    for(let i=0;i<modalFilters.length;i++){
        modalFilters[i].addEventListener("click",modalFilterClickHandler)
    }
    writingArea=document.querySelector(".writing-area")
    firstKeyPressOver=false
    writingArea.addEventListener("keypress",eventWriteHandler)
}
let ticketColorClickHandler=(eventTicketColorClick)=>{
    ticketColorClicked=eventTicketColorClick.currentTarget.classList[1]
    ticketColorClickedIndex=filterColorKeys.indexOf(ticketColorClicked)
    ticketColorChanged=filterColorKeys[(ticketColorClickedIndex+1)%4]
    eventTicketColorClick.currentTarget.classList.remove(ticketColorClicked)
    eventTicketColorClick.currentTarget.classList.add(ticketColorChanged)
    ticketColorChangedId=eventTicketColorClick.target.parentElement.querySelector(".ticket-id").innerText
    ticketsInLocalStorageArray=JSON.parse(localStorage.getItem("ticketsInLocalStorageKey"))
    for(let i=0;i<ticketsInLocalStorageArray.length;i++){
        if(ticketsInLocalStorageArray[i].id==ticketColorChangedId){
            ticketsInLocalStorageArray[i].color=ticketColorChanged
        }
    }
    localStorage.setItem("ticketsInLocalStorageKey",JSON.stringify(ticketsInLocalStorageArray))
    filterTickets()
    for(let i=0;i<filterColorButtons.length;i++){
        console.log("hi")
        filterColorButtons[i].addEventListener("click",filterColorClickHandler)
    }
}
let deleteButtonClickHandler=(eventDeleteButtonClick)=>{
    deleteButtonState=!deleteButtonState
    if(deleteButtonState){
        deleteButton.classList.add("active-delete-button")
        activeDeleteButtonText.style.visibility="visible";
    }
    else{
        deleteButton.classList.remove("active-delete-button")
        activeDeleteButtonText.style.visibility="hidden";
    }
}
let ticketDoubleClickHandler=(eventTicketDoubleClick)=>{
    if(deleteButtonState){
        ticketDeletedId=eventTicketDoubleClick.currentTarget.querySelector(".ticket-id").innerText
        localStorageDeleter(ticketDeletedId)
        eventTicketDoubleClick.currentTarget.remove()
    }
}
let ticketEditHandler=(eventTicketBoxDisplayedKeyup)=>{
    changedTicketText=eventTicketBoxDisplayedKeyup.currentTarget.innerText
    changedTicketId=eventTicketBoxDisplayedKeyup.target.parentElement.querySelector(".ticket-id").innerText
    ticketsInLocalStorageArray=JSON.parse(localStorage.getItem("ticketsInLocalStorageKey"))
    for(let i=0;i<ticketsInLocalStorageArray.length;i++){
        if(ticketsInLocalStorageArray[i].id==changedTicketId){
            ticketsInLocalStorageArray[i].box=changedTicketText
        }
    }
    localStorage.setItem("ticketsInLocalStorageKey",JSON.stringify(ticketsInLocalStorageArray))

}
localStorageInitializer()
for(let i=0;i<filterColorButtons.length;i++){
    filterColorButtons[i].addEventListener("click",filterColorClickHandler)
}
add.addEventListener("click",eventAddHandler)
for(let i=0;i<ticketColorsDisplayed.length;i++){
    ticketColorsDisplayed[i].addEventListener("click",ticketColorClickHandler)
}
for(let i=0;i<ticketBoxesDisplayed.length;i++){
    ticketBoxesDisplayed[i].addEventListener("keyup",ticketEditHandler)
}
deleteButton.addEventListener("click",deleteButtonClickHandler)
for(let i=0;i<ticketsDisplayedHtmlList.length;i++){
    ticketsDisplayedHtmlList[i].addEventListener("dblclick",ticketDoubleClickHandler)
}










