window.addEventListener('keydown', updatePage)

const buttons = document.querySelectorAll('button');
const uppInput = document.querySelector('.upper-input');
const lowInput = document.querySelector('.lower-input');
buttons.forEach(btn => btn.addEventListener('click', updatePage))


lowInputText = '';
uppInputText = '';
decimalUsed = false;
clearCounter = 0;



function updatePage(e){
    
    selection = getId(e);
    if (getId(e) === null || getId(e) === undefined) return;
    if (selection.id !== 'clear-error') clearCounter = 0;
    
    


    if (selection.classList.contains('number')){
         appendNum(selection);
    }


    else if (selection.id=='clear-error'){
        if (clearCounter == 0){
            clearError();
            clearCounter ++;
        } 
        else clearAll();
    }


    else if (selection.id == 'clear-all'){
        clearAll();
    }

    console.log(selection)
}





function getId(e){
    if (e.type == 'click') result = e.target;

    if(e.type == 'keydown') {
        fn = document.querySelector(`[data-key="${e.key}"]`)
        if (fn === null) return
        result = fn;
    }
    return result
}




function appendNum(selection){
        let append = selection.id
        if (append == '.') {
            if (selection.classList.contains('disabled')) append = '';
            else selection.classList.add('disabled')
        }
        

        lowInputText += append;
        lowInput.textContent = lowInputText;

    }


function clearError(){
    lowInputText = '';
    lowInput.textContent = lowInputText + '0';
}


function clearAll(){
    lowInputText = '';
    lowInput.textContent = lowInputText + '0'
    uppInputText = '';
    uppInput.textContent = uppInputText + '0';
    
    document.querySelectorAll('.disabled')
        .forEach(btn => btn.classList.remove('disabled'))

}