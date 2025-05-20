import { computed, watch } from "vue";
import { useJoystickControl, type JoystickControl } from "./useJoystickControl";
import { usePropulsionSim, type PropulsionSim } from "./usePropulsionSim";
import { useVesselSim, type VesselSim } from "./useVesselSim";
import { usePitchRollSim, type PitchRollSim } from "./usePitchRollSim";

export interface Sim {
    controllers: JoystickControl
    vessel: VesselSim
    propulsion: PropulsionSim
    pitchRoll: PitchRollSim
    currentFromAngleDeg: number
    currentSpeedKnots: number
}

export function useSim() {
    const currentFromAngleDeg = 45;
    const currentSpeedKnots = 2;
    const controllers = useJoystickControl();
    const vesselSim = useVesselSim({ current: { directionFromDeg: currentFromAngleDeg, speedKnots: currentSpeedKnots }});
    const rudderSet = computed(() => controllers.y.value * 30);
    const propellerSet = computed(() => controllers.x.value * 100);
    const propulsion = usePropulsionSim({ rudderSet, propellerSet, u: vesselSim.u, tau: vesselSim.tau });
    const pitchRollSim = usePitchRollSim({ pitch: { periodSeconds: 10, maxAngle: 4 }, roll: { periodSeconds: 10, maxAngle: 7 }, initialDeltaAngle: 25 });

    
    return {
        controllers,
        vessel: vesselSim,
        propulsion: propulsion,
        pitchRoll: pitchRollSim,
        currentFromAngleDeg,
        currentSpeedKnots
    }
}
