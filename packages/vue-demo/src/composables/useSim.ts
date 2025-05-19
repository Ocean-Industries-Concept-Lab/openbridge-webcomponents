import { computed } from "vue";
import { useJoystickControl, type JoystickControl } from "./useJoystickControl";
import { usePropulsionSim, type PropulsionSim } from "./usePropulsionSim";
import { useVesselSim, type VesselSim } from "./useVesselSim";

export interface Sim {
    controllers: JoystickControl
    vessel: VesselSim
    propulsion: PropulsionSim
}

export function useSim() {
    const controllers = useJoystickControl();
    const vesselSim = useVesselSim();
    const rudderSet = computed(() => controllers.y.value * 30);
    const propellerSet = computed(() => controllers.x.value * 100);
    const propulsion = usePropulsionSim({ rudderSet, propellerSet, u: vesselSim.u, tau: vesselSim.tau });

    return {
        controllers,
        vessel: vesselSim,
        propulsion: propulsion
    }
}
