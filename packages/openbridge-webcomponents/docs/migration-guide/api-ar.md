| Element                                                               | 1.0.1                        | 2.0                                    |
| --------------------------------------------------------------------- | ---------------------------- | -------------------------------------- |
| `obc-poi`, `obc-poi-aton`, `obc-poi-data`, `obc-poi-vessel`           | `buttonY` = `null`           | `buttonY` = `0`                        |
| `obc-poi`                                                             | `y` = `96`                   | `y` = `192`                            |
| `obc-poi-aton`, `obc-poi-data`, `obc-poi-vessel`                      | `lineCompensationY`          | removed; the layer computes the offset |
| `obc-poi-group`                                                       | attribute `positionvertical` | attribute `position-vertical`          |
| `obc-poi-layer`                                                       | attribute `isselected`       | attribute `is-selected`                |
| `obc-poi-object-aton`, `obc-poi-object-data`, `obc-poi-object-vessel` | `colorStyleVars`             | removed                                |
| `obc-poi-object-data`, `obc-poi-object-vessel`                        | `objectStyle`: `string`      | `objectStyle`: `ObcPoiObjectStyle`     |
