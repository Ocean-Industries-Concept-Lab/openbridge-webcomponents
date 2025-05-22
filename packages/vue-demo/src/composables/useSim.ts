import { computed, ref, type ComputedRef, type Ref } from "vue";
import { useJoystickControl, type JoystickControl } from "./useJoystickControl";
import { usePropulsionSim, type PropulsionSim } from "./usePropulsionSim";
import { useVesselSim, type VesselSim } from "./useVesselSim";
import { usePitchRollSim, type PitchRollSim } from "./usePitchRollSim";
import { useDepthSim } from "./useDepthSim";

export interface Sim {
    controllers: JoystickControl
    vessel: VesselSim
    propulsion: PropulsionSim
    pitchRoll: PitchRollSim
    currentFromAngleDeg: number
    currentSpeedKnots: number,
    depth: Ref<number>
    north: ComputedRef<number>
    east: ComputedRef<number>
}

let sim: Sim | null = null

export function useSim() {
    if (sim === null) {
        console.log('Creating sim')
        const currentFromAngleDeg = 45;
        const currentSpeedKnots = 2;
        const controllers = useJoystickControl();
        const vesselSim = useVesselSim({ current: { directionFromDeg: currentFromAngleDeg, speedKnots: currentSpeedKnots }});
        const rudderSet = computed(() => controllers.y.value * 30);
        const propellerSet = computed(() => controllers.x.value * 100);
        const propulsion = usePropulsionSim({ rudderSet, propellerSet, u: vesselSim.u, tau: vesselSim.tau });
        const pitchRollSim = usePitchRollSim({ pitch: { periodSeconds: 10, maxAngle: 4 }, roll: { periodSeconds: 10, maxAngle: 7 }, initialDeltaAngle: 25 });
        const depth = useDepthSim(vesselSim.north, vesselSim.east);
        const north = computed(() => {
            return 62.46 + vesselSim.north.value / 1852 / 60;
        });
        
        const east = computed(() => {
            return 6.2 + vesselSim.east.value / 1852 / 60;
        });
        
        sim = {
            controllers,
            vessel: vesselSim,
            propulsion: propulsion,
            pitchRoll: pitchRollSim,
            currentFromAngleDeg,
            currentSpeedKnots,
            depth,
            north,
            east
        }
    }
    return sim;
}
