
module.exports = {
    massRatio: mass_ratio,
    deltaV: speed_increase,
    structural_efficiency: structural_efficiency,
    payload_ratio: payload_ratio
};

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