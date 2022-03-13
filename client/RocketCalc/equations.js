
export function mass_ratio(Ml, Mf) {
    return Ml / (Ml - Mf);
}

export function speed_increase(Ve, mass_ratio) {
    return Ve * Math.log(mass_ratio);
}

export function structural_efficiency(Ms, Mf) {
    return 1 / (1 + Mf/Ms);
}

export function payload_ratio(Mp, Ms, Mf) {
    return Mp / (Ms + Mf);
}