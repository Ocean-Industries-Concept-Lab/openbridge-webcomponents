export function roundedArch({ startAngle, endAngle, r, R, roundOutsideCut, roundInsideCut }: { startAngle: number, R: number, r: number, endAngle: number, roundOutsideCut: boolean, roundInsideCut: boolean }) {
    const a1 = (startAngle * Math.PI) / 180;
    const a2 = (endAngle * Math.PI) / 180;

    const X1 = Math.sin(a1) * R;
    const Y1 = -Math.cos(a1) * R;
    const x1 = Math.sin(a1) * r;
    const y1 = -Math.cos(a1) * r;
    const X2 = Math.sin(a2) * R;
    const Y2 = -Math.cos(a2) * R;
    const x2 = Math.sin(a2) * r;
    const y2 = -Math.cos(a2) * r;
    const roundRadius = 8;


    let svgPath = "";
    if (roundOutsideCut) {
        const roundDeltaAngle = Math.asin(roundRadius / R);
        const largeArcFlag = (a2 - roundDeltaAngle) - (a1 + roundDeltaAngle) <= Math.PI ? 0 : 1;
        const x1i = Math.sin(a1) * (R - roundRadius);
        const y1i = -Math.cos(a1) * (R - roundRadius);
        const x1o = Math.sin(a1 + roundDeltaAngle) * R;
        const y1o = -Math.cos(a1 + roundDeltaAngle) * R;
        const x2i = Math.sin(a2) * (R - roundRadius);
        const y2i = -Math.cos(a2) * (R - roundRadius);
        const x2o = Math.sin(a2 - roundDeltaAngle) * R;
        const y2o = -Math.cos(a2 - roundDeltaAngle) * R;
        // Rounded start
        svgPath += `M ${x1i} ${y1i} A ${roundRadius} ${roundRadius} 1 0 1 ${x1o} ${y1o}`;
        // Arch
        svgPath += `A ${R} ${R} 1 ${largeArcFlag} 1 ${x2o} ${y2o}`;
        // Rounded end
        svgPath += `A ${roundRadius} ${roundRadius} 1 0 1 ${x2i} ${y2i}`;
    } else {
        const largeArcFlag = a2 - a1 <= Math.PI ? 0 : 1;
        svgPath += `M ${X1} ${Y1} A ${R} ${R} 1 ${largeArcFlag} 1 ${X2} ${Y2}`;
    }

    if (roundInsideCut) {
        const roundDeltaAngle = Math.asin(roundRadius / r);
        const largeArcFlag = (a2 - roundDeltaAngle) - (a1 + roundDeltaAngle) <= Math.PI ? 0 : 1;
        const x1i = Math.sin(a1) * (r + roundRadius);
        const y1i = -Math.cos(a1) * (r + roundRadius);
        const x1o = Math.sin(a1 + roundDeltaAngle) * r;
        const y1o = -Math.cos(a1 + roundDeltaAngle) * r;
        const x2i = Math.sin(a2) * (r + roundRadius);
        const y2i = -Math.cos(a2) * (r + roundRadius);
        const x2o = Math.sin(a2 - roundDeltaAngle) * r;
        const y2o = -Math.cos(a2 - roundDeltaAngle) * r;
        // Rounded start
        svgPath += `L ${x2i} ${y2i} A ${roundRadius} ${roundRadius} 1 0 1 ${x2o} ${y2o}`;
        // Arch
        svgPath += `A ${r} ${r} 1 ${largeArcFlag} 0 ${x1o} ${y1o}`;
        // Rounded end
        svgPath += `A ${roundRadius} ${roundRadius} 1 0 1 ${x1i} ${y1i}`;
    } else {
        const largeArcFlag = a2 - a1 <= Math.PI ? 0 : 1;
        svgPath += `L ${x2} ${y2} A ${r} ${r} 1 ${largeArcFlag} 0 ${x1} ${y1}`;
    }
    svgPath += `Z`;
    return svgPath;
}