import { computed, watch } from "vue";
import { useJoystickControl, type JoystickControl } from "./useJoystickControl";
import { usePropulsionSim, type PropulsionSim } from "./usePropulsionSim";
import { useVesselSim, type VesselSim } from "./useVesselSim";
import { useAlertStore } from "@/stores/alert";
import { ObcAlertMenuItemStatus } from "@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item";
export interface Sim {
    controllers: JoystickControl
    vessel: VesselSim
    propulsion: PropulsionSim
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


    
    return {
        controllers,
        vessel: vesselSim,
        propulsion: propulsion,
        currentFromAngleDeg,
        currentSpeedKnots
    }
}
