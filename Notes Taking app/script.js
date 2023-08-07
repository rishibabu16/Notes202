const addB = document.querySelector("#addB");
const main = document.querySelector("#main");
const saveN = () =>{
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach((note)=>{data.push(note.value)})
    if(data.length === 0){
        localStorage.removeItem("notes")
    }
    else{
        localStorage.setItem("notes",JSON.stringify(data))
    }
    
}
addB.addEventListener(
    "click",function(){
        addNote()
    }
)

const addNote = (text = "") =>{
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
                <i class='trash fas fa-trash-alt'></i>
                <i class='save fas fa-save'></i>
            </div>
            <textarea>${text}</textarea>`;
    note.querySelector(".trash").addEventListener("click",
    function(){
        note.remove();
        saveN();
    }
    )
    note.querySelector(".save").addEventListener("click",
    function(){
        saveN();
    }
    )
    note.querySelector("textarea").addEventListener("focusout",
        function(){
            saveN()
        }
    )
    main.appendChild(note);
    saveN();
}
(
    function(){
        const LSnotes = JSON.parse(localStorage.getItem("notes"));
        if(LSnotes == null){
            addNote()
        }else{
            LSnotes.forEach(
                (LSnotes) => {
                    addNote(LSnotes)
                }
            )
        }
    }
)()