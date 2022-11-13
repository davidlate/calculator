window.addEventListener('keydown', updatePage)

const buttons = document.querySelectorAll('button');
const uppInput = document.querySelector('.upper-input');
const lowInput = document.querySelector('.lower-input');
buttons.forEach(btn => btn.addEventListener('click', updatePage))


lowInputText = '';
uppInputText = '';
decimalUsed = false;



function updatePage(e){

    if (getId(e) === null || getId(e) === undefined) return;
    selection = getId(e);


    if (selection.classList.contains('number')){
         appendNum(selection);
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

        if(append = '.' && decimalUsed == false){
            decimalUsed = true;
        }

        else if (append == '.' && decimalUsed == true){
            append = '';
        }

        lowInputText += selection.id;
        lowInput.textContent = lowInputText;

    }


