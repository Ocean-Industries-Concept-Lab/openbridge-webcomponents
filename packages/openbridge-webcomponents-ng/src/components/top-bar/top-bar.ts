import {
  Component,
  ElementRef,
  NgZone,
  Input,
  EventEmitter,
  Output

} from '@angular/core';
import {BreadcrumbItem} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/breadcrumb/breadcrumb';
export type {BreadcrumbItem} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/breadcrumb/breadcrumb';
import type {ObcTopBar as ObcTopBarElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/top-bar/top-bar.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/top-bar/top-bar.js';

@Component({
  selector: 'obc-top-bar',
  template: '<ng-content></ng-content>',
})
export class ObcTopBar {
  private _el: ObcTopBarElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcTopBarElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
    this._el.addEventListener('menu-button-clicked', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.menuButtonClickedEvent.emit(e);
    });
    
    this._el.addEventListener('dimming-button-clicked', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.dimmingButtonClickedEvent.emit(e);
    });
    
    this._el.addEventListener('apps-button-clicked', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.appsButtonClickedEvent.emit(e);
    });
    
    this._el.addEventListener('left-more-button-clicked', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.leftMoreButtonClickedEvent.emit(e);
    });
    
    this._el.addEventListener('user-button-clicked', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.userButtonClickedEvent.emit(e);
    });
    
  }

  
  @Input()
  set appTitle(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.appTitle = v));
  }

  get appTitle() {
    return this._el.appTitle;
  }
  
  @Input()
  set pageName(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.pageName = v));
  }

  get pageName() {
    return this._el.pageName;
  }
  
  @Input()
  set date(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.date = v));
  }

  get date() {
    return this._el.date;
  }
  
  @Input()
  set menuButtonActivated(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.menuButtonActivated = v));
  }

  get menuButtonActivated() {
    return this._el.menuButtonActivated;
  }
  
  @Input()
  set dimmingButtonActivated(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.dimmingButtonActivated = v));
  }

  get dimmingButtonActivated() {
    return this._el.dimmingButtonActivated;
  }
  
  @Input()
  set appsButtonActivated(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.appsButtonActivated = v));
  }

  get appsButtonActivated() {
    return this._el.appsButtonActivated;
  }
  
  @Input()
  set leftMoreButtonActivated(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.leftMoreButtonActivated = v));
  }

  get leftMoreButtonActivated() {
    return this._el.leftMoreButtonActivated;
  }
  
  @Input()
  set userButtonActivated(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.userButtonActivated = v));
  }

  get userButtonActivated() {
    return this._el.userButtonActivated;
  }
  
  @Input()
  set wideMenuButton(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.wideMenuButton = v));
  }

  get wideMenuButton() {
    return this._el.wideMenuButton;
  }
  
  @Input()
  set showAppsButton(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.showAppsButton = v));
  }

  get showAppsButton() {
    return this._el.showAppsButton;
  }
  
  @Input()
  set showDimmingButton(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.showDimmingButton = v));
  }

  get showDimmingButton() {
    return this._el.showDimmingButton;
  }
  
  @Input()
  set showUserButton(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.showUserButton = v));
  }

  get showUserButton() {
    return this._el.showUserButton;
  }
  
  @Input()
  set showClock(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.showClock = v));
  }

  get showClock() {
    return this._el.showClock;
  }
  
  @Input()
  set showDate(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.showDate = v));
  }

  get showDate() {
    return this._el.showDate;
  }
  
  @Input()
  set inactive(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.inactive = v));
  }

  get inactive() {
    return this._el.inactive;
  }
  
  @Input()
  set appButtonBreakpointPx(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.appButtonBreakpointPx = v));
  }

  get appButtonBreakpointPx() {
    return this._el.appButtonBreakpointPx;
  }
  
  @Input()
  set dimmingButtonBreakpointPx(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.dimmingButtonBreakpointPx = v));
  }

  get dimmingButtonBreakpointPx() {
    return this._el.dimmingButtonBreakpointPx;
  }
  
  @Input()
  set appTitleBreakpointPx(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.appTitleBreakpointPx = v));
  }

  get appTitleBreakpointPx() {
    return this._el.appTitleBreakpointPx;
  }
  
  @Input()
  set clockMinimizeBreakpointPx(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.clockMinimizeBreakpointPx = v));
  }

  get clockMinimizeBreakpointPx() {
    return this._el.clockMinimizeBreakpointPx;
  }
  
  @Input()
  set userButtonBreakpointPx(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.userButtonBreakpointPx = v));
  }

  get userButtonBreakpointPx() {
    return this._el.userButtonBreakpointPx;
  }
  
  @Input()
  set settings(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.settings = v));
  }

  get settings() {
    return this._el.settings;
  }
  
  @Input()
  set breadcrumbItems(v: BreadcrumbItem[]) {
    this._ngZone.runOutsideAngular(() => (this._el.breadcrumbItems = v));
  }

  get breadcrumbItems() {
    return this._el.breadcrumbItems;
  }
  

  
  @Output()
  menuButtonClickedEvent = new EventEmitter<unknown>();
  
  @Output()
  dimmingButtonClickedEvent = new EventEmitter<unknown>();
  
  @Output()
  appsButtonClickedEvent = new EventEmitter<unknown>();
  
  @Output()
  leftMoreButtonClickedEvent = new EventEmitter<unknown>();
  
  @Output()
  userButtonClickedEvent = new EventEmitter<unknown>();
  
}

