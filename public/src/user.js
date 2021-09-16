const signInBtn = document.querySelector('#signInBtn');
const signInId = document.querySelector('#signInId');
const signInPassword = document.querySelector('#signInPassword');
const singInContainer = document.querySelector('.signIn');
const singUpContainer = document.querySelector('.signUp');
const nameForm = document.querySelector('#name');
const phoneForm = document.querySelector('#phone');
const idForm = document.querySelector('#id');
const passwordForm = document.querySelector('#password');

signInBtn.addEventListener('click',()=>{
    singInContainer.style.display = 'none';
    singUpContainer.style.display = 'block';
})
let checkNum = [];
phoneForm.addEventListener('keydown',(event)=>{
    const value = event.target.value;
    const char = event.key;
    let isNumber = Number.isInteger(Number.parseInt(char));
    let check = true;

    if(value.length >= 13 || (char!=="Backspace" && !isNumber)){
        phoneForm.readOnly = true;
        let tmp = phoneForm.value.split('');
        tmp.pop();
        phoneForm.value = tmp.join(''); 
    }else{
        phoneForm.readOnly = false;
    }

    if(!phoneForm.readOnly && isNumber){
        if(checkNum.length === 3 || checkNum.length === 8 ){
            checkNum.push('-');
            phoneForm.value = value +'-';
        }
        checkNum.push(char);
    }
    else{
        if(value.length === 13)
            phoneForm.readOnly = false;
        checkNum.pop();
    }
    
})

idForm.addEventListener('keydown',(event)=>{
    let engNum = /^[a-zA-Z0-9]*$/;
    if(!engNum.test(event.key)){
        let tmp = idForm.value.split('');
        tmp.pop();
        idForm.value = tmp.join('');
    }
})
function signInHandler(){
    const id = signInId.value;
    const password = signInPassword.value;
    
    if(id && password){
        return true;
    } else{
        alert("항목을 빠짐없이 기입해주세요!!");
        return false;
    }
}
function signUpHandler(){
    const name = nameForm.value;
    const phone = phoneForm.value;
    const id = idForm.value;
    const password = passwordForm.value;

    if(name && phone && id && password){
        return true;
    }else{
        alert("항목을 빠짐없이 기입해주세요!!");
        return false;
    }
}
