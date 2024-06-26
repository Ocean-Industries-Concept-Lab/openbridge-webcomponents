<template>
  <div class="container">
    <ObcScrollbar class="table-container">
      <ObcTable>
        <ObcTableHeader>
          <ObcTableHeadCell class="min-content"></ObcTableHeadCell>
          <ObcTableHeadCell class="min-content source" v-if="isCam">Source</ObcTableHeadCell>
          <ObcTableHeadCell>Cause</ObcTableHeadCell>
          <ObcTableHeadCell class="min-content tag">Tag id</ObcTableHeadCell>
          <ObcTableHeadCell class="min-content">Time&nbsp;(UTC)</ObcTableHeadCell>
          <ObcTableHeadCell class="min-content" style="text-align: center">Ack</ObcTableHeadCell>
        </ObcTableHeader>

        <ObcTableBody>
          <ObcTableRow v-for="alert of alerts" :key="alert.tag">
            <ObcTableCell class="status-cell">
              <span class="status font-ui-body color-element-active">
                <template v-if="alert.alertStatus === 'acked'">
                  <template v-if="alert.alertType === 'alarm'">
                    <obi-14-alarm-acknowledged
                      usecsscolor
                      class="status-icon"
                    ></obi-14-alarm-acknowledged>
                  </template>
                  <template v-else-if="alert.alertType === 'caution'">
                    <obi-14-caution-color usecsscolor class="status-icon"></obi-14-caution-color>
                  </template>
                  <template v-else-if="alert.alertType === 'warning'">
                    <obi-14-warning-acknowledged
                      usecsscolor
                      class="status-icon"
                    ></obi-14-warning-acknowledged>
                  </template>
                </template>
                <template v-else-if="alert.alertStatus === 'unacked'">
                  <template v-if="alert.alertType === 'alarm'">
                    <obc-alert-icon
                      class="status-icon"
                      name="alarm-unack"
                      .blinkValue="alertStore.blinkAlarmValue"
                    ></obc-alert-icon>
                  </template>
                  <template v-else-if="alert.alertType === 'caution'">
                    <obi-14-caution-color usecsscolor class="status-icon"></obi-14-caution-color>
                  </template>
                  <template v-else-if="alert.alertType === 'warning'">
                    <obc-alert-icon
                      class="status-icon"
                      name="warning-unack"
                      .blinkValue="alertStore.blinkWarningValue"
                    ></obc-alert-icon>
                  </template>
                </template>
                <template v-else-if="alert.alertStatus === 'silenced'">
                  <template v-if="alert.alertType === 'alarm'">
                    <obi-14-alarm-silenced
                      usecsscolor
                      class="status-icon"
                    ></obi-14-alarm-silenced>
                  </template>
                  <template v-else-if="alert.alertType === 'caution'">
                    <obi-14-caution-color usecsscolor class="status-icon"></obi-14-caution-color>
                  </template>
                  <template v-else-if="alert.alertType === 'warning'">
                    <obi-14-warning-silenced
                      usecsscolor
                      class="status-icon"
                    ></obi-14-warning-silenced>
                  </template>
                </template>
                <template v-else-if="alert.alertStatus === 'rectified'">
                  <template v-if="alert.alertType === 'alarm'">
                    <obi-14-alarm-rectified
                      usecsscolor
                      class="status-icon"
                    ></obi-14-alarm-rectified>
                  </template>
                  <template v-else-if="alert.alertType === 'caution'">
                    <obi-14-caution-color usecsscolor class="status-icon"></obi-14-caution-color>
                  </template>
                  <template v-else-if="alert.alertType === 'warning'">
                    <obi-14-warning-rectified
                      usecsscolor
                      class="status-icon"
                    ></obi-14-warning-rectified>
                  </template>
                </template>
              </span>
            </ObcTableCell>
            <ObcTableCell class="source" v-if="isCam">
              <span class="color-element-active">{{ alert.source }}</span>
            </ObcTableCell>
            <ObcTableCell>
              <span class="color-element-active">{{ alert.description }}</span>
            </ObcTableCell>
            <ObcTableCell class="tag">
              <span class="color-element-active">{{ alert.tag }}</span>
            </ObcTableCell>
            <ObcTableCell>
              <span class="updated">
                <span class="updated-time color-element-active">{{
                  alert.time.toLocaleTimeString()
                }}</span>
                <span class="updated-date color-element-neutral">{{ date2str(alert.time) }}</span>
              </span>
            </ObcTableCell>
            <ObcTableCell>
              <ObcButton
                class="ack-btn"
                full-width
                v-if="
                  alert.alertType !== 'caution' &&
                  alert.alertStatus !== 'rectified' &&
                  alert.alertStatus !== 'acked'
                "
                @click="() => (alert.alertStatus = 'acked')"
              >
                Ack
              </ObcButton>
            </ObcTableCell>
          </ObcTableRow>
        </ObcTableBody>
      </ObcTable>
    </ObcScrollbar>
    <div class="mobile-container">
      <template v-for="alert of alerts" :key="alert.tag">
        <div class="status font-ui-body color-element-active">
          <template v-if="alert.alertStatus === 'acked'">
            <template v-if="alert.alertType === 'alarm'">
              <obi-14-alarm-acknowledged
                usecsscolor
                class="status-icon"
              ></obi-14-alarm-acknowledged>
            </template>
            <template v-else-if="alert.alertType === 'caution'">
              <obi-14-caution-color usecsscolor class="status-icon"></obi-14-caution-color>
            </template>
            <template v-else-if="alert.alertType === 'warning'">
              <obi-14-warning-acknowledged
                usecsscolor
                class="status-icon"
              ></obi-14-warning-acknowledged>
            </template>
          </template>
          <template v-else-if="alert.alertStatus === 'unacked'">
            <template v-if="alert.alertType === 'alarm'">
              <obc-alert-icon
                class="status-icon"
                name="alarm-unack"
                .blinkValue="alertStore.blinkAlarmValue"
              ></obc-alert-icon>
            </template>
            <template v-else-if="alert.alertType === 'caution'">
              <obi-14-caution-color usecsscolor class="status-icon"></obi-14-caution-color>
            </template>
            <template v-else-if="alert.alertType === 'warning'">
              <obc-alert-icon
                class="status-icon"
                name="warning-unack"
                .blinkValue="alertStore.blinkWarningValue"
              ></obc-alert-icon>
            </template>
          </template>
          <template v-else-if="alert.alertStatus === 'silenced'">
            <template v-if="alert.alertType === 'alarm'">
              <obi-14-alarm-silenced usecsscolor class="status-icon"></obi-14-alarm-silenced>
            </template>
            <template v-else-if="alert.alertType === 'caution'">
              <obi-14-caution-color usecsscolor class="status-icon"></obi-14-caution-color>
            </template>
            <template v-else-if="alert.alertType === 'warning'">
              <obi-14-warning-silenced usecsscolor class="status-icon"></obi-14-warning-silenced>
            </template>
          </template>
          <template v-else-if="alert.alertStatus === 'rectified'">
            <template v-if="alert.alertType === 'alarm'">
              <obi-14-alarm-rectified usecsscolor class="status-icon"></obi-14-alarm-rectified>
            </template>
            <template v-else-if="alert.alertType === 'caution'">
              <obi-14-caution-color usecsscolor class="status-icon"></obi-14-caution-color>
            </template>
            <template v-else-if="alert.alertType === 'warning'">
              <obi-14-warning-rectified
                usecsscolor
                class="status-icon"
              ></obi-14-warning-rectified>
            </template>
          </template>
        </div>
        <div class="middle" v-if="isCam">
          <div class="top">
            <div class="color-element-active font-ui-body">{{ alert.source }}</div>
            <span class="updated">
              <span class="updated-time color-element-active font-ui-label">{{
                alert.time.toLocaleTimeString()
              }}</span>
            </span>
          </div>
          <div class="color-element-active font-ui-label">{{ alert.description }}</div>
        </div>
        <div class="middle" v-else>
          <div class="top">
            <div class="color-element-active font-ui-body">{{ alert.description }}</div>
          </div>
          <div class="updated-time color-element-active font-ui-label">
            {{ alert.time.toLocaleTimeString() }}
          </div>
        </div>
        <ObcButton
          class="ack-btn"
          full-width
          v-if="
            alert.alertType !== 'caution' &&
            alert.alertStatus !== 'rectified' &&
            alert.alertStatus !== 'acked'
          "
          @click="() => (alert.alertStatus = 'acked')"
        >
          Ack
        </ObcButton>
        <div v-else></div>
      </template>
    </div>
    <div class="toolbar">
      <ObcButton hug-text @click="alertStore.muteAllAlerts()"
        >Mute
        <template #leading-icon>
          <obi-14-mute></obi-14-mute>
        </template>
      </ObcButton>
      <ObcButton variant="raised" @click="alertStore.ackAllAlerts()">Ack all visible</ObcButton>
    </div>
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

const isCam = false

function date2str(date: Date) {
  // if the date is today, return "today"
  const today = new Date()
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return 'Today'
  }
  // if the date is yesterday, return "yesterday"
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return 'Yesterday'
  }

  return date.toLocaleDateString('en', { month: 'short', day: '2-digit' })
}

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

@media screen and (max-width: 700px) {
  .tag {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .updated-date {
    display: none;
  }
}

.mobile-container {
  display: none;
  grid-template-columns: min-content 1fr 136px;
  background-color: var(--container-background-color);

  & > * {
    border-top: 1px solid var(--border-outline-color);
  }

  & .status {
    padding-left: 28px;
    padding-right: 28px;
    height: 48px;
  }

  & .ack-btn {
    padding-left: 16px;
    padding-right: 16px;
    width: 100%;
  }

  & .middle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 16px;
  }

  & .top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
}

.toolbar {
  background: var(--container-global-color);
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 16px;
  gap: 16px;
}

@media screen and (max-width: 500px) {
  .table-container {
    display: none;
  }

  .mobile-container {
    display: grid;
  }

  .toolbar {
    display: none;
  }
}

.min-content {
  width: 1%;
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

.status-cell {
  padding-left: 28px;
  padding-right: 28px;
}

.updated {
  display: flex;
  gap: 16px;
}

.table-container {
  height: calc(100vh - 48px * 2);
}

.ack-btn {
  width: 106px;
  display: block;
}
</style>
