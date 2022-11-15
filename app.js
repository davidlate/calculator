
//Author: David Earley 2022
const buttons = document.querySelectorAll('button');
const uppInput = document.querySelector('.upper-input');
const lowInput = document.querySelector('.lower-input');

window.addEventListener('keydown', updatePage)
buttons.forEach(btn => btn.addEventListener('click', updatePage))


lowInputText = ''; //set as 0 in html for both text boxes
uppInputText = '';
uppInputNum = '';
clearCounter = 0; //used for CE double-click functionality
queue = ['', '', '', '']; //operation queue for calculations;



function updatePage(e){

    selection = getId(e); //get target from event listeners

    if (getId(e) === null || getId(e) === undefined) return; //return if not valid input
    if (selection.id !== 'clear-error') clearCounter = 0; //Used for double-click clear all functionality


    if (queue[3] == '=' && (selection.classList.contains('number'))){ //Used to reinitialize after pressing equals
        clearAll();
        queue[3] = '';
    }


    if (selection.classList.contains('pm')) pm();

    else if (selection.classList.contains('number'))             appendNum(selection);

    else if (selection.classList.contains('operation'))     appendOp(selection);


    else if (selection.id == 'equals')      equals();

    else if (selection.id=='clear-error'){  //clears error if CE clicked once.  clears all if CE clicked twice
        if (clearCounter == 0){
            clearError();
            clearCounter ++;
        } 
        else clearAll();
    }

    else if (selection.id == 'clear-all')   clearAll();

    selection.blur();
    e.preventDefault();

}

function getId(e){  //process info from event listeners based on if it is a click or keydown
    if (e.type == 'click') result = e.target;

    if(e.type == 'keydown') {
        let fn;
        fn = document.querySelector(`[data-key="${e.key}"]`);
        if (fn === null){
            if (e.key === "Enter") fn = document.querySelector(`#equals`);
            else if (e.key === "Backspace") fn = document.querySelector(`#clear-error`)
            else return;
        }
        result = fn;
    }
    return result
}

function appendNum(selection){
        let append = selection.id
        if (append == '.') {    //this statement is used to add, and then disable the decimal key
            if (selection.classList.contains('disabled')) append = '';
            else {
                selection.classList.add('disabled');
                if (lowInputText == '') append = '0.' //add 0 to left of decimal if needed.
            }
        }
        

        if (queue[1] != ''){ //if there is an operation queued enable equals button
            document.querySelector('#equals').classList.remove('disabled');
        }


        if (lowInputText.length < 15) lowInputText += append;
        lowInput.textContent = lowInputText;
}

function clearError(){
    lowInputText = '';
    lowInput.textContent = lowInputText + '0';
    if (queue[3]=='=') clearAll();
}

function clearAll(){        //reset calculator
    lowInputText = '';
    uppInputText = '';
    uppInputNum = '';
    clearCounter = 0;
    queue = ['', '', '', ''];
    lowInput.textContent = lowInputText + '0';
    uppInput.textContent = uppInputText + '0';
    enableDecimal();
    document.querySelector('#equals').classList.add('disabled')

}

function appendOp(selection){       //What to do when operation button is pressed
    op = selection.dataset.key;

    if (lowInputText == '') return; //Do not proceed if no numbers put in
    

    if (queue[3]=='='){
        queue[0] = lowInputText
        queue[1] = op;
        queue[2] = '';
        queue[3] = '';
        enableDecimal()
    }

    else if (queue[1] !== ''){   //If there's already an op queued in the upper window
        queue[2] = lowInputText;    //add newly input numbers to queue and perform previously selected operation
        queue[0] = evaluate(queue); //operate on queue
        queue[1] = op;  //add new operation to queue
        queue[2] = '';  //create empty space for next number input
        enableDecimal();
    }

    else{   
        queue[0] = lowInputText;
        queue[1] = op;
        queue[2] = '';
        enableDecimal();
    }

    uppInputText = queue.join('');
    uppInput.textContent = uppInputText;
    lowInputText = '';
    lowInput.textContent = lowInputText;
}

function equals(){
    if (queue[1] !== '' && lowInputText !== ''&& queue[3] !== '='){
        queue[2] = lowInputText;
        queue[3] = '=';
        result = evaluate(queue)

        lowInputText = result;
        uppInputText = queue[0] + queue[1] + queue [2] + '=';

        lowInput.textContent = lowInputText;
        uppInput.textContent = uppInputText;
        document.querySelector('#equals').classList.add('disabled');
        enableDecimal();
    }

}

function evaluate(queue){   //evaluate queued operations
    let result;
    let dec0 =0; //number of decimals in first operand
    let dec2 =0;//number of decimals in first operand
    let decCorrect=0;
    queue[0] = String(queue[0]);
    queue[2] = String(queue[2]);
    // if there is a decimal in each operand, set dec1 and dec2 to the number of decimals
    if (queue[0].split('.').length == 2) dec0 = queue[0].split('.')[1].length;
    if (queue[2].split('.').length == 2) dec2 = queue[2].split('.')[1].length;


    if (dec0 > dec2) decCorrect = dec0*10; //floating point error correction factor
    else decCorrect = dec2*10;

    if (decCorrect == 0) decCorrect = 1;


    switch (queue[1]){
        case '-':
            result = ((decCorrect*(Number(queue[0]))) - (decCorrect*Number(queue[2])))/decCorrect;
            break;
        case '+':
            result = ((decCorrect*(Number(queue[0]))) + (decCorrect*Number(queue[2])))/decCorrect;
            break;
        case '/':
            result = ((decCorrect*(Number(queue[0]))) / (decCorrect*Number(queue[2])));
            break;
        case '*':
            result = ((decCorrect*(Number(queue[0]))) * (decCorrect*Number(queue[2])))/(decCorrect*decCorrect)
            break;

    }
    
    numDecimalsInResult = String(result).split('.')[1].length;

    if (numDecimalsInResult >=8) result = Math.round(result*1e8)/1e8;

    return result;

    
}

function enableDecimal(){
    document.querySelector('#\\.').classList.remove('disabled');
}

function pm(){ 

    if (lowInput.textContent.includes('-')) lowInputText = lowInputText.replace('-', '');
    else lowInputText = '-'+lowInputText;
    if (lowInput.textContent == '0' || lowInput.textContent == '-0') lowInput.textContent = lowInputText + '0';
    else lowInput.textContent = lowInputText;
}