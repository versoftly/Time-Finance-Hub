// Level Calculator Section
const gameNameInput = document.getElementById('gameNameInput');
const coinGoalInput = document.getElementById('coinGoalInput');
const coinPerLevelInput = document.getElementById('coinPerLevelInput');
const calculateButton = document.getElementById('calculateButton');
const calculationList = document.getElementById('calculationList');

// Added elements
const levelsInput = document.createElement('input');
levelsInput.type = 'number';
levelsInput.placeholder = 'Enter Levels';
const calculateCoinsButton = document.createElement('button');
calculateCoinsButton.textContent = 'Calculate Coins';
const totalCoinsDisplay = document.createElement('div');

let calculations = JSON.parse(localStorage.getItem('calculations')) || [];

// Append new elements to the calculator section
const calculatorDiv = document.querySelector('#calculationList').parentElement;
calculatorDiv.appendChild(levelsInput);
calculatorDiv.appendChild(calculateCoinsButton);
calculatorDiv.appendChild(totalCoinsDisplay);

function calculateLevels() {
    const gameName = gameNameInput.value;
    const coinGoal = parseFloat(coinGoalInput.value);
    const coinPerLevel = parseFloat(coinPerLevelInput.value);

    if (gameName && !isNaN(coinGoal) && !isNaN(coinPerLevel) && coinPerLevel !== 0) {
        const levelsNeeded = Math.ceil(coinGoal / coinPerLevel);
        calculations.push({ gameName, coinGoal, coinPerLevel, levelsNeeded });
        localStorage.setItem('calculations', JSON.stringify(calculations));
        renderCalculations();
        gameNameInput.value = '';
        coinGoalInput.value = '';
        coinPerLevelInput.value = '';
    }
}

function calculateTotalCoins() {
    const coinPerLevel = parseFloat(coinPerLevelInput.value);
    const levels = parseFloat(levelsInput.value);

    if (!isNaN(coinPerLevel) && !isNaN(levels)) {
        const totalCoins = coinPerLevel * levels;
        totalCoinsDisplay.textContent = `Total Coins: ${totalCoins}`;
    } else {
        totalCoinsDisplay.textContent = 'Invalid input';
    }
}

function renderCalculations() {
    calculationList.innerHTML = '';
    calculations.forEach((calc, index) => {
        const li = document.createElement('li');
        li.textContent = `Game: ${calc.gameName}, Goal: ${calc.coinGoal}, Coins/Level: ${calc.coinPerLevel}, Levels Needed: ${calc.levelsNeeded}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteCalculation(index);
        });
        li.appendChild(deleteButton);

        calculationList.appendChild(li);
    });
}

function deleteCalculation(index) {
    calculations.splice(index, 1);
    localStorage.setItem('calculations', JSON.stringify(calculations));
    renderCalculations();
}

calculateButton.addEventListener('click', calculateLevels);
calculateCoinsButton.addEventListener('click', calculateTotalCoins);

renderCalculations();