| Field                                | Type             | Description                                                                           |
| ------------------------------------ | ---------------- | ------------------------------------------------------------------------------------- |
| `category`                           | `AdviceCategory` | Required. One of the seven categories                                                 |
| `min`, `max`                         | `number`         | A range, in the instrument's unit                                                     |
| `value`                              | `number`         | A point, instead of `min` and `max`                                                   |
| `state`                              | `AdviceState`    | `hinted`, `enabled`, `active` or `triggered`; `enabled` when left out                 |
| `hideMinTickmark`, `hideMaxTickmark` | `boolean`        | Leaves out the boundary tick at that end and rounds the end                           |
| `showArea`                           | `boolean`        | Also draws the area: limit lines across the bar, face or chart, tinted when triggered |
