<template>
    <div class="container">
        <ObcAutomationTank :max="10_000"></ObcAutomationTank>

        <ObcHorizontalLine :length="10" :line-type="lineType" :medium="empty"></ObcHorizontalLine>

    </div>
</template>

<script setup lang="ts">
import ObcHorizontalLine from "@oicl/openbridge-webcomponents-vue/automation/horizontal-line/ObcHorizontalLine"
import { LineType, LineMedium } from "@oicl/openbridge-webcomponents/dist/automation"
import ObcAutomationTank from "@oicl/openbridge-webcomponents-vue/automation/automation-tank/ObcAutomationTank"

const lineType = LineType.fluid
const empty = LineMedium.empty;
const filled = LineMedium.water

</script>

<style scoped>
.container {
    width: 1000px;
    height: 500px;
}
</style>