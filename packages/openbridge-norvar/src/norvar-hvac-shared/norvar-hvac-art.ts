/**
 * The HVAC (VVS) and boiler symbols: the dampers, compressor, air filter,
 * strainer, heating and cooling coils, heat exchangers and boilers.
 *
 * Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.
 *
 * Each symbol has one drawing for a button and one for the flat variant,
 * where a frame stands in for the button, as in `norvar-station-art.ts`.
 * The fan is drawn with the motorized symbols in `norvar-motorized-art.ts`.
 *
 * @module
 */
import {NorvarStationArt} from '../norvar-station-shared/norvar-station-art.js';
import {
  filled,
  hub,
  layers,
  mapFrame,
  outlined,
  ring,
  roundFrame,
  squareOutline,
  stroked,
} from '../norvar-shared/norvar-draw.js';

export enum NorvarDamperPosition {
  open = 'open',
  closed = 'closed',
  /** The regulating damper, also drawn while a damper moves. */
  regulating = 'regulating',
}

/**
 * The two heat exchanger drawings of the design file, `NORVAR-varmeveksel-a`
 * and `-b`.
 *
 * TODO(designer): the design file names both rows "Varmeveksler"; name the
 * kinds so the values can say what they draw.
 */
export enum NorvarHeatExchangerType {
  a = 'a',
  b = 'b',
}

export enum NorvarBoilerFuel {
  electric = 'electric',
  solid = 'solid',
  liquid = 'liquid',
  gas = 'gas',
}

/** The blade of a damper through its hub, drawn 2 units wide in the button and 1.5 in the frame. */
const damper = (button: string, flat: string): NorvarStationArt => ({
  button: layers(stroked(button, 2), hub(2.5)),
  frame: mapFrame,
  mark: layers(stroked(flat, 1.5), hub(2)),
});

export const DAMPER_ART: Record<NorvarDamperPosition, NorvarStationArt> = {
  [NorvarDamperPosition.open]: damper('M12 2L12 22', 'M12 5L12 19'),
  [NorvarDamperPosition.closed]: damper('M22 12H2', 'M19 12L5 12'),
  [NorvarDamperPosition.regulating]: damper(
    'M19.0746 4.92744L4.93247 19.0696',
    'M16.9462 7.05168L7.04672 16.9512'
  ),
};

export const FIRE_DAMPER_ART: NorvarStationArt = damper(
  'M4 4L20 20M4 20L20 4',
  'M16.9462 7.05176L7.04672 16.9513M7.04672 7.05879L16.9462 16.9583'
);

const COMPRESSOR_BUTTON =
  'M21.8496 13.7178C21.75 14.293 21.6036 14.8516 21.4102 15.3887L5.54883 19.6387C5.10736 19.2655 4.69812 18.8555 4.32715 18.4121L21.8496 13.7178ZM21.4404 8.7002C21.6279 9.23656 21.77 9.79354 21.8643 10.3672L4.27148 5.65234C4.63666 5.20824 5.04117 4.79804 5.47656 4.42285L21.4404 8.7002Z';
const COMPRESSOR_FLAT =
  'M23.7861 14.2559C23.6812 14.8072 23.5369 15.3444 23.3594 15.8662L4.09863 21.0273C3.66499 20.6475 3.25981 20.2368 2.88477 19.7988L23.502 14.2754C23.5974 14.2498 23.6937 14.2447 23.7861 14.2559ZM23.3896 8.22266C23.5619 8.74227 23.7014 9.2768 23.8018 9.8252C23.7055 9.8385 23.6046 9.83336 23.5049 9.80664L2.82812 4.26562C3.19798 3.82747 3.59822 3.41624 4.02637 3.03516L23.3896 8.22266Z';

/** Round, unlike the other HVAC symbols. */
export const COMPRESSOR_ART: NorvarStationArt = {
  button: layers(ring(10, 1.5), filled(COMPRESSOR_BUTTON)),
  frame: roundFrame,
  mark: filled(COMPRESSOR_FLAT),
};

/** The housing of the air filter and the strainer in the button. */
const HOUSING = squareOutline(16, 1, 1.5);

export const AIR_FILTER_ART: NorvarStationArt = {
  button: layers(HOUSING, stroked('M4 5L20 8.5L4 12L20 15.5L4 19', 1.5)),
  frame: mapFrame,
  mark: stroked('M2 3L22 8L2 12L22 16L2 21', 1.5),
};

const STRAINER_BUTTON =
  'M19 4C19.5523 4 20 4.44772 20 5V5.06055L5.06055 20H5C4.44772 20 4 19.5523 4 19V18.9395L18.9395 4H19ZM20 9.06055L9.06055 20H6.93945L20 6.93945V9.06055ZM20 13.0605L13.0605 20H10.9395L20 10.9395V13.0605ZM20 17.0605L17.0605 20H14.9395L20 14.9395V17.0605ZM17.0605 4L4 17.0605V14.9395L14.9395 4H17.0605ZM13.0605 4L4 13.0605V10.9395L10.9395 4H13.0605ZM9.06055 4L4 9.06055V6.93945L6.93945 4H9.06055Z';
const STRAINER_FLAT =
  'M21 2C21.5523 2 22 2.44772 22 3V3.06055L3.06055 22H3C2.44772 22 2 21.5523 2 21V20.9395L20.9395 2H21ZM22 8.06055L8.06055 22H5.93945L22 5.93945V8.06055ZM22 13.0605L13.0605 22H10.9395L22 10.9395V13.0605ZM22 18.0605L18.0605 22H15.9395L22 15.9395V18.0605ZM18.0605 2L2 18.0605V15.9395L15.9395 2H18.0605ZM13.0605 2L2 13.0605V10.9395L10.9395 2H13.0605ZM8.06055 2L2 8.06055V5.93945L5.93945 2H8.06055Z';

export const STRAINER_ART: NorvarStationArt = {
  button: layers(HOUSING, filled(STRAINER_BUTTON)),
  frame: mapFrame,
  mark: filled(STRAINER_FLAT),
};

/** A coil: a sign in a circle, plus for heating and minus for cooling. */
const coil = (button: string, flat: string): NorvarStationArt => ({
  button: layers(ring(10, 1.5), stroked(button, 2)),
  frame: mapFrame,
  mark: layers(ring(6, 1.5), stroked(flat, 1.5)),
});

export const HEATING_COIL_ART: NorvarStationArt = coil(
  'M7 12H17M12 7V17',
  'M9 12H15M12 9V15'
);
export const COOLING_COIL_ART: NorvarStationArt = coil('M7 12H17', 'M9 12H15');

const exchanger = (button: string, flat: string): NorvarStationArt => ({
  button: outlined(button, 2),
  frame: mapFrame,
  mark: outlined(flat, 1.5),
});

export const HEAT_EXCHANGER_ART: Record<
  NorvarHeatExchangerType,
  NorvarStationArt
> = {
  [NorvarHeatExchangerType.a]: exchanger(
    'M2 12H6.94458C6.97905 12 7.0111 12.0178 7.02938 12.047L11.8152 19.7043C11.8684 19.7895 12 19.7518 12 19.6513V4.34868C12 4.24821 12.1316 4.21048 12.1848 4.29568L16.9706 11.953C16.9889 11.9822 17.0209 12 17.0554 12H22',
    'M2 12H6.95316C6.98284 12 7.01099 12.0132 7.02998 12.036L11.8232 17.7878C11.8831 17.8597 12 17.8173 12 17.7238V6.27621C12 6.18268 12.1169 6.14033 12.1768 6.21219L16.97 11.964C16.989 11.9868 17.0172 12 17.0468 12H22'
  ),
  [NorvarHeatExchangerType.b]: exchanger(
    'M1.5 4H19.2586C19.3477 4 19.3923 4.10771 19.3293 4.17071L11.5707 11.9293C11.5317 11.9683 11.5317 12.0317 11.5707 12.0707L19.3293 19.8293C19.3923 19.8923 19.3477 20 19.2586 20H1.5',
    'M2 6H16.7C16.7961 6 16.8369 6.12234 16.76 6.18L9.10667 11.92C9.05333 11.96 9.05333 12.04 9.10667 12.08L16.76 17.82C16.8369 17.8777 16.7961 18 16.7 18H2'
  ),
};

const boiler = (button: string, flat: string): NorvarStationArt => ({
  button: outlined(button, 2),
  frame: mapFrame,
  mark: outlined(flat, 1.5),
});

export const BOILER_ART: Record<NorvarBoilerFuel, NorvarStationArt> = {
  [NorvarBoilerFuel.electric]: boiler(
    'M16 2L9.33333 11.1481L16 9.31852L8 21M8 16.5667V21L12.5 19',
    'M15 4L10 11.2222L15 9.77778L9 19M9 15.5V19L12.5 17.5'
  ),
  [NorvarBoilerFuel.solid]: boiler(
    'M9.66667 2L19 14.5M19 9.5L9.66667 22M14.3333 2L5 14.5M5 9.5L14.3333 22',
    'M10 4L18 14M18 10L10 20M14 4L6 14M6 10L14 20'
  ),
  [NorvarBoilerFuel.liquid]: boiler(
    'M12 7V17M4 12L12 17L20 12',
    'M12 8V16M6 12L12 16L18 12'
  ),
  [NorvarBoilerFuel.gas]: boiler(
    'M4.41421 16H19.5858C20.4767 16 20.9229 14.9229 20.2929 14.2929L12.7071 6.70711C12.3166 6.31658 11.6834 6.31658 11.2929 6.70711L3.70711 14.2929C3.07714 14.9229 3.52331 16 4.41421 16Z',
    'M7.20377 15H16.7962C17.6554 15 18.1146 13.9881 17.5488 13.3415L12.7526 7.86009C12.3542 7.40476 11.6458 7.40476 11.2474 7.86009L6.45119 13.3415C5.88543 13.9881 6.34461 15 7.20377 15Z'
  ),
};
