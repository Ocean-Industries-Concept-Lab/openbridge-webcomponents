import { ObcAlertMenuItemStatus } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item'
import type { SimulatedAlert, StartAlert } from './model'

export const startAlerts: StartAlert[] = [
  /*{
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
  }*/
]

export const simulatedAlerts: SimulatedAlert[] = [
  {
    title: 'Routine Maintenance Required',
    description: 'Scheduled maintenance check is due',
    tag: '#0001',
    alertType: 'caution',
    startSeconds: 0,
    resolvedSeconds: 360,
    source: 'SAFETY'
  },
  {
    title: 'High Voltage Warning',
    description: 'High voltage detected in electrical system',
    tag: '#0003',
    alertType: 'warning',
    startSeconds: 2,
    resolvedSeconds: 360,
    source: 'POWER'
  },
  {
    title: 'ECDIS Primary GPS Lost',
    description: 'Loss of position input from primary GPS',
    tag: '#0004',
    alertType: 'alarm',
    startSeconds: 3,
    resolvedSeconds: 20,
    source: 'NAV'
  },
  {
    title: 'Generator Overload',
    description: 'Generator 2 load exceeds 95%',
    tag: '#0005',
    alertType: 'alarm',
    startSeconds: 4,
    resolvedSeconds: 60,
    source: 'POWER'
  },
  {
    title: 'Radar Target Collision',
    description: 'CPA/TCPA alarm - Risk of collision detected',
    tag: '#0006',
    alertType: 'alarm',
    startSeconds: 5,
    resolvedSeconds: 360,
    source: 'NAV'
  },
  {
    title: 'Main Engine High Temperature',
    description: 'ME cooling water temperature above limit',
    tag: '#0007',
    alertType: 'warning',
    startSeconds: 10,
    resolvedSeconds: 360,
    source: 'ENG'
  },
  {
    title: 'Low Tank Level',
    description: 'Service tank fuel level below 30%',
    tag: '#0008',
    alertType: 'alarm',
    startSeconds: 15,
    resolvedSeconds: 360,
    source: 'ENG'
  },
  {
    title: 'Fire Detection Fault',
    description: 'Fire detection system fault in zone 3',
    tag: '#0009',
    alertType: 'alarm',
    startSeconds: 20,
    resolvedSeconds: 360,
    source: 'SAFETY'
  },
  {
    title: 'Engine Oil Pressure Low',
    description: 'Engine oil pressure below normal',
    tag: '#0010',
    alertType: 'caution',
    startSeconds: 25,
    resolvedSeconds: 360,
    source: 'ENG'
  },
  {
    title: 'AIS Target Lost',
    description: 'AIS target tracking lost - vessel ID 375129',
    tag: '#0011',
    alertType: 'alarm',
    startSeconds: 30,
    resolvedSeconds: 360,
    source: 'NAV'
  },
  {
    title: 'Steering Gear Alarm',
    description: 'Steering gear power unit failure',
    tag: '#0012',
    alertType: 'alarm',
    startSeconds: 33,
    resolvedSeconds: 360,
    source: 'STEERING'
  },
  {
    title: 'Bridge Door Open',
    description: 'Bridge door left open',
    tag: '#0013',
    alertType: 'warning',
    startSeconds: 45,
    resolvedSeconds: 360,
    source: 'SAFETY'
  },
  {
    title: 'Hydraulic System Fault',
    description: 'Hydraulic system pressure anomaly',
    tag: '#0014',
    alertType: 'caution',
    startSeconds: 55,
    resolvedSeconds: 360,
    source: 'STEERING'
  },
  {
    title: 'NAVTEX Message',
    description: 'New navigational warning received',
    tag: '#0015',
    alertType: 'alarm',
    startSeconds: 70,
    resolvedSeconds: 360,
    source: 'NAV'
  },
  {
    title: 'Weather Alert',
    description: 'Severe weather conditions expected',
    tag: '#0016',
    alertType: 'warning',
    startSeconds: 75,
    resolvedSeconds: 360,
    source: 'NAV'
  },
  {
    title: 'Depth Below Keel',
    description: 'Water depth below safety limit',
    tag: '#0017',
    alertType: 'alarm',
    startSeconds: 80,
    resolvedSeconds: 360,
    source: 'NAV'
  },
  {
    title: 'Generator Overload',
    description: 'Generator 2 load exceeds 95%',
    tag: '#0018',
    alertType: 'alarm',
    startSeconds: 90,
    resolvedSeconds: 360,
    source: 'POWER'
  },
  {
    title: 'Wind Speed High',
    description: 'Wind speed exceeds 45 knots',
    tag: '#0019',
    alertType: 'alarm',
    startSeconds: 100,
    resolvedSeconds: 360,
    source: 'NAV'
  },
  {
    title: 'Battery Low',
    description: 'Battery level below 20%',
    tag: '#0020',
    alertType: 'warning',
    startSeconds: 110,
    resolvedSeconds: 360,
    source: 'POWER'
  },
  {
    title: 'Hull Integrity Check',
    description: 'Hull integrity check required',
    tag: '#0021',
    alertType: 'caution',
    startSeconds: 120,
    resolvedSeconds: 360,
    source: 'SAFETY'
  },
  {
    title: 'Communication Signal Lost',
    description: 'Loss of communication signal',
    tag: '#0022',
    alertType: 'alarm',
    startSeconds: 130,
    resolvedSeconds: 360,
    source: 'COMM'
  },
  {
    title: 'Fuel Leak Detected',
    description: 'Fuel leak detected in engine room',
    tag: '#0023',
    alertType: 'alarm',
    startSeconds: 140,
    resolvedSeconds: 360,
    source: 'ENG'
  },
  {
    title: 'Temperature Sensor Fault',
    description: 'Temperature sensor malfunction',
    tag: '#0024',
    alertType: 'caution',
    startSeconds: 150,
    resolvedSeconds: 360,
    source: 'ENG'
  },
  {
    title: 'Navigation System Update',
    description: 'New update available for navigation system',
    tag: '#0025',
    alertType: 'warning',
    startSeconds: 160,
    resolvedSeconds: 360,
    source: 'NAV'
  }
]
