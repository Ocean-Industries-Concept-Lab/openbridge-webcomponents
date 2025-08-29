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

export enum AlertStatus {
  Unacknowledged = 'unacknowledged',
  Acknowledged = 'acknowledged',
  Rectified = 'rectified',
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  status: AlertStatus;
  type: AlertType;
  time: string; // ISO 8601 timestamp
  lastModified?: string; // ISO 8601 timestamp
  shelved?: boolean;
  noAck?: boolean; // If true, the alarm has no ack button
}

const priorityOrder = [AlertType.Alarm, AlertType.Warning, AlertType.Caution];

const statusOrder = [
  AlertStatus.Unacknowledged,
  AlertStatus.Acknowledged,
  AlertStatus.Rectified,
];

export function comparePriorityAlerts(a: Alert, b: Alert) {
  if (a.type !== b.type) {
    return priorityOrder.indexOf(b.type) - priorityOrder.indexOf(a.type);
  }

  if (a.status !== b.status) {
    const aStatusIndex = statusOrder.indexOf(a.status);
    const bStatusIndex = statusOrder.indexOf(b.status);
    return bStatusIndex - aStatusIndex;
  }
  return a.time.localeCompare(b.time);
}
