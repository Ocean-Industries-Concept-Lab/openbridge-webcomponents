import type { SimulatedAlert, StartAlert } from './model'

export const startAlerts: StartAlert[] = [
  {
    cause: 'GPS 1 Signal Lost',
    description: 'GPS 1 signal lost',
    tag: '#0001',
    alertStatus: 'unacked',
    alertType: 'alarm',
    ageSeconds: 10,
    source: 'GPS'
  },
  {
    cause: 'GPS 2 Signal Lost',
    description: 'GPS 2 signal lost',
    tag: '#0002',
    alertStatus: 'acked',
    alertType: 'alarm',
    ageSeconds: 60,
    source: 'GPS'
  },
  {
    cause: 'GPS 3 Signal Lost',
    description: 'GPS 3 signal lost',
    tag: '#0003',
    alertStatus: 'rectified',
    alertType: 'alarm',
    ageSeconds: 120,
    source: 'GPS'
  },
  {
    cause: 'GPS 4 Signal Lost',
    description: 'GPS 4 signal lost',
    tag: '#0004',
    alertStatus: 'acked',
    alertType: 'alarm',
    ageSeconds: 180,
    source: 'GPS'
  },
  {
    cause: 'GPS 5 Signal Lost',
    description: 'GPS 5 signal lost',
    tag: '#0005',
    alertStatus: 'acked',
    alertType: 'warning',
    ageSeconds: 240,
    source: 'GPS'
  },
  {
    cause: 'GPS 6 Signal Lost',
    description: 'GPS 6 signal lost',
    tag: '#0006',
    alertStatus: 'rectified',
    alertType: 'caution',
    ageSeconds: 300,
    source: 'GPS'
  },
  {
    cause: 'GPS 7 Signal Lost',
    description: 'GPS 7 signal lost',
    tag: '#0007',
    alertStatus: 'acked',
    alertType: 'alarm',
    ageSeconds: 360,
    source: 'GPS'
  },
  {
    cause: 'GPS 8 Signal Lost',
    description: 'GPS 8 signal lost',
    tag: '#0008',
    alertStatus: 'acked',
    alertType: 'alarm',
    ageSeconds: 420,
    source: 'GPS'
  },
  {
    cause: 'GPS 9 Signal Lost',
    description: 'GPS 9 signal lost',
    tag: '#0009',
    alertStatus: 'acked',
    alertType: 'alarm',
    ageSeconds: 480,
    source: 'GPS'
  },
  {
    cause: 'GPS 10 Signal Lost',
    description: 'GPS 10 signal lost',
    tag: '#0010',
    alertStatus: 'acked',
    alertType: 'alarm',
    ageSeconds: 540,
    source: 'GPS'
  },
  {
    cause: 'GPS 11 Signal Lost',
    description: 'GPS 11 signal lost',
    tag: '#0011',
    alertStatus: 'acked',
    alertType: 'alarm',
    ageSeconds: 600,
    source: 'GPS'
  }
]
export const simulatedAlerts: SimulatedAlert[] = [
  {
    cause: 'GPS 1 Signal Lost',
    description: 'GPS 1 signal lost',
    tag: '#0001',
    alertType: 'alarm',
    startSeconds: 1,
    resolvedSeconds: 20,
    source: 'GPS'
  },
  {
    cause: 'GPS 10 Signal Lost',
    description: 'GPS 10 signal lost',
    tag: '#0015',
    alertType: 'alarm',
    startSeconds: 1,
    resolvedSeconds: 1,
    source: 'GPS'
  },
  {
    cause: 'GPS 2 Signal Lost',
    description: 'GPS 2 signal lost',
    tag: '#0002',
    alertType: 'alarm',
    startSeconds: 10,
    resolvedSeconds: 360,
    source: 'GPS'
  },
  {
    cause: 'GPS 3 Signal Lost',
    description: 'GPS 3 signal lost',
    tag: '#0003',
    alertType: 'alarm',
    startSeconds: 20,
    resolvedSeconds: 360,
    source: 'GPS'
  },
  {
    cause: 'GPS 4 Signal Lost',
    description: 'GPS 4 signal lost',
    tag: '#0004',
    alertType: 'alarm',
    startSeconds: 30,
    resolvedSeconds: 360,
    source: 'GPS'
  },
  {
    cause: 'GPS 5 Signal Lost',
    description: 'GPS 5 signal lost',
    tag: '#0005',
    alertType: 'alarm',
    startSeconds: 40,
    resolvedSeconds: 360,
    source: 'GPS'
  },
  {
    cause: 'GPS 6 Signal Lost',
    description: 'GPS 6 signal lost',
    tag: '#0006',
    alertType: 'alarm',
    startSeconds: 50,
    resolvedSeconds: 360,
    source: 'GPS'
  },
  {
    cause: 'GPS 7 Signal Lost',
    description: 'GPS 7 signal lost',
    tag: '#0007',
    alertType: 'alarm',
    startSeconds: 60,
    resolvedSeconds: 360,
    source: 'GPS'
  },
  {
    cause: 'GPS 8 Signal Lost',
    description: 'GPS 8 signal lost',
    tag: '#0008',
    alertType: 'alarm',
    startSeconds: 70,
    resolvedSeconds: 360,
    source: 'GPS'
  },
  {
    cause: 'GPS 9 Signal Lost',
    description: 'GPS 9 signal lost',
    tag: '#0009',
    alertType: 'alarm',
    startSeconds: 80,
    resolvedSeconds: 360,
    source: 'GPS'
  },
  {
    cause: 'GPS 10 Signal Lost',
    description: 'GPS 10 signal lost',
    tag: '#0010',
    alertType: 'alarm',
    startSeconds: 90,
    resolvedSeconds: 360,
    source: 'GPS'
  },
  {
    cause: 'GPS 11 Signal Lost',
    description: 'GPS 11 signal lost',
    tag: '#0011',
    alertType: 'alarm',
    startSeconds: 100,
    resolvedSeconds: 360,
    source: 'GPS'
  }
]
