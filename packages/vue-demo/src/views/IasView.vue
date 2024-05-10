<template>
    <div class="container">
        <!-- From tank 1 to three-way valve -->
        <ObcVerticalLine :medium="fill" :type="lineType" :length="3" style="top: calc(24px*9); left: calc(24px*6);"></ObcVerticalLine>
        <ObcCornerLine direction="top-right" :medium="fill" :type="lineType" style="top: calc(24px*12); left: calc(24px*6);"></ObcCornerLine>
        <ObcHorizontalLine :medium="fill" :type="lineType" :length="8" style="top: calc(24px*12); left: calc(24px*7);"></ObcHorizontalLine>

        <ObcAutomationTank :value="tank1" :medium="fill" :max="tank1Max" :trend="tank1Trend" style="top: 72px; left: 72px;"></ObcAutomationTank>

         <ObcAutomationButton :variant="AutomationButtonVariant.double" style="top: calc(24px*11 + 2px); left: calc(24px*10 + 2px);"
            >
        
    <template #icon>
      <Obi08PumpOnHorisontal
        use-css-color
      ></Obi08PumpOnHorisontal>
      </template>
    </ObcAutomationButton>

        <!-- From three-way valve to tank 2  -->
        <ObcHorizontalLine :medium="tank2inPipe" :type="lineType" :length="6" style="top: calc(24px*12); left: calc(24px*16);"></ObcHorizontalLine>
        <ObcCornerLine direction="bottom-left" :medium="tank2inPipe" :type="lineType" style="top: calc(24px*12); left: calc(24px*22);"></ObcCornerLine>
        <ObcVerticalLine :medium="tank2inPipe" :type="lineType" :length="1" style="top: calc(24px*13); left: calc(24px*22);"></ObcVerticalLine>

        <!-- From three-way valve to tank 3  -->
        <ObcVerticalLine :medium="tank3inPipe" :type="lineType" :length="2" style="top: calc(24px*10); left: calc(24px*15);"></ObcVerticalLine>
        <ObcCornerLine direction="bottom-right" :medium="tank3inPipe" :type="lineType" style="top: calc(24px*9); left: calc(24px*15);"></ObcCornerLine>
        <ObcHorizontalLine :medium="tank3inPipe" :type="lineType" :length="18" style="top: calc(24px*9); left: calc(24px*16);"></ObcHorizontalLine>
        <ObcCornerLine direction="bottom-left" :medium="tank3inPipe" :type="lineType" style="top: calc(24px*9); left: calc(24px*34);"></ObcCornerLine>
        <ObcVerticalLine :medium="tank3inPipe" :type="lineType" :length="5" style="top: calc(24px*10); left: calc(24px*34);"></ObcVerticalLine>


        <ObcAutomationButton style="top: calc(24px*11 + 2px); left: calc(24px*14 + 2px);"
            >
            <obc-valve-analog-three-way-icon
                :value="valve1"
                :value2="valve2"
                slot="icon"
            ></obc-valve-analog-three-way-icon>
        </ObcAutomationButton>
        <ObcAutomationTank tag="#002" :value="tank2" :medium="fill" :max="tank2Max" :trend="tank2Trend" style="top: calc(24px*14); left: calc(24px*19);"></ObcAutomationTank>
        <ObcAutomationTank tag="#003" :value="tank3" :medium="fill" :max="tank3Max" :trend="tank3Trend" style="top: calc(24px*14); left: calc(24px*31);"></ObcAutomationTank>
       
        
    </div>
</template>

<script lang="ts" setup>
import ObcAutomationTank from '@oicl/openbridge-webcomponents-vue/automation/automation-tank/ObcAutomationTank'
import { TankTrend } from '@oicl/openbridge-webcomponents/dist/automation/automation-tank/automation-tank';
import { LineMedium, LineType } from '@oicl/openbridge-webcomponents/dist/automation';
import { computed, onMounted, ref } from 'vue';
import ObcVerticalLine from '@oicl/openbridge-webcomponents-vue/automation/vertical-line/ObcVerticalLine';
import ObcHorizontalLine from '@oicl/openbridge-webcomponents-vue/automation/horizontal-line/ObcHorizontalLine';
import ObcCornerLine from '@oicl/openbridge-webcomponents-vue/automation/corner-line/ObcCornerLine';
import ObcAutomationButton from '@oicl/openbridge-webcomponents-vue/automation/automation-button/ObcAutomationButton';
import ObcValveAnalogThreeWayIcon from '@oicl/openbridge-webcomponents-vue/automation/valve-analog-three-way-icon/ObcValveAnalogThreeWayIcon';
import Obi08PumpOnHorisontal from '@oicl/openbridge-webcomponents-vue/icons/Obi08PumpOnHorisontal';
import { AutomationButtonVariant } from '@oicl/openbridge-webcomponents/dist/automation/automation-button/automation-button';

const fill = LineMedium.water;
const empty = LineMedium.empty;
const lineType = LineType.fluid;

const tank1Max = 5_000;
const tank1 = ref(1_000);
const tank1out = computed(() => pumpSpeed.value);
const tank1Trend = computed((): TankTrend => tankTrend(tank1out.value));

const pumpSpeed = ref(20);
const valve1 = ref(30);
const valve2 = ref(100);

const tank2Max = 2_000;
const tank2 = ref(300);
const tank2in = computed(() => pumpSpeed.value * valve1.value / (valve1.value + valve2.value));
const tank2Trend = computed((): TankTrend => tankTrend(-tank2in.value));
const tank2inPipe = computed(() => tank2in.value > 0 ? fill : empty);

const tank3Max = 10_000;
const tank3 = ref(1_000);
const tank3in = computed(() => pumpSpeed.value * valve2.value / (valve1.value + valve2.value));
const tank3Trend = computed((): TankTrend => tankTrend(-tank3in.value));
const tank3inPipe = computed(() => tank3in.value > 0 ? fill : empty);


function tankTrend(flow: number): TankTrend {
    if (flow > 10) return TankTrend.fastFalling;
    if (flow > 1) return TankTrend.falling;
    if (flow > -1) return TankTrend.stable;
    if (flow > -10) return TankTrend.rising;
    return TankTrend.fastRising;
}

onMounted(() => {
    setInterval(() => {
        tank1.value -= tank1out.value / 1;
        tank2.value += tank2in.value / 1;
        tank3.value += tank3in.value / 1;
    }, 1000 / 1);
});

</script>

<style scoped>
.container {
    width: 1000px;
    height: 1000px;
}

.container>* {
    position: absolute
}
</style>
