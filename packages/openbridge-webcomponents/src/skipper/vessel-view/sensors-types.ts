import {svg, nothing} from 'lit';
import {Colors} from '../interfaces.js';
import {SensorView, SensorType} from './vessel';

//SENSOR SELECTOR
export function sensorTypeSelector(
  sensorType: SensorType,
  viewSensor: SensorView
) {
  switch (sensorType) {
    case SensorType.EML:
      return sensorEML(viewSensor);
    case SensorType.ECHO:
      return sensorEcho(viewSensor);
    case SensorType.SATLOG:
      return sensorSatlog(viewSensor);
    case SensorType.DOPPLER:
      return sensorDoppler(viewSensor);
    default:
      return nothing;
  }
}

//TYPES OF SENSORS
function sensorEcho(view: SensorView) {
  if (view === SensorView.SIDE) {
    return svg`
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="37" viewBox="0 0 24 37" fill="none">
      <g id="sensor">
        <rect id="Rounded rectangle" x="6.75" y="10.8535" width="10.5" height="10.5" rx="2" fill="${Colors.elementActiveColor}"/>
        <line id="Line" x1="8" y1="22.8535" x2="8" y2="36.8535" stroke="${Colors.overlayBorderOutlineColor}"/>
        <line id="Line_2" x1="17" y1="22.8535" x2="17" y2="36.8535" stroke="${Colors.overlayBorderOutlineColor}"/>
        <g id="Vector">
          <path d="M9.09995 28.1035L7.89995 29.3035C8.54995 29.9535 9.28328 30.4495 10.1 30.7915C10.9166 31.1328 11.75 31.3035 12.6 31.3035C13.45 31.2535 14.2833 31.0702 15.1 30.7535C15.9166 30.4368 16.65 29.9535 17.3 29.3035L16.1 28.1035C15.6 28.6035 15.0416 28.9785 14.425 29.2285C13.8083 29.4785 13.2 29.6035 12.6 29.6035C11.95 29.6035 11.3166 29.4785 10.7 29.2285C10.0833 28.9785 9.54995 28.6035 9.09995 28.1035Z" fill="${Colors.instrumentRegularSecondary}"/>
          <path d="M6.69995 30.5035L5.49995 31.7035C6.49995 32.7035 7.60828 33.4368 8.82495 33.9035C10.0416 34.3702 11.3 34.6035 12.6 34.6035C13.9 34.6035 15.1583 34.3579 16.375 33.8665C17.5916 33.3745 18.7 32.6535 19.7 31.7035L18.5 30.5035C17.7 31.3035 16.7793 31.9035 15.738 32.3035C14.696 32.7035 13.65 32.9035 12.6 32.9035C11.55 32.9035 10.5043 32.7035 9.46295 32.3035C8.42095 31.9035 7.49995 31.3035 6.69995 30.5035Z" fill="${Colors.instrumentRegularSecondary}"/>
        </g>
        <path id="X" d="M14.7464 8.60352L14.0744 6.49152H10.9304L10.2584 8.60352H8.39844L11.4584 -0.000484467H13.5344L16.6064 8.60352H14.7464ZM12.9944 2.97552C12.9544 2.84752 12.9024 2.68352 12.8384 2.48352C12.7744 2.27552 12.7104 2.06752 12.6464 1.85952C12.5904 1.64352 12.5424 1.45952 12.5024 1.30752C12.4624 1.46752 12.4104 1.66352 12.3464 1.89552C12.2824 2.11952 12.2184 2.33552 12.1544 2.54352C12.0984 2.74352 12.0544 2.88752 12.0224 2.97552L11.3744 5.03952H13.6544L12.9944 2.97552Z" fill="${Colors.instrumentRegularSecondary}"/>
      </g>
     </svg>
     `;
  }

  return svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="29" viewBox="0 0 24 29" fill="none">
      <g id="sensor">
        <rect id="Rounded rectangle" x="6.75" y="10.8535" width="10.5" height="10.5" rx="2" fill="${Colors.elementActiveColor}"/>
        <text id="X" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="8.39844" y="8.25952">A</tspan></text>
      </g>
    </svg>
  `;
}

export function sensorSatlog(view: SensorView) {
  if (view === SensorView.SIDE) {
    return svg`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="29" viewBox="0 0 24 29" fill="none">
        <g id="sensor">
          <g id="Vector">
            <path d="M2.737 19.9785C3.229 21.1952 3.95 22.3035 4.9 23.3035L6.1 22.1035C5.3 21.3035 4.7 20.3825 4.3 19.3405C3.9 18.2992 3.7 17.2535 3.7 16.2035C3.7 15.1535 3.9 14.1075 4.3 13.0655C4.7 12.0242 5.3 11.1035 6.1 10.3035L4.9 9.10352C3.95 10.1035 3.229 11.2118 2.737 12.4285C2.24567 13.6452 2 14.9035 2 16.2035C2 17.5035 2.24567 18.7618 2.737 19.9785Z" fill="${Colors.elementActiveColor}"/>
            <path d="M5.812 18.7035C6.154 19.5202 6.65 20.2535 7.3 20.9035L8.5 19.7035C8 19.2035 7.625 18.6452 7.375 18.0285C7.125 17.4118 7 16.8035 7 16.2035C7 15.5535 7.125 14.9202 7.375 14.3035C7.625 13.6868 8 13.1535 8.5 12.7035L7.3 11.5035C6.65 12.1535 6.154 12.8868 5.812 13.7035C5.47067 14.5202 5.3 15.3535 5.3 16.2035C5.3 17.0535 5.47067 17.8868 5.812 18.7035Z" fill="${Colors.elementActiveColor}"/>
            <path d="M15.5 19.7035L16.7 20.9035C17.35 20.2535 17.846 19.5202 18.188 18.7035C18.5293 17.8868 18.7 17.0535 18.7 16.2035C18.65 15.3535 18.4667 14.5202 18.15 13.7035C17.8333 12.8868 17.35 12.1535 16.7 11.5035L15.5 12.7035C16 13.2035 16.375 13.7618 16.625 14.3785C16.875 14.9952 17 15.6035 17 16.2035C17 16.8535 16.875 17.4868 16.625 18.1035C16.375 18.7202 16 19.2535 15.5 19.7035Z" fill="${Colors.elementActiveColor}"/>
            <path d="M17.9 22.1035L19.1 23.3035C20.1 22.3035 20.8333 21.1952 21.3 19.9785C21.7667 18.7618 22 17.5035 22 16.2035C22 14.9035 21.7543 13.6452 21.263 12.4285C20.771 11.2118 20.05 10.1035 19.1 9.10352L17.9 10.3035C18.7 11.1035 19.3 12.0242 19.7 13.0655C20.1 14.1075 20.3 15.1535 20.3 16.2035C20.3 17.2535 20.1 18.2992 19.7 19.3405C19.3 20.3825 18.7 21.3035 17.9 22.1035Z" fill="${Colors.elementActiveColor}"/>
            <path d="M12 19.1035C13.6569 19.1035 15 17.7604 15 16.1035C15 14.4467 13.6569 13.1035 12 13.1035C10.3431 13.1035 9 14.4467 9 16.1035C9 17.7604 10.3431 19.1035 12 19.1035Z" fill="${Colors.elementActiveColor}"/>
          </g>
          <text id="X" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="8.39844" y="8.25952">A</tspan></text>
        </g>
      </svg>
    `;
  }

  return svg`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="29" viewBox="0 0 24 29" fill="none">
        <g id="sensor">
          <g id="Vector">
            <path d="M2.737 19.9785C3.229 21.1952 3.95 22.3035 4.9 23.3035L6.1 22.1035C5.3 21.3035 4.7 20.3825 4.3 19.3405C3.9 18.2992 3.7 17.2535 3.7 16.2035C3.7 15.1535 3.9 14.1075 4.3 13.0655C4.7 12.0242 5.3 11.1035 6.1 10.3035L4.9 9.10352C3.95 10.1035 3.229 11.2118 2.737 12.4285C2.24567 13.6452 2 14.9035 2 16.2035C2 17.5035 2.24567 18.7618 2.737 19.9785Z" fill="${Colors.elementActiveColor}"/>
            <path d="M5.812 18.7035C6.154 19.5202 6.65 20.2535 7.3 20.9035L8.5 19.7035C8 19.2035 7.625 18.6452 7.375 18.0285C7.125 17.4118 7 16.8035 7 16.2035C7 15.5535 7.125 14.9202 7.375 14.3035C7.625 13.6868 8 13.1535 8.5 12.7035L7.3 11.5035C6.65 12.1535 6.154 12.8868 5.812 13.7035C5.47067 14.5202 5.3 15.3535 5.3 16.2035C5.3 17.0535 5.47067 17.8868 5.812 18.7035Z" fill="${Colors.elementActiveColor}"/>
            <path d="M15.5 19.7035L16.7 20.9035C17.35 20.2535 17.846 19.5202 18.188 18.7035C18.5293 17.8868 18.7 17.0535 18.7 16.2035C18.65 15.3535 18.4667 14.5202 18.15 13.7035C17.8333 12.8868 17.35 12.1535 16.7 11.5035L15.5 12.7035C16 13.2035 16.375 13.7618 16.625 14.3785C16.875 14.9952 17 15.6035 17 16.2035C17 16.8535 16.875 17.4868 16.625 18.1035C16.375 18.7202 16 19.2535 15.5 19.7035Z" fill="${Colors.elementActiveColor}"/>
            <path d="M17.9 22.1035L19.1 23.3035C20.1 22.3035 20.8333 21.1952 21.3 19.9785C21.7667 18.7618 22 17.5035 22 16.2035C22 14.9035 21.7543 13.6452 21.263 12.4285C20.771 11.2118 20.05 10.1035 19.1 9.10352L17.9 10.3035C18.7 11.1035 19.3 12.0242 19.7 13.0655C20.1 14.1075 20.3 15.1535 20.3 16.2035C20.3 17.2535 20.1 18.2992 19.7 19.3405C19.3 20.3825 18.7 21.3035 17.9 22.1035Z" fill="${Colors.elementActiveColor}"/>
            <path d="M12 19.1035C13.6569 19.1035 15 17.7604 15 16.1035C15 14.4467 13.6569 13.1035 12 13.1035C10.3431 13.1035 9 14.4467 9 16.1035C9 17.7604 10.3431 19.1035 12 19.1035Z" fill="${Colors.elementActiveColor}"/>
          </g>
          <text id="X" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="8.39844" y="8.25952">A</tspan></text>
        </g>
      </svg>
    `;
}

export function sensorEML(view: SensorView) {
  if (view === SensorView.SIDE) {
    return svg`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="29" viewBox="0 0 24 29" fill="none">
        <g id="sensor">
          <rect id="Rectangle 3467910" x="6.75" y="10.8535" width="10.5" height="10.5" rx="2" fill="${Colors.elementActiveColor}"/>
          <text id="X" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="8.39844" y="8.25952">A</tspan></text>
        </g>
      </svg>
    `;
  }

  return svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="29" viewBox="0 0 24 29" fill="none">
      <g id="sensor">
        <rect id="Rectangle 3467910" x="6.75" y="10.8535" width="10.5" height="10.5" rx="2" fill="${Colors.elementActiveColor}"/>
        <text id="X" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="8.39844" y="8.25952">A</tspan></text>
      </g>
    </svg>
  `;
}

export function sensorDoppler(view: SensorView) {
  if (view === SensorView.SIDE) {
    return svg`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="38" viewBox="0 0 32 38" fill="none">
        <g id="sensor">
          <rect id="Rounded rectangle" x="10.3486" y="10.8535" width="10.5" height="10.5" rx="2" fill="${Colors.elementActiveColor}"/>
          <path id="Line" d="M3.03165 37.21L11.0316 23.3536" stroke="${Colors.overlayBorderOutlineColor}"/>
          <path id="Line_2" d="M28.1656 37.21L20.1656 23.3536" stroke="${Colors.overlayBorderOutlineColor}"/>
          <g id="Vector">
            <path d="M20.1678 30.5383L19.7286 32.1775C20.6165 32.4154 21.4996 32.4783 22.3778 32.3662C23.2557 32.2534 24.0628 31.9846 24.7989 31.5596C25.51 31.0913 26.14 30.5158 26.6889 29.8332C27.2379 29.1507 27.6313 28.3654 27.8692 27.4775L26.23 27.0383C26.047 27.7213 25.7509 28.3252 25.3419 28.8501C24.9328 29.3749 24.4685 29.7873 23.9489 30.0873C23.386 30.4123 22.775 30.6207 22.1159 30.7126C21.4569 30.8044 20.8075 30.7463 20.1678 30.5383Z" fill="${Colors.elementActiveColor}"/>
            <path d="M19.2893 33.8167L18.8501 35.456C20.2161 35.822 21.5426 35.9029 22.8296 35.6987C24.1166 35.4945 25.323 35.0674 26.4489 34.4174C27.5747 33.7674 28.5416 32.9255 29.3496 31.8917C30.1573 30.8573 30.7566 29.6787 31.1477 28.356L29.5084 27.9167C29.2156 29.0096 28.7183 29.9895 28.0165 30.8566C27.3141 31.724 26.5082 32.4202 25.5989 32.9452C24.6895 33.4702 23.684 33.8198 22.5822 33.9941C21.4798 34.1687 20.3821 34.1096 19.2893 33.8167Z" fill="${Colors.elementActiveColor}"/>
          </g>
          <g id="Vector_2">
            <path d="M10.9797 30.5383L11.4189 32.1775C10.531 32.4154 9.6479 32.4783 8.76965 32.3662C7.89173 32.2534 7.08471 31.9846 6.34858 31.5596C5.63746 31.0913 5.00744 30.5158 4.45852 29.8332C3.9096 29.1507 3.51618 28.3654 3.27826 27.4775L4.9175 27.0383C5.10051 27.7213 5.39654 28.3252 5.80559 28.8501C6.21464 29.3749 6.67897 29.7873 7.19859 30.0873C7.7615 30.4123 8.37248 30.6207 9.03153 30.7126C9.69058 30.8044 10.34 30.7463 10.9797 30.5383Z" fill="${Colors.elementActiveColor}"/>
            <path d="M11.8581 33.8167L12.2974 35.456C10.9313 35.822 9.60483 35.9029 8.31783 35.6987C7.03083 35.4945 5.82442 35.0674 4.69859 34.4174C3.57275 33.7674 2.60584 32.9255 1.79784 31.8917C0.990174 30.8573 0.390829 29.6787 -0.00019598 28.356L1.63903 27.9167C1.93186 29.0096 2.42917 29.9895 3.131 30.8566C3.83339 31.724 4.63926 32.4202 5.54859 32.9452C6.45791 33.4702 7.46348 33.8198 8.56531 33.9941C9.6677 34.1687 10.7653 34.1096 11.8581 33.8167Z" fill="${Colors.elementActiveColor}"/>
          </g>
          <text id="X" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="11.9971" y="8.25952">A</tspan></text>
        </g>
      </svg>
    `;
  }

  return svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="29" viewBox="0 0 24 29" fill="none">
      <g id="sensor">
        <rect id="Rounded rectangle" x="6.75" y="10.8535" width="10.5" height="10.5" rx="2" fill="${Colors.elementActiveColor}"/>
        <text id="X" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="8.39844" y="8.25952">A</tspan></text>
      </g>
    </svg>
  `;
}
