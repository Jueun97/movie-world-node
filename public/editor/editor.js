'use strict';
const mainContent = document.querySelector('.main');
const imageFile = document.querySelector('.upload-image');
const imageBox = document.querySelector('.board__image');
const menuBar = document.querySelector('.menu__options');
const textBtn = document.querySelector('.option-text');
const textOptions = document.querySelector('.text-options');
const textContainer = document.querySelector('.board__text');
let selectedTextBox = null;
const backgroudBox = document.querySelector('.board__background');
const sideMenu = document.querySelector('.side');
const colorBtn = document.querySelector('.color__colors');
const sizeBtn = document.querySelector('.size');
const fontBtn = document.querySelector('.font__style');
const gradientContainer = document.querySelector('.option-colors');
const gradientAddBtn = document.querySelector('.option-add');
const gradientRemoveBtn = document.querySelector('.color-remove');
const gradientApplyBtn = document.querySelector('.option-apply');
const gradientDirectionBtn = document.querySelector('.gradient__direction');
const gradientRangeBar = document.querySelector('.opacity__range');
const previewBox = document.querySelector('.preview');
const pickAColor = document.querySelector('.color-choice');
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let grd = context.createLinearGradient(0, 0, 350, 0);
let grdForText = null;
let grdForDraw = null;
let grdForBackground = null;

let active = 'draw';
let curX, curY, prevX, prevY = null;
let drawing = false;
let textMoving = false;
let erasing = false;
let colorForText = 'black';
let colorForDraw = 'black';
let colorForBg = 'transparent';
let textSize = '';
let drawSize = '';
let eraserSize = '';
let isGradientForDraw = false;
let isGradientForBg = false;
let isGradientForText = false;
let gradientDirection = 'to right';
let gradientCheck = 'right';
let opacityRange = '';
let textBoxCount = 0;
let selectedTextBoxStorage = [];
let imageUrl = '';
let clickedMenu = null;

const address = 'http://localhost:3000/image__process';

imageFile.addEventListener('change', () => {
    const reader = new FileReader();    
    reader.addEventListener('load', () => {
    //console.log(reader.result);
    //const image = document.querySelector('.imagePreview').setAttribute('src', reader.result);
    /* image.src = reader.result;
    image.addEventListener('load', () => {
        context.drawImage(image, 300,200);
    }) */
        context.clearRect(0, 0, 350, 550);
        imageBox.src = reader.result;
        menuBar.style.display = 'block';
        sideMenu.style.display = 'flex';
        previewBox.style.display = 'none';

    })
    const textContainerX = imageBox.getBoundingClientRect().left;
    textContainer.style.left = `${textContainerX}px`;
    reader.readAsDataURL(imageFile.files[0])
})

menuBar.addEventListener('click', (event) => {
    if (clickedMenu === null) {
        clickedMenu = event.target;
        clickedMenu.classList.add('clicked');
    }
    
    if (clickedMenu !== event.target) {
        clickedMenu.classList.remove('clicked');
        clickedMenu = event.target;
        clickedMenu.classList.add('clicked');
    }
    hilightClickedMenu();
    active = event.target.getAttribute('data-menu');
    if (active === 'text') {
        textOptions.style.display = 'inline-block';
    } else if (active === 'add') {
        const textBox = document.createElement('textarea');
        textBox.setAttribute('class', 'text-box');
        textBox.setAttribute('id', textBoxCount++)
        textBox.setAttribute('oninput', 'display();')
        textBox.setAttribute('rows', '1');
        textBox.setAttribute('cols', '20');
        textBox.style.position = 'absolute';
        textBox.style.left = '0';
        textBox.style.maxWidth = '350px';

        textContainer.append(textBox);
        active = 'text';
    } else if (active === 'remove') {
        selectedTextBoxStorage[selectedTextBox.getAttribute('id')] = null;
        selectedTextBox.remove();

    } else {
        textOptions.style.display = 'none';
    }

    if (active === 'save')
        saveCanvas();

})
function display() {
    if (selectedTextBox.value)
        selectedTextBox.style.border = 'none'
    else
    selectedTextBox.style.border = '1px dotted black'
}
function hilightClickedMenu() {
    const menuButtons = document.querySelectorAll('.menu-btn');

    menuButtons.forEach((element) => {
        if (element.matches('.clicked'))
            element.style.backgroundColor = 'pink';
        else
            element.style.backgroundColor = ' rgba(88, 193, 241, 0.473)';
    })
}
textContainer.addEventListener('mousedown', (event) => {
    selectedTextBox = event.target;
    if (active === 'text')
        selectedTextBox.disabled = false
    else
        selectedTextBox.disabled = true

    if (!selectedTextBoxStorage[selectedTextBox.getAttribute('id')]) {
        selectedTextBoxStorage[selectedTextBox.getAttribute('id')] = {
            color: 'black',
            font: 'sans-serif',
            size: '20px',
            xPos: '0',
            yPos: '0',
            text: '',
            grdColor1: null,
            grdColor2: null,
            grdColor3: null,
            grdDirection: 'right',
            isGradient: false
        }
        console.log(selectedTextBoxStorage);
    }
    
    textMoving = true;
})
textContainer.addEventListener('mouseup', (event) => {
    textMoving = false;
})
textContainer.addEventListener('change', (event) => {
    selectedTextBoxStorage[selectedTextBox.getAttribute('id')].text = event.target.value;
})
canvas.addEventListener('mousedown', (event) => {
    if (active === 'draw' || active === 'erase' ) {
        curX = event.layerX;
        curY = event.layerY;
        drawing = true;
        erasing = true;
    }


});
canvas.addEventListener('mousemove', (event) => {
    let coordinateX = event.layerX;
    let coordinateY = event.layerY;
    switch (active) {
        case 'draw': {
            if (drawing) {
                context.globalCompositeOperation = 'source-over';
                prevX = curX;
                prevY = curY;
                curX = coordinateX;
                curY = coordinateY;
                context.lineWidth = drawSize;
                if (isGradientForDraw)
                    context.strokeStyle = grdForDraw;
                else
                    context.strokeStyle = colorForDraw;
                context.lineCap = 'round';
                context.beginPath();
                context.moveTo(prevX, prevY);
                context.lineTo(curX, curY);
                context.stroke();
            }
            break;
        };
        case 'erase': {
            if (erasing) {
                context.globalCompositeOperation = 'destination-out';
                prevX = curX;
                prevY = curY;
                curX = coordinateX;
                curY = coordinateY;
                context.lineWidth = eraserSize;
                context.lineCap = 'round';
                context.beginPath();
                context.moveTo(prevX, prevY);
                context.lineTo(curX, curY);
                context.stroke();
            }
            break;
        };
        case 'text': {
            if (textMoving && selectedTextBox) {
                selectedTextBox.style.transform = `translate(${coordinateX}px,${coordinateY}px)`;
                selectedTextBoxStorage[selectedTextBox.getAttribute('id')].xPos = coordinateX;
                selectedTextBoxStorage[selectedTextBox.getAttribute('id')].yPos = coordinateY;
            }
        };
        case 'background': ;
        default: ;
    }
});
canvas.addEventListener('mouseup', () => {
    drawing = false;
    erasing = false;
});

colorBtn.addEventListener('click', (event) => {
    let color = null;
    if (event.target.matches('.fa-minus')) {
        event.target.parentNode.style.backgroundColor = 'white';
        event.target.parentNode.setAttribute('data-color', 'empty');
        event.target.parentNode.style.border = '1px solid black';
        event.target.setAttribute('class', 'fas fa-plus');
        event.target.style.color = 'black';

    } else if (event.target.matches('.fa-plus')) {
        color = event.target.parentNode.getAttribute('data-color');
    } else {
        color = event.target.getAttribute('data-color');
    }

    if (active === 'draw')
        isGradientForDraw = false;
    else if (active === 'background')
        isGradientForBg = false;
    else
        selectedTextBoxStorage[selectedTextBox.getAttribute('id')].isGradient = false;
    
    if (color === 'empty') {
        console.log(event.target);
        event.target.style.border = '1px dotted black';
        event.target.classList.add('changing');
    }
    else if(color) {
        switch (active) {
            case 'draw': 
                colorForDraw = color;
                break;
            case 'text': {
                if (selectedTextBox) {
                    colorForText = color;
                    selectedTextBox.style.color = colorForText;
                    selectedTextBoxStorage[selectedTextBox.getAttribute('id')].color = colorForText;
                }
                break;
            };
            case 'background': {
                colorForBg = color;
                backgroudBox.style.background = 'none';
                backgroudBox.style.backgroundColor = colorForBg;
                break;
            };
            default: ;
        }
    }
    
});
colorBtn.addEventListener('dblclick', (event) => {
    console.log(event.target);
    if (event.target.matches('.fa-plus')) {
        event.target.parentNode.style.border = '1px dotted black';
        event.target.parentNode.classList.add('changing');
        event.target.style.color = 'white';
        event.target.setAttribute('class', 'fas fa-minus');
    }
});
 
pickAColor.addEventListener('change', (event) => {
    console.log(event.target.value);
    const emptyColors = document.querySelectorAll('.color-option')
    
    emptyColors.forEach((element) => {
        console.log(element.matches('.changing'));
        if (element.matches('.changing')) {
            element.style.backgroundColor = event.target.value;
            element.style.borderStyle = 'none';
            element.setAttribute('data-color', event.target.value);
            element.childNodes[0].style.color = event.target.value;
            if(element.childNodes[0].matches('.fa-minus'))
                element.childNodes[0].setAttribute('class', 'fas fa-plus');
            element.classList.remove('changing');
        }
    })
})
sizeBtn.addEventListener('click', (event) => {
    const size = event.target.getAttribute('data-size');
    switch (size) {
        case 'micro1':
            drawSize = 1;
            eraserSize = 3;
            textSize = '15px';
            break;
        case 'micro2':
            drawSize = 3;
            eraserSize = 5;
            textSize = '20px';
            break;
        case 'small1':
            drawSize = 5;
            eraserSize = 10;
            textSize = '25px';
            break;
        case 'small2':
            drawSize = 8;
            eraserSize = 14;
            textSize = '30px';
            break;
        case 'medium1':
            drawSize = 10;
            eraserSize = 17;
            textSize = '35px';
            break;
        case 'medium2':
            drawSize = 12;
            eraserSize = 20;
            textSize = '37px';
            break;
        case 'large1':
            drawSize = 15;
            eraserSize = 25;
            textSize = '40px';
            break;
        case 'large2':
            drawSize = 17;
            eraserSize = 30;
            textSize = '45px';
            break;
        case 'great1':
            drawSize = 19;
            eraserSize = 35;
            textSize = '50px';
            break;
        case 'great2':
            drawSize = 20;
            eraserSize = 40;
            textSize = '55px';
            break;
        default: break;
    }
    if (active === 'text') {
        selectedTextBox.style.fontSize = textSize;
        selectedTextBoxStorage[selectedTextBox.getAttribute('id')].size = textSize;
    }
});
fontBtn.addEventListener('click', (event) => {
    const font = event.target.getAttribute('data-style');
    let fontFamily = null;
    switch (font) {
        case 'potta':
            fontFamily = `'Potta One', cursive`;
            break;
        case 'lonrina':
            fontFamily = `'Londrina Solid', cursive`;
            break;
        case 'hachi':
            fontFamily = `'Hachi Maru Pop', cursive`;
            break;
        case 'hanalei':
            fontFamily = `'Hanalei', cursive`;
            break;
        case 'shadows':
            fontFamily = `'Shadows Into Light', cursive`;
            break;
        case 'Ballet':
            fontFamily = `'Ballet', cursive`;
            break;
        case 'Libre':
            fontFamily = `'Libre Franklin', sans-serif`;
            break;
        case 'Long':
            fontFamily = `'Long Cang', cursive`;
            break;
        case 'Reggae':
            fontFamily = `'Reggae One', cursive`;
            break;

        case 'Nanum':
            fontFamily = `'Nanum Myeongjo', serif`;
            break;
        default: break;
    }
    selectedTextBox.style.fontFamily = fontFamily;
    selectedTextBoxStorage[selectedTextBox.getAttribute('id')].font = fontFamily;

})

gradientAddBtn.addEventListener('click', () => {
    const listCount = gradientContainer.childElementCount;
    
    if (listCount < 3) {
        const list = document.createElement('li');
        list.setAttribute('class', 'colors-color');
        list.innerHTML = `
        <input type="color" class="color-value">
        <i class="far fa-times-circle color-remove"></i>
        `
        gradientContainer.appendChild(list);

        if (listCount === 2) {
            gradientAddBtn.style.display = 'none';
        }
    }
});

gradientContainer.addEventListener('click', (event) => {
    const removeBtn = event.target.matches('.color-remove');
    const target = event.target.parentNode;
    let listCount = gradientContainer.childElementCount;
    
    if (removeBtn && listCount > 2) {
        target.remove();

        if (--listCount < 3)
            gradientAddBtn.style.display = 'block';
    }
});

gradientApplyBtn.addEventListener('click', (event) => {
    const gradientValue = document.querySelectorAll('.color-value');
    const gradientCount = gradientValue.length;

    if (active !== 'background') {
        opacityRange = '';
    }
    if (active === 'draw') {
        isGradientForDraw = true;
        grd = grdForDraw;
    }
    else if (active === 'background') {
        console.log("background")
        isGradientForBg = true;
        grd = grdForBackground;
        backgroudBox.style.background = gradientCount === 2 ? `linear-gradient(${gradientDirection}, ${gradientValue[0].value}, ${gradientValue[1].value})`
        : `linear-gradient(${gradientDirection}, ${gradientValue[0].value}, ${gradientValue[1].value},${gradientValue[2].value})`;
    } else if (active === 'text') {
        console.log('text')
        grd = grdForText;
        selectedTextBox.style.background = gradientCount === 2 ? `linear-gradient(${gradientDirection}, ${gradientValue[0].value}, ${gradientValue[1].value})` 
        : `linear-gradient(${gradientDirection}, ${gradientValue[0].value}, ${gradientValue[1].value},${gradientValue[2].value})`;
        selectedTextBox.style.webkitBackgroundClip = 'text';
        selectedTextBox.style.webkitTextFillColor = 'transparent';
        selectedTextBoxStorage[selectedTextBox.getAttribute('id')].isGradient = true;
        selectedTextBoxStorage[selectedTextBox.getAttribute('id')].gradient = grdForText;
        selectedTextBoxStorage[selectedTextBox.getAttribute('id')].grdColor1 = gradientValue[0].value + opacityRange;
        selectedTextBoxStorage[selectedTextBox.getAttribute('id')].grdColor2 = gradientValue[1].value + opacityRange;
        if(gradientValue[2])
            selectedTextBoxStorage[selectedTextBox.getAttribute('id')].grdColor3 = gradientValue[2].value + opacityRange;
    }
    switch (gradientCount) {
        case 2: {
            grd.addColorStop(0, gradientValue[0].value+opacityRange);
            grd.addColorStop(1, gradientValue[1].value+opacityRange);
            break;
        }
        case 3: {
            grd.addColorStop(0, gradientValue[0].value+opacityRange);
            grd.addColorStop(0.5, gradientValue[1].value+opacityRange);
            grd.addColorStop(1, gradientValue[2].value+opacityRange);
           
            break;
        }
    }
   
})

gradientDirectionBtn.addEventListener('click', (event) => {
    let target = event.target.getAttribute('data-direction');

    if (target === null) {
        target = gradientCheck;
    } else {
        gradientCheck = target;
    }

    switch (target) {
        case 'right':
            gradientDirection = 'to right';
            grd = context.createLinearGradient(0, 0, 350, 0);
            break;
        case 'down':
            gradientDirection = '180deg';
            grd = context.createLinearGradient(0, 0, 0, 550);
            break;
        case 'left':
            gradientDirection = 'to left';
            grd = context.createLinearGradient(350, 0, 0, 0);
            break;
        case 'up':
            gradientDirection = '0deg';
            grd = context.createLinearGradient(0, 550, 0, 0);
            break;
        default:
            gradientDirection = '180deg';
    }
    if (active === 'text') {
        console.log("direction text")
        grdForText = grd;
        selectedTextBoxStorage[selectedTextBox.getAttribute('id')].grdDirection = target;
    } else if (active === 'draw') {
        grdForDraw= grd;
    } else if (active === 'background') {
        console.log("direction background")
        grdForBackground = grd;
    }
    gradientApplyBtn.click();
})

gradientRangeBar.addEventListener('input', (event) => {
    const opacity = event.target.value;
    opacityRange = opacity * 100 + 5;
    switch (active) {
        case 'draw':
            break;
        case 'text':
            selectedTextBox.style.opacity = opacity;
            break;
        case 'background':
            backgroudBox.style.opacity = opacity;
            break;
        default:
            break;
            
    }

    gradientApplyBtn.click();
    gradientDirectionBtn.click();
}) 

function saveCanvas() {
    mainContent.style.display = 'none';
    sideMenu.style.display = 'none';
    menuBar.style.display = 'none';
    previewBox.style.display = 'block';
    //1. text 저장
    //1.1 text color - color, gradient
    //1.2 text style
    //1.3 text size
    //1.4 text position
    for (let i = 0; i < selectedTextBoxStorage.length; i++) {
        let item = selectedTextBoxStorage[i];
        if (item) {
            context.font = `${item.size} ${item.font}`;
            if (item.isGradient) {
                let saveGrd = null;
                switch (item.grdDirection) {
                    case 'right':
                        saveGrd = context.createLinearGradient(0, 0, 350, 0);
                        break;
                    case 'down':
                        saveGrd = context.createLinearGradient(0, 0, 0, 550);
                        break;
                    case 'left':
                        saveGrd = context.createLinearGradient(350, 0, 0, 0);
                        break;
                    case 'up':
                        saveGrd = context.createLinearGradient(0, 550, 0, 0);
                        break;
                    default:
                        saveGrd = context.createLinearGradient(0, 550, 0, 0);
                }
                if (item.grdColor3 === null) {
                    saveGrd.addColorStop(0, item.grdColor1);
                    saveGrd.addColorStop(1, item.grdColor2);
                } else {
                    saveGrd.addColorStop(0, item.grdColor1);
                    saveGrd.addColorStop(0.5, item.grdColor2);
                    saveGrd.addColorStop(1, item.grdColor3);
                }
                context.fillStyle = saveGrd;
            }
            else
                context.fillStyle = `${item.color}`;
            context.textBaseline = 'hanging';
            context.fillText(`${item.text}`, `${item.xPos + 3}`, `${item.yPos + 3}`);
        }
    }
    textContainer.remove();

    context.globalCompositeOperation = 'destination-over';

    //2. 배경 저장
    //2.1 background color - color, gradient
    if (isGradientForBg) {
        context.fillStyle = grdForBackground;
    } else {
        context.fillStyle = colorForBg+opacityRange;
        console.log(colorForBg,opacityRange);
    }
    context.fillRect(0, 0, 350, 550);

    //3. 파일로 저장
    context.globalCompositeOperation = 'destination-over';
    context.drawImage(imageBox, 0, 0, 350, 550);
    let dataUrl = canvas.toDataURL('image/jpeg');
    document.querySelector('.preview').style.display = 'flex';
    document.querySelector('.preview-image').src = dataUrl;
    imageUrl = dataUrl;
}
const previewButtons = document.querySelector('.preview-buttons');
previewButtons.addEventListener('click', (event) => {
    console.log(">>>", event.target.matches('.use'));
    if (event.target.matches('.use')) {
        const check = confirm("편집을 마치시겠습니까?");
        if (check) {
            localStorage.setItem('imageUrl', imageUrl);
            window.location.href = '/addMovie'
            /* fetch(address, {
                    method : 'POST',
                    headers : {
                        Accept : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({ //server.js에 전달할 json 형태
                        imageUrl
                    })
                })  */
        }
    } else if (event.target.matches('.undo')) {
        const check = confirm("다시 편집하시겠습니까?");
        if(check)
            location.reload();
    }
    
})

