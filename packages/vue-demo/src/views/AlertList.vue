<template>
  <div class="container">
    <div class="toolbar">
      <div class="group left">
        <div class="summary">{{ nActiveAlerts }} Active ({{ nUnackedAlerts }} Unacked)</div>
        <ObcButton hug-text @click="alertStore.muteAllAlerts()"
          >Mute
          <template #leading-icon>
            <obi-14-mute></obi-14-mute>
          </template>
        </ObcButton>
        <ObcButton variant="raised" @click="alertStore.ackAllAlerts()">ACK ALL</ObcButton>
      </div>
      <div class="group right">
        <ObcButton hug-text @click="alertStore.startSimulatedAlerts()">
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
          <ObcTableRow v-for="alert of alerts" :key="alert.tag">
            <ObcTableCell>
              <span class="status-wrapper">
                <span class="status font-ui-body color-element-active">
                  <template v-if="alert.alertStatus === 'acked'">
                    <template v-if="alert.alertType === 'alarm'">
                      <obi-14-alarm-acknowledged
                        use-css-color
                        class="status-icon"
                      ></obi-14-alarm-acknowledged>
                    </template>
                    <template v-else-if="alert.alertType === 'caution'">
                      <obi-14-caution-color
                        use-css-color
                        class="status-icon"
                      ></obi-14-caution-color>
                    </template>
                    <template v-else-if="alert.alertType === 'warning'">
                      <obi-14-warning-acknowledged
                        use-css-color
                        class="status-icon"
                      ></obi-14-warning-acknowledged>
                    </template>
                    Acked
                  </template>
                  <template v-else-if="alert.alertStatus === 'unacked'">
                    <template v-if="alert.alertType === 'alarm'">
                      <obi-14-alarm-unack use-css-color class="status-icon"></obi-14-alarm-unack>
                    </template>
                    <template v-else-if="alert.alertType === 'caution'">
                      <obi-14-caution-color
                        use-css-color
                        class="status-icon"
                      ></obi-14-caution-color>
                    </template>
                    <template v-else-if="alert.alertType === 'warning'">
                      <obi-14-warning-unack
                        use-css-color
                        class="status-icon"
                      ></obi-14-warning-unack>
                    </template>
                    Unacked
                  </template>
                  <template v-else-if="alert.alertStatus === 'silenced'">
                    <template v-if="alert.alertType === 'alarm'">
                      <obi-14-alarm-silenced
                        use-css-color
                        class="status-icon"
                      ></obi-14-alarm-silenced>
                    </template>
                    <template v-else-if="alert.alertType === 'caution'">
                      <obi-14-caution-color
                        use-css-color
                        class="status-icon"
                      ></obi-14-caution-color>
                    </template>
                    <template v-else-if="alert.alertType === 'warning'">
                      <obi-14-warning-silenced
                        use-css-color
                        class="status-icon"
                      ></obi-14-warning-silenced>
                    </template>
                    Silenced
                  </template>
                  <template v-else-if="alert.alertStatus === 'rectified'">
                    <template v-if="alert.alertType === 'alarm'">
                      <obi-14-alarm-rectified
                        use-css-color
                        class="status-icon"
                      ></obi-14-alarm-rectified>
                    </template>
                    <template v-else-if="alert.alertType === 'caution'">
                      <obi-14-caution-color
                        use-css-color
                        class="status-icon"
                      ></obi-14-caution-color>
                    </template>
                    <template v-else-if="alert.alertType === 'warning'">
                      <obi-14-warning-rectified
                        use-css-color
                        class="status-icon"
                      ></obi-14-warning-rectified>
                    </template>
                    Rectified
                  </template>
                </span>
              </span>
            </ObcTableCell>
            <ObcTableCell>
              <span class="color-element-active">{{ alert.cause }}</span>
            </ObcTableCell>
            <ObcTableCell>
              <span class="color-element-active">{{ alert.description }}</span>
            </ObcTableCell>
            <ObcTableCell>
              <span class="color-element-active">{{ alert.tag }}</span>
            </ObcTableCell>
            <ObcTableCell>
              <span class="updated">
                <span class="updated-time color-element-active">{{
                  alert.time.toLocaleTimeString()
                }}</span>
                <span class="updated-date color-element-neutral">{{
                  alert.time.toLocaleDateString('en', { month: 'short', day: '2-digit' })
                }}</span>
              </span>
            </ObcTableCell>
            <ObcTableCell>
              <ObcButton
                v-if="alert.alertType !== 'caution'"
                full-width
                :disabled="alert.alertStatus === 'acked' || alert.alertStatus === 'rectified'"
                @click="() => (alert.alertStatus = 'acked')"
                >Ack</ObcButton
              >
            </ObcTableCell>
          </ObcTableRow>
        </ObcTableBody>
      </ObcTable>
    </ObcScrollbar>
  </div>
</template>

<script setup lang="ts">
import ObcButton from '@oicl/openbridge-webcomponents-vue/components/button/ObcButton'
import '@oicl/openbridge-webcomponents/dist/icons/icon-14-mute'
import '@oicl/openbridge-webcomponents/dist/icons/icon-08-simulation'
import '@oicl/openbridge-webcomponents/dist/icons/icon-16-lock'
import '@oicl/openbridge-webcomponents/dist/icons/icon-14-alarm-unack'
import {
  ObcTable,
  ObcTableHeader,
  ObcTableHeadCell,
  ObcTableBody,
  ObcTableCell,
  ObcTableRow
} from '@oicl/openbridge-webcomponents-vue/components/table/table'
import ObcScrollbar from '@oicl/openbridge-webcomponents-vue/components/scrollbar/ObcScrollbar'
import { useAlertStore } from '@/stores/alert'
import { computed } from 'vue'

const alertStore = useAlertStore()

const nActiveAlerts = computed(() => alertStore.alerts.length)
const nUnackedAlerts = computed(
  () => alertStore.alerts.filter((a) => a.alertStatus === 'unacked').length
)

const alerts = computed(() => {
  const out = [...alertStore.alerts]
  // Sort by time
  out.sort((a, b) => {
    if (a.time < b.time) {
      return 1
    }
    if (a.time > b.time) {
      return -1
    }
    return 0
  })
  // Sort by status, unacked first, then silenced, then acked, then rectified
  const order = ['unacked', 'silenced', 'acked', 'rectified']
  out.sort((a, b) => {
    const aIdx = order.indexOf(a.alertStatus)
    const bIdx = order.indexOf(b.alertStatus)
    if (aIdx < bIdx) {
      return -1
    }
    if (aIdx > bIdx) {
      return 1
    }
    return 0
  })
  return out
})
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
  color: var(--on-flat-active-color, rgba(0, 0, 0, 0.9));
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings:
    'ss02' on,
    'clig' off,
    'liga' off;
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
  justify-content: flex-start;
  padding-left: 24px;
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
