import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {AutomationButtonSize, AutomationButtonVariant, AutomationButtonState, AutomationButtonLabel, AutomationButtonLabelPosition, AutomationButtonLabelSize, AutomationBottonLabelStyle, AutomationButtonDirection} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-button/automation-button.js';
export type {AutomationButtonSize, AutomationButtonVariant, AutomationButtonState, AutomationButtonLabel, AutomationButtonLabelPosition, AutomationButtonLabelSize, AutomationBottonLabelStyle, AutomationButtonDirection} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-button/automation-button.js';
import type {ObcAutomationButton as ObcAutomationButtonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-button/automation-button.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-button/automation-button.js';

@Component({
  selector: 'obc-automation-button',
  template: '<ng-content></ng-content>',
})
export class ObcAutomationButton {
  private _el: ObcAutomationButtonElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcAutomationButtonElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set size(v: AutomationButtonSize) {
    this._ngZone.runOutsideAngular(() => (this._el.size = v));
  }

  get size() {
    return this._el.size;
  }
  
  @Input()
  set variant(v: AutomationButtonVariant) {
    this._ngZone.runOutsideAngular(() => (this._el.variant = v));
  }

  get variant() {
    return this._el.variant;
  }
  
  @Input()
  set state(v: AutomationButtonState) {
    this._ngZone.runOutsideAngular(() => (this._el.state = v));
  }

  get state() {
    return this._el.state;
  }
  
  @Input()
  set labels(v: AutomationButtonLabel[]) {
    this._ngZone.runOutsideAngular(() => (this._el.labels = v));
  }

  get labels() {
    return this._el.labels;
  }
  
  @Input()
  set labelPosition(v: AutomationButtonLabelPosition) {
    this._ngZone.runOutsideAngular(() => (this._el.labelPosition = v));
  }

  get labelPosition() {
    return this._el.labelPosition;
  }
  
  @Input()
  set labelSize(v: AutomationButtonLabelSize) {
    this._ngZone.runOutsideAngular(() => (this._el.labelSize = v));
  }

  get labelSize() {
    return this._el.labelSize;
  }
  
  @Input()
  set labelStyle(v: AutomationBottonLabelStyle) {
    this._ngZone.runOutsideAngular(() => (this._el.labelStyle = v));
  }

  get labelStyle() {
    return this._el.labelStyle;
  }
  
  @Input()
  set alert(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.alert = v));
  }

  get alert() {
    return this._el.alert;
  }
  
  @Input()
  set progress(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.progress = v));
  }

  get progress() {
    return this._el.progress;
  }
  
  @Input()
  set direction(v: AutomationButtonDirection) {
    this._ngZone.runOutsideAngular(() => (this._el.direction = v));
  }

  get direction() {
    return this._el.direction;
  }
  

  
}

