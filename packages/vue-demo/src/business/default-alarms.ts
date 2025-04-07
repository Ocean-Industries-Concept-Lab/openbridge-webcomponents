import { ObcAlertMenuItemStatus } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item'
import type { SimulatedAlert, StartAlert } from './model'

export const startAlerts: StartAlert[] = [
  {
    title: 'ECDIS Primary GPS Lost',
    description: 'Loss of position input from primary GPS',
    tag: '#0001',
    alertStatus: ObcAlertMenuItemStatus.Acknowledged,
    alertType: 'alarm',
    ageSeconds: 10,
    source: 'NAV'
  },
  {
    title: 'Radar Target Collision',
    description: 'CPA/TCPA alarm - Risk of collision detected',
    tag: '#0002',
    alertStatus: ObcAlertMenuItemStatus.Acknowledged,
    alertType: 'alarm',
    ageSeconds: 60,
    source: 'NAV'
  },
  {
    title: 'Main Engine High Temperature',
    description: 'ME cooling water temperature above limit',
    tag: '#0003',
    alertStatus: ObcAlertMenuItemStatus.Rectified,
    alertType: 'alarm',
    ageSeconds: 120,
    source: 'ENG'
  },
  {
    title: 'Low Tank Level',
    description: 'Service tank fuel level below 30%',
    tag: '#0004',
    alertStatus: ObcAlertMenuItemStatus.Acknowledged,
    alertType: 'alarm',
    ageSeconds: 180,
    source: 'ENG'
  },
  {
    title: 'Fire Detection Fault',
    description: 'Fire detection system fault in zone 3',
    tag: '#0005',
    alertStatus: ObcAlertMenuItemStatus.Acknowledged,
    alertType: 'warning',
    ageSeconds: 240,
    source: 'SAFETY'
  },
  {
    title: 'AIS Target Lost',
    description: 'AIS target tracking lost - vessel ID 375129',
    tag: '#0006',
    alertStatus: ObcAlertMenuItemStatus.Rectified,
    alertType: 'caution',
    ageSeconds: 300,
    source: 'NAV'
  },
  {
    title: 'Steering Gear Alarm',
    description: 'Steering gear power unit failure',
    tag: '#0007',
    alertStatus: ObcAlertMenuItemStatus.Acknowledged,
    alertType: 'alarm',
    ageSeconds: 360,
    source: 'STEERING'
  },
  {
    title: 'NAVTEX Message',
    description: 'New navigational warning received',
    tag: '#0008',
    alertStatus: ObcAlertMenuItemStatus.Acknowledged,
    alertType: 'alarm',
    ageSeconds: 420,
    source: 'NAV'
  },
  {
    title: 'Depth Below Keel',
    description: 'Water depth below safety limit',
    tag: '#0009',
    alertStatus: ObcAlertMenuItemStatus.Acknowledged,
    alertType: 'alarm',
    ageSeconds: 480,
    source: 'NAV'
  },
  {
    title: 'Generator Overload',
    description: 'Generator 2 load exceeds 95%',
    tag: '#0010',
    alertStatus: ObcAlertMenuItemStatus.Acknowledged,
    alertType: 'alarm',
    ageSeconds: 540,
    source: 'POWER'
  },
  {
    title: 'Wind Speed High',
    description: 'Wind speed exceeds 45 knots',
    tag: '#0011',
    alertStatus: ObcAlertMenuItemStatus.Acknowledged,
    alertType: 'alarm',
    ageSeconds: 600,
    source: 'NAV'
  }
]

export const simulatedAlerts: SimulatedAlert[] = [
  {
    title: 'ECDIS Primary GPS Lost',
    description: 'Loss of position input from primary GPS',
    tag: '#0001',
    alertType: 'alarm',
    startSeconds: 0,
    resolvedSeconds: 20,
    source: 'NAV'
  },
  {
    title: 'Generator Overload',
    description: 'Generator 2 load exceeds 95%',
    tag: '#0015',
    alertType: 'alarm',
    startSeconds: 3,
    resolvedSeconds: 60,
    source: 'POWER'
  },
  {
    title: 'Radar Target Collision',
    description: 'CPA/TCPA alarm - Risk of collision detected',
    tag: '#0002',
    alertType: 'alarm',
    startSeconds: 5,
    resolvedSeconds: 360,
    source: 'NAV'
  },
  {
    title: 'Main Engine High Temperature',
    description: 'ME cooling water temperature above limit',
    tag: '#0003',
    alertType: 'alarm',
    startSeconds: 10,
    resolvedSeconds: 360,
    source: 'ENG'
  },
  {
    title: 'Low Tank Level',
    description: 'Service tank fuel level below 30%',
    tag: '#0004',
    alertType: 'alarm',
    startSeconds: 15,
    resolvedSeconds: 360,
    source: 'ENG'
  },
  {
    title: 'Fire Detection Fault',
    description: 'Fire detection system fault in zone 3',
    tag: '#0005',
    alertType: 'alarm',
    startSeconds: 20,
    resolvedSeconds: 360,
    source: 'SAFETY'
  },
  {
    title: 'AIS Target Lost',
    description: 'AIS target tracking lost - vessel ID 375129',
    tag: '#0006',
    alertType: 'alarm',
    startSeconds: 30,
    resolvedSeconds: 360,
    source: 'NAV'
  },
  {
    title: 'Steering Gear Alarm',
    description: 'Steering gear power unit failure',
    tag: '#0007',
    alertType: 'alarm',
    startSeconds: 33,
    resolvedSeconds: 360,
    source: 'STEERING'
  },
  {
    title: 'NAVTEX Message',
    description: 'New navigational warning received',
    tag: '#0008',
    alertType: 'alarm',
    startSeconds: 70,
    resolvedSeconds: 360,
    source: 'NAV'
  },
  {
    title: 'Depth Below Keel',
    description: 'Water depth below safety limit',
    tag: '#0009',
    alertType: 'alarm',
    startSeconds: 80,
    resolvedSeconds: 360,
    source: 'NAV'
  },
  {
    title: 'Generator Overload',
    description: 'Generator 2 load exceeds 95%',
    tag: '#0010',
    alertType: 'alarm',
    startSeconds: 90,
    resolvedSeconds: 360,
    source: 'POWER'
  },
  {
    title: 'Wind Speed High',
    description: 'Wind speed exceeds 45 knots',
    tag: '#0011',
    alertType: 'alarm',
    startSeconds: 100,
    resolvedSeconds: 360,
    source: 'NAV'
  }
]
