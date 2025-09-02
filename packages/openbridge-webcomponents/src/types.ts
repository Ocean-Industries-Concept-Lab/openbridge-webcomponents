export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

export enum AlertType {
  Alarm = 'alarm',
  Warning = 'warning',
  Caution = 'caution',
}

export enum AlertCategory {
  a = 'a',
  b = 'b',
  c = 'c',
}

export interface Alert {
  id: string; // The id of the alert
  tagId: string; // The tag ID visible to the user
  source: string;
  text: string;
  note?: string; // The note of the alert, typically by the operator
  acknowledged:
    | false
    | {
        acknowledgedBy: string;
        acknowledgedAt: Date;
      };
  active:
    | true
    | {
        rectifiedTime: Date;
      };
  type: AlertType;
  time: Date;
  lastModified?: Date;
  shelved?:
    | false
    | {
        shelvedStartTime: Date;
        shelvedEndTime?: Date;
        shelvedBy?: string;
      };
  blocked?:
    | false
    | {
        blockedStartTime: Date;
        blockedEndTime?: Date;
        blockedBy?: string;
      };
  noAck?: boolean; // If true, the alarm has no ack button
  category?: AlertCategory;
}

export function isActive(alert: Alert) {
  return alert.active === true;
}

export function isAcknowledged(alert: Alert) {
  return alert.acknowledged !== false && alert.acknowledged !== undefined;
}

export function isShelved(alert: Alert) {
  return alert.shelved !== false && alert.shelved !== undefined;
}

export function isBlocked(alert: Alert) {
  return alert.blocked !== false && alert.blocked !== undefined;
}

const priorityOrder = [AlertType.Alarm, AlertType.Warning, AlertType.Caution];

export function comparePriorityAlerts(a: Alert, b: Alert) {
  if (a.type !== b.type) {
    return priorityOrder.indexOf(b.type) - priorityOrder.indexOf(a.type);
  }

  if (isActive(a) !== isActive(b)) {
    return isActive(a) ? 1 : -1;
  }

  if (isAcknowledged(a) !== isAcknowledged(b)) {
    return isAcknowledged(a) ? -1 : 1;
  }
  return a.time.getTime() - b.time.getTime();
}

export type TimeSinceFn = (time: Date) => string;

export function formatTimeSince(time: Date) {
  const now = new Date();
  const diff = now.getTime() - time.getTime();
  const diffInSeconds = diff / 1000;
  if (diffInSeconds < 60) {
    return Math.round(diffInSeconds) + 's';
  }
  const diffInMinutes = diffInSeconds / 60;
  if (diffInMinutes < 60) {
    return (
      Math.round(diffInMinutes) + 'm ' + Math.round(diffInSeconds % 60) + 's'
    );
  }
  const diffInHours = diffInMinutes / 60;
  if (diffInHours < 24) {
    return (
      Math.round(diffInHours) + 'h ' + Math.round(diffInMinutes % 60) + 'm'
    );
  }
  const diffInDays = diffInHours / 24;
  if (diffInDays < 365) {
    return Math.round(diffInDays) + 'd ' + Math.round(diffInHours % 24) + 'h';
  }
  return (
    Math.round(diffInDays / 365) + 'y ' + Math.round(diffInDays % 365) + 'd'
  );
}
