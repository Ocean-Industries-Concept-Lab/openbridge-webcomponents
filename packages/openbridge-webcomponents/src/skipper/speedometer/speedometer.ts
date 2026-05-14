import {LitElement, svg, html, SVGTemplateResult, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import { speedometerStyles } from './speedometer-styles.js';
import { roundedArch } from '../../svghelpers/roundedArch.js';
import { AdviceState, AdviceType, renderAdvice } from '../advice.js';
import { InstrumentFieldSize } from '../../navigation-instruments/instrument-field/instrument-field.js';
import { AlertColor, AlertTypes, Colors, InstrumentField, SpeedType, WatchBarArea } from '../interfaces.js';

export const OUTER_RING_RADIUS = 368 / 2;
const RING2_RADIUS = 528.25 / 2;
const RING3_RADIUS = 373.25 / 2;

@customElement('ob-speedometer')
export class Speedometer extends LitElement {
  @property({type: Number}) maxSpeed = 25;
  @property({type: String}) mainSpeedType = SpeedType.SOG;
  @property({type: Number}) sogSpeed = 5;
  @property({type: Number}) fractionDigits = 2;
  @property({type: Number}) stwSpeed = 5;
  @property({type: Boolean}) useAlerts = false;
  @property({type: Number}) alertLow = 5;
  @property({type: String}) alertLowType: AlertTypes = AlertTypes.alarm;
  @property({type: Number}) alertHigh = 22;
  @property({type: String}) alertHighType: AlertTypes = AlertTypes.caution;
  @property({type: Boolean}) showSog = false;
  @property({type: Boolean}) showStw = false;
  @property({type: Boolean}) showSpeedAsNumber = false;

  private rotateStw = 0;

  private rotate = 0;
  private rotationAngle = 9;

  private minSpeed = -5;
  private lowIntegrity = false;

  private viewBox = "130 80 712 712";

  override render() {
    this.setViewBox();
    this.setMaxSpeed();
    this.setRotate();
    this.setStwRotate();
    
    return html`
      <div class="container">
        ${this.getSpeedometer()}
      </div>
    `;
  }

  setViewBox() {
    if (this.showSog && this.showStw) {
      this.viewBox = "130 80 712 712";
    }
    else {
      this.viewBox = "130 80 712 612";
    } 
  }

  static override styles = [
    speedometerStyles
  ];

  getSogSpeed(): number {
    if (this.sogSpeed <= this.maxSpeed && this.sogSpeed >= this.minSpeed) {
      return this.sogSpeed;
    }
    else if (this.sogSpeed > this.maxSpeed) {
      return this.maxSpeed;
    }
    else if (this.sogSpeed < this.minSpeed) {
      return this.minSpeed;
    }
    else {
      return this.minSpeed;
    }
  }

  getStwSpeed(): number {
    if (this.stwSpeed <= this.maxSpeed && this.stwSpeed >= this.minSpeed) {
      return this.stwSpeed;
    }
    else if (this.stwSpeed > this.maxSpeed) {
      return this.maxSpeed;
    }
    else if (this.stwSpeed < this.minSpeed) {
      return this.minSpeed;
    }
    else {
      return this.minSpeed;
    }
  }

  private getAngle(v: number): number {
    return (v / this.maxSpeed) * (180 + 45) - 90;
  }

  private setMaxSpeed(): void {
    if (this.maxSpeed <= 25) {
      this.maxSpeed = 25;
      this.minSpeed = -5;
      this.rotationAngle = 9;
    }
    else if (this.maxSpeed > 25) {
      this.maxSpeed = 50;
      this.minSpeed = -10;
      this.rotationAngle = 4.5;
    }
  }

  setRotate(): void {
    if (this.sogSpeed > this.maxSpeed) {
      this.rotate = this.maxSpeed * this.rotationAngle;
      this.setLowIntegrity(true);
    }
    else if (this.sogSpeed < this.minSpeed) {
      this.rotate = this.minSpeed * this.rotationAngle;
      this.setLowIntegrity(true);
    }
    else {
      this.rotate = isNaN(this.sogSpeed) ? 0 : this.sogSpeed * this.rotationAngle;
      this.setLowIntegrity(false);
    }
  }

  setStwRotate(): void {
    if (this.stwSpeed > this.maxSpeed) {
      this.rotateStw = this.maxSpeed * this.rotationAngle;
      this.setLowIntegrity(true);
    }
    else if (this.stwSpeed < this.minSpeed) {
      this.rotateStw = this.minSpeed * this.rotationAngle;
      this.setLowIntegrity(true);
    }
    else {
      this.rotateStw = isNaN(this.stwSpeed) ? 0 : this.stwSpeed * this.rotationAngle;
      this.setLowIntegrity(false);
    }
  }

  setLowIntegrity(state: boolean): void {
    this.lowIntegrity = state;
  }

  getLowIntegrity(): boolean {
    return this.lowIntegrity;
  }

  private renderPrimaryBarArea(barAreas: WatchBarArea[]): SVGTemplateResult[] | typeof nothing {
    if (barAreas.length === 0) {
      return nothing;
    }
    return barAreas.map((bar, index) => {
      const startAngle = Math.min(bar.startAngle, bar.endAngle);
      const endAngle = Math.max(bar.startAngle, bar.endAngle);
      const arc = roundedArch({
        r: RING3_RADIUS,
        R: RING2_RADIUS,
        startAngle: startAngle,
        endAngle: endAngle,
        roundInsideCut: false,
        roundOutsideCut: false,
      });
      // The mask is a sector to cut out the stroke on the start and end of the bar
      const mask = svg`
        <mask id="barMaskSOG-${index}">
          <rect x="-300" y="-300" width="600" height="600" fill="black" />
          <path d=${roundedArch({
            r: 1,
            R: 300,
            startAngle: startAngle,
            endAngle: endAngle,
            roundInsideCut: false,
            roundOutsideCut: false,
          })} 
          fill="${bar.fillColor}" />
        </mask>`;
      return svg`
        ${mask}
        <g mask="url(#cutMask)">
          <path 
            d=${arc} 
            fill=${bar.fillColor} 
            stroke=${bar.fillColor} 
            stroke-width="1" 
            vector-effect="non-scaling-stroke" 
            mask="url(#barMaskSOG-${index})" 
          />
        </g>
      `;
    });
  }

  private renderSecondaryBarArea(barAreas: WatchBarArea[]): SVGTemplateResult[] | typeof nothing {
    if (barAreas.length === 0) {
      return nothing;
    }
    return barAreas.map((bar, index) => {
      const startAngle = Math.min(bar.startAngle, bar.endAngle);
      const endAngle = Math.max(bar.startAngle, bar.endAngle);
      const arc = roundedArch({
        r: 154,
        R: 179,
        startAngle: startAngle,
        endAngle: endAngle,
        roundInsideCut: false,
        roundOutsideCut: false,
      });
      // The mask is a sector to cut out the stroke on the start and end of the bar
      const mask = svg`
        <mask id="barMaskSTW-${index}">
          <rect x="-300" y="-300" width="600" height="600" fill="black" />
          <path d=${roundedArch({
            r: 1,
            R: 300,
            startAngle: startAngle,
            endAngle: endAngle,
            roundInsideCut: false,
            roundOutsideCut: false,
          })} 
          fill="${Colors.instrumentFramePrimary}" />
        </mask>`;
      return svg`
        ${mask}
        <g mask="url(#cutMask)">
          <path 
            d=${arc} 
            fill=${bar.fillColor} 
            stroke=${bar.fillColor} 
            stroke-width="1" 
            vector-effect="non-scaling-stroke" 
            mask="url(#barMaskSTW-${index})" 
          />
        </g>
      `;
    });
  }

  private getSpeedometer() {
    return svg`
      <svg width="712" height="712" viewBox=${this.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
        
        ${this.getWatchFace()}
        ${this.getTickmarks()}
        ${this.getLabels()}
        
        ${this.getSpeedValue()}
        
        ${this.getSecondaryContainer()}
        ${this.getPrimaryContainer()}

        ${this.getAlerts()}

        ${this.getPrimaryNeedle()}

      </svg>
    `;
  }

  private getWatchFace() {
    return svg`
      <path d="M477.284 126.438C644.385 126.438 779.847 261.899 779.847 429C779.847 507.92 749.633 579.784 700.139 633.652C695.328 638.888 687.153 638.868 682.125 633.84L591.085 542.8C586.057 537.772 586.104 529.653 590.679 524.209C591.702 522.993 592.704 521.76 593.688 520.511C593.881 520.266 594.071 520.019 594.263 519.773C594.41 519.583 594.558 519.394 594.704 519.204C594.886 518.967 595.066 518.73 595.247 518.493C595.418 518.267 595.589 518.041 595.759 517.814C595.911 517.612 596.061 517.409 596.212 517.206C596.39 516.965 596.569 516.725 596.746 516.483C596.915 516.253 597.083 516.023 597.25 515.792C597.401 515.584 597.551 515.376 597.7 515.168C597.883 514.912 598.066 514.657 598.247 514.401C598.437 514.132 598.626 513.863 598.814 513.593C598.921 513.439 599.028 513.286 599.135 513.132C599.318 512.867 599.5 512.6 599.682 512.334C600.193 511.584 600.699 510.83 601.197 510.071C601.772 509.194 602.338 508.311 602.894 507.421C602.992 507.265 603.088 507.109 603.185 506.953C603.384 506.632 603.582 506.31 603.779 505.988C603.901 505.788 604.023 505.588 604.144 505.387C604.291 505.144 604.437 504.899 604.582 504.655C604.762 504.353 604.941 504.051 605.118 503.748C605.195 503.618 605.27 503.487 605.346 503.357C605.547 503.011 605.748 502.665 605.946 502.318C606.048 502.14 606.148 501.963 606.248 501.785C606.398 501.52 606.549 501.255 606.698 500.988C606.837 500.737 606.974 500.485 607.113 500.234C607.932 498.743 608.728 497.237 609.497 495.715C609.614 495.484 609.731 495.253 609.847 495.021C609.952 494.81 610.056 494.6 610.16 494.389C610.321 494.063 610.48 493.737 610.638 493.41C610.726 493.227 610.814 493.044 610.902 492.861C611.053 492.546 611.203 492.23 611.351 491.913C611.463 491.677 611.573 491.44 611.683 491.203C611.801 490.949 611.917 490.694 612.033 490.439C612.152 490.18 612.27 489.921 612.387 489.661C612.496 489.418 612.605 489.175 612.712 488.932C613.332 487.534 613.93 486.126 614.507 484.706C614.689 484.259 614.869 483.812 615.046 483.364C615.094 483.244 615.139 483.124 615.186 483.004C615.344 482.601 615.502 482.198 615.656 481.793C615.74 481.573 615.821 481.352 615.904 481.132C616.024 480.814 616.144 480.497 616.261 480.178C616.331 479.987 616.401 479.797 616.47 479.606C616.598 479.254 616.725 478.901 616.851 478.548C616.932 478.318 617.012 478.088 617.093 477.858C617.201 477.549 617.307 477.239 617.413 476.929C617.485 476.719 617.558 476.509 617.629 476.299C617.759 475.91 617.889 475.521 618.017 475.131C618.07 474.969 618.123 474.808 618.175 474.646C618.271 474.35 618.364 474.053 618.458 473.756C618.823 472.605 619.174 471.449 619.511 470.286C619.569 470.087 619.626 469.889 619.683 469.69C619.762 469.413 619.839 469.135 619.917 468.857C619.987 468.604 620.058 468.351 620.127 468.098C620.208 467.804 620.286 467.51 620.365 467.215C620.443 466.922 620.52 466.629 620.596 466.336C620.674 466.036 620.752 465.736 620.828 465.436C620.888 465.199 620.947 464.961 621.006 464.724C621.083 464.414 621.159 464.104 621.234 463.793C621.291 463.557 621.346 463.321 621.402 463.084C621.473 462.783 621.544 462.481 621.613 462.179C621.677 461.898 621.74 461.617 621.803 461.335C622.002 460.441 622.195 459.545 622.378 458.645C622.594 457.583 622.797 456.517 622.989 455.448C623.043 455.148 623.096 454.849 623.148 454.549C623.199 454.257 623.25 453.966 623.299 453.673C623.349 453.374 623.398 453.074 623.447 452.774C623.487 452.525 623.526 452.275 623.565 452.025C623.618 451.684 623.671 451.343 623.722 451.002C623.76 450.743 623.796 450.484 623.833 450.225C623.873 449.951 623.912 449.678 623.95 449.403C623.996 449.066 624.041 448.729 624.085 448.391C624.121 448.119 624.156 447.847 624.19 447.574C624.219 447.341 624.249 447.108 624.277 446.874C624.403 445.824 624.52 444.77 624.624 443.712C624.669 443.256 624.712 442.798 624.753 442.34C624.767 442.182 624.78 442.023 624.794 441.864C624.832 441.42 624.868 440.976 624.902 440.531C624.915 440.366 624.926 440.2 624.938 440.035C624.97 439.6 625.003 439.164 625.031 438.729C625.043 438.544 625.053 438.36 625.064 438.175C625.093 437.71 625.12 437.243 625.144 436.777C625.151 436.644 625.158 436.51 625.165 436.377C625.186 435.932 625.206 435.486 625.224 435.04C625.232 434.859 625.238 434.678 625.245 434.498C625.261 434.042 625.275 433.587 625.287 433.13C625.291 432.985 625.298 432.839 625.301 432.693C625.331 431.466 625.347 430.235 625.347 429C625.347 347.227 559.057 280.938 477.284 280.938C395.512 280.938 329.222 347.227 329.222 429C329.222 430.235 329.237 431.466 329.268 432.693C329.271 432.839 329.276 432.985 329.28 433.13C329.293 433.587 329.306 434.042 329.323 434.498C329.329 434.678 329.337 434.859 329.345 435.04C329.362 435.486 329.382 435.932 329.404 436.377C329.411 436.51 329.416 436.644 329.423 436.777C329.447 437.243 329.475 437.71 329.503 438.175C329.515 438.36 329.524 438.544 329.536 438.729C329.565 439.164 329.597 439.6 329.629 440.035C329.641 440.2 329.652 440.366 329.665 440.531C329.699 440.976 329.735 441.42 329.774 441.864C329.787 442.023 329.8 442.182 329.814 442.34C329.855 442.798 329.9 443.255 329.945 443.712C330.049 444.77 330.166 445.824 330.292 446.874C330.32 447.108 330.348 447.341 330.377 447.574C330.411 447.847 330.447 448.119 330.482 448.391C330.527 448.729 330.571 449.066 330.618 449.403C330.655 449.677 330.695 449.951 330.734 450.225C330.771 450.484 330.809 450.743 330.847 451.002C330.898 451.343 330.949 451.684 331.003 452.025C331.042 452.275 331.082 452.525 331.122 452.774C331.17 453.074 331.218 453.374 331.268 453.673C331.317 453.966 331.368 454.257 331.419 454.549C331.471 454.849 331.524 455.148 331.578 455.448C331.771 456.517 331.975 457.583 332.191 458.645C332.374 459.544 332.565 460.441 332.764 461.335C332.827 461.615 332.889 461.894 332.953 462.173C333.028 462.502 333.105 462.83 333.183 463.158C333.229 463.354 333.275 463.55 333.322 463.746C333.402 464.077 333.484 464.408 333.566 464.738C333.624 464.971 333.682 465.203 333.74 465.436C333.817 465.736 333.894 466.036 333.971 466.336C334.048 466.629 334.125 466.922 334.203 467.215C334.281 467.51 334.36 467.804 334.44 468.098C334.509 468.351 334.58 468.604 334.65 468.857C334.728 469.135 334.806 469.413 334.885 469.69C334.941 469.889 335 470.087 335.058 470.286C335.394 471.448 335.744 472.605 336.109 473.756C336.203 474.053 336.296 474.35 336.392 474.646C336.444 474.808 336.498 474.969 336.551 475.131C336.678 475.521 336.808 475.91 336.939 476.299C337.01 476.509 337.082 476.719 337.154 476.929C337.26 477.239 337.367 477.549 337.475 477.858C337.555 478.088 337.635 478.318 337.717 478.548C337.842 478.901 337.969 479.254 338.097 479.606C338.166 479.797 338.236 479.987 338.306 480.178C338.424 480.497 338.543 480.814 338.663 481.132C338.746 481.353 338.829 481.573 338.913 481.793C339.067 482.198 339.223 482.601 339.381 483.004C339.428 483.124 339.474 483.244 339.521 483.364C339.698 483.812 339.879 484.259 340.06 484.706C340.637 486.126 341.236 487.534 341.855 488.932C341.963 489.175 342.071 489.418 342.18 489.661C342.297 489.921 342.416 490.18 342.534 490.439C342.65 490.694 342.767 490.949 342.884 491.203C342.994 491.44 343.105 491.677 343.216 491.913C343.365 492.23 343.515 492.546 343.665 492.861C343.753 493.044 343.841 493.227 343.93 493.41C344.088 493.737 344.247 494.063 344.407 494.389C344.475 494.527 344.543 494.666 344.612 494.804L344.808 495.197C344.895 495.37 344.983 495.542 345.071 495.715C345.84 497.237 346.635 498.743 347.455 500.234C347.593 500.485 347.73 500.737 347.87 500.988C348.018 501.255 348.169 501.52 348.319 501.785C348.42 501.963 348.52 502.14 348.621 502.318C348.819 502.665 349.02 503.011 349.221 503.357C349.297 503.487 349.373 503.618 349.449 503.748C349.627 504.051 349.805 504.353 349.985 504.655C350.131 504.9 350.278 505.143 350.425 505.387C350.546 505.587 350.666 505.788 350.788 505.988C350.985 506.31 351.183 506.632 351.382 506.953C351.479 507.109 351.576 507.265 351.673 507.421C352.23 508.311 352.796 509.194 353.37 510.071C353.868 510.83 354.374 511.584 354.886 512.334C355.067 512.6 355.249 512.867 355.432 513.132C355.539 513.286 355.647 513.439 355.755 513.593C355.943 513.862 356.131 514.132 356.32 514.401C356.502 514.657 356.684 514.912 356.867 515.168C357.017 515.376 357.166 515.584 357.317 515.792C357.484 516.023 357.653 516.253 357.821 516.483C357.999 516.725 358.177 516.965 358.356 517.206C358.506 517.409 358.657 517.612 358.808 517.814C358.979 518.041 359.149 518.267 359.321 518.493C359.501 518.73 359.681 518.967 359.863 519.204C360.009 519.394 360.157 519.583 360.305 519.773C360.496 520.019 360.687 520.266 360.88 520.511C361.863 521.76 362.867 522.993 363.89 524.209C368.465 529.653 368.512 537.772 363.484 542.8L272.444 633.84C267.416 638.868 259.241 638.888 254.43 633.652C204.936 579.784 174.722 507.92 174.722 429C174.722 261.899 310.184 126.438 477.284 126.438Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentFramePrimary}" stroke-width="2.08333"/>
      <path d="M477.284 165.062C623.053 165.062 741.222 283.231 741.222 429C741.222 501.884 711.68 567.869 663.917 615.632L609.292 561.008C643.076 527.224 663.972 480.552 663.972 429C663.972 325.895 580.389 242.312 477.284 242.312C374.18 242.312 290.597 325.895 290.597 429C290.597 480.552 311.493 527.224 345.276 561.008L290.652 615.632C242.889 567.869 213.347 501.884 213.347 429C213.347 283.231 331.516 165.062 477.284 165.062Z" fill="${Colors.containerSection}" stroke="${Colors.containerSection}" stroke-width="2.08333"/>
      <path d="M477.284 126.438C644.385 126.438 779.847 261.899 779.847 429C779.847 507.92 749.632 579.783 700.138 633.651C695.327 638.887 687.153 638.869 682.125 633.841L591.084 542.8C586.056 537.772 586.105 529.653 590.68 524.21C612.315 498.469 625.347 465.257 625.347 429C625.347 347.227 559.057 280.938 477.284 280.938C395.512 280.938 329.222 347.227 329.222 429C329.222 465.257 342.254 498.469 363.889 524.21C368.464 529.653 368.513 537.772 363.485 542.8L272.444 633.841C267.416 638.869 259.242 638.887 254.431 633.651C204.937 579.783 174.722 507.92 174.722 429C174.722 261.899 310.184 126.438 477.284 126.438Z" stroke="${Colors.instrumentTickmarkTertiary}" stroke-width="2.08333"/>

      <mask id="mask0_6621_15748" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="65" y="17" width="825" height="824">
        <path d="M477.284 126.438C644.385 126.438 779.847 261.899 779.847 429C779.847 507.92 749.633 579.784 700.139 633.652C695.328 638.888 687.153 638.868 682.125 633.84L663.917 615.632C711.68 567.869 741.222 501.884 741.222 429C741.222 283.231 623.053 165.062 477.284 165.062C331.516 165.062 213.347 283.231 213.347 429C213.347 501.884 242.889 567.869 290.652 615.632L272.444 633.84C267.416 638.868 259.241 638.888 254.43 633.652C204.936 579.784 174.722 507.92 174.722 429C174.722 261.899 310.184 126.438 477.284 126.438Z" fill="white" stroke="black" stroke-width="2.08333"/>
      </mask>

      <g mask="url(#mask0_6621_15748)">
        <mask id="mask2_6621_15748" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="65" y="17" width="825" height="824">
          <path d="M477.284 120C647.94 120 786.284 258.344 786.284 429C786.284 599.656 647.94 738 477.284 738C306.628 737.999 168.284 599.656 168.284 429C168.284 258.344 306.628 120 477.284 120ZM477.284 158.625C327.96 158.625 206.909 279.676 206.909 429C206.909 578.324 327.96 699.374 477.284 699.375C626.608 699.375 747.659 578.324 747.659 429C747.659 279.676 626.608 158.625 477.284 158.625Z" fill="black"/>
        </mask>
        <g mask="url(#mask2_6621_15748)">
          <path d="M477.284 107.125V429M477.284 429L249.684 201.4M477.284 429H155.409M477.284 429L249.684 656.6M477.284 429V750.875M477.284 429L704.885 656.6M477.284 429H799.159M477.284 429L704.884 201.4" stroke="${Colors.instrumentTickmarkTertiary}" stroke-width="2.08333"/>
        </g>
        <mask id="mask3_6621_15748" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="65" y="17" width="825" height="824">
          <path d="M477.284 120C647.94 120 786.284 258.344 786.284 429C786.284 599.656 647.94 738 477.284 738C306.628 737.999 168.284 599.656 168.284 429C168.284 258.344 306.628 120 477.284 120ZM477.284 165.062C331.516 165.062 213.347 283.231 213.347 429C213.347 574.768 331.516 692.937 477.284 692.937C623.053 692.937 741.222 574.768 741.222 429C741.221 283.231 623.053 165.062 477.284 165.062Z" fill="black"/>
        </mask>
        <g mask="url(#mask3_6621_15748)">
          <path d="M155.409 429H477.284" stroke="${Colors.instrumentTickmarkTertiary}" stroke-width="2.08333"/>
        </g>
      </g>
    
      `;
  }

  private getAlerts() {
    if (this.useAlerts) {
      return svg`
        ${this.getAdviceContainerLow()}
        ${this.getAdviceContainerHigh()}
      `;
    }
    else {
      return nothing;
    }
  }

  private getAlertLowMask() {
    if (this.alertLowType != AlertTypes.none && this.useAlerts && this.alertLow > -this.maxSpeed/5) {
      return svg`
        <mask id="mask9_6621_15748" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="65" y="17" width="825" height="824">
          <path d="M477.284 126.438C644.385 126.438 779.847 261.899 779.847 429C779.847 507.92 749.632 579.783 700.138 633.651C695.327 638.887 687.153 638.869 682.125 633.841L618.397 570.112C613.369 565.084 613.406 556.96 618.078 551.599C646.661 518.801 663.972 475.922 663.972 429C663.972 325.895 580.389 242.312 477.284 242.312C374.18 242.312 290.597 325.895 290.597 429C290.597 475.922 307.908 518.801 336.491 551.599C341.163 556.96 341.2 565.084 336.172 570.112L272.444 633.841C267.416 638.869 259.242 638.887 254.431 633.651C204.937 579.783 174.722 507.92 174.722 429C174.722 261.899 310.184 126.438 477.284 126.438Z" fill="${Colors.instrumentFramePrimary}" stroke="black" stroke-width="2.08333"/>
        </mask>
        <g mask="url(#mask9_6621_15748)">
          <mask id="mask10_6621_15748" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-106" y="-154" width="1166" height="1166">
            <circle cx="477.285" cy="429" r="263.937" transform="rotate(135 477.285 429)" fill="${Colors.instrumentFramePrimary}" stroke="black" stroke-width="2.08333"/>
          </mask>
          ${this.alertLowType != AlertTypes.caution ? svg`
              <g transform="rotate(${-180 + this.alertLow * this.rotationAngle} 477.355 429)">
                <path d="M477.284 429 L742.1 429" stroke="${Colors.instrumentTickMarkSecondary}" stroke-width="2.08333"/>
              </g>
              <g transform="rotate(${-180 + this.minSpeed * this.rotationAngle} 477.355 429)">
                <path d="M477.284 429 L742.1 429" stroke="${Colors.instrumentTickMarkSecondary}" stroke-width="2.08333"/>
              </g>
            `
            : svg`
              <g transform="rotate(${-180 + this.alertLow * this.rotationAngle} 477.355 429)">
                <path d="M477.284 429 L742.1 429" stroke="${Colors.instrumentFramePrimary}" stroke-width="2.08333"/>
                <path d="M477.284 429 L742.1 429" stroke="${Colors.instrumentTickMarkSecondary}" stroke-width="2.08333" stroke-dasharray="8 4"/>
              </g>
              <g transform="rotate(${-180 + this.minSpeed * this.rotationAngle} 477.355 429)">
                <path d="M477.284 429 L742.1 429" stroke="${Colors.instrumentFramePrimary}" stroke-width="2.08333"/>
                <path d="M477.284 429 L742.1 429" stroke="${Colors.instrumentTickMarkSecondary}" stroke-width="2.08333" stroke-dasharray="8 4"/>
              </g>
            `
          }
            <!--
          ${
            this.alertLowType == AlertTypes.caution ? svg`
              <g mask="url(#mask10_6621_15748)">
                <path d="M65.2845 429C65.2845 483.105 75.9412 536.679 96.6461 586.666C117.351 636.652 147.699 682.07 185.956 720.328L477.284 429L65.2845 429Z" fill="black" fill-opacity="0.05"/>
                <path d="M65.2845 429C65.2845 483.105 75.9412 536.679 96.6461 586.666C117.351 636.652 147.699 682.07 185.956 720.328L477.284 429L65.2845 429Z" stroke="${Colors.instrumentFramePrimary}" stroke-width="2.08333"/>
                <path d="M65.2845 429C65.2845 483.105 75.9412 536.679 96.6461 586.666C117.351 636.652 147.699 682.07 185.956 720.328L477.284 429L65.2845 429Z" stroke="${Colors.instrumentTickMarkSecondary}" stroke-width="2.08333" stroke-dasharray="8.33 8.33"/>
              </g>
            ` : nothing
          }
          -->
          
          <path d="${this.cutTickmarks(this.getAngle(this.minSpeed + 0.25), this.getAngle(this.alertLow - 0.15))}" fill="${Colors.instrumentFramePrimary}"/>
        </g>
      `;
    }
    else {
      return nothing;
    }
  }

  private getAlertHighMask() {
    if (this.alertHighType != AlertTypes.none && this.useAlerts && this.alertHigh < this.maxSpeed) {
      return svg`
        <mask id="mask9_6621_15748" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="65" y="17" width="825" height="824">
          <path d="M477.284 126.438C644.385 126.438 779.847 261.899 779.847 429C779.847 507.92 749.632 579.783 700.138 633.651C695.327 638.887 687.153 638.869 682.125 633.841L618.397 570.112C613.369 565.084 613.406 556.96 618.078 551.599C646.661 518.801 663.972 475.922 663.972 429C663.972 325.895 580.389 242.312 477.284 242.312C374.18 242.312 290.597 325.895 290.597 429C290.597 475.922 307.908 518.801 336.491 551.599C341.163 556.96 341.2 565.084 336.172 570.112L272.444 633.841C267.416 638.869 259.242 638.887 254.431 633.651C204.937 579.783 174.722 507.92 174.722 429C174.722 261.899 310.184 126.438 477.284 126.438Z" fill="${Colors.instrumentFramePrimary}" stroke="black" stroke-width="2.08333"/>
        </mask>
        <g mask="url(#mask9_6621_15748)">
          <mask id="mask10_6621_15748" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-106" y="-154" width="1166" height="1166">
            <circle cx="477.285" cy="429" r="263.937" transform="rotate(135 477.285 429)" fill="${Colors.instrumentFramePrimary}" stroke="black" stroke-width="2.08333"/>
          </mask>
  
          <!--Mask of high advice-->
          <mask id="mask14_6621_15748" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="65" y="17" width="825" height="824">
            ${(this.stwSpeed >= this.alertHigh || this.sogSpeed >= this.alertHigh) ? 
              this.renderPathMaskOfHighAdvice(
                [
                  {
                    startAngle: this.getAngle(this.alertHigh),
                    endAngle: this.getAngle(this.maxSpeed),
                    fillColor: this.getHighAdviceColor(),
                  }
                ]
              )
            : nothing}
          </mask>

          <!--high advice and tickmarks-->
          <g mask="url(#mask14_6621_15748)">
            ${this.alertHighType != AlertTypes.caution ? 
              svg`
                <rect width="824" height="824" transform="translate(65.2845 17)" fill="url(#pattern0_6621_15748)"/>
              ` : 
              svg`
                <rect width="824" height="824" transform="translate(65.2845 17)" opacity="0.25" fill="${Colors.alertCautionColor}"/>
              `
            }
          </g>

          <g>
            ${this.alertHighType != AlertTypes.caution ? 
              svg`
                <g transform="rotate(${-180 + this.alertHigh * this.rotationAngle} 477.355 429)">
                  <path d="M477.284 429 L742.1 429" stroke="${Colors.instrumentTickMarkSecondary}" stroke-width="2.08333"/>
                </g>
                <g transform="rotate(${-180 + this.maxSpeed * this.rotationAngle} 477.355 429)">
                  <path d="M477.284 429 L742.1 429" stroke="${Colors.instrumentTickMarkSecondary}" stroke-width="2.08333"/>
                </g>
              ` : 
              svg`
                <g transform="rotate(${-180 + this.alertHigh * this.rotationAngle} 477.355 429)">
                  <path d="M477.284 429 L742.1 429" stroke="${Colors.instrumentFramePrimary}" stroke-width="2.08333"/>
                  <path d="M477.284 429 L742.1 429" stroke="${Colors.instrumentTickMarkSecondary}" stroke-width="2.08333" stroke-dasharray="8 4"/>
                </g>
                <g transform="rotate(${-180 + this.maxSpeed * this.rotationAngle} 477.355 429)">
                  <path d="M477.284 429 L742.1 429" stroke="${Colors.instrumentFramePrimary}" stroke-width="2.08333"/>
                  <path d="M477.284 429 L742.1 429" stroke="${Colors.instrumentTickMarkSecondary}" stroke-width="2.08333" stroke-dasharray="8 4"/>
                </g>
              `
            }
          </g>
        </g>

        <path d="${this.cutTickmarks(this.getAngle(this.alertHigh + 0.15), this.getAngle(this.maxSpeed - 0.25))}" fill="${Colors.instrumentFramePrimary}"/>
      `;
    }
    else {
      return nothing;
    }
  }

  private getSpeedValue() {
    if (this.showSpeedAsNumber) {
      if (this.showSog && this.showStw) {
        if (this.mainSpeedType == SpeedType.SOG) {
          return svg`
            <foreignObject x="300" y="550" width="350" height="200">
              <div class="ob-main-value" xmlns="http://www.w3.org/1999/xhtml" style="transform: scale(2.25); transform-origin: top;">
                ${this.getSpeedField({size: InstrumentFieldSize.enhanced, neutralColor: false, horizontal: true, value: this.sogSpeed, fractionDigits: this.fractionDigits, unit: 'kn', tag: 'SOG-R'})}
              </div>
            </foreignObject>

            <path d="M382.094 653.393H587.189" stroke="${Colors.colorBorderDivider}" stroke-width="2.08333"/>

            <foreignObject x="380" y="660" width="200" height="100">
              <div class="ob-secondary-value" xmlns="http://www.w3.org/1999/xhtml" style="transform: scale(1.5); transform-origin: top;">
                ${this.getSpeedField({size: InstrumentFieldSize.enhanced, neutralColor: true, horizontal: true, value: this.stwSpeed, fractionDigits: this.fractionDigits, unit: 'kn', tag: 'STW-R'})}            
              </div>
            </foreignObject>
          `;
        }
        else {
          return svg`
            <foreignObject x="300" y="550" width="350" height="200">
              <div class="ob-main-value" xmlns="http://www.w3.org/1999/xhtml" style="transform: scale(2.25); transform-origin: top;">
                ${this.getSpeedField({size: InstrumentFieldSize.enhanced, neutralColor: false, horizontal: true, value: this.stwSpeed, fractionDigits: this.fractionDigits, unit: 'kn', tag: 'STW-R'})}
              </div>
            </foreignObject>

            <path d="M382.094 653.393H587.189" stroke="${Colors.colorBorderDivider}" stroke-width="2.08333"/>

            <foreignObject x="380" y="660" width="200" height="100">
              <div class="ob-secondary-value" xmlns="http://www.w3.org/1999/xhtml" style="transform: scale(1.5); transform-origin: top;">
                ${this.getSpeedField({size: InstrumentFieldSize.enhanced, neutralColor: true, horizontal: true, value: this.sogSpeed, fractionDigits: this.fractionDigits, unit: 'kn', tag: 'SOG-R'})}            
              </div>
            </foreignObject>
          `;
        }
      }
      else if (this.showSog && !this.showStw) {
        return svg`
          <foreignObject x="300" y="580" width="350" height="200">
            <div class="ob-main-value" xmlns="http://www.w3.org/1999/xhtml" style="transform: scale(2.25); transform-origin: top;">
              ${this.getSpeedField({size: InstrumentFieldSize.enhanced, neutralColor: false, horizontal: true, value: this.sogSpeed, fractionDigits: this.fractionDigits, unit: 'kn', tag: 'SOG-R'})}
            </div>
          </foreignObject>
        `
      }
      else if (this.showStw && !this.showSog) {
        return svg`
          <foreignObject x="300" y="580" width="350" height="200">
            <div class="ob-main-value" xmlns="http://www.w3.org/1999/xhtml" style="transform: scale(2.25); transform-origin: top;">
              ${this.getSpeedField({size: InstrumentFieldSize.enhanced, neutralColor: false, horizontal: true, value: this.stwSpeed, fractionDigits: this.fractionDigits, unit: 'kn', tag: 'STW-R'})}            
            </div>
          </foreignObject>
        `
      }
      else {
        return nothing;
      }
    }
    else {
      return nothing;
    }
  }

  private getPrimaryContainer() {
    if (this.showSog && this.mainSpeedType == SpeedType.SOG && this.sogSpeed != undefined) {
      return svg`
        <g transform="translate(477.355 429)">
          ${this.renderPrimaryBarArea([
            {
              startAngle: this.getAngle(0),
              endAngle: this.getAngle(this.getSogSpeed()),
              fillColor: Colors.instrumentEnhancedTertiary,
            }])
          }
        </g>

        <g transform="rotate(${-100 + this.rotate} 477.355 429)">
          ${this.getMainNeedle(SpeedType.SOG)}
        </g>
      `
    }
    else if (this.showStw && this.mainSpeedType == SpeedType.STW && this.stwSpeed != undefined) {
      return svg`
        <g transform="translate(477.355 429)">
          ${this.renderPrimaryBarArea([
            {
              startAngle: this.getAngle(0),
              endAngle: this.getAngle(this.getStwSpeed()),
              fillColor: Colors.instrumentEnhancedTertiary,
            }])
          }
        </g>

        <g transform="rotate(${-100 + this.rotateStw} 477.355 429)">
          ${this.getMainNeedle(SpeedType.STW)}
        </g>
      `
    }
    else {
      return nothing;
    }
  }

  private getPrimaryNeedle() {
    if (this.showSog && this.mainSpeedType == SpeedType.SOG && this.sogSpeed != undefined) {
      return svg`
        <g transform="rotate(${-100 + this.rotate} 477.355 429)">
          ${this.getMainNeedle(SpeedType.SOG)}
        </g>
      `
    }
    else if (this.showStw && this.mainSpeedType == SpeedType.STW && this.stwSpeed != undefined) {
      return svg`
        <g transform="rotate(${-100 + this.rotateStw} 477.355 429)">
          ${this.getMainNeedle(SpeedType.STW)}
        </g>
      `
    }
    else {
      return nothing;
    }
  }

  private getSecondaryContainer() {
    if ((this.showStw && (this.mainSpeedType == SpeedType.SOG && this.stwSpeed != undefined) ||  this.showSog && (this.mainSpeedType == SpeedType.STW && this.sogSpeed != undefined))) {
      return svg`
        <g transform="translate(477.355 429)">
          ${this.renderSecondaryBarArea([
            {
              startAngle: this.getAngle(0),
              endAngle: this.getAngle(this.mainSpeedType == SpeedType.SOG ? this.getStwSpeed() : this.getSogSpeed()),
              fillColor: Colors.instrumentRegularTertiary,
            },
          ])}
        </g>

        ${this.mainSpeedType == SpeedType.SOG ? this.getSecondaryNeedle(SpeedType.STW) : this.getSecondaryNeedle(SpeedType.SOG)}
      `;
    }
    else {
      return nothing;
    }
  }

  private getSpeedField(instrumentField: InstrumentField) {
    return html`
      <obc-instrument-field
        class="speed-gauge-value"
        .size=${instrumentField.size}
        .neutralColor=${instrumentField.neutralColor}
        .value=${instrumentField.value}
        .horizontal=${instrumentField.horizontal}
        .unit="${instrumentField.unit}"
        .tag="${instrumentField.tag}"
        .fractionDigits=${instrumentField.fractionDigits}
        .maxDigits=${2}
      ></obc-instrument-field>
    `;
  }

  private getAdviceContainerHigh() {
    if (this.useAlerts && this.alertHighType != AlertTypes.none && this.alertHigh < this.maxSpeed) {
      return svg`
        ${
          this.getAlertHighMask()
        }
        <!--High advice mask-->
        <mask id="mask13_6621_15748" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="65" y="17" width="825" height="824">
          <path d="M477.284 126.438C644.385 126.438 779.847 261.899 779.847 429C779.847 507.92 749.632 579.783 700.138 633.651C695.327 638.887 687.153 638.869 682.125 633.841L618.397 570.112C613.369 565.084 613.406 556.96 618.078 551.599C646.661 518.801 663.972 475.922 663.972 429C663.972 325.895 580.389 242.312 477.284 242.312C374.18 242.312 290.597 325.895 290.597 429C290.597 475.922 307.908 518.801 336.491 551.599C341.163 556.96 341.2 565.084 336.172 570.112L272.444 633.841C267.416 638.869 259.242 638.887 254.431 633.651C204.937 579.783 174.722 507.92 174.722 429C174.722 261.899 310.184 126.438 477.284 126.438Z" fill="${Colors.instrumentFramePrimary}" stroke="black" stroke-width="2.08333"/>
        </mask>

        <g mask="url(#mask13_6621_15748)">
          <mask id="path-98-inside-4_6621_15748" fill="${Colors.instrumentFramePrimary}">
            <path d="M753.783 437.333C757.414 437.333 760.334 440.333 760.146 443.959C756.662 510.908 729.933 571.704 687.874 618.43C685.445 621.13 681.257 621.186 678.689 618.618C676.227 616.157 676.173 612.19 678.499 609.6C718.469 565.097 743.889 507.261 747.272 443.578C747.457 440.101 750.301 437.333 753.783 437.333Z"/>
          </mask>
        </g>
          
        <pattern id="pattern0_6621_15748" patternUnits="userSpaceOnUse" patternTransform="matrix(16.6667 0 0 33.3333 403.667 403.667)" preserveAspectRatio="none" viewBox="0 0 16 32" width="1" height="1">
          <use xlink:href="#pattern0_6621_15748_inner" transform="translate(-16 0)"/>
          <g id="pattern0_6621_15748_inner">
            <rect x="6" y="6" width="4" height="4" fill="${this.getHighAdviceColor()}"/>
          </g>
          <use xlink:href="#pattern0_6621_15748_inner" transform="translate(-8 16)"/>
          <use xlink:href="#pattern0_6621_15748_inner" transform="translate(8 16)"/>
        </pattern>

        <g transform="translate(477 429)">
          ${renderAdvice(
            {
              minAngle: this.getAngle(this.alertHigh),
              maxAngle: this.getAngle(this.maxSpeed),
              type: this.getAdviceType(this.alertHighType),
              state: this.getHighState(),
              hideMaxTickmark: true,
              hideMinTickmark: true
            }
          )}
        </g>
      `;
    }
    else {
      return nothing;
    }
  }

  private getAdviceContainerLow() {
    if (this.useAlerts && this.alertLowType != AlertTypes.none && this.alertLow > -this.maxSpeed/5) {
      return svg`
        ${
          this.getAlertLowMask()
        }
        <g transform="translate(477 429)">
          ${renderAdvice(
            {
              minAngle: this.getAngle(this.minSpeed),
              maxAngle: this.getAngle(this.alertLow),
              type: this.getAdviceType(this.alertLowType),
              state: this.getLowState(),
              hideMaxTickmark: true,
              hideMinTickmark: true
            }
          )}
        </g>
      `;
    }
    else {
      return nothing;
    }
  }

  private getMainNeedleFillColor(speedType: SpeedType) {
    if (speedType == SpeedType.SOG) {
      if (this.sogSpeed > this.maxSpeed || this.sogSpeed < this.minSpeed) {
        return Colors.alertCautionColor;
      }
      else {
        return Colors.instrumentFramePrimary;
      }
    }
    else {
      if (this.stwSpeed > this.maxSpeed || this.stwSpeed < this.minSpeed) {
        return Colors.alertCautionColor;
      }
      else {
        return Colors.instrumentEnhancedSecondary;
      }
    }
  }

  // add yellow color for needle for low integrity
  private getMainNeedle(speedType: SpeedType) {
    return svg`
      <path d="M481.952 402.523C496.575 405.102 506.34 419.047 503.761 433.669C501.183 448.292 487.238 458.056 472.615 455.478C457.992 452.9 448.228 438.955 450.807 424.332C453.385 409.709 467.33 399.945 481.952 402.523Z" fill="${Colors.instrumentEnhancedSecondary}" stroke="${Colors.instrumentEnhancedSecondary}" stroke-width="4.16667"/>
      <path d="M522.662 171.638C523.055 171.707 523.323 172.074 523.269 172.47L481.543 478.894C480.557 486.133 473.751 491.101 466.555 489.832C459.36 488.564 454.662 481.567 456.212 474.427L521.806 172.212C521.891 171.822 522.269 171.568 522.662 171.638Z" fill="${this.getMainNeedleFillColor(speedType)}" stroke="${Colors.instrumentEnhancedSecondary}" stroke-width="5.20833"/>
      <path d="M519.261 171.659L453.667 473.875C451.804 482.46 457.452 490.872 466.103 492.397C474.754 493.923 482.938 487.95 484.124 479.245L525.849 172.821C526.092 171.04 524.884 169.385 523.114 169.073C521.343 168.761 519.642 169.902 519.261 171.659Z" stroke="${Colors.instrumentEnhancedTertiary}" stroke-width="2.08333"/>
    `;
  }

  private getSecondaryNeedleFillColor(speedType: SpeedType) {
    if (speedType == SpeedType.SOG) {
      if (this.sogSpeed > this.maxSpeed || this.sogSpeed < this.minSpeed) {
        return Colors.alertCautionColor;
      }
      else {
        return Colors.instrumentFrameSecondary;
      }
    }
    else {
      if (this.stwSpeed > this.maxSpeed || this.stwSpeed < this.minSpeed) {
        return Colors.alertCautionColor;
      }
      else {
        return Colors.instrumentRegularSecondary;
      }
    }
  }

  private getSecondaryNeedle(speedType: SpeedType) {
    if (speedType == SpeedType.STW) {
      return svg`
        <g transform="rotate(${-125 + this.rotateStw} 478.355 429)">
          <circle cx="478.355" cy="430.774" r="19.8088" fill="${Colors.instrumentRegularSecondary}"/>
          <path d="M578.738 283.422L450.751 451.759C447.116 456.541 448.185 463.386 453.105 466.831C458.026 470.277 464.824 468.94 468.074 463.889L582.485 286.046C583.15 285.012 582.88 283.637 581.873 282.932C580.866 282.227 579.482 282.443 578.738 283.422Z" fill="${this.getSecondaryNeedleFillColor(speedType)}" stroke="${Colors.instrumentTickmarkTertiary}" stroke-width="2.08333"/>
        </g>
      `;
    }
    else {
      return svg`
        <g transform="rotate(${-125 + this.rotate} 478.355 429)">
          <circle cx="478.355" cy="430.774" r="19.8088" fill="${Colors.instrumentRegularSecondary}"/>
          <path d="M578.738 283.422L450.751 451.759C447.116 456.541 448.185 463.386 453.105 466.831C458.026 470.277 464.824 468.94 468.074 463.889L582.485 286.046C583.15 285.012 582.88 283.637 581.873 282.932C580.866 282.227 579.482 282.443 578.738 283.422Z" fill="${this.getSecondaryNeedleFillColor(speedType)}" stroke="${Colors.instrumentTickmarkTertiary}" stroke-width="2.08333"/>
        </g>
      `;
    }
  }

  private getLabels() {
    if (this.maxSpeed == 25) {
      return this.getLabels25();
    }
    else {
      return this.getLabels50();
    }
  }

  private getLabels25() {
    return svg`
      <svg width="955" height="800" viewBox="0 0 875 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M431.436 108.167H429.511V95.4417C429.511 94.9584 429.511 94.5501 429.511 94.2167C429.527 93.8834 429.536 93.5751 429.536 93.2917C429.552 92.9917 429.569 92.6917 429.586 92.3917C429.336 92.6417 429.102 92.8584 428.886 93.0417C428.669 93.2084 428.402 93.4334 428.086 93.7167L425.986 95.3667L424.961 94.0417L429.786 90.3167H431.436V108.167ZM450.017 99.2167C450.017 100.667 449.901 101.967 449.667 103.117C449.451 104.25 449.109 105.208 448.642 105.992C448.176 106.775 447.567 107.375 446.817 107.792C446.067 108.208 445.167 108.417 444.117 108.417C442.817 108.417 441.726 108.058 440.842 107.342C439.976 106.608 439.326 105.558 438.892 104.192C438.476 102.808 438.267 101.15 438.267 99.2167C438.267 97.3167 438.459 95.6834 438.842 94.3167C439.226 92.9334 439.851 91.8751 440.717 91.1417C441.584 90.4084 442.717 90.0417 444.117 90.0417C445.467 90.0417 446.576 90.4084 447.442 91.1417C448.309 91.8751 448.951 92.9251 449.367 94.2917C449.801 95.6584 450.017 97.3001 450.017 99.2167ZM440.242 99.2167C440.242 100.9 440.367 102.3 440.617 103.417C440.884 104.517 441.301 105.35 441.867 105.917C442.434 106.467 443.184 106.742 444.117 106.742C445.051 106.742 445.801 106.467 446.367 105.917C446.934 105.367 447.351 104.533 447.617 103.417C447.884 102.3 448.017 100.9 448.017 99.2167C448.017 97.5667 447.884 96.1917 447.617 95.0917C447.367 93.9751 446.959 93.1334 446.392 92.5667C445.842 92.0001 445.084 91.7167 444.117 91.7167C443.167 91.7167 442.409 92.0084 441.842 92.5917C441.276 93.1584 440.867 94.0001 440.617 95.1167C440.367 96.2167 440.242 97.5834 440.242 99.2167Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
          <path d="M767.419 438H755.769V436.375L760.569 431.45C761.452 430.567 762.194 429.775 762.794 429.075C763.411 428.375 763.877 427.683 764.194 427C764.511 426.317 764.669 425.558 764.669 424.725C764.669 423.708 764.361 422.933 763.744 422.4C763.144 421.85 762.352 421.575 761.369 421.575C760.519 421.575 759.761 421.725 759.094 422.025C758.427 422.325 757.752 422.742 757.069 423.275L756.019 421.95C756.486 421.55 756.994 421.2 757.544 420.9C758.111 420.583 758.711 420.342 759.344 420.175C759.994 419.992 760.669 419.9 761.369 419.9C762.452 419.9 763.386 420.092 764.169 420.475C764.969 420.858 765.586 421.408 766.019 422.125C766.452 422.825 766.669 423.658 766.669 424.625C766.669 425.342 766.561 426.017 766.344 426.65C766.144 427.267 765.844 427.875 765.444 428.475C765.061 429.058 764.586 429.658 764.019 430.275C763.469 430.875 762.861 431.508 762.194 432.175L758.244 436.125V436.2H767.419V438ZM781.851 429.05C781.851 430.5 781.734 431.8 781.501 432.95C781.284 434.083 780.942 435.042 780.476 435.825C780.009 436.608 779.401 437.208 778.651 437.625C777.901 438.042 777.001 438.25 775.951 438.25C774.651 438.25 773.559 437.892 772.676 437.175C771.809 436.442 771.159 435.392 770.726 434.025C770.309 432.642 770.101 430.983 770.101 429.05C770.101 427.15 770.292 425.517 770.676 424.15C771.059 422.767 771.684 421.708 772.551 420.975C773.417 420.242 774.551 419.875 775.951 419.875C777.301 419.875 778.409 420.242 779.276 420.975C780.142 421.708 780.784 422.758 781.201 424.125C781.634 425.492 781.851 427.133 781.851 429.05ZM772.076 429.05C772.076 430.733 772.201 432.133 772.451 433.25C772.717 434.35 773.134 435.183 773.701 435.75C774.267 436.3 775.017 436.575 775.951 436.575C776.884 436.575 777.634 436.3 778.201 435.75C778.767 435.2 779.184 434.367 779.451 433.25C779.717 432.133 779.851 430.733 779.851 429.05C779.851 427.4 779.717 426.025 779.451 424.925C779.201 423.808 778.792 422.967 778.226 422.4C777.676 421.833 776.917 421.55 775.951 421.55C775.001 421.55 774.242 421.842 773.676 422.425C773.109 422.992 772.701 423.833 772.451 424.95C772.201 426.05 772.076 427.417 772.076 429.05Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
          <path d="M118.031 429.05C118.031 430.5 117.914 431.8 117.681 432.95C117.464 434.083 117.122 435.042 116.656 435.825C116.189 436.608 115.581 437.208 114.831 437.625C114.081 438.042 113.181 438.25 112.131 438.25C110.831 438.25 109.739 437.892 108.856 437.175C107.989 436.442 107.339 435.392 106.906 434.025C106.489 432.642 106.281 430.983 106.281 429.05C106.281 427.15 106.472 425.517 106.856 424.15C107.239 422.767 107.864 421.708 108.731 420.975C109.597 420.242 110.731 419.875 112.131 419.875C113.481 419.875 114.589 420.242 115.456 420.975C116.322 421.708 116.964 422.758 117.381 424.125C117.814 425.492 118.031 427.133 118.031 429.05ZM108.256 429.05C108.256 430.733 108.381 432.133 108.631 433.25C108.897 434.35 109.314 435.183 109.881 435.75C110.447 436.3 111.197 436.575 112.131 436.575C113.064 436.575 113.814 436.3 114.381 435.75C114.947 435.2 115.364 434.367 115.631 433.25C115.897 432.133 116.031 430.733 116.031 429.05C116.031 427.4 115.897 426.025 115.631 424.925C115.381 423.808 114.972 422.967 114.406 422.4C113.856 421.833 113.097 421.55 112.131 421.55C111.181 421.55 110.422 421.842 109.856 422.425C109.289 422.992 108.881 423.833 108.631 424.95C108.381 426.05 108.256 427.417 108.256 429.05Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
          <path d="M208.486 193.872C209.703 193.872 210.753 194.08 211.636 194.497C212.536 194.913 213.228 195.513 213.711 196.297C214.195 197.063 214.436 198.005 214.436 199.122C214.436 200.338 214.17 201.388 213.636 202.272C213.12 203.155 212.361 203.838 211.361 204.322C210.378 204.788 209.203 205.022 207.836 205.022C206.903 205.022 206.036 204.938 205.236 204.772C204.453 204.588 203.786 204.347 203.236 204.047V202.172C203.82 202.522 204.528 202.805 205.361 203.022C206.211 203.238 207.045 203.347 207.861 203.347C208.778 203.347 209.578 203.197 210.261 202.897C210.945 202.597 211.478 202.147 211.861 201.547C212.245 200.947 212.436 200.197 212.436 199.297C212.436 198.097 212.061 197.172 211.311 196.522C210.578 195.855 209.428 195.522 207.861 195.522C207.361 195.522 206.803 195.572 206.186 195.672C205.586 195.755 205.086 195.847 204.686 195.947L203.686 195.297L204.361 186.922H213.236V188.722H206.036L205.586 194.172C205.886 194.122 206.286 194.063 206.786 193.997C207.286 193.913 207.853 193.872 208.486 193.872Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
          <path d="M670.81 671.228H659.16V669.603L663.96 664.678C664.844 663.795 665.585 663.003 666.185 662.303C666.802 661.603 667.269 660.912 667.585 660.228C667.902 659.545 668.06 658.787 668.06 657.953C668.06 656.937 667.752 656.162 667.135 655.628C666.535 655.078 665.744 654.803 664.76 654.803C663.91 654.803 663.152 654.953 662.485 655.253C661.819 655.553 661.144 655.97 660.46 656.503L659.41 655.178C659.877 654.778 660.385 654.428 660.935 654.128C661.502 653.812 662.102 653.57 662.735 653.403C663.385 653.22 664.06 653.128 664.76 653.128C665.844 653.128 666.777 653.32 667.56 653.703C668.36 654.087 668.977 654.637 669.41 655.353C669.844 656.053 670.06 656.887 670.06 657.853C670.06 658.57 669.952 659.245 669.735 659.878C669.535 660.495 669.235 661.103 668.835 661.703C668.452 662.287 667.977 662.887 667.41 663.503C666.86 664.103 666.252 664.737 665.585 665.403L661.635 669.353V669.428H670.81V671.228ZM679.092 660.328C680.309 660.328 681.359 660.537 682.242 660.953C683.142 661.37 683.834 661.97 684.317 662.753C684.8 663.52 685.042 664.462 685.042 665.578C685.042 666.795 684.775 667.845 684.242 668.728C683.725 669.612 682.967 670.295 681.967 670.778C680.984 671.245 679.809 671.478 678.442 671.478C677.509 671.478 676.642 671.395 675.842 671.228C675.059 671.045 674.392 670.803 673.842 670.503V668.628C674.425 668.978 675.134 669.262 675.967 669.478C676.817 669.695 677.65 669.803 678.467 669.803C679.384 669.803 680.184 669.653 680.867 669.353C681.55 669.053 682.084 668.603 682.467 668.003C682.85 667.403 683.042 666.653 683.042 665.753C683.042 664.553 682.667 663.628 681.917 662.978C681.184 662.312 680.034 661.978 678.467 661.978C677.967 661.978 677.409 662.028 676.792 662.128C676.192 662.212 675.692 662.303 675.292 662.403L674.292 661.753L674.967 653.378H683.842V655.178H676.642L676.192 660.628C676.492 660.578 676.892 660.52 677.392 660.453C677.892 660.37 678.459 660.328 679.092 660.328Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
          <path d="M666.66 204.772H664.735V192.047C664.735 191.563 664.735 191.155 664.735 190.822C664.752 190.488 664.76 190.18 664.76 189.897C664.777 189.597 664.794 189.297 664.81 188.997C664.56 189.247 664.327 189.463 664.11 189.647C663.894 189.813 663.627 190.038 663.31 190.322L661.21 191.972L660.185 190.647L665.01 186.922H666.66V204.772ZM679.092 193.872C680.309 193.872 681.359 194.08 682.242 194.497C683.142 194.913 683.834 195.513 684.317 196.297C684.8 197.063 685.042 198.005 685.042 199.122C685.042 200.338 684.775 201.388 684.242 202.272C683.725 203.155 682.967 203.838 681.967 204.322C680.984 204.788 679.809 205.022 678.442 205.022C677.509 205.022 676.642 204.938 675.842 204.772C675.059 204.588 674.392 204.347 673.842 204.047V202.172C674.425 202.522 675.134 202.805 675.967 203.022C676.817 203.238 677.65 203.347 678.467 203.347C679.384 203.347 680.184 203.197 680.867 202.897C681.55 202.597 682.084 202.147 682.467 201.547C682.85 200.947 683.042 200.197 683.042 199.297C683.042 198.097 682.667 197.172 681.917 196.522C681.184 195.855 680.034 195.522 678.467 195.522C677.967 195.522 677.409 195.572 676.792 195.672C676.192 195.755 675.692 195.847 675.292 195.947L674.292 195.297L674.967 186.922H683.842V188.722H676.642L676.192 194.172C676.492 194.122 676.892 194.063 677.392 193.997C677.892 193.913 678.459 193.872 679.092 193.872Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
          <path d="M194.583 665.378V663.628H200.633V665.378H194.583ZM208.515 660.328C209.731 660.328 210.781 660.537 211.665 660.953C212.565 661.37 213.256 661.97 213.74 662.753C214.223 663.52 214.465 664.462 214.465 665.578C214.465 666.795 214.198 667.845 213.665 668.728C213.148 669.612 212.39 670.295 211.39 670.778C210.406 671.245 209.231 671.478 207.865 671.478C206.931 671.478 206.065 671.395 205.265 671.228C204.481 671.045 203.815 670.803 203.265 670.503V668.628C203.848 668.978 204.556 669.262 205.39 669.478C206.24 669.695 207.073 669.803 207.89 669.803C208.806 669.803 209.606 669.653 210.29 669.353C210.973 669.053 211.506 668.603 211.89 668.003C212.273 667.403 212.465 666.653 212.465 665.753C212.465 664.553 212.09 663.628 211.34 662.978C210.606 662.312 209.456 661.978 207.89 661.978C207.39 661.978 206.831 662.028 206.215 662.128C205.615 662.212 205.115 662.303 204.715 662.403L203.715 661.753L204.39 653.378H213.265V655.178H206.065L205.615 660.628C205.915 660.578 206.315 660.52 206.815 660.453C207.315 660.37 207.881 660.328 208.515 660.328Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
        </g>
      </svg>
    `;
  }

  private getLabels50() {
    return svg`
      <g>
        <path d="M475.878 108.167H464.228V106.542L469.028 101.617C469.911 100.733 470.653 99.9417 471.253 99.2417C471.869 98.5417 472.336 97.85 472.653 97.1667C472.969 96.4834 473.128 95.725 473.128 94.8917C473.128 93.875 472.819 93.1 472.203 92.5667C471.603 92.0167 470.811 91.7417 469.828 91.7417C468.978 91.7417 468.219 91.8917 467.553 92.1917C466.886 92.4917 466.211 92.9084 465.528 93.4417L464.478 92.1167C464.944 91.7167 465.453 91.3667 466.003 91.0667C466.569 90.75 467.169 90.5084 467.803 90.3417C468.453 90.1584 469.128 90.0667 469.828 90.0667C470.911 90.0667 471.844 90.2584 472.628 90.6417C473.428 91.025 474.044 91.575 474.478 92.2917C474.911 92.9917 475.128 93.825 475.128 94.7917C475.128 95.5084 475.019 96.1834 474.803 96.8167C474.603 97.4334 474.303 98.0417 473.903 98.6417C473.519 99.225 473.044 99.825 472.478 100.442C471.928 101.042 471.319 101.675 470.653 102.342L466.703 106.292V106.367H475.878V108.167ZM490.309 99.2167C490.309 100.667 490.193 101.967 489.959 103.117C489.743 104.25 489.401 105.208 488.934 105.992C488.468 106.775 487.859 107.375 487.109 107.792C486.359 108.208 485.459 108.417 484.409 108.417C483.109 108.417 482.018 108.058 481.134 107.342C480.268 106.608 479.618 105.558 479.184 104.192C478.768 102.808 478.559 101.15 478.559 99.2167C478.559 97.3167 478.751 95.6834 479.134 94.3167C479.518 92.9334 480.143 91.875 481.009 91.1417C481.876 90.4084 483.009 90.0417 484.409 90.0417C485.759 90.0417 486.868 90.4084 487.734 91.1417C488.601 91.875 489.243 92.925 489.659 94.2917C490.093 95.6584 490.309 97.3 490.309 99.2167ZM480.534 99.2167C480.534 100.9 480.659 102.3 480.909 103.417C481.176 104.517 481.593 105.35 482.159 105.917C482.726 106.467 483.476 106.742 484.409 106.742C485.343 106.742 486.093 106.467 486.659 105.917C487.226 105.367 487.643 104.533 487.909 103.417C488.176 102.3 488.309 100.9 488.309 99.2167C488.309 97.5667 488.176 96.1917 487.909 95.0917C487.659 93.975 487.251 93.1334 486.684 92.5667C486.134 92 485.376 91.7167 484.409 91.7167C483.459 91.7167 482.701 92.0084 482.134 92.5917C481.568 93.1584 481.159 94 480.909 95.1167C480.659 96.2167 480.534 97.5834 480.534 99.2167Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
        <path d="M808.636 433.825H805.936V438H804.036V433.825H795.361V432.175L803.886 420.05H805.936V432.05H808.636V433.825ZM804.036 426.125C804.036 425.675 804.036 425.275 804.036 424.925C804.036 424.558 804.044 424.225 804.061 423.925C804.078 423.608 804.086 423.308 804.086 423.025C804.103 422.725 804.119 422.442 804.136 422.175H804.036C803.886 422.508 803.711 422.858 803.511 423.225C803.311 423.575 803.103 423.892 802.886 424.175L797.311 432.05H804.036V426.125ZM822.143 429.05C822.143 430.5 822.026 431.8 821.793 432.95C821.576 434.083 821.234 435.042 820.768 435.825C820.301 436.608 819.693 437.208 818.943 437.625C818.193 438.042 817.293 438.25 816.243 438.25C814.943 438.25 813.851 437.892 812.968 437.175C812.101 436.442 811.451 435.392 811.018 434.025C810.601 432.642 810.393 430.983 810.393 429.05C810.393 427.15 810.584 425.517 810.968 424.15C811.351 422.767 811.976 421.708 812.843 420.975C813.709 420.242 814.843 419.875 816.243 419.875C817.593 419.875 818.701 420.242 819.568 420.975C820.434 421.708 821.076 422.758 821.493 424.125C821.926 425.492 822.143 427.133 822.143 429.05ZM812.368 429.05C812.368 430.733 812.493 432.133 812.743 433.25C813.009 434.35 813.426 435.183 813.993 435.75C814.559 436.3 815.309 436.575 816.243 436.575C817.176 436.575 817.926 436.3 818.493 435.75C819.059 435.2 819.476 434.367 819.743 433.25C820.009 432.133 820.143 430.733 820.143 429.05C820.143 427.4 820.009 426.025 819.743 424.925C819.493 423.808 819.084 422.967 818.518 422.4C817.968 421.833 817.209 421.55 816.243 421.55C815.293 421.55 814.534 421.842 813.968 422.425C813.401 422.992 812.993 423.833 812.743 424.95C812.493 426.05 812.368 427.417 812.368 429.05Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
        <path d="M158.323 429.05C158.323 430.5 158.206 431.8 157.973 432.95C157.756 434.083 157.414 435.042 156.948 435.825C156.481 436.608 155.873 437.208 155.123 437.625C154.373 438.042 153.473 438.25 152.423 438.25C151.123 438.25 150.031 437.892 149.148 437.175C148.281 436.442 147.631 435.392 147.198 434.025C146.781 432.642 146.573 430.983 146.573 429.05C146.573 427.15 146.764 425.517 147.148 424.15C147.531 422.767 148.156 421.708 149.023 420.975C149.889 420.242 151.023 419.875 152.423 419.875C153.773 419.875 154.881 420.242 155.748 420.975C156.614 421.708 157.256 422.758 157.673 424.125C158.106 425.492 158.323 427.133 158.323 429.05ZM148.548 429.05C148.548 430.733 148.673 432.133 148.923 433.25C149.189 434.35 149.606 435.183 150.173 435.75C150.739 436.3 151.489 436.575 152.423 436.575C153.356 436.575 154.106 436.3 154.673 435.75C155.239 435.2 155.656 434.367 155.923 433.25C156.189 432.133 156.323 430.733 156.323 429.05C156.323 427.4 156.189 426.025 155.923 424.925C155.673 423.808 155.264 422.967 154.698 422.4C154.148 421.833 153.389 421.55 152.423 421.55C151.473 421.55 150.714 421.842 150.148 422.425C149.581 422.992 149.173 423.833 148.923 424.95C148.673 426.05 148.548 427.417 148.548 429.05Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
        <path d="M236.5 204.772H234.575V192.047C234.575 191.563 234.575 191.155 234.575 190.822C234.592 190.488 234.6 190.18 234.6 189.897C234.617 189.597 234.633 189.297 234.65 188.997C234.4 189.247 234.167 189.463 233.95 189.647C233.733 189.813 233.467 190.038 233.15 190.322L231.05 191.972L230.025 190.647L234.85 186.922H236.5V204.772ZM255.082 195.822C255.082 197.272 254.965 198.572 254.732 199.722C254.515 200.855 254.173 201.813 253.707 202.597C253.24 203.38 252.632 203.98 251.882 204.397C251.132 204.813 250.232 205.022 249.182 205.022C247.882 205.022 246.79 204.663 245.907 203.947C245.04 203.213 244.39 202.163 243.957 200.797C243.54 199.413 243.332 197.755 243.332 195.822C243.332 193.922 243.523 192.288 243.907 190.922C244.29 189.538 244.915 188.48 245.782 187.747C246.648 187.013 247.782 186.647 249.182 186.647C250.532 186.647 251.64 187.013 252.507 187.747C253.373 188.48 254.015 189.53 254.432 190.897C254.865 192.263 255.082 193.905 255.082 195.822ZM245.307 195.822C245.307 197.505 245.432 198.905 245.682 200.022C245.948 201.122 246.365 201.955 246.932 202.522C247.498 203.072 248.248 203.347 249.182 203.347C250.115 203.347 250.865 203.072 251.432 202.522C251.998 201.972 252.415 201.138 252.682 200.022C252.948 198.905 253.082 197.505 253.082 195.822C253.082 194.172 252.948 192.797 252.682 191.697C252.432 190.58 252.023 189.738 251.457 189.172C250.907 188.605 250.148 188.322 249.182 188.322C248.232 188.322 247.473 188.613 246.907 189.197C246.34 189.763 245.932 190.605 245.682 191.722C245.432 192.822 245.307 194.188 245.307 195.822Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
        <path d="M705.078 660.328C706.294 660.328 707.344 660.537 708.228 660.953C709.128 661.37 709.819 661.97 710.303 662.753C710.786 663.52 711.028 664.462 711.028 665.578C711.028 666.795 710.761 667.845 710.228 668.728C709.711 669.612 708.953 670.295 707.953 670.778C706.969 671.245 705.794 671.478 704.428 671.478C703.494 671.478 702.628 671.395 701.828 671.228C701.044 671.045 700.378 670.803 699.828 670.503V668.628C700.411 668.978 701.119 669.262 701.953 669.478C702.803 669.695 703.636 669.803 704.453 669.803C705.369 669.803 706.169 669.653 706.853 669.353C707.536 669.053 708.069 668.603 708.453 668.003C708.836 667.403 709.028 666.653 709.028 665.753C709.028 664.553 708.653 663.628 707.903 662.978C707.169 662.312 706.019 661.978 704.453 661.978C703.953 661.978 703.394 662.028 702.778 662.128C702.178 662.212 701.678 662.303 701.278 662.403L700.278 661.753L700.953 653.378H709.828V655.178H702.628L702.178 660.628C702.478 660.578 702.878 660.52 703.378 660.453C703.878 660.37 704.444 660.328 705.078 660.328ZM725.534 662.278C725.534 663.728 725.418 665.028 725.184 666.178C724.968 667.312 724.626 668.27 724.159 669.053C723.693 669.837 723.084 670.437 722.334 670.853C721.584 671.27 720.684 671.478 719.634 671.478C718.334 671.478 717.243 671.12 716.359 670.403C715.493 669.67 714.843 668.62 714.409 667.253C713.993 665.87 713.784 664.212 713.784 662.278C713.784 660.378 713.976 658.745 714.359 657.378C714.743 655.995 715.368 654.937 716.234 654.203C717.101 653.47 718.234 653.103 719.634 653.103C720.984 653.103 722.093 653.47 722.959 654.203C723.826 654.937 724.468 655.987 724.884 657.353C725.318 658.72 725.534 660.362 725.534 662.278ZM715.759 662.278C715.759 663.962 715.884 665.362 716.134 666.478C716.401 667.578 716.818 668.412 717.384 668.978C717.951 669.528 718.701 669.803 719.634 669.803C720.568 669.803 721.318 669.528 721.884 668.978C722.451 668.428 722.868 667.595 723.134 666.478C723.401 665.362 723.534 663.962 723.534 662.278C723.534 660.628 723.401 659.253 723.134 658.153C722.884 657.037 722.476 656.195 721.909 655.628C721.359 655.062 720.601 654.778 719.634 654.778C718.684 654.778 717.926 655.07 717.359 655.653C716.793 656.22 716.384 657.062 716.134 658.178C715.884 659.278 715.759 660.645 715.759 662.278Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
        <path d="M710.453 191.072C710.453 191.872 710.294 192.572 709.978 193.172C709.678 193.755 709.244 194.23 708.678 194.597C708.128 194.963 707.478 195.222 706.728 195.372V195.472C708.144 195.638 709.211 196.088 709.928 196.822C710.644 197.555 711.003 198.522 711.003 199.722C711.003 200.755 710.761 201.672 710.278 202.472C709.794 203.272 709.053 203.897 708.053 204.347C707.069 204.797 705.803 205.022 704.253 205.022C703.303 205.022 702.419 204.947 701.603 204.797C700.803 204.647 700.044 204.397 699.328 204.047V202.197C700.061 202.547 700.861 202.83 701.728 203.047C702.611 203.247 703.461 203.347 704.278 203.347C705.911 203.347 707.094 203.022 707.828 202.372C708.561 201.722 708.928 200.83 708.928 199.697C708.928 198.897 708.728 198.263 708.328 197.797C707.928 197.313 707.344 196.963 706.578 196.747C705.811 196.513 704.894 196.397 703.828 196.397H702.053V194.697H703.853C704.819 194.697 705.636 194.555 706.303 194.272C706.986 193.988 707.511 193.588 707.878 193.072C708.244 192.538 708.428 191.913 708.428 191.197C708.428 190.28 708.119 189.58 707.503 189.097C706.903 188.597 706.078 188.347 705.028 188.347C704.394 188.347 703.811 188.413 703.278 188.547C702.761 188.663 702.269 188.838 701.803 189.072C701.353 189.288 700.894 189.555 700.428 189.872L699.453 188.522C699.903 188.188 700.403 187.88 700.953 187.597C701.519 187.313 702.136 187.088 702.803 186.922C703.486 186.755 704.219 186.672 705.003 186.672C706.819 186.672 708.178 187.08 709.078 187.897C709.994 188.713 710.453 189.772 710.453 191.072ZM725.534 195.822C725.534 197.272 725.418 198.572 725.184 199.722C724.968 200.855 724.626 201.813 724.159 202.597C723.693 203.38 723.084 203.98 722.334 204.397C721.584 204.813 720.684 205.022 719.634 205.022C718.334 205.022 717.243 204.663 716.359 203.947C715.493 203.213 714.843 202.163 714.409 200.797C713.993 199.413 713.784 197.755 713.784 195.822C713.784 193.922 713.976 192.288 714.359 190.922C714.743 189.538 715.368 188.48 716.234 187.747C717.101 187.013 718.234 186.647 719.634 186.647C720.984 186.647 722.093 187.013 722.959 187.747C723.826 188.48 724.468 189.53 724.884 190.897C725.318 192.263 725.534 193.905 725.534 195.822ZM715.759 195.822C715.759 197.505 715.884 198.905 716.134 200.022C716.401 201.122 716.818 201.955 717.384 202.522C717.951 203.072 718.701 203.347 719.634 203.347C720.568 203.347 721.318 203.072 721.884 202.522C722.451 201.972 722.868 201.138 723.134 200.022C723.401 198.905 723.534 197.505 723.534 195.822C723.534 194.172 723.401 192.797 723.134 191.697C722.884 190.58 722.476 189.738 721.909 189.172C721.359 188.605 720.601 188.322 719.634 188.322C718.684 188.322 717.926 188.613 717.359 189.197C716.793 189.763 716.384 190.605 716.134 191.722C715.884 192.822 715.759 194.188 715.759 195.822Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
        <path d="M220.722 665.378V663.628H226.772V665.378H220.722ZM236.528 671.228H234.603V658.503C234.603 658.02 234.603 657.612 234.603 657.278C234.62 656.945 234.628 656.637 234.628 656.353C234.645 656.053 234.662 655.753 234.678 655.453C234.428 655.703 234.195 655.92 233.978 656.103C233.762 656.27 233.495 656.495 233.178 656.778L231.078 658.428L230.053 657.103L234.878 653.378H236.528V671.228ZM255.11 662.278C255.11 663.728 254.993 665.028 254.76 666.178C254.543 667.312 254.202 668.27 253.735 669.053C253.268 669.837 252.66 670.437 251.91 670.853C251.16 671.27 250.26 671.478 249.21 671.478C247.91 671.478 246.818 671.12 245.935 670.403C245.068 669.67 244.418 668.62 243.985 667.253C243.568 665.87 243.36 664.212 243.36 662.278C243.36 660.378 243.552 658.745 243.935 657.378C244.318 655.995 244.943 654.937 245.81 654.203C246.677 653.47 247.81 653.103 249.21 653.103C250.56 653.103 251.668 653.47 252.535 654.203C253.402 654.937 254.043 655.987 254.46 657.353C254.893 658.72 255.11 660.362 255.11 662.278ZM245.335 662.278C245.335 663.962 245.46 665.362 245.71 666.478C245.977 667.578 246.393 668.412 246.96 668.978C247.527 669.528 248.277 669.803 249.21 669.803C250.143 669.803 250.893 669.528 251.46 668.978C252.027 668.428 252.443 667.595 252.71 666.478C252.977 665.362 253.11 663.962 253.11 662.278C253.11 660.628 252.977 659.253 252.71 658.153C252.46 657.037 252.052 656.195 251.485 655.628C250.935 655.062 250.177 654.778 249.21 654.778C248.26 654.778 247.502 655.07 246.935 655.653C246.368 656.22 245.96 657.062 245.71 658.178C245.46 659.278 245.335 660.645 245.335 662.278Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
      </g>
    `;
  }

  private getTickmarks() {
    if (this.maxSpeed == 50) {
      return  this.getTickmarks50();
    }
    else {
      return this.getTickmarks25();
    }
  }

  // maybe remove
  getTickmarks25() {
    return svg`
      <mask id="mask0_6621_15748" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="65" y="17" width="825" height="824">
        <path d="M477.284 126.438C644.385 126.438 779.847 261.899 779.847 429C779.847 507.92 749.633 579.784 700.139 633.652C695.328 638.888 687.153 638.868 682.125 633.84L663.917 615.632C711.68 567.869 741.222 501.884 741.222 429C741.222 283.231 623.053 165.062 477.284 165.062C331.516 165.062 213.347 283.231 213.347 429C213.347 501.884 242.889 567.869 290.652 615.632L272.444 633.84C267.416 638.868 259.241 638.888 254.43 633.652C204.936 579.784 174.722 507.92 174.722 429C174.722 261.899 310.184 126.438 477.284 126.438Z" fill="white" stroke="black" stroke-width="2.08333"/>
      </mask>

      <g mask="url(#mask0_6621_15748)">
        <mask id="mask1_6621_15748" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="65" y="17" width="825" height="824">
          <path d="M477.285 145.75C633.719 145.75 760.535 272.566 760.535 429C760.535 585.435 633.719 712.25 477.285 712.25C320.85 712.25 194.035 585.435 194.035 429C194.035 272.566 320.85 145.75 477.285 145.75ZM477.285 158.625C327.961 158.625 206.91 279.676 206.91 429C206.91 578.324 327.961 699.375 477.285 699.375C626.608 699.375 747.66 578.324 747.66 429C747.66 279.676 626.609 158.625 477.285 158.625Z" fill="black"/>
        </mask>
        <g mask="url(#mask1_6621_15748)">
          <path d="M477.284 107.125V429M477.284 429L426.932 111.088M477.284 429L377.82 122.879M477.284 429L331.156 142.207M477.284 429L288.091 168.597M477.284 429L249.684 201.4M477.284 429L216.882 239.807M477.284 429L190.492 282.872M477.284 429L171.163 329.535M477.284 429L159.372 378.647M477.284 429H155.409M477.284 429L159.372 479.352M477.284 429L171.163 528.465M477.284 429L190.492 575.128M477.284 429L216.883 618.193M477.284 429L249.684 656.6M477.284 429L288.091 689.402M477.284 429L331.156 715.793M477.284 429L377.82 735.122M477.284 429L426.932 746.912M477.284 429V750.875M477.284 429L527.636 746.912M477.284 429L576.749 735.121M477.284 429L623.413 715.793M477.284 429L666.478 689.403M477.284 429L704.885 656.6M477.284 429L737.687 618.193M477.284 429L764.077 575.128M477.284 429L783.406 528.465M477.284 429L795.196 479.353M477.284 429H799.159M477.284 429L795.197 378.648M477.284 429L783.406 329.535M477.284 429L764.077 282.872M477.284 429L737.687 239.806M477.284 429L704.884 201.4M477.284 429L666.478 168.597M477.284 429L623.412 142.207M477.284 429L576.749 122.879M477.284 429L527.637 111.088" stroke="${Colors.instrumentTickmarkTertiary}" stroke-width="2.08333"/>
        </g>
      </g>
    `;
  }

  getTickmarks50() {
    return svg`
      <g transform="translate(40 0)">
        <mask id="mask9_6832_10114" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="77" y="70" width="719" height="718">
          <path d="M436.992 120.377C607.439 120.377 745.614 258.553 745.614 429C745.614 509.5 714.794 582.804 664.31 637.75C658.998 643.531 650.003 643.483 644.493 637.974L625.247 618.728L625.983 617.991C674.351 569.623 704.266 502.806 704.266 429C704.266 281.389 584.603 161.727 436.992 161.727C289.381 161.727 169.719 281.389 169.719 429C169.719 502.806 199.633 569.623 248.001 617.991L248.737 618.728L229.491 637.974C223.982 643.483 214.985 643.531 209.674 637.75C159.19 582.804 128.369 509.499 128.369 429C128.369 258.553 266.545 120.377 436.992 120.377Z" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask9_6832_10114)">
          <mask id="mask10_6832_10114" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="18" y="10" width="838" height="838">
            <path d="M436.992 141.052C596.021 141.052 724.94 269.971 724.94 429C724.94 588.029 596.022 716.948 436.992 716.948C277.963 716.948 149.044 588.029 149.044 429C149.044 269.971 277.963 141.052 436.992 141.052ZM436.992 154.141C285.192 154.141 162.133 277.199 162.133 429C162.133 580.801 285.192 703.859 436.992 703.859C588.793 703.859 711.852 580.801 711.852 429C711.852 277.199 588.793 154.141 436.992 154.141Z" fill="black"/>
          </mask>
          <g mask="url(#mask10_6832_10114)">
            <path d="M335.878 117.801L436.992 429M436.992 429L538.107 740.198M436.992 429L385.805 105.815M436.992 429L488.18 752.185M436.992 429L436.992 101.786M436.992 429L436.992 756.213M436.992 429L488.18 105.815M436.992 429L385.805 752.185M436.992 429L538.107 117.801M436.992 429L335.878 740.198M436.992 429L585.544 137.45M436.992 429L288.441 720.549M436.992 429L629.324 164.278M436.992 429L244.661 693.721M436.992 429L668.367 197.625M436.992 429L205.618 660.375M436.992 429L701.714 236.668M436.992 429L172.271 621.331M436.992 429L728.542 280.448M436.992 429L145.443 577.551M436.992 429L748.191 327.885M436.992 429L125.794 530.114M436.992 429L760.177 377.812M436.992 429L113.808 480.187M436.992 429L764.206 429M436.992 429L109.779 429M436.992 429L760.177 480.187M436.992 429L113.807 377.812M436.992 429L748.191 530.114M436.992 429L125.794 327.885M436.992 429L728.542 577.552M436.992 429L145.443 280.448M436.992 429L701.714 621.331M436.992 429L172.271 236.668M436.992 429L668.367 660.375M436.992 429L205.618 197.625M436.992 429L629.324 693.721M436.992 429L244.661 164.278M436.992 429L585.544 720.549M436.992 429L288.441 137.45M436.992 429L360.606 110.827M436.992 429L513.379 747.172M436.992 429L411.32 102.795M436.992 429L462.666 755.204M436.992 429L462.666 102.795M436.992 429L411.32 755.204M436.992 429L513.379 110.827M436.992 429L360.606 747.172M436.992 429L562.212 126.694M436.992 429L311.774 731.305M436.992 429L607.961 150.004M436.992 429L266.024 707.995M436.992 429L649.501 180.184M436.992 429L224.485 677.815M436.992 429L685.808 216.491M436.992 429L188.178 641.508M436.992 429L715.988 258.031M436.992 429L157.997 599.968M436.992 429L739.299 303.78M436.992 429L134.687 554.219M436.992 429L755.165 352.613M436.992 429L118.82 505.386M436.992 429L763.198 403.327M436.992 429L110.788 454.672M436.992 429L763.198 454.672M436.992 429L110.788 403.327M436.992 429L755.165 505.386M436.992 429L118.82 352.613M436.992 429L739.299 554.219M436.992 429L134.687 303.78M436.992 429L715.988 599.968M436.992 429L157.997 258.031M436.992 429L685.808 641.508M436.992 429L188.178 216.491M436.992 429L649.501 677.815M436.992 429L224.485 180.184M436.992 429L607.961 707.995M436.992 429L266.024 150.004M436.992 429L562.212 731.305M436.992 429L311.774 126.694" stroke="${Colors.instrumentTickmarkTertiary}" stroke-width="2.08333"/>
          </g>
        </g>
      </g>
    `;
  }

  getRadiusMask() {
    return svg`
      <mask id="mask4_22_3634" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="68" y="68" width="497" height="473">
        <!--
        <mask id="path-10-outside-1_22_3634" maskUnits="userSpaceOnUse" x="67.7839" y="68.7839" width="498" height="441" fill="${Colors.instrumentFramePrimary}">
          <rect fill="${Colors.instrumentFramePrimary}" x="67.7839" y="68.7839" width="498" height="441"/>
          <path d="M475.176 475.176C506.503 443.849 527.837 403.936 536.48 360.484C545.123 317.032 540.687 271.993 523.733 231.063C506.779 190.132 478.068 155.148 441.232 130.535C404.395 105.921 361.087 92.7839 316.784 92.7839C272.481 92.7839 229.173 105.921 192.336 130.535C155.5 155.148 126.789 190.132 109.835 231.063C92.8808 271.993 88.4449 317.032 97.088 360.484C105.731 403.936 127.065 443.849 158.392 475.176L316.784 316.784L475.176 475.176Z"/>
        </mask>
        -->
        <path d="M475.176 475.176C506.503 443.849 527.837 403.936 536.48 360.484C545.123 317.032 540.687 271.993 523.733 231.063C506.779 190.132 478.068 155.148 441.232 130.535C404.395 105.921 361.087 92.7839 316.784 92.7839C272.481 92.7839 229.173 105.921 192.336 130.535C155.5 155.148 126.789 190.132 109.835 231.063C92.8808 271.993 88.4449 317.032 97.088 360.484C105.731 403.936 127.065 443.849 158.392 475.176L316.784 316.784L475.176 475.176Z" fill="${Colors.instrumentFramePrimary}"/>
        <path d="M475.176 475.176C506.503 443.849 527.837 403.936 536.48 360.484C545.123 317.032 540.687 271.993 523.733 231.063C506.779 190.132 478.068 155.148 441.232 130.535C404.395 105.921 361.087 92.7839 316.784 92.7839C272.481 92.7839 229.173 105.921 192.336 130.535C155.5 155.148 126.789 190.132 109.835 231.063C92.8808 271.993 88.4449 317.032 97.088 360.484C105.731 403.936 127.065 443.849 158.392 475.176L316.784 316.784L475.176 475.176Z" stroke="${Colors.instrumentFramePrimary}" stroke-width="48" mask="url(#path-10-outside-1_22_3634)"/>
      </mask>
    `;
  }

  private getHighState() {
    if (this.showSog && this.sogSpeed >= this.alertHigh) {
      return AdviceState.triggered;
    }
    else if (this.showStw && this.stwSpeed >= this.alertHigh) {
      return AdviceState.triggered;
    }
    else {
      return AdviceState.hinted;
    }
  }

  private getLowState() {
    if (this.showSog && this.sogSpeed <= this.alertLow) {
      return AdviceState.triggered;
    }
    else if (this.showStw && this.stwSpeed <= this.alertLow) {
      return AdviceState.triggered;
    }
    else {
      return AdviceState.hinted;
    }
  }

  private getAdviceType(alertType: AlertTypes) {
    if (alertType == AlertTypes.caution) {
      return AdviceType.caution;
    }
    else if(alertType == AlertTypes.warning) {
      return AdviceType.warning;
    }
    else if (alertType == AlertTypes.alarm) {
      return AdviceType.alarm
    }
    else {
      return AdviceType.advice;
    }
  }

  private getHighAdviceColor() {
    if ((this.sogSpeed < this.alertHigh || !this.showSog) && (this.stwSpeed < this.alertHigh || !this.showStw)) {
      return Colors.instrumentTickmarkTertiary;
    }
    else {
      if (this.alertHighType == AlertTypes.alarm) {
        return AlertColor.alarmColor;
      }
      else if (this.alertHighType == AlertTypes.warning) {
        return AlertColor.warningColor;
      }
      else if (this.alertHighType == AlertTypes.caution) {
        return AlertColor.cautionColor;
      }
      else {
        return Colors.instrumentTickmarkTertiary;
      }
    }
  }

  getHighAlertColor() {
    if (this.sogSpeed >= this.alertHigh) {
      return this.getAlertColor(this.alertHighType)
    }
    else if (this.alertHighType == AlertTypes.none) {
      return '';
    }
    else {
      return Colors.containerBackdrop;
    }
  }
  
  private getAlertColor(color: AlertTypes) {
    if (color == AlertTypes.caution) {
      return AlertColor.cautionColor;
    }
    else if (color == AlertTypes.warning) {
      return AlertColor.warningColor;
    }
    else if (color == AlertTypes.alarm) {
      return AlertColor.alarmColor;
    }
    return '';
  }

  private renderPathMaskOfHighAdvice(barAreas: WatchBarArea[]): SVGTemplateResult[] | typeof nothing {
    if (barAreas.length === 0 || (Math.abs(barAreas[0].endAngle - barAreas[0].startAngle)) < 4.5) {
      return nothing;
    }

    const CX = 477.284;
    const CY = 429;
    const RADIUS = 264;

    return barAreas.map((bar) => {

      const startAngle = Math.min(bar.startAngle, bar.endAngle);
      const endAngle = Math.max(bar.startAngle, bar.endAngle);

      const path = this.describeSector(
        CX,
        CY,
        RADIUS,
        startAngle,
        endAngle
      );

      return svg`
        <path 
          d=${path}
          fill=${bar.fillColor}
          stroke="${Colors.instrumentTickmarkTertiary}"
          stroke-width="2.08333"
        />
      `;
    });
  }

  private describeSector(
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number
  ): string {

    const toRad = (a: number) => (a - 90) * Math.PI / 180;

    const polar = (angle: number) => ({
      x: cx + r * Math.cos(toRad(angle)),
      y: cy + r * Math.sin(toRad(angle)),
    });

    const start = polar(startAngle);
    const end = polar(endAngle);

    const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;

    return `
      M ${cx} ${cy}
      L ${start.x} ${start.y}
      A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}
      Z
    `;
  }

  cutTickmarks(startAngle: number, endAngle: number) {
    const CX = 477.284;
    const CY = 429;

    const OUTER = 289;
    const INNER = 265;

    const path = this.describeDonutSector(
      CX,
      CY,
      OUTER,
      INNER,
      startAngle,
      endAngle
    );

    return path;
  }

  private describeDonutSector(
    cx: number,
    cy: number,
    rOuter: number,
    rInner: number,
    startAngle: number,
    endAngle: number
  ): string {

    const toRad = (a: number) => (a - 90) * Math.PI / 180;

    const polar = (r: number, angle: number) => ({
      x: cx + r * Math.cos(toRad(angle)),
      y: cy + r * Math.sin(toRad(angle)),
    });

    const p1 = polar(rOuter, startAngle);
    const p2 = polar(rOuter, endAngle);
    const p3 = polar(rInner, endAngle);
    const p4 = polar(rInner, startAngle);

    const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;

    return `
      M ${p1.x} ${p1.y}
      A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${p2.x} ${p2.y}
      L ${p3.x} ${p3.y}
      A ${rInner} ${rInner} 0 ${largeArc} 0 ${p4.x} ${p4.y}
      Z
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'ob-speedometer': Speedometer;
  }
}