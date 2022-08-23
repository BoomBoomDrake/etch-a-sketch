// UI Targets
//
const colorPicker = document.getElementById('colorPicker');
const blackBtn = document.getElementById('blackBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const shadeBtn = document.getElementById('shadeBtn');
const eraserBtn = document.getElementById('eraserBtn');
const grid = document.getElementById('grid');
let cellArray;
const clearbtn = document.getElementById('clearbtn');

const gridSlider = document.getElementById('gridSlider');
const gridSliderLabel = document.getElementById('gridSliderLabel');
gridSliderLabel.textContent = `${gridSlider.value} X ${gridSlider.value}`;

// Default Grid Generation
function genGrid(rows) {
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-cols', rows);
    for (let c = 0; c < (rows * rows); c++) {
        cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.darken = 0; // Keeps track of current step (0-9) for shade function
        grid.appendChild(cell);
    }

    cellArray = document.querySelectorAll('.cell');
    listen();
}
genGrid(16);

function listen() {
    for (let i = 0; i < cellArray.length; i++) {
        cellArray[i].addEventListener('mouseenter', draw);
    }
}

// Default ink color
let ink = 'rgb(0, 0, 0)'
function draw(e) {
    if (black || color) {
        e.target.style.backgroundColor = ink;
        e.target.style.borderTop = ink;
        e.target.style.borderRight = ink;
    } else if (random) {
       randomColor();
       e.target.style.backgroundColor = ink;
       e.target.style.borderTop = ink;
       e.target.style.borderRight = ink;
    } else if (erase) {
        e.target.removeAttribute('style');
    } else if (shade) {
        let currentColor = darken(e);
        e.target.style = `background-color: rgba(${currentColor})`;
    }
}

function randomColor() {
    num = Math.floor(Math.random() * 16777215).toString(16);
    ink = "#" + num;
    //console.log(ink);
}

// Button functions
let color = false;
colorPicker.addEventListener('change', () => {
    // toggle color button selection
    if (!color) {
        color = true;
        black = false;
        random = false;
        shade = false;
        erase = false;
    // toggle button highlight
        colorPicker.classList.add('btn-on');
        blackBtn.classList.remove('btn-on');
        rainbowBtn.classList.remove('btn-on');
        shadeBtn.classList.remove('btn-on');
        eraserBtn.classList.remove('btn-on');
    }

    ink = colorPicker.value;
})

let black = false;
blackBtn.addEventListener('click', () => {
    if (!black) {
        color = false;
        black = true;
        random = false;
        shade = false;
        erase = false;

        colorPicker.classList.remove('btn-on');
        blackBtn.classList.add('btn-on');
        rainbowBtn.classList.remove('btn-on');
        shadeBtn.classList.remove('btn-on');
        eraserBtn.classList.remove('btn-on');
    }

    ink = 'rgb(0, 0, 0)';
})

let random = false;
rainbowBtn.addEventListener('click', () => {
    if (!random) {
        color = false;
        black = false;
        random = true;
        shade = false;
        erase = false;

        colorPicker.classList.remove('btn-on');
        blackBtn.classList.remove('btn-on');
        rainbowBtn.classList.add('btn-on');
        shadeBtn.classList.remove('btn-on');
        eraserBtn.classList.remove('btn-on');        
    }
})
// ****** STILL NEED TO FIGURE OUT SHADE FUNCTION ******
let shade = false;
shadeBtn.addEventListener('click', () => {
    if (!shade) {
        color = false;
        black = false;
        random = false;
        shade = true;
        erase = false;

        colorPicker.classList.remove('btn-on');
        blackBtn.classList.remove('btn-on');
        rainbowBtn.classList.remove('btn-on');
        shadeBtn.classList.add('btn-on');
        eraserBtn.classList.remove('btn-on');        
    }
})

let erase = false;
eraserBtn.addEventListener('click', () => {
    if (!erase) {
        color = false;
        black = false;
        random = false;
        shade = false;
        erase = true;

        colorPicker.classList.remove('btn-on');
        blackBtn.classList.remove('btn-on');
        rainbowBtn.classList.remove('btn-on');
        shadeBtn.classList.remove('btn-on');
        eraserBtn.classList.add('btn-on');        
    }

    ink = 'white';
})

function darken(e) {
    let oldColor = e.target.style.backgroundColor;
    console.log(oldColor);
    let rgbaString = (oldColor.charAt(3) == 'a') ? oldColor.slice(5, -1) : oldColor.slice(4, -1);
    //checks whether backgroundColor is in rgba or rgb format
    let rgbaArray = rgbaString.split(',');
    let red = rgbaArray[0];
    let green = rgbaArray[1];
    let blue = rgbaArray[2];
    let alpha = rgbaArray[3] ? rgbaArray[3] : 1;
    let currentDarkeningStep = e.target.dataset.darken;
    if(currentDarkeningStep == 9) return [0, 0, 0, 1]; //cell is already black
    console.log([red, green, blue, alpha]);
    console.log('Current darkening step: ' + currentDarkeningStep);
    let newRed = getNewColorValue(red, currentDarkeningStep, false);
    let newGreen = getNewColorValue(green, currentDarkeningStep, false);
    let newBlue = getNewColorValue(blue, currentDarkeningStep, false);
    let newAlpha = getNewColorValue(alpha, currentDarkeningStep, true);
    currentDarkeningStep++;
    e.target.dataset.darken = currentDarkeningStep;
    console.log([newRed, newGreen, newBlue, newAlpha]);
    return [newRed, newGreen, newBlue, newAlpha];
  }

function getNewColorValue(currentColorValue, step, alpha) {
    let increment;
    let newValue;
    if(!alpha) {
      increment = currentColorValue / (10 - step);
      console.log('Current color value: ' + currentColorValue);
      console.log('Increment: ' + increment);
      newValue = currentColorValue - increment;
    }else {
      increment = (1 - currentColorValue) / (10 - step);
      console.log('Current color value: ' + currentColorValue);
      console.log('Increment: ' + increment);
      newValue = +currentColorValue + increment; 
    }
    console.log('New color value: ' + newValue);
    return (newValue);
  }
//Grid slider function
gridSlider.addEventListener('input', () => {
    gridSliderLabel.textContent = `${gridSlider.value} X ${gridSlider.value}`;

    gridSlider.addEventListener('mouseup', () => {
        clearGrid(grid);
        genGrid(gridSlider.value);
    })
})

clearBtn.addEventListener('click', () => {
    clearGrid(grid);
    genGrid(gridSlider.value);
});

function clearGrid(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}