| Property         | Type                                | Default  | Description                                                           |
| ---------------- | ----------------------------------- | -------- | --------------------------------------------------------------------- |
| `advices`        | `AdviceInput[]`                     | `[]`     | Ranges and points, in the instrument's unit                           |
| `adviceTrigger`  | `'both'`, `'value'` or `'setpoint'` | `'both'` | Which reading triggers a band: the value, the setpoint, or either one |
| `adviceEmphasis` | `boolean`                           | `false`  | Applies the resting rules described under [Emphasis](#emphasis)       |
