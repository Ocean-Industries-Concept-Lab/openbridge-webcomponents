<script setup lang="ts">
import { computed } from 'vue'
import ObcTopbarMessageItem from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/topbar-message-item/ObcTopbarMessageItem.vue'
import ObcAlertButton from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/alert-button/ObcAlertButton.vue'
import AlertIcon from './AlertIcon.vue'
import { ObcTopbarMessageItemAction } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/topbar-message-item/topbar-message-item'
import { ObcAlertButtonType } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-button/alert-button'
import { ObcAlertMenuItemStatus } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item'
import { AlertType } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/types'
import { useAlertStore } from '../stores/alert'

const alertStore = useAlertStore()

const props = defineProps<{
  visibleAlert: {
    alertStatus: ObcAlertMenuItemStatus
    alertType: string
    title: string
    description: string
    time: Date
  } | null
  visibleAlertType: AlertType
  inactive: boolean
  showAlertMenu: boolean
  silenced: boolean
}>()

const emit = defineEmits<{
  'ack-alert': []
  'toggle-alert-menu': []
  'mute-alert': []
}>()

const forceSmallAlert = computed(() => {
  return alertStore.unackedAlerts.length === 0 && props.inactive
})

const onAckAlert = () => {
  emit('ack-alert')
}

const onToggleAlertMenu = () => {
  emit('toggle-alert-menu')
}

const onMuteAlert = () => {
  emit('mute-alert')
}
</script>

<template>
  <ObcTopbarMessageItem
    v-if="visibleAlert"
    class="notification-message"
    :action="
      visibleAlert?.alertStatus === ObcAlertMenuItemStatus.Unacknowledged
        ? ObcTopbarMessageItemAction.TextButton
        : ObcTopbarMessageItemAction.IconNoClick
    "
    :empty="visibleAlert === null"
    @action-click="onAckAlert"
    @message-click="onToggleAlertMenu"
  >
    <template v-if="visibleAlert">
      <span slot="primary-icon">
        <AlertIcon :alert-status="visibleAlert.alertStatus" :alert-type="visibleAlert.alertType" />
      </span>
      <div slot="title">{{ visibleAlert.title }}</div>
      <div slot="description">{{ visibleAlert.description }}</div>
      <div slot="time">{{ visibleAlert.time.toLocaleTimeString('en-GB') }}</div>
      <div slot="action-text">ACK</div>
      <div slot="action-icon">
        <obi-alarm-noack-iec usecsscolor></obi-alarm-noack-iec>
      </div>
    </template>
    <template #empty>No active messages</template>
  </ObcTopbarMessageItem>
  <ObcAlertButton
    class="alert-button"
    :alert-type="visibleAlertType"
    :type="forceSmallAlert ? ObcAlertButtonType.Flat : ObcAlertButtonType.Normal"
    :n-alerts="alertStore.activeAlerts.length"
    counter
    show-silence-button
    :blinking="!showAlertMenu"
    :silence-button-disabled="silenced"
    @click-alert="onToggleAlertMenu"
    @click-silence="onMuteAlert"
  />
</template>

<style scoped>
.notification-message {
  anchor-name: --notification-message;
}

.alert-button {
  anchor-name: --alert-button;
}

:global(.alert-menu) {
  position: fixed;
  position-anchor: --notification-message;
  top: calc(anchor(bottom) + 4px);
  right: calc(anchor(right));
  left: calc(anchor(left));
  max-width: calc(100% - 8px);
  position-try-fallbacks: --alert-menu-stick-to-button;
}

:global(.alert-small) {
  display: none;
}

@position-try --alert-menu-stick-to-right {
  left: unset;
  right: 4px;
}

@position-try --alert-menu-full-width {
  left: 4px;
  right: 4px;
}

@position-try --alert-menu-stick-to-button {
  position-anchor: --alert-button;
  right: calc(anchor(right) + 4px);
  left: unset;
}

@media screen and (max-width: 1150px) {
  .notification-message {
    display: none;
  }

  :global(.alert-menu) {
    position-anchor: --alert-button;
    right: calc(anchor(right) + 4px);
    left: unset;
    max-width: calc(100% - 8px);
    position-try-fallbacks: --alert-menu-stick-to-right, --alert-menu-full-width;
  }
}

:global(.force-small.alert-large) {
  display: none;
}

:global(.force-small.alert-small) {
  display: revert;
}
</style>
