<script setup lang="ts">
import { useAlertStore } from '@/stores/alert';
import AlertMenu from "openbridge-webcomponents-vue/components/alert-menu/AlertMenu";
import AlertMenuItem from "openbridge-webcomponents-vue/components/alert-menu-item/AlertMenuItem";

defineProps<{
    showAlertMenu: boolean;
}>()

const alertStore = useAlertStore();


</script>

<template>
    <AlertMenu v-if="showAlertMenu" class="alert-menu" @ack-all-click="alertStore.ackAllAlerts"
        :empty="alertStore.activeAlerts.length === 0">
        <AlertMenuItem v-for="a of alertStore.activeAlerts" :key="a.tag" :message="a.cause" :time="a.time.toISOString()"
            time-since="1h 2m" :alert-type="a.alertType" acknowledgeble @ack-click="() => a.alertStatus = 'acked'">
            <template #icon>
                <obi-14-alarm-unack use-css-color></obi-14-alarm-unack>
            </template>
        </AlertMenuItem>
    </AlertMenu>
</template>
