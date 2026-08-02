// eslint-disable-next-line openbridge/prefer-enum-over-string-literal-union
export type PipeValue =
  | 'open-flow'
  | 'open-generic'
  | 'empty'
  | 'medium-flow'
  | 'enhanced'
  | 'running'
  | 'closed'
  | 'closed-dash';

// eslint-disable-next-line openbridge/prefer-enum-over-string-literal-union
export type PipeSize = 'small' | 'medium' | 'large' | 'xl';

// eslint-disable-next-line openbridge/prefer-enum-over-string-literal-union
export type PipeDirection = 'top' | 'right' | 'bottom' | 'left';

// eslint-disable-next-line openbridge/prefer-enum-over-string-literal-union
export type MediumColor =
  | 'Neutral'
  | 'Enhanced'
  | 'Blue'
  | 'Cyan'
  | 'Teal'
  | 'Green'
  | 'Yellow'
  | 'Orange'
  | 'Red'
  | 'Purple'
  | 'Indigo';
