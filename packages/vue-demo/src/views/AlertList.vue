<template>
    <div class="container">
        <div class="toolbar">
            <div class="group left">
                <div class="summary">{{ nActiveAlerts }} Active ({{ nUnackedAlerts }} Unacked)</div>
                <ObcButton hug-text>Mute
                    <template #leading-icon>
                        <obi-14-mute></obi-14-mute>
                    </template>
                </ObcButton>
                <ObcButton variant="raised">ACK ALL</ObcButton>
            </div>
            <div class="group right">
                <ObcButton hug-text>
                    <template #leading-icon>
                        <obi-08-simulation></obi-08-simulation>
                    </template>
                    Alert simulation
                </ObcButton>
            </div>
        </div>
        <ObcScrollbar class="table-container">
            <ObcTable>
                <ObcTableHeader>
                    <ObcTableHeadCell>Status</ObcTableHeadCell>
                    <ObcTableHeadCell>Cause</ObcTableHeadCell>
                    <ObcTableHeadCell>Details</ObcTableHeadCell>
                    <ObcTableHeadCell>Tag id</ObcTableHeadCell>
                    <ObcTableHeadCell>Updated (UTC)</ObcTableHeadCell>
                    <ObcTableHeadCell>Acknowledge</ObcTableHeadCell>
                </ObcTableHeader>

                <ObcTableBody>
                    <ObcTableRow v-for="i of nRows" :key="i">
                        <ObcTableCell>
                            <span class="status-wrapper">
                                <span class="status font-ui-body color-element-active">
                                    <obi-14-alarm-unack use-css-color class="status-icon"></obi-14-alarm-unack>
                                    Unacked
                                </span>
                            </span>
                        </ObcTableCell>
                        <ObcTableCell>message</ObcTableCell>
                        <ObcTableCell>Message</ObcTableCell>
                        <ObcTableCell><span class="color-element-neutral">#000000</span></ObcTableCell>
                        <ObcTableCell>
                            <span class="updated">
                                <span class="updated-time color-element-active">{{i2time(i)}}</span>
                                <span class="updated-date color-element-neutral">12. feb</span>
                            </span>
                        </ObcTableCell>
                        <ObcTableCell>
                            <ObcButton full-width>Ack</ObcButton>
                        </ObcTableCell>
                    </ObcTableRow>
                </ObcTableBody>

            </ObcTable>
        </ObcScrollbar>
    </div>
</template>

<script setup lang="ts">
import ObcButton from "openbridge-webcomponents-vue/components/button/ObcButton";
import "openbridge-webcomponents/dist/icons/icon-14-mute";
import "openbridge-webcomponents/dist/icons/icon-08-simulation";
import "openbridge-webcomponents/dist/icons/icon-16-lock";
import "openbridge-webcomponents/dist/icons/icon-14-alarm-unack";
import { ObcTable, ObcTableHeader, ObcTableHeadCell, ObcTableBody, ObcTableCell, ObcTableRow } from "openbridge-webcomponents-vue/components/table/table";
import ObcScrollbar from "openbridge-webcomponents-vue/components/scrollbar/ObcScrollbar";

const nActiveAlerts = 20;
const nUnackedAlerts = 10;
const nRows = 500;

function minimum2digits(i: number): string {
    return i < 10 ? "0" + i : "" + i;
}

function i2time(i: number): string {
    const h = minimum2digits(Math.floor(i / 3600));
    const m = minimum2digits(Math.floor(i / 60));
    const s = minimum2digits(i % 60);
    return `${h}:${m}:${s}`;
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.toolbar {
    background: var(--container-global-color);
    height: 48px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
}

.group {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 16px;
}

.summary {
    padding-left: 8px;
    color: var(--on-flat-active-color, rgba(0, 0, 0, 0.90));
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'ss02' on, 'clig' off, 'liga' off;
    /* Instrument/value-regular */
    font-family: Noto Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 570;
    line-height: 24px;
    /* 150% */
}

.status-wrapper {
    display: flex;
    justify-content: center;
}

.status {
    display: flex;
    align-items: center;
    gap: 32px;
}

.status-icon {
    width: 32px;
    height: 32px;
}

.updated {
    display: flex;
    gap: 16px;
}

.table-container {
    height: calc(100vh - 48px * 2);
}
</style>
