import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {AlertDetailPageType, AlertDetailPageAlertStatus} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/pages/alert-detail-page/alert-detail-page.js';
export type {AlertDetailPageType, AlertDetailPageAlertStatus} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/pages/alert-detail-page/alert-detail-page.js';
import type {ObcAlertDetailPage as ObcAlertDetailPageElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/pages/alert-detail-page/alert-detail-page.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/pages/alert-detail-page/alert-detail-page.js';

@Component({
  selector: 'obc-alert-detail-page',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcAlertDetailPage {
  private _el: ObcAlertDetailPageElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcAlertDetailPageElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set type(v: AlertDetailPageType) {
    this._ngZone.runOutsideAngular(() => (this._el.type = v));
  }

  get type() {
    return this._el.type;
  }
  
  @Input()
  set alertStatus(v: AlertDetailPageAlertStatus) {
    this._ngZone.runOutsideAngular(() => (this._el.alertStatus = v));
  }

  get alertStatus() {
    return this._el.alertStatus;
  }
  
  @Input()
  set hasSubdescription(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasSubdescription = v));
  }

  get hasSubdescription() {
    return this._el.hasSubdescription;
  }
  
  @Input()
  set hasActions(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasActions = v));
  }

  get hasActions() {
    return this._el.hasActions;
  }
  
  @Input()
  set hasTagId(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasTagId = v));
  }

  get hasTagId() {
    return this._el.hasTagId;
  }
  
  @Input()
  set hasCategory(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasCategory = v));
  }

  get hasCategory() {
    return this._el.hasCategory;
  }
  
  @Input()
  set hasActivated(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasActivated = v));
  }

  get hasActivated() {
    return this._el.hasActivated;
  }
  
  @Input()
  set hasTimer(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasTimer = v));
  }

  get hasTimer() {
    return this._el.hasTimer;
  }
  
  @Input()
  set hasAcknowledged(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasAcknowledged = v));
  }

  get hasAcknowledged() {
    return this._el.hasAcknowledged;
  }
  
  @Input()
  set hasAcknowledgedBy(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasAcknowledgedBy = v));
  }

  get hasAcknowledgedBy() {
    return this._el.hasAcknowledgedBy;
  }
  
  @Input()
  set hasRectified(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasRectified = v));
  }

  get hasRectified() {
    return this._el.hasRectified;
  }
  
  @Input()
  set hasShelvingTimer(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasShelvingTimer = v));
  }

  get hasShelvingTimer() {
    return this._el.hasShelvingTimer;
  }
  
  @Input()
  set hasShelvedBy(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasShelvedBy = v));
  }

  get hasShelvedBy() {
    return this._el.hasShelvedBy;
  }
  
  @Input()
  set hasReadoutGraph(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasReadoutGraph = v));
  }

  get hasReadoutGraph() {
    return this._el.hasReadoutGraph;
  }
  

  
}

