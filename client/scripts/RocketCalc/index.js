const R = require('ramda');
const input = require('./input');
const EQ = require('./equations');

const AddStageButton = document.getElementById('AddStageButton');
const InputSection = document.getElementById('InputSection');
const OutputSection = document.getElementById('OutputSection');
const CalculateButton = document.getElementById('CalculateButton');

const getValues = () => {}; // Todo - Needs to be curried
const applyEquations = () => {};
const updateHtml = () => {}; // Todo - Needs to be curried

// const calculateProperties = R.pipe(
//     getValues(InputSection), 
//     applyEquations, 
//     updateHtml(OutputSection)
// );

AddStageButton.addEventListener('click', (e) => {
    addNewInputBox();
    updateStageText();
});

CalculateButton.addEventListener('click', (e) => calculateProperties() );