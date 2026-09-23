| Element                                                 | 1.0.1                                                      | 2.0                                                            |
| ------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------- |
| `obc-compass`, `obc-compass-flat`, `obc-compass-sector` | `rotMaxValue` = `10`                                       | `rotMaxValue` = `60`                                           |
| `obc-compass`                                           | `windSpeed`                                                | `currentWindSpeedKnots`                                        |
| `obc-compass-indicator`                                 | `arrow`                                                    | `direction`                                                    |
| `obc-compass-indicator`                                 | `northUp` = `false`                                        | `northUp` = `true`                                             |
| `obc-compass-indicator`                                 | attribute `northup`                                        | none; set the `northUp` property                               |
| `obc-compass-sector`                                    | wrapper event `None` (a `@fires` placeholder; never fired) | removed                                                        |
| `obc-depth-actual`                                      | `primaryTickmarkInterval` = `50`                           | unset; follows the range                                       |
| `obc-depth-actual`                                      | `secondaryTickmarkInterval` = `10`                         | unset; follows the range                                       |
| `obc-speed-gauge`                                       | `showReadout`                                              | `hasReadout`                                                   |
| `obc-velocity-projection-plot`                          | `instantCurrentDirectionDeg`                               | `currentFromDirection`                                         |
| `obc-velocity-projection-plot`                          | `instantCurrentSpeedNumber`                                | `currentSpeedKnots`                                            |
| `obc-velocity-projection-plot`                          | `instantWindDirectionDeg`                                  | `currentWindFromDirection`                                     |
| `obc-velocity-projection-plot`                          | `instantWindSpeedNumber`                                   | `currentWindSpeedKnots`                                        |
| `obc-watch`                                             | `wind`                                                     | `windKnots`                                                    |
| `obc-wind`                                              | `currentWindSpeedBeaufort`                                 | `currentWindSpeedKnots`                                        |
| `obc-wind-indicator`                                    | `northUp`                                                  | removed; use `direction="relative"` with `rotation-angle`      |
| `obc-wind-indicator`                                    | `speed`                                                    | `currentWindSpeedKnots` (attribute `current-wind-speed-knots`) |
