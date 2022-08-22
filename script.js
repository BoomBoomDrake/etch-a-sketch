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
let ink = 'black'
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
        //e.target.style.backgroundColor = ink;
        //e.target.style.borderTop = 'grey'; // ****** Why does this erase the border all together? ******
        //e.target.style.borderRight = 'grey';
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

    ink = 'black';
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

//Grid slider function
gridSlider.addEventListener('input', () => {
    gridSliderLabel.textContent = `${gridSlider.value} X ${gridSlider.value}`;

    gridSlider.addEventListener('mouseup', () => {
        clearGrid(grid);
        genGrid(gridSlider.value);
    })
})

function clearGrid(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}