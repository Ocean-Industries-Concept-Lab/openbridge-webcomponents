import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {AutomationButtonSize, AutomationButtonLabelPosition, AutomationButtonLabelSize, AutomationBottonLabelStyle, AutomationButtonVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-button/automation-button';
import {Direction} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/types';
export type {AutomationButtonSize, AutomationButtonLabelPosition, AutomationButtonLabelSize, AutomationBottonLabelStyle, AutomationButtonVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-button/automation-button';
export type {Direction} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/types';
import type {ObcValve as ObcValveElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/valve/valve.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/valve/valve.js';

@Component({
  selector: 'obc-valve',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcValve {
  private _el: ObcValveElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcValveElement>,
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
  set tag(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.tag = v));
  }

  get tag() {
    return this._el.tag;
  }
  
  @Input()
  set direction(v: Direction) {
    this._ngZone.runOutsideAngular(() => (this._el.direction = v));
  }

  get direction() {
    return this._el.direction;
  }
  
  @Input()
  set value(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
  }
  
  @Input()
  set closed(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.closed = v));
  }

  get closed() {
    return this._el.closed;
  }
  
  @Input()
  set showDirectionLabel(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.showDirectionLabel = v));
  }

  get showDirectionLabel() {
    return this._el.showDirectionLabel;
  }
  
  @Input()
  set variant(v: AutomationButtonVariant) {
    this._ngZone.runOutsideAngular(() => (this._el.variant = v));
  }

  get variant() {
    return this._el.variant;
  }
  

  
}

