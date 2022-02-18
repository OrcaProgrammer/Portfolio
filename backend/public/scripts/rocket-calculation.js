const AddStageButton = document.getElementById('AddStageButton');
const InputSection = document.getElementById('InputSection');
const OutputSection = document.getElementById('OutputSection');
const CalculateButton = document.getElementById('CalculateButton');
const Footer = document.querySelector('footer');

const NumberInputs = document.querySelectorAll('input.number-input');
const OptionsCheckboxes = document.querySelectorAll('input.options-checkbox');

var sections = 2;
var isp_option = true;
var thrust_mass_flow_option = false;

console.log(NumberInputs);

AddStageButton.addEventListener('click', () => {
    
    const InputLauMassText = document.querySelectorAll('label.stage-launch-mass');
    const InputPropMassText = document.querySelectorAll('label.stage-propellant-mass');
    const InputThrustText = document.querySelectorAll('label.stage-thrust');
    const InputMassFlowText = document.querySelectorAll('label.stage-mass-flow');
    const InputStageDisplayNumber = document.querySelectorAll('p.stage-number-display');

    sections += 1;

    for (let i = 0; i < (sections - 2); i++) {
        const LauMassText = InputLauMassText[i];
        const PropMassText = InputPropMassText[i];
        const ThrustText = InputThrustText[i];
        const MassFlowText = InputMassFlowText[i];
        const StageDisplayNumber = InputStageDisplayNumber[i];

        var stageNumber = sections - (i + 1);

        LauMassText.innerHTML = "Stage " + stageNumber.toString() + " Launch Mass:";
        PropMassText.innerHTML = "Stage " + stageNumber.toString() + " Propellant Mass:";
        ThrustText.innerHTML = "Stage " + stageNumber.toString() + " Thrust:";
        MassFlowText.innerHTML = "Stage " + stageNumber.toString() + " Mass Flow:";
        StageDisplayNumber.innerHTML = "Stage " + stageNumber.toString() ;
    }

    const inputBox = document.createElement('div');
    inputBox.className = 'input-box';
    inputBox.style = 'grid-row:' + sections + ';';
    inputBox.innerHTML = `<form>
        <label class="stage-launch-mass">Stage 1 Launch Mass:</label>
        <input type="number" class="number-input launch-mass-input" value=""> Kg</input>
        <br><br>

        <label class="stage-propellant-mass">Stage 1 Propellant Mass:</label>
        <input type="number" class="number-input prop-mass-input" value=""> Kg</input>
        <br><br>

        <label class="stage-thrust">Stage 1 Thrust:</label>
        <input type="number" class="number-input thrust-input"> N</input>
        <br><br>

        <label class="stage-mass-flow">Stage 1 Mass Flow:</label>
        <input type="number" class="number-input mass-flow-input"> kg/s</input>
    </form>`;

    const inputDisplay = document.createElement('div');
    inputDisplay.className = 'input-display';
    inputDisplay.style = 'grid-row:' + sections + ';';
    inputDisplay.innerHTML = `
    <p class="stage-number-display">Stage 1</p>
    <img src="/img/stage.svg" alt="Image of a payload">
    `;

    InputSection.appendChild(inputBox);
    InputSection.appendChild(inputDisplay);

}, false);

CalculateButton.addEventListener('click', () => {

    const PayloadMassInput = document.querySelector('input.payload-mass-input');
    const LauMassInput = document.querySelectorAll('input.launch-mass-input');
    const PropMassInput = document.querySelectorAll('input.prop-mass-input');
    const IspInput = document.querySelectorAll('input.isp-input');

    var payloadMass = 0;
    var lauchMass = [];
    var propMass = [];
    var isp = [];
    var stages = sections - 1;

    payloadMass = Number(PayloadMassInput.value);

    LauMassInput.forEach(element => {
        lauchMass.push( Number( element.value));
    });

    PropMassInput.forEach(element => {
        propMass.push( Number( element.value));
    });

    IspInput.forEach(element => {
        isp.push( Number( element.value));
    });
    
    var massRatios = [];
    var speedIncreases = [];
    var structuralEfficiencies = [];
    var payloadRatios = [];
    var totalDelatV = 0;

    var totalStageMass = 0;

    for (let i = 0; i < stages; i++) {        
        var Mp = payloadMass + totalStageMass;
        var Ve = isp[i] * 9.81;

        totalStageMass += lauchMass[i];
        Ml = payloadMass + totalStageMass;

        var Ms = lauchMass[i] - propMass[i];
        var Mf = propMass[i];

        var massRatio = 0;
        var structuralEfficiency = 0;
        var payloadRatio = 0;

        massRatio = mass_ratio(Ml, Mf);
        structuralEfficiency = structural_efficiency(Ms, Mf);
        payloadRatio = payload_ratio(Mp, Ms, Mf);

        massRatios.push(massRatio);
        speedIncreases.push( speed_increase(Ve, massRatio));
        structuralEfficiencies.push(structuralEfficiency);
        payloadRatios.push(payloadRatio);
    }

    console.log('Mass Ratios', massRatios);
    console.log('Structural Efficiencies', structuralEfficiencies);
    console.log('Payload Ratio', payloadRatios);

    var outputHTML = '';
    
    for (let i = 0; i < stages; i++) {
        
        outputHTML += '<h3>Stage ' + (stages - i) + '</h3><br>';
        outputHTML += '<p> Mass Ratio: ' + massRatios[i] + '</p><br>';
        outputHTML += '<p> Speed Increase: ' + speedIncreases[i] + ' m/s</p><br>';
        outputHTML += '<p> Structural Efficiency: ' + structuralEfficiencies[i] + '</p><br>';
        outputHTML += '<p> Payload Ratio: ' + payloadRatios[i] + '</p><br>';
        outputHTML += '<br><br>';
    }

    outputHTML += '<br><br><br><br>';

    var outputWrapper = document.querySelector('div.output-wrapper');

    if (!outputWrapper) {
        outputWrapper = document.createElement('div');
        outputWrapper.className = 'output-wrapper';        
    }

    outputWrapper.innerHTML = outputHTML;

    console.log(outputWrapper);

    OutputSection.appendChild(outputWrapper);
    Footer.style.visibility = "hidden";
}, false);

OptionsCheckboxes.forEach( (element) => {
    element.addEventListener('onchange', () => {
        switch (element.id) {
            case 'isp-checkbox':
                isp_option = true;
                thrust_mass_flow_option = false;
                break;
        
            case '':
                isp_option = false;
                thrust_mass_flow_option = true;
                break;

            default:
                break;
        }
    });
});

function mass_ratio(Ml, Mf) {
    return Ml / (Ml - Mf);
}

function speed_increase(Ve, mass_ratio) {
    return Ve * Math.log(mass_ratio);
}

function structural_efficiency(Ms, Mf) {
    return 1 / (1 + Mf/Ms);
}

function payload_ratio(Mp, Ms, Mf) {
    return Mp / (Ms + Mf);
}