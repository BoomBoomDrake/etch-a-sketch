// UI Targets
//
const colorPicker = document.getElementById('colorPicker');
const blackBtn = document.getElementById('blackBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const shadeBtn = document.getElementById('shadeBtn');
const eraserBtn = document.getElementById('eraserBtn');
const grid = document.getElementById('grid');
const clearbtn = document.getElementById('clearbtn');

const gridSlider = document.getElementById('gridSlider');
const gridSliderLabel = document.getElementById('gridSliderLabel');
gridSliderLabel.textContent = `${gridSlider.value} X ${gridSlider.value}`;

// Default Grid Generation
function genGrid(rows) {
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-cols', rows);
    for (let c = 0; c < (rows * rows); c++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        grid.appendChild(cell);
    }
}
genGrid(16);


