window.addEventListener('keydown', updatePage)

const buttons = document.querySelectorAll('button');
const uppInput = document.querySelector('.upper-input');
const lowInput = document.querySelector('.lower-input');
buttons.forEach(btn => btn.addEventListener('click', updatePage))


lowInputText = '';
uppInputText = '';
uppInputNum = '';
decimalUsed = false;
clearCounter = 0;
queue = ['', '', ''];



function updatePage(e){

    selection = getId(e);
    
    if (getId(e) === null || getId(e) === undefined) return;
    if (selection.id !== 'clear-error') clearCounter = 0;
    
    


    if (selection.classList.contains('number')){
         appendNum(selection);
    }

    else if (selection.classList.contains('operation')){
        appendOp(selection);
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


    console.log(queue)
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
            else {
                selection.classList.add('disabled');
                append = '0.';
            }
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
    uppInputText = '';
    uppInputNum = '';
    decimalUsed = false;
    clearCounter = 0;
    queue = ['', '', ''];

    lowInput.textContent = lowInputText + '0';
    uppInput.textContent = uppInputText + '0';
    
    document.querySelectorAll('.disabled')
        .forEach(btn => btn.classList.remove('disabled'))

}


function appendOp(selection){
    op = selection.dataset.key;

    if (lowInputText == '') return;
    
    if (queue[1] !== ''){
        queue[2] = lowInputText;
        queue[0] = evaluate(queue);
        queue[1] = op;
        queue[2] = '';
    }

    else{
        queue[0] = lowInputText;
        queue[1] = op;
        queue[2] = '';
    }


    uppInputText = queue.join('');
    uppInput.textContent = uppInputText;
    lowInputText = ''
    lowInput.textContent = lowInputText;
}


function evaluate(queue){
    switch (queue[1]){
        case '-':
            queue[0] = queue[0] - queue[2];
            break;
        case '+':
            queue[0] = Number(queue[0]) + Number(queue[2]);
            break;
        case '/':
            queue[0] = queue[0] / queue[2];
            break;
        case '*':
            queue[0] = queue[0] * queue[2]
            break;

    }
        return queue[0];

    
}

