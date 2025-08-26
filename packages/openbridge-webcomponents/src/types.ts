export enum AlertType {
  Alarm = 'alarm',
  Warning = 'warning',
  Caution = 'caution',
}

export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

export enum AlarmStatus {
  Unacknowledged = 'unacknowledged',
  Acknowledged = 'acknowledged',
  Rectified = 'rectified',
}

export interface Alarm {
  id: string;
  title: string;
  description: string;
  status: AlarmStatus;
  type: AlertType;
  time: string; // ISO 8601 timestamp
  lastModified?: string; // ISO 8601 timestamp
  shelved?: boolean;
  noAck?: boolean; // If true, the alarm has no ack button
}

const priorityOrder = [AlertType.Alarm, AlertType.Warning, AlertType.Caution];

const statusOrder = [
  AlarmStatus.Unacknowledged,
  AlarmStatus.Acknowledged,
  AlarmStatus.Rectified,
];

export function comparePriorityAlarms(a: Alarm, b: Alarm) {
  if (a.type !== b.type) {
    return priorityOrder.indexOf(a.type) - priorityOrder.indexOf(b.type);
  }

  if (a.status !== b.status) {
    const aStatusIndex = statusOrder.indexOf(a.status);
    const bStatusIndex = statusOrder.indexOf(b.status);
    return aStatusIndex - bStatusIndex;
  }
  return -a.time.localeCompare(b.time);
}
