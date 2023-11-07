import { unsafeSVG } from "lit/directives/unsafe-svg.js"
import { TemplateResult, html } from "lit"
import svg01add from "./assets/icons/01-add.svg?raw"
import svg01applicationopen from "./assets/icons/01-application-open.svg?raw"
import svg01apps from "./assets/icons/01-apps.svg?raw"
import svg01check from "./assets/icons/01-check.svg?raw"
import svg01checkboxchecked from "./assets/icons/01-checkbox-checked.svg?raw"
import svg01checkboxuncheck from "./assets/icons/01-checkbox-uncheck.svg?raw"
import svg01close from "./assets/icons/01-close.svg?raw"
import svg01delete from "./assets/icons/01-delete.svg?raw"
import svg01download from "./assets/icons/01-download.svg?raw"
import svg01edit from "./assets/icons/01-edit.svg?raw"
import svg01expanditem from "./assets/icons/01-expanditem.svg?raw"
import svg01megamenu from "./assets/icons/01-megamenu.svg?raw"
import svg01menu from "./assets/icons/01-menu.svg?raw"
import svg01mixed from "./assets/icons/01-mixed.svg?raw"
import svg01more from "./assets/icons/01-more.svg?raw"
import svg01morevertical from "./assets/icons/01-more-vertical.svg?raw"
import svg01noteedit from "./assets/icons/01-note -edit.svg?raw"
import svg01off from "./assets/icons/01-off.svg?raw"
import svg01on from "./assets/icons/01-on.svg?raw"
import svg01openfull from "./assets/icons/01-open-full.svg?raw"
import svg01placeholder from "./assets/icons/01-placeholder.svg?raw"
import svg01placeholderdeviceoff from "./assets/icons/01-placeholder-device-off.svg?raw"
import svg01placeholderdeviceon from "./assets/icons/01-placeholder-device-on.svg?raw"
import svg01placeholderdevicestatic from "./assets/icons/01-placeholder-device-static.svg?raw"
import svg01play from "./assets/icons/01-play.svg?raw"
import svg01redo from "./assets/icons/01-redo.svg?raw"
import svg01remove from "./assets/icons/01-remove.svg?raw"
import svg01reorder from "./assets/icons/01-reorder.svg?raw"
import svg01save from "./assets/icons/01-save.svg?raw"
import svg01search from "./assets/icons/01-search.svg?raw"
import svg01sort from "./assets/icons/01-sort.svg?raw"
import svg01standby from "./assets/icons/01-standby.svg?raw"
import svg01stop from "./assets/icons/01-stop.svg?raw"
import svg01text from "./assets/icons/01-text.svg?raw"
import svg01undo from "./assets/icons/01-undo.svg?raw"
import svg01upload from "./assets/icons/01-upload.svg?raw"
import svg01visibility from "./assets/icons/01-visibility.svg?raw"
import svg01visibilityoff from "./assets/icons/01-visibility-off.svg?raw"
import svg01widgetadd from "./assets/icons/01-widget-add.svg?raw"
import svg02arrowback from "./assets/icons/02-arrow-back.svg?raw"
import svg02arrowdown from "./assets/icons/02-arrow-down.svg?raw"
import svg02arrowdropdown from "./assets/icons/02-arrow-drop-down.svg?raw"
import svg02arrowflyout from "./assets/icons/02-arrow-flyout.svg?raw"
import svg02arrowforward from "./assets/icons/02-arrow-forward.svg?raw"
import svg02arrowup from "./assets/icons/02-arrow-up.svg?raw"
import svg02chevrondoubledown from "./assets/icons/02-chevron-double-down.svg?raw"
import svg02chevrondoubleleft from "./assets/icons/02-chevron-double-left.svg?raw"
import svg02chevrondoubleright from "./assets/icons/02-chevron-double-right.svg?raw"
import svg02chevrondoubleup from "./assets/icons/02-chevron-double-up.svg?raw"
import svg02chevrondown from "./assets/icons/02-chevron-down.svg?raw"
import svg02chevronleft from "./assets/icons/02-chevron-left.svg?raw"
import svg02chevronright from "./assets/icons/02-chevron-right.svg?raw"
import svg02chevronup from "./assets/icons/02-chevron-up.svg?raw"
import svg02dropdown from "./assets/icons/02-drop-down.svg?raw"
import svg02expandcontent from "./assets/icons/02-expand-content.svg?raw"
import svg02pagefirst from "./assets/icons/02-page-first.svg?raw"
import svg02pagelast from "./assets/icons/02-page-last.svg?raw"
import svg02resizebottom from "./assets/icons/02-resize-bottom.svg?raw"
import svg02resizecenter from "./assets/icons/02-resize_center.svg?raw"
import svg02resizecorner from "./assets/icons/02-resize-corner.svg?raw"
import svg02resizetop from "./assets/icons/02-resize-top.svg?raw"
import svg02setpoint from "./assets/icons/02-set-point.svg?raw"
import svg02slideleft from "./assets/icons/02-slide-left.svg?raw"
import svg02slideright from "./assets/icons/02-slide-right.svg?raw"
import svg02unfoldless from "./assets/icons/02-unfold-less.svg?raw"
import svg02unfoldmore from "./assets/icons/02-unfold-more.svg?raw"
import svg03configure from "./assets/icons/03-configure.svg?raw"
import svg03diagnostic from "./assets/icons/03-diagnostic.svg?raw"
import svg03filter from "./assets/icons/03-filter.svg?raw"
import svg03info from "./assets/icons/03-info.svg?raw"
import svg03monitoring from "./assets/icons/03-monitoring.svg?raw"
import svg03pinchecked from "./assets/icons/03-pin-checked.svg?raw"
import svg03pinunchecked from "./assets/icons/03-pin-unchecked.svg?raw"
import svg03printscreen from "./assets/icons/03-printscreen.svg?raw"
import svg03settings from "./assets/icons/03-settings.svg?raw"
import svg03settingsdefault from "./assets/icons/03-settings-default.svg?raw"
import svg03settingsdefaultalt1 from "./assets/icons/03-settings-default-alt1.svg?raw"
import svg03settingsdefaultalt2 from "./assets/icons/03-settings-default-alt2.svg?raw"
import svg03splitleft from "./assets/icons/03-split-left.svg?raw"
import svg03splitright from "./assets/icons/03-split-right.svg?raw"
import svg03starchecked from "./assets/icons/03-star-checked.svg?raw"
import svg03starunchecked from "./assets/icons/03-star-unchecked.svg?raw"
import svg03support from "./assets/icons/03-support.svg?raw"
import svg03table from "./assets/icons/03-table.svg?raw"
import svg03volumehigh from "./assets/icons/03-volume-high.svg?raw"
import svg03volumelow from "./assets/icons/03-volume-low.svg?raw"
import svg03volumeoff from "./assets/icons/03-volume-off.svg?raw"
import svg03wifi from "./assets/icons/03-wifi.svg?raw"
import svg03wifioff from "./assets/icons/03-wifi-off.svg?raw"
import svg04brilliancehigh from "./assets/icons/04-brilliance-high.svg?raw"
import svg04brilliancelow from "./assets/icons/04-brilliance-low.svg?raw"
import svg04colorcalibrated from "./assets/icons/04-colorcalibrated.svg?raw"
import svg04day from "./assets/icons/04-day.svg?raw"
import svg04daybright from "./assets/icons/04-day-bright.svg?raw"
import svg04daynight from "./assets/icons/04-daynight.svg?raw"
import svg04dimming from "./assets/icons/04-dimming.svg?raw"
import svg04dusk from "./assets/icons/04-dusk.svg?raw"
import svg04illuminationhigh from "./assets/icons/04-illumination-high.svg?raw"
import svg04illuminationlow from "./assets/icons/04-illumination-low.svg?raw"
import svg04night from "./assets/icons/04-night.svg?raw"
import svg05fullscreen from "./assets/icons/05-fullscreen.svg?raw"
import svg05fullscreenexit from "./assets/icons/05-fullscreen-exit.svg?raw"
import svg05inputkeyboard from "./assets/icons/05-input-keyboard.svg?raw"
import svg05inputkeyboardonscreen from "./assets/icons/05-input-keyboard_onscreen.svg?raw"
import svg05inputmouse from "./assets/icons/05-input-mouse.svg?raw"
import svg05inputtouchpadmouse from "./assets/icons/05-input-touchpad_mouse.svg?raw"
import svg05people from "./assets/icons/05-people.svg?raw"
import svg05screenfull from "./assets/icons/05-screen-full.svg?raw"
import svg05screenquad from "./assets/icons/05-screen-quad.svg?raw"
import svg05screensplitleft from "./assets/icons/05-screen-split-left.svg?raw"
import svg05screensplitright from "./assets/icons/05-screen-split-right.svg?raw"
import svg05user from "./assets/icons/05-user.svg?raw"
import svg06Date from "./assets/icons/06-Date.svg?raw"
import svg06calendar from "./assets/icons/06-calendar.svg?raw"
import svg06cam from "./assets/icons/06-cam.svg?raw"
import svg06cctv from "./assets/icons/06-cctv.svg?raw"
import svg06com from "./assets/icons/06-com.svg?raw"
import svg06conning from "./assets/icons/06-conning.svg?raw"
import svg06dashboard from "./assets/icons/06-dashboard.svg?raw"
import svg06dashboardoutline from "./assets/icons/06-dashboard-outline.svg?raw"
import svg06ecdis from "./assets/icons/06-ecdis.svg?raw"
import svg06ecdissimple from "./assets/icons/06-ecdis-simple.svg?raw"
import svg06home from "./assets/icons/06-home.svg?raw"
import svg06ias from "./assets/icons/06-ias.svg?raw"
import svg06lantern from "./assets/icons/06-lantern.svg?raw"
import svg06link from "./assets/icons/06-link.svg?raw"
import svg06linkremove from "./assets/icons/06-link-remove.svg?raw"
import svg06openbridge from "./assets/icons/06-openbridge.svg?raw"
import svg06radar from "./assets/icons/06-radar.svg?raw"
import svg06screens from "./assets/icons/06-screens.svg?raw"
import svg06ship from "./assets/icons/06-ship.svg?raw"
import svg06time from "./assets/icons/06-time.svg?raw"
import svg06wipers from "./assets/icons/06-wipers.svg?raw"
import svg07ais from "./assets/icons/07-ais.svg?raw"
import svg07anchorwatch from "./assets/icons/07-anchorwatch.svg?raw"
import svg07catzoc from "./assets/icons/07-catzoc.svg?raw"
import svg07centreoff from "./assets/icons/07-centre-off.svg?raw"
import svg07centreon from "./assets/icons/07-centre-on.svg?raw"
import svg07chartinfo from "./assets/icons/07-chart-info.svg?raw"
import svg07chartsearch from "./assets/icons/07-chart-search.svg?raw"
import svg07chartsettings from "./assets/icons/07-chart-settings.svg?raw"
import svg07chartstyles from "./assets/icons/07-chart-styles.svg?raw"
import svg07coordinate from "./assets/icons/07-coordinate.svg?raw"
import svg07ebl from "./assets/icons/07-ebl.svg?raw"
import svg07erbl from "./assets/icons/07-erbl.svg?raw"
import svg07eventrecord from "./assets/icons/07-event-record.svg?raw"
import svg07gridoff from "./assets/icons/07-grid-off.svg?raw"
import svg07gridon from "./assets/icons/07-grid-on.svg?raw"
import svg07headinglineoff from "./assets/icons/07-headingline-off.svg?raw"
import svg07layers from "./assets/icons/07-layers.svg?raw"
import svg07location1 from "./assets/icons/07-location-1.svg?raw"
import svg07location2 from "./assets/icons/07-location-2.svg?raw"
import svg07location3 from "./assets/icons/07-location-3.svg?raw"
import svg07measure from "./assets/icons/07-measure.svg?raw"
import svg07radaroverlay from "./assets/icons/07-radar-overlay.svg?raw"
import svg07range from "./assets/icons/07-range.svg?raw"
import svg07rangerings from "./assets/icons/07-rangerings.svg?raw"
import svg07relativemotion from "./assets/icons/07-relativemotion.svg?raw"
import svg07relativemotionvariant from "./assets/icons/07-relativemotion-variant.svg?raw"
import svg07reportinfo from "./assets/icons/07-report-info.svg?raw"
import svg07routeplanning from "./assets/icons/07-route-planning.svg?raw"
import svg07silence from "./assets/icons/07-silence.svg?raw"
import svg07smode from "./assets/icons/07-smode.svg?raw"
import svg07targetai from "./assets/icons/07-target-ai.svg?raw"
import svg07targetais from "./assets/icons/07-target-ais.svg?raw"
import svg07targetaiselected from "./assets/icons/07-target-ai-selected.svg?raw"
import svg07targetaisradar from "./assets/icons/07-target-ais-radar.svg?raw"
import svg07targetcamera from "./assets/icons/07-target-camera.svg?raw"
import svg07targetcameraais from "./assets/icons/07-target-camera-ais.svg?raw"
import svg07targetcameraradar from "./assets/icons/07-target-camera-radar.svg?raw"
import svg07targetcancel from "./assets/icons/07-target-cancel.svg?raw"
import svg07targetcancelall from "./assets/icons/07-target-cancel-all.svg?raw"
import svg07targetias from "./assets/icons/07-target-ias.svg?raw"
import svg07targetiasselected from "./assets/icons/07-target-ias-selected.svg?raw"
import svg07targetradar from "./assets/icons/07-target-radar.svg?raw"
import svg07targetradarselected from "./assets/icons/07-target-radar-selected.svg?raw"
import svg07targetselect from "./assets/icons/07-target-select.svg?raw"
import svg07track from "./assets/icons/07-track.svg?raw"
import svg07trackno from "./assets/icons/07-track-no.svg?raw"
import svg07trackoffport from "./assets/icons/07-track-off-port.svg?raw"
import svg07trackoffstrb from "./assets/icons/07-track-off-strb.svg?raw"
import svg07trackon from "./assets/icons/07-track-on.svg?raw"
import svg07trackroute from "./assets/icons/07-track-route.svg?raw"
import svg07truemotion from "./assets/icons/07-truemotion.svg?raw"
import svg07truemotionreset from "./assets/icons/07-truemotion-reset.svg?raw"
import svg07truemotionvariant from "./assets/icons/07-truemotion-variant.svg?raw"
import svg07upcourse from "./assets/icons/07-up-course.svg?raw"
import svg07uphead from "./assets/icons/07-up-head.svg?raw"
import svg07upnorth from "./assets/icons/07-up-north.svg?raw"
import svg07voyages from "./assets/icons/07-voyages.svg?raw"
import svg07vrm from "./assets/icons/07-vrm.svg?raw"
import svg07waypointadd from "./assets/icons/07-waypoint-add.svg?raw"
import svg07waypointdelete from "./assets/icons/07-waypoint-delete.svg?raw"
import svg07waypointedit from "./assets/icons/07-waypoint-edit.svg?raw"
import svg08ACDCconverter from "./assets/icons/08-ACDC-converter.svg?raw"
import svg08DCDCconverter from "./assets/icons/08-DCDC-converter.svg?raw"
import svg08IO from "./assets/icons/08-IO.svg?raw"
import svg08Logger from "./assets/icons/08-Logger.svg?raw"
import svg08PLS from "./assets/icons/08-PLS.svg?raw"
import svg08PLScomponent from "./assets/icons/08-PLS-component.svg?raw"
import svg08alertlist from "./assets/icons/08-alert-list.svg?raw"
import svg08auto from "./assets/icons/08-auto.svg?raw"
import svg08backward from "./assets/icons/08-backward.svg?raw"
import svg08backwardfast from "./assets/icons/08-backward-fast.svg?raw"
import svg08backwardstopped from "./assets/icons/08-backward-stopped.svg?raw"
import svg08battery0 from "./assets/icons/08-battery-0.svg?raw"
import svg08battery25 from "./assets/icons/08-battery-25.svg?raw"
import svg08battery50 from "./assets/icons/08-battery-50.svg?raw"
import svg08battery75 from "./assets/icons/08-battery-75.svg?raw"
import svg08batterycharging from "./assets/icons/08-battery-charging.svg?raw"
import svg08batterypack0 from "./assets/icons/08-battery-pack-0.svg?raw"
import svg08batterypack100 from "./assets/icons/08-battery-pack-100.svg?raw"
import svg08batterypack25 from "./assets/icons/08-battery-pack-25.svg?raw"
import svg08batterypack50 from "./assets/icons/08-battery-pack-50.svg?raw"
import svg08batterypack70 from "./assets/icons/08-battery-pack-70.svg?raw"
import svg08batterypackcharging from "./assets/icons/08-battery-pack-charging.svg?raw"
import svg08bilge from "./assets/icons/08-bilge.svg?raw"
import svg08bloweroffvertical from "./assets/icons/08-blower-off-vertical.svg?raw"
import svg08bloweronvertical from "./assets/icons/08-blower-on-vertical.svg?raw"
import svg08blowerstaticvertical from "./assets/icons/08-blower-static-vertical.svg?raw"
import svg08connector3way from "./assets/icons/08-connector-3way.svg?raw"
import svg08connectorcorner from "./assets/icons/08-connector-corner.svg?raw"
import svg08connectorcross from "./assets/icons/08-connector-cross.svg?raw"
import svg08connectorstraight from "./assets/icons/08-connector-straight.svg?raw"
import svg08cooling from "./assets/icons/08-cooling.svg?raw"
import svg08damperhorizontaloff from "./assets/icons/08-damper-horizontal-off.svg?raw"
import svg08damperhorizontalofflarge from "./assets/icons/08-damper-horizontal-off-large.svg?raw"
import svg08damperhorizontalon from "./assets/icons/08-damper-horizontal-on.svg?raw"
import svg08damperhorizontalonlarge from "./assets/icons/08-damper-horizontal-on-large.svg?raw"
import svg08duty from "./assets/icons/08-duty.svg?raw"
import svg08engine from "./assets/icons/08-engine.svg?raw"
import svg08epms from "./assets/icons/08-epms.svg?raw"
import svg08ethernetswitch from "./assets/icons/08-ethernet-switch.svg?raw"
import svg08fanoff from "./assets/icons/08-fan-off.svg?raw"
import svg08fanon from "./assets/icons/08-fan-on.svg?raw"
import svg08fanstatic from "./assets/icons/08-fan-static.svg?raw"
import svg08filter from "./assets/icons/08-filter.svg?raw"
import svg08fire from "./assets/icons/08-fire.svg?raw"
import svg08forward from "./assets/icons/08-forward.svg?raw"
import svg08forwardfast from "./assets/icons/08-forward-fast.svg?raw"
import svg08forwardstopped from "./assets/icons/08-forward-stopped.svg?raw"
import svg08generator from "./assets/icons/08-generator.svg?raw"
import svg08heat from "./assets/icons/08-heat.svg?raw"
import svg08heatexhanger from "./assets/icons/08-heatexhanger.svg?raw"
import svg08heatpump from "./assets/icons/08-heatpump.svg?raw"
import svg08heatpumpbalance from "./assets/icons/08-heat_pump_balance.svg?raw"
import svg08hvac from "./assets/icons/08-hvac.svg?raw"
import svg08hydraulicseparator from "./assets/icons/08-hydraulic-separator.svg?raw"
import svg08local from "./assets/icons/08-local.svg?raw"
import svg08localonly from "./assets/icons/08-local-only.svg?raw"
import svg08manuel from "./assets/icons/08-manuel.svg?raw"
import svg08manuelonly from "./assets/icons/08-manuel-only.svg?raw"
import svg08misc from "./assets/icons/08-misc.svg?raw"
import svg08motoroffhorisontal from "./assets/icons/08-motor-off-horisontal.svg?raw"
import svg08motoroffvertical from "./assets/icons/08-motor-off-vertical.svg?raw"
import svg08motoronhorisontal from "./assets/icons/08-motor-on-horisontal.svg?raw"
import svg08motoronvertical from "./assets/icons/08-motor-on-vertical.svg?raw"
import svg08motorstatichorisontal from "./assets/icons/08-motor-static-horisontal.svg?raw"
import svg08motorstaticvertical from "./assets/icons/08-motor-static-vertical.svg?raw"
import svg08off from "./assets/icons/08-off.svg?raw"
import svg08on from "./assets/icons/08-on.svg?raw"
import svg08pipe3way from "./assets/icons/08-pipe-3way.svg?raw"
import svg08pipecorner from "./assets/icons/08-pipe-corner.svg?raw"
import svg08pipecross from "./assets/icons/08-pipe-cross.svg?raw"
import svg08pipedirection from "./assets/icons/08-pipe-direction.svg?raw"
import svg08pipeend from "./assets/icons/08-pipe-end.svg?raw"
import svg08pipestraight from "./assets/icons/08-pipe-straight.svg?raw"
import svg08pumpoffhorisontal from "./assets/icons/08-pump-off-horisontal.svg?raw"
import svg08pumpoffvertical from "./assets/icons/08-pump-off-vertical.svg?raw"
import svg08pumponhorisontal from "./assets/icons/08-pump-on-horisontal.svg?raw"
import svg08pumponvertical from "./assets/icons/08-pump-on-vertical.svg?raw"
import svg08pumpstatichorisontal from "./assets/icons/08-pump-static-horisontal.svg?raw"
import svg08pumpstaticvertical from "./assets/icons/08-pump-static-vertical.svg?raw"
import svg08router from "./assets/icons/08-router.svg?raw"
import svg08simulation from "./assets/icons/08-simulation.svg?raw"
import svg08standby from "./assets/icons/08-standby.svg?raw"
import svg08switchhorizontaloff from "./assets/icons/08-switch-horizontal-off.svg?raw"
import svg08switchhorizontalofflarge from "./assets/icons/08-switch-horizontal-off-large.svg?raw"
import svg08switchhorizontalon from "./assets/icons/08-switch-horizontal-on.svg?raw"
import svg08switchhorizontalonlarge from "./assets/icons/08-switch-horizontal-on-large.svg?raw"
import svg08system from "./assets/icons/08-system.svg?raw"
import svg08tank from "./assets/icons/08-tank.svg?raw"
import svg08tempcold from "./assets/icons/08-temp-cold.svg?raw"
import svg08temphot from "./assets/icons/08-temp-hot.svg?raw"
import svg08temphotcold from "./assets/icons/08-temp-hotcold.svg?raw"
import svg08threewayanalogleft0 from "./assets/icons/08-threeway-analog-left-0.svg?raw"
import svg08threewayanalogleft100 from "./assets/icons/08-threeway-analog-left-100.svg?raw"
import svg08threewayanalogleft25 from "./assets/icons/08-threeway-analog-left-25.svg?raw"
import svg08threewayanalogleft50 from "./assets/icons/08-threeway-analog-left-50.svg?raw"
import svg08threewayanalogleft75 from "./assets/icons/08-threeway-analog-left-75.svg?raw"
import svg08threewayanalogright0 from "./assets/icons/08-threeway-analog-right-0.svg?raw"
import svg08threewayanalogright100 from "./assets/icons/08-threeway-analog-right-100.svg?raw"
import svg08threewayanalogright25 from "./assets/icons/08-threeway-analog-right-25.svg?raw"
import svg08threewayanalogright50 from "./assets/icons/08-threeway-analog-right-50.svg?raw"
import svg08threewayanalogright75 from "./assets/icons/08-threeway-analog-right-75.svg?raw"
import svg08threewayanalogtop0 from "./assets/icons/08-threeway-analog-top-0.svg?raw"
import svg08threewayanalogtop100 from "./assets/icons/08-threeway-analog-top-100.svg?raw"
import svg08threewayanalogtop25 from "./assets/icons/08-threeway-analog-top-25.svg?raw"
import svg08threewayanalogtop50 from "./assets/icons/08-threeway-analog-top-50.svg?raw"
import svg08threewayanalogtop75 from "./assets/icons/08-threeway-analog-top-75.svg?raw"
import svg08threewaydigitalclosed from "./assets/icons/08-threeway-digital-closed.svg?raw"
import svg08threewaydigitalclosedleft from "./assets/icons/08-threeway-digital-closed-left.svg?raw"
import svg08threewaydigitalclosedright from "./assets/icons/08-threeway-digital-closed-right.svg?raw"
import svg08threewaydigitalclosedtop from "./assets/icons/08-threeway-digital-closed-top.svg?raw"
import svg08threewaydigitalopen from "./assets/icons/08-threeway-digital-open.svg?raw"
import svg08threewaydigitalstatic from "./assets/icons/08-threeway-digital-static.svg?raw"
import svg08trend from "./assets/icons/08-trend.svg?raw"
import svg08twowayanalogclosed from "./assets/icons/08-twoway-analog-closed.svg?raw"
import svg08twowayanalogopen from "./assets/icons/08-twoway-analog-open.svg?raw"
import svg08twowayanalogopen25 from "./assets/icons/08-twoway-analog-open-25.svg?raw"
import svg08twowayanalogopen5 from "./assets/icons/08-twoway-analog-open-5.svg?raw"
import svg08twowayanalogopen50 from "./assets/icons/08-twoway-analog-open-50.svg?raw"
import svg08twowayanalogopen75 from "./assets/icons/08-twoway-analog-open-75.svg?raw"
import svg08twowaydigitalclosed from "./assets/icons/08-twoway-digital-closed.svg?raw"
import svg08twowaydigitalnonreturn from "./assets/icons/08-twoway-digital-nonreturn.svg?raw"
import svg08twowaydigitalopen from "./assets/icons/08-twoway-digital-open.svg?raw"
import svg08twowaydigitalstatic from "./assets/icons/08-twoway-digital-static.svg?raw"
import svg08wiper from "./assets/icons/08-wiper.svg?raw"
import svg08wiperfluid from "./assets/icons/08-wiper-fluid.svg?raw"
import svg10autonomous from "./assets/icons/10-autonomous.svg?raw"
import svg10autopilot from "./assets/icons/10-autopilot.svg?raw"
import svg10autotrack from "./assets/icons/10-autotrack.svg?raw"
import svg10joystick from "./assets/icons/10-joystick.svg?raw"
import svg10keepingarea from "./assets/icons/10-keeping-area.svg?raw"
import svg10keepingstation from "./assets/icons/10-keeping-station.svg?raw"
import svg10keepingtrack from "./assets/icons/10-keeping-track.svg?raw"
import svg10move from "./assets/icons/10-move.svg?raw"
import svg10propulsion from "./assets/icons/10-propulsion.svg?raw"
import svg10propulsionstatic from "./assets/icons/10-propulsion-static.svg?raw"
import svg10rotate from "./assets/icons/10-rotate.svg?raw"
import svg10rudder from "./assets/icons/10-rudder.svg?raw"
import svg10thrusterazimuth from "./assets/icons/10-thruster-azimuth.svg?raw"
import svg10thrustermainengine from "./assets/icons/10-thruster-mainengine.svg?raw"
import svg10thrustertunnel from "./assets/icons/10-thruster-tunnel.svg?raw"
import svg11current1 from "./assets/icons/11-current-1.svg?raw"
import svg11current2 from "./assets/icons/11-current-2.svg?raw"
import svg11current3 from "./assets/icons/11-current-3.svg?raw"
import svg11current4 from "./assets/icons/11-current-4.svg?raw"
import svg11wind1 from "./assets/icons/11-wind-1.svg?raw"
import svg11wind10 from "./assets/icons/11-wind-10.svg?raw"
import svg11wind11 from "./assets/icons/11-wind-11.svg?raw"
import svg11wind12 from "./assets/icons/11-wind-12.svg?raw"
import svg11wind13 from "./assets/icons/11-wind-13.svg?raw"
import svg11wind2 from "./assets/icons/11-wind-2.svg?raw"
import svg11wind3 from "./assets/icons/11-wind-3.svg?raw"
import svg11wind4 from "./assets/icons/11-wind-4.svg?raw"
import svg11wind5 from "./assets/icons/11-wind-5.svg?raw"
import svg11wind6 from "./assets/icons/11-wind-6.svg?raw"
import svg11wind7 from "./assets/icons/11-wind-7.svg?raw"
import svg11wind8 from "./assets/icons/11-wind-8.svg?raw"
import svg11wind9 from "./assets/icons/11-wind-9.svg?raw"
import svg12altitute from "./assets/icons/12-altitute.svg?raw"
import svg12cog from "./assets/icons/12-cog.svg?raw"
import svg12depht from "./assets/icons/12-depht.svg?raw"
import svg12hdg from "./assets/icons/12-hdg.svg?raw"
import svg12heave from "./assets/icons/12-heave.svg?raw"
import svg12pitch from "./assets/icons/12-pitch.svg?raw"
import svg12roll from "./assets/icons/12-roll.svg?raw"
import svg12rot from "./assets/icons/12-rot.svg?raw"
import svg12sog from "./assets/icons/12-sog.svg?raw"
import svg12stw from "./assets/icons/12-stw.svg?raw"
import svg12turn from "./assets/icons/12-turn.svg?raw"
import svg13Latched from "./assets/icons/13-Latched.svg?raw"
import svg13coffee from "./assets/icons/13-coffee.svg?raw"
import svg13container from "./assets/icons/13-container.svg?raw"
import svg13crane from "./assets/icons/13-crane.svg?raw"
import svg13winch from "./assets/icons/13-winch.svg?raw"
import svg14Alarmoutline from "./assets/icons/14-Alarm-outline.svg?raw"
import svg14Cautionoutline from "./assets/icons/14-Caution-outline.svg?raw"
import svg14Warningoutline from "./assets/icons/14-Warning-outline.svg?raw"
import svg14alarm from "./assets/icons/14-alarm.svg?raw"
import svg14alarmabandon from "./assets/icons/14-alarm-abandon.svg?raw"
import svg14alarmacknowledged from "./assets/icons/14-alarm-acknowledged.svg?raw"
import svg14alarmbadge from "./assets/icons/14-alarm-badge.svg?raw"
import svg14alarmemergency from "./assets/icons/14-alarm-emergency.svg?raw"
import svg14alarmfire from "./assets/icons/14-alarm-fire.svg?raw"
import svg14alarmgeneral from "./assets/icons/14-alarm-general.svg?raw"
import svg14alarmnoack from "./assets/icons/14-alarm-noack.svg?raw"
import svg14alarmpob from "./assets/icons/14-alarm-pob.svg?raw"
import svg14alarmrectified from "./assets/icons/14-alarm-rectified.svg?raw"
import svg14alarmsilenced from "./assets/icons/14-alarm-silenced.svg?raw"
import svg14alarmtransferred from "./assets/icons/14-alarm-transferred.svg?raw"
import svg14alarmtrigger from "./assets/icons/14-alarm-trigger.svg?raw"
import svg14alarmunack from "./assets/icons/14-alarm-unack.svg?raw"
import svg14alertheaderaggregated from "./assets/icons/14-alertheader-aggregated.svg?raw"
import svg14alertheadergroup from "./assets/icons/14-alertheader-group.svg?raw"
import svg14alertoff from "./assets/icons/14-alert-off.svg?raw"
import svg14alertrectified from "./assets/icons/14-alert-rectified.svg?raw"
import svg14alerts from "./assets/icons/14-alerts.svg?raw"
import svg14audio from "./assets/icons/14-audio.svg?raw"
import svg14audiolow from "./assets/icons/14-audio-low.svg?raw"
import svg14caution from "./assets/icons/14-caution.svg?raw"
import svg14cautionbadge from "./assets/icons/14-caution-badge.svg?raw"
import svg14cautioncolor from "./assets/icons/14-caution-color.svg?raw"
import svg14exclamationmark from "./assets/icons/14-exclamationmark.svg?raw"
import svg14message from "./assets/icons/14-message.svg?raw"
import svg14messagenone from "./assets/icons/14-message-none.svg?raw"
import svg14mute from "./assets/icons/14-mute.svg?raw"
import svg14notification from "./assets/icons/14-notification.svg?raw"
import svg14notificationempty from "./assets/icons/14-notification-empty.svg?raw"
import svg14rectified from "./assets/icons/14-rectified.svg?raw"
import svg14running from "./assets/icons/14-running.svg?raw"
import svg14runningcolor from "./assets/icons/14-running-color.svg?raw"
import svg14signalfail from "./assets/icons/14-signal-fail.svg?raw"
import svg14warning from "./assets/icons/14-warning.svg?raw"
import svg14warningacknowledged from "./assets/icons/14-warning-acknowledged.svg?raw"
import svg14warningbadge from "./assets/icons/14-warning-badge.svg?raw"
import svg14warningnoack from "./assets/icons/14-warning-noack.svg?raw"
import svg14warningrectified from "./assets/icons/14-warning-rectified.svg?raw"
import svg14warningsilenced from "./assets/icons/14-warning-silenced.svg?raw"
import svg14warningtransferred from "./assets/icons/14-warning-transferred.svg?raw"
import svg14warningunacknowledged from "./assets/icons/14-warning-unacknowledged.svg?raw"
import svg15Forward10S from "./assets/icons/15-Forward10S.svg?raw"
import svg15Fullscreen from "./assets/icons/15-Fullscreen.svg?raw"
import svg15Galleryview from "./assets/icons/15-Galleryview.svg?raw"
import svg15Mic from "./assets/icons/15-Mic.svg?raw"
import svg15Radio from "./assets/icons/15-Radio.svg?raw"
import svg15Replay10S from "./assets/icons/15-Replay10S .svg?raw"
import svg15Singleview from "./assets/icons/15-Singleview.svg?raw"
import svg15call from "./assets/icons/15-call.svg?raw"
import svg15callactive from "./assets/icons/15-call-active.svg?raw"
import svg15callend from "./assets/icons/15-call-end.svg?raw"
import svg15cameratilt from "./assets/icons/15-camera-tilt.svg?raw"
import svg15contacts from "./assets/icons/15-contacts.svg?raw"
import svg15history from "./assets/icons/15-history.svg?raw"
import svg15live from "./assets/icons/15-live.svg?raw"
import svg15loop from "./assets/icons/15-loop.svg?raw"
import svg15micmuted from "./assets/icons/15-mic-muted.svg?raw"
import svg15pa from "./assets/icons/15-pa.svg?raw"
import svg15palist from "./assets/icons/15-pa-list.svg?raw"
import svg15pause from "./assets/icons/15-pause.svg?raw"
import svg15pausecircle from "./assets/icons/15-pause-circle.svg?raw"
import svg15play from "./assets/icons/15-play.svg?raw"
import svg15playcircle from "./assets/icons/15-play-circle.svg?raw"
import svg15rank1 from "./assets/icons/15-rank-1.svg?raw"
import svg15rank2 from "./assets/icons/15-rank-2.svg?raw"
import svg15rank3 from "./assets/icons/15-rank-3.svg?raw"
import svg15rank4 from "./assets/icons/15-rank-4.svg?raw"
import svg15rank5 from "./assets/icons/15-rank-5.svg?raw"
import svg15rank6 from "./assets/icons/15-rank-6.svg?raw"
import svg15record from "./assets/icons/15-record.svg?raw"
import svg15skipnext from "./assets/icons/15-skip-next.svg?raw"
import svg15skipnextfilled from "./assets/icons/15-skip-next-filled.svg?raw"
import svg15skipprevious from "./assets/icons/15-skip-previous.svg?raw"
import svg15skippreviousfilled from "./assets/icons/15-skip-previous-filled.svg?raw"
import svg16commandavailable from "./assets/icons/16-command-available.svg?raw"
import svg16commandin from "./assets/icons/16-command-in.svg?raw"
import svg16commandno from "./assets/icons/16-command-no.svg?raw"
import svg16commandpartial from "./assets/icons/16-command-partial.svg?raw"
import svg16commandrequest from "./assets/icons/16-command-request.svg?raw"
import svg16commandshared from "./assets/icons/16-command-shared.svg?raw"
import svg16commandtake from "./assets/icons/16-command-take.svg?raw"
import svg16lock from "./assets/icons/16-lock.svg?raw"
import svg17shipbulkcarrier from "./assets/icons/17-ship-bulkcarrier.svg?raw"
import svg17shipcarferry from "./assets/icons/17-ship-carferry.svg?raw"
import svg17shipcontainer from "./assets/icons/17-ship-container.svg?raw"
import svg17shipfishing from "./assets/icons/17-ship-fishing.svg?raw"
import svg17shiphighspeed from "./assets/icons/17-ship-highspeed.svg?raw"
import svg17shipnavy from "./assets/icons/17-ship-navy.svg?raw"
import svg17shipoffshore from "./assets/icons/17-ship-offshore.svg?raw"
import svg17shippassenger from "./assets/icons/17-ship-passenger.svg?raw"
import svg17shipsailboat from "./assets/icons/17-ship-sailboat.svg?raw"
import svg17shipsailship from "./assets/icons/17-ship-sailship.svg?raw"
import svg17shiptanker from "./assets/icons/17-ship-tanker.svg?raw"
import svg17shiptugboat from "./assets/icons/17-ship-tugboat.svg?raw"
import svg17shipyacht from "./assets/icons/17-ship-yacht.svg?raw"
import svg18aisNotcommand from "./assets/icons/18-ais-Notcommand.svg?raw"
import svg18aisaground from "./assets/icons/18-ais-aground.svg?raw"
import svg18aisanchor from "./assets/icons/18-ais-anchor.svg?raw"
import svg18aisfishing from "./assets/icons/18-ais-fishing.svg?raw"
import svg18aismoored from "./assets/icons/18-ais-moored.svg?raw"
import svg18aisnotunderway from "./assets/icons/18-ais-notunderway.svg?raw"
import svg18aisunderwaysailing from "./assets/icons/18-ais-underwaysailing.svg?raw"
import svg18aisunderwayusingengine from "./assets/icons/18-ais-underwayusingengine.svg?raw"
import svg19analytics from "./assets/icons/19-analytics.svg?raw"
import svg19current from "./assets/icons/19-current.svg?raw"
import svg19hide from "./assets/icons/19-hide.svg?raw"
import svg19limitsattention from "./assets/icons/19-limits-attention.svg?raw"
import svg19limitsimproving from "./assets/icons/19-limits-improving.svg?raw"
import svg19limitsinside from "./assets/icons/19-limits-inside.svg?raw"
import svg19limitsoutsideover from "./assets/icons/19-limits-outside-over.svg?raw"
import svg19limitsoutsideunder from "./assets/icons/19-limits-outside-under.svg?raw"
import svg19pilotonboard from "./assets/icons/19-pilot-onboard.svg?raw"
import svg19speed from "./assets/icons/19-speed.svg?raw"
import svg19speedgood from "./assets/icons/19-speed-good.svg?raw"
import svg19speedhigh from "./assets/icons/19-speed-high.svg?raw"
import svg19speedlow from "./assets/icons/19-speed-low.svg?raw"
import svg19swell from "./assets/icons/19-swell.svg?raw"
import svg19temperature from "./assets/icons/19-temperature.svg?raw"
import svg19timeless from "./assets/icons/19-time-less.svg?raw"
import svg19timemore from "./assets/icons/19-time-more.svg?raw"
import svg19trenddown from "./assets/icons/19-trend-down.svg?raw"
import svg19trendup from "./assets/icons/19-trend-up.svg?raw"
import svg19trophy from "./assets/icons/19-trophy.svg?raw"
import svg19view from "./assets/icons/19-view.svg?raw"
import svg19wave from "./assets/icons/19-wave.svg?raw"
import svg19weather from "./assets/icons/19-weather.svg?raw"
import svg20cellbad from "./assets/icons/20-cell-bad.svg?raw"
import svg20cellfull from "./assets/icons/20-cell-full.svg?raw"
import svg20celllow from "./assets/icons/20-cell-low.svg?raw"
import svg20cellmedium from "./assets/icons/20-cell-medium.svg?raw"
import svg20celloff from "./assets/icons/20-cell-off.svg?raw"
import svg20satellitecommunication from "./assets/icons/20-satellite-communication .svg?raw"
import svg20sensorgpsbad from "./assets/icons/20-sensor-gps-bad.svg?raw"
import svg20sensorgpsfull from "./assets/icons/20-sensor-gps-full.svg?raw"
import svg20sensorgpslow from "./assets/icons/20-sensor-gps-low.svg?raw"
import svg20sensorgpsmedium from "./assets/icons/20-sensor-gps-medium.svg?raw"
import svg20sensorgyro from "./assets/icons/20-sensor-gyro.svg?raw"
import svg20sensorwind from "./assets/icons/20-sensor-wind.svg?raw"
import svgChart from "./assets/icons/Chart.svg?raw"
import svgSwimming from "./assets/icons/Swimming.svg?raw"
import svgbatteryfull from "./assets/icons/battery_full.svg?raw"
import svgkayaking from "./assets/icons/kayaking.svg?raw"
import svgkitesurfing from "./assets/icons/kitesurfing.svg?raw"
import svglogocompany from "./assets/icons/logo-company.svg?raw"
import svglogooicl from "./assets/icons/logo-oicl.svg?raw"
import svgrowing from "./assets/icons/rowing.svg?raw"

export const iconsUrl: { [key: string]: TemplateResult } = {
    '01-add': html`${unsafeSVG(svg01add)}`,
    '01-application-open': html`${unsafeSVG(svg01applicationopen)}`,
    '01-apps': html`${unsafeSVG(svg01apps)}`,
    '01-check': html`${unsafeSVG(svg01check)}`,
    '01-checkbox-checked': html`${unsafeSVG(svg01checkboxchecked)}`,
    '01-checkbox-uncheck': html`${unsafeSVG(svg01checkboxuncheck)}`,
    '01-close': html`${unsafeSVG(svg01close)}`,
    '01-delete': html`${unsafeSVG(svg01delete)}`,
    '01-download': html`${unsafeSVG(svg01download)}`,
    '01-edit': html`${unsafeSVG(svg01edit)}`,
    '01-expanditem': html`${unsafeSVG(svg01expanditem)}`,
    '01-megamenu': html`${unsafeSVG(svg01megamenu)}`,
    '01-menu': html`${unsafeSVG(svg01menu)}`,
    '01-mixed': html`${unsafeSVG(svg01mixed)}`,
    '01-more': html`${unsafeSVG(svg01more)}`,
    '01-more-vertical': html`${unsafeSVG(svg01morevertical)}`,
    '01-note -edit': html`${unsafeSVG(svg01noteedit)}`,
    '01-off': html`${unsafeSVG(svg01off)}`,
    '01-on': html`${unsafeSVG(svg01on)}`,
    '01-open-full': html`${unsafeSVG(svg01openfull)}`,
    '01-placeholder': html`${unsafeSVG(svg01placeholder)}`,
    '01-placeholder-device-off': html`${unsafeSVG(svg01placeholderdeviceoff)}`,
    '01-placeholder-device-on': html`${unsafeSVG(svg01placeholderdeviceon)}`,
    '01-placeholder-device-static': html`${unsafeSVG(svg01placeholderdevicestatic)}`,
    '01-play': html`${unsafeSVG(svg01play)}`,
    '01-redo': html`${unsafeSVG(svg01redo)}`,
    '01-remove': html`${unsafeSVG(svg01remove)}`,
    '01-reorder': html`${unsafeSVG(svg01reorder)}`,
    '01-save': html`${unsafeSVG(svg01save)}`,
    '01-search': html`${unsafeSVG(svg01search)}`,
    '01-sort': html`${unsafeSVG(svg01sort)}`,
    '01-standby': html`${unsafeSVG(svg01standby)}`,
    '01-stop': html`${unsafeSVG(svg01stop)}`,
    '01-text': html`${unsafeSVG(svg01text)}`,
    '01-undo': html`${unsafeSVG(svg01undo)}`,
    '01-upload': html`${unsafeSVG(svg01upload)}`,
    '01-visibility': html`${unsafeSVG(svg01visibility)}`,
    '01-visibility-off': html`${unsafeSVG(svg01visibilityoff)}`,
    '01-widget-add': html`${unsafeSVG(svg01widgetadd)}`,
    '02-arrow-back': html`${unsafeSVG(svg02arrowback)}`,
    '02-arrow-down': html`${unsafeSVG(svg02arrowdown)}`,
    '02-arrow-drop-down': html`${unsafeSVG(svg02arrowdropdown)}`,
    '02-arrow-flyout': html`${unsafeSVG(svg02arrowflyout)}`,
    '02-arrow-forward': html`${unsafeSVG(svg02arrowforward)}`,
    '02-arrow-up': html`${unsafeSVG(svg02arrowup)}`,
    '02-chevron-double-down': html`${unsafeSVG(svg02chevrondoubledown)}`,
    '02-chevron-double-left': html`${unsafeSVG(svg02chevrondoubleleft)}`,
    '02-chevron-double-right': html`${unsafeSVG(svg02chevrondoubleright)}`,
    '02-chevron-double-up': html`${unsafeSVG(svg02chevrondoubleup)}`,
    '02-chevron-down': html`${unsafeSVG(svg02chevrondown)}`,
    '02-chevron-left': html`${unsafeSVG(svg02chevronleft)}`,
    '02-chevron-right': html`${unsafeSVG(svg02chevronright)}`,
    '02-chevron-up': html`${unsafeSVG(svg02chevronup)}`,
    '02-drop-down': html`${unsafeSVG(svg02dropdown)}`,
    '02-expand-content': html`${unsafeSVG(svg02expandcontent)}`,
    '02-page-first': html`${unsafeSVG(svg02pagefirst)}`,
    '02-page-last': html`${unsafeSVG(svg02pagelast)}`,
    '02-resize-bottom': html`${unsafeSVG(svg02resizebottom)}`,
    '02-resize-corner': html`${unsafeSVG(svg02resizecorner)}`,
    '02-resize-top': html`${unsafeSVG(svg02resizetop)}`,
    '02-resize_center': html`${unsafeSVG(svg02resizecenter)}`,
    '02-set-point': html`${unsafeSVG(svg02setpoint)}`,
    '02-slide-left': html`${unsafeSVG(svg02slideleft)}`,
    '02-slide-right': html`${unsafeSVG(svg02slideright)}`,
    '02-unfold-less': html`${unsafeSVG(svg02unfoldless)}`,
    '02-unfold-more': html`${unsafeSVG(svg02unfoldmore)}`,
    '03-configure': html`${unsafeSVG(svg03configure)}`,
    '03-diagnostic': html`${unsafeSVG(svg03diagnostic)}`,
    '03-filter': html`${unsafeSVG(svg03filter)}`,
    '03-info': html`${unsafeSVG(svg03info)}`,
    '03-monitoring': html`${unsafeSVG(svg03monitoring)}`,
    '03-pin-checked': html`${unsafeSVG(svg03pinchecked)}`,
    '03-pin-unchecked': html`${unsafeSVG(svg03pinunchecked)}`,
    '03-printscreen': html`${unsafeSVG(svg03printscreen)}`,
    '03-settings': html`${unsafeSVG(svg03settings)}`,
    '03-settings-default': html`${unsafeSVG(svg03settingsdefault)}`,
    '03-settings-default-alt1': html`${unsafeSVG(svg03settingsdefaultalt1)}`,
    '03-settings-default-alt2': html`${unsafeSVG(svg03settingsdefaultalt2)}`,
    '03-split-left': html`${unsafeSVG(svg03splitleft)}`,
    '03-split-right': html`${unsafeSVG(svg03splitright)}`,
    '03-star-checked': html`${unsafeSVG(svg03starchecked)}`,
    '03-star-unchecked': html`${unsafeSVG(svg03starunchecked)}`,
    '03-support': html`${unsafeSVG(svg03support)}`,
    '03-table': html`${unsafeSVG(svg03table)}`,
    '03-volume-high': html`${unsafeSVG(svg03volumehigh)}`,
    '03-volume-low': html`${unsafeSVG(svg03volumelow)}`,
    '03-volume-off': html`${unsafeSVG(svg03volumeoff)}`,
    '03-wifi': html`${unsafeSVG(svg03wifi)}`,
    '03-wifi-off': html`${unsafeSVG(svg03wifioff)}`,
    '04-brilliance-high': html`${unsafeSVG(svg04brilliancehigh)}`,
    '04-brilliance-low': html`${unsafeSVG(svg04brilliancelow)}`,
    '04-colorcalibrated': html`${unsafeSVG(svg04colorcalibrated)}`,
    '04-day': html`${unsafeSVG(svg04day)}`,
    '04-day-bright': html`${unsafeSVG(svg04daybright)}`,
    '04-daynight': html`${unsafeSVG(svg04daynight)}`,
    '04-dimming': html`${unsafeSVG(svg04dimming)}`,
    '04-dusk': html`${unsafeSVG(svg04dusk)}`,
    '04-illumination-high': html`${unsafeSVG(svg04illuminationhigh)}`,
    '04-illumination-low': html`${unsafeSVG(svg04illuminationlow)}`,
    '04-night': html`${unsafeSVG(svg04night)}`,
    '05-fullscreen': html`${unsafeSVG(svg05fullscreen)}`,
    '05-fullscreen-exit': html`${unsafeSVG(svg05fullscreenexit)}`,
    '05-input-keyboard': html`${unsafeSVG(svg05inputkeyboard)}`,
    '05-input-keyboard_onscreen': html`${unsafeSVG(svg05inputkeyboardonscreen)}`,
    '05-input-mouse': html`${unsafeSVG(svg05inputmouse)}`,
    '05-input-touchpad_mouse': html`${unsafeSVG(svg05inputtouchpadmouse)}`,
    '05-people': html`${unsafeSVG(svg05people)}`,
    '05-screen-full': html`${unsafeSVG(svg05screenfull)}`,
    '05-screen-quad': html`${unsafeSVG(svg05screenquad)}`,
    '05-screen-split-left': html`${unsafeSVG(svg05screensplitleft)}`,
    '05-screen-split-right': html`${unsafeSVG(svg05screensplitright)}`,
    '05-user': html`${unsafeSVG(svg05user)}`,
    '06-Date': html`${unsafeSVG(svg06Date)}`,
    '06-calendar': html`${unsafeSVG(svg06calendar)}`,
    '06-cam': html`${unsafeSVG(svg06cam)}`,
    '06-cctv': html`${unsafeSVG(svg06cctv)}`,
    '06-com': html`${unsafeSVG(svg06com)}`,
    '06-conning': html`${unsafeSVG(svg06conning)}`,
    '06-dashboard': html`${unsafeSVG(svg06dashboard)}`,
    '06-dashboard-outline': html`${unsafeSVG(svg06dashboardoutline)}`,
    '06-ecdis': html`${unsafeSVG(svg06ecdis)}`,
    '06-ecdis-simple': html`${unsafeSVG(svg06ecdissimple)}`,
    '06-home': html`${unsafeSVG(svg06home)}`,
    '06-ias': html`${unsafeSVG(svg06ias)}`,
    '06-lantern': html`${unsafeSVG(svg06lantern)}`,
    '06-link': html`${unsafeSVG(svg06link)}`,
    '06-link-remove': html`${unsafeSVG(svg06linkremove)}`,
    '06-openbridge': html`${unsafeSVG(svg06openbridge)}`,
    '06-radar': html`${unsafeSVG(svg06radar)}`,
    '06-screens': html`${unsafeSVG(svg06screens)}`,
    '06-ship': html`${unsafeSVG(svg06ship)}`,
    '06-time': html`${unsafeSVG(svg06time)}`,
    '06-wipers': html`${unsafeSVG(svg06wipers)}`,
    '07-ais': html`${unsafeSVG(svg07ais)}`,
    '07-anchorwatch': html`${unsafeSVG(svg07anchorwatch)}`,
    '07-catzoc': html`${unsafeSVG(svg07catzoc)}`,
    '07-centre-off': html`${unsafeSVG(svg07centreoff)}`,
    '07-centre-on': html`${unsafeSVG(svg07centreon)}`,
    '07-chart-info': html`${unsafeSVG(svg07chartinfo)}`,
    '07-chart-search': html`${unsafeSVG(svg07chartsearch)}`,
    '07-chart-settings': html`${unsafeSVG(svg07chartsettings)}`,
    '07-chart-styles': html`${unsafeSVG(svg07chartstyles)}`,
    '07-coordinate': html`${unsafeSVG(svg07coordinate)}`,
    '07-ebl': html`${unsafeSVG(svg07ebl)}`,
    '07-erbl': html`${unsafeSVG(svg07erbl)}`,
    '07-event-record': html`${unsafeSVG(svg07eventrecord)}`,
    '07-grid-off': html`${unsafeSVG(svg07gridoff)}`,
    '07-grid-on': html`${unsafeSVG(svg07gridon)}`,
    '07-headingline-off': html`${unsafeSVG(svg07headinglineoff)}`,
    '07-layers': html`${unsafeSVG(svg07layers)}`,
    '07-location-1': html`${unsafeSVG(svg07location1)}`,
    '07-location-2': html`${unsafeSVG(svg07location2)}`,
    '07-location-3': html`${unsafeSVG(svg07location3)}`,
    '07-measure': html`${unsafeSVG(svg07measure)}`,
    '07-radar-overlay': html`${unsafeSVG(svg07radaroverlay)}`,
    '07-range': html`${unsafeSVG(svg07range)}`,
    '07-rangerings': html`${unsafeSVG(svg07rangerings)}`,
    '07-relativemotion': html`${unsafeSVG(svg07relativemotion)}`,
    '07-relativemotion-variant': html`${unsafeSVG(svg07relativemotionvariant)}`,
    '07-report-info': html`${unsafeSVG(svg07reportinfo)}`,
    '07-route-planning': html`${unsafeSVG(svg07routeplanning)}`,
    '07-silence': html`${unsafeSVG(svg07silence)}`,
    '07-smode': html`${unsafeSVG(svg07smode)}`,
    '07-target-ai': html`${unsafeSVG(svg07targetai)}`,
    '07-target-ai-selected': html`${unsafeSVG(svg07targetaiselected)}`,
    '07-target-ais': html`${unsafeSVG(svg07targetais)}`,
    '07-target-ais-radar': html`${unsafeSVG(svg07targetaisradar)}`,
    '07-target-camera': html`${unsafeSVG(svg07targetcamera)}`,
    '07-target-camera-ais': html`${unsafeSVG(svg07targetcameraais)}`,
    '07-target-camera-radar': html`${unsafeSVG(svg07targetcameraradar)}`,
    '07-target-cancel': html`${unsafeSVG(svg07targetcancel)}`,
    '07-target-cancel-all': html`${unsafeSVG(svg07targetcancelall)}`,
    '07-target-ias': html`${unsafeSVG(svg07targetias)}`,
    '07-target-ias-selected': html`${unsafeSVG(svg07targetiasselected)}`,
    '07-target-radar': html`${unsafeSVG(svg07targetradar)}`,
    '07-target-radar-selected': html`${unsafeSVG(svg07targetradarselected)}`,
    '07-target-select': html`${unsafeSVG(svg07targetselect)}`,
    '07-track': html`${unsafeSVG(svg07track)}`,
    '07-track-no': html`${unsafeSVG(svg07trackno)}`,
    '07-track-off-port': html`${unsafeSVG(svg07trackoffport)}`,
    '07-track-off-strb': html`${unsafeSVG(svg07trackoffstrb)}`,
    '07-track-on': html`${unsafeSVG(svg07trackon)}`,
    '07-track-route': html`${unsafeSVG(svg07trackroute)}`,
    '07-truemotion': html`${unsafeSVG(svg07truemotion)}`,
    '07-truemotion-reset': html`${unsafeSVG(svg07truemotionreset)}`,
    '07-truemotion-variant': html`${unsafeSVG(svg07truemotionvariant)}`,
    '07-up-course': html`${unsafeSVG(svg07upcourse)}`,
    '07-up-head': html`${unsafeSVG(svg07uphead)}`,
    '07-up-north': html`${unsafeSVG(svg07upnorth)}`,
    '07-voyages': html`${unsafeSVG(svg07voyages)}`,
    '07-vrm': html`${unsafeSVG(svg07vrm)}`,
    '07-waypoint-add': html`${unsafeSVG(svg07waypointadd)}`,
    '07-waypoint-delete': html`${unsafeSVG(svg07waypointdelete)}`,
    '07-waypoint-edit': html`${unsafeSVG(svg07waypointedit)}`,
    '08-ACDC-converter': html`${unsafeSVG(svg08ACDCconverter)}`,
    '08-DCDC-converter': html`${unsafeSVG(svg08DCDCconverter)}`,
    '08-IO': html`${unsafeSVG(svg08IO)}`,
    '08-Logger': html`${unsafeSVG(svg08Logger)}`,
    '08-PLS': html`${unsafeSVG(svg08PLS)}`,
    '08-PLS-component': html`${unsafeSVG(svg08PLScomponent)}`,
    '08-alert-list': html`${unsafeSVG(svg08alertlist)}`,
    '08-auto': html`${unsafeSVG(svg08auto)}`,
    '08-backward': html`${unsafeSVG(svg08backward)}`,
    '08-backward-fast': html`${unsafeSVG(svg08backwardfast)}`,
    '08-backward-stopped': html`${unsafeSVG(svg08backwardstopped)}`,
    '08-battery-0': html`${unsafeSVG(svg08battery0)}`,
    '08-battery-25': html`${unsafeSVG(svg08battery25)}`,
    '08-battery-50': html`${unsafeSVG(svg08battery50)}`,
    '08-battery-75': html`${unsafeSVG(svg08battery75)}`,
    '08-battery-charging': html`${unsafeSVG(svg08batterycharging)}`,
    '08-battery-pack-0': html`${unsafeSVG(svg08batterypack0)}`,
    '08-battery-pack-100': html`${unsafeSVG(svg08batterypack100)}`,
    '08-battery-pack-25': html`${unsafeSVG(svg08batterypack25)}`,
    '08-battery-pack-50': html`${unsafeSVG(svg08batterypack50)}`,
    '08-battery-pack-70': html`${unsafeSVG(svg08batterypack70)}`,
    '08-battery-pack-charging': html`${unsafeSVG(svg08batterypackcharging)}`,
    '08-bilge': html`${unsafeSVG(svg08bilge)}`,
    '08-blower-off-vertical': html`${unsafeSVG(svg08bloweroffvertical)}`,
    '08-blower-on-vertical': html`${unsafeSVG(svg08bloweronvertical)}`,
    '08-blower-static-vertical': html`${unsafeSVG(svg08blowerstaticvertical)}`,
    '08-connector-3way': html`${unsafeSVG(svg08connector3way)}`,
    '08-connector-corner': html`${unsafeSVG(svg08connectorcorner)}`,
    '08-connector-cross': html`${unsafeSVG(svg08connectorcross)}`,
    '08-connector-straight': html`${unsafeSVG(svg08connectorstraight)}`,
    '08-cooling': html`${unsafeSVG(svg08cooling)}`,
    '08-damper-horizontal-off': html`${unsafeSVG(svg08damperhorizontaloff)}`,
    '08-damper-horizontal-off-large': html`${unsafeSVG(svg08damperhorizontalofflarge)}`,
    '08-damper-horizontal-on': html`${unsafeSVG(svg08damperhorizontalon)}`,
    '08-damper-horizontal-on-large': html`${unsafeSVG(svg08damperhorizontalonlarge)}`,
    '08-duty': html`${unsafeSVG(svg08duty)}`,
    '08-engine': html`${unsafeSVG(svg08engine)}`,
    '08-epms': html`${unsafeSVG(svg08epms)}`,
    '08-ethernet-switch': html`${unsafeSVG(svg08ethernetswitch)}`,
    '08-fan-off': html`${unsafeSVG(svg08fanoff)}`,
    '08-fan-on': html`${unsafeSVG(svg08fanon)}`,
    '08-fan-static': html`${unsafeSVG(svg08fanstatic)}`,
    '08-filter': html`${unsafeSVG(svg08filter)}`,
    '08-fire': html`${unsafeSVG(svg08fire)}`,
    '08-forward': html`${unsafeSVG(svg08forward)}`,
    '08-forward-fast': html`${unsafeSVG(svg08forwardfast)}`,
    '08-forward-stopped': html`${unsafeSVG(svg08forwardstopped)}`,
    '08-generator': html`${unsafeSVG(svg08generator)}`,
    '08-heat': html`${unsafeSVG(svg08heat)}`,
    '08-heat_pump_balance': html`${unsafeSVG(svg08heatpumpbalance)}`,
    '08-heatexhanger': html`${unsafeSVG(svg08heatexhanger)}`,
    '08-heatpump': html`${unsafeSVG(svg08heatpump)}`,
    '08-hvac': html`${unsafeSVG(svg08hvac)}`,
    '08-hydraulic-separator': html`${unsafeSVG(svg08hydraulicseparator)}`,
    '08-local': html`${unsafeSVG(svg08local)}`,
    '08-local-only': html`${unsafeSVG(svg08localonly)}`,
    '08-manuel': html`${unsafeSVG(svg08manuel)}`,
    '08-manuel-only': html`${unsafeSVG(svg08manuelonly)}`,
    '08-misc': html`${unsafeSVG(svg08misc)}`,
    '08-motor-off-horisontal': html`${unsafeSVG(svg08motoroffhorisontal)}`,
    '08-motor-off-vertical': html`${unsafeSVG(svg08motoroffvertical)}`,
    '08-motor-on-horisontal': html`${unsafeSVG(svg08motoronhorisontal)}`,
    '08-motor-on-vertical': html`${unsafeSVG(svg08motoronvertical)}`,
    '08-motor-static-horisontal': html`${unsafeSVG(svg08motorstatichorisontal)}`,
    '08-motor-static-vertical': html`${unsafeSVG(svg08motorstaticvertical)}`,
    '08-off': html`${unsafeSVG(svg08off)}`,
    '08-on': html`${unsafeSVG(svg08on)}`,
    '08-pipe-3way': html`${unsafeSVG(svg08pipe3way)}`,
    '08-pipe-corner': html`${unsafeSVG(svg08pipecorner)}`,
    '08-pipe-cross': html`${unsafeSVG(svg08pipecross)}`,
    '08-pipe-direction': html`${unsafeSVG(svg08pipedirection)}`,
    '08-pipe-end': html`${unsafeSVG(svg08pipeend)}`,
    '08-pipe-straight': html`${unsafeSVG(svg08pipestraight)}`,
    '08-pump-off-horisontal': html`${unsafeSVG(svg08pumpoffhorisontal)}`,
    '08-pump-off-vertical': html`${unsafeSVG(svg08pumpoffvertical)}`,
    '08-pump-on-horisontal': html`${unsafeSVG(svg08pumponhorisontal)}`,
    '08-pump-on-vertical': html`${unsafeSVG(svg08pumponvertical)}`,
    '08-pump-static-horisontal': html`${unsafeSVG(svg08pumpstatichorisontal)}`,
    '08-pump-static-vertical': html`${unsafeSVG(svg08pumpstaticvertical)}`,
    '08-router': html`${unsafeSVG(svg08router)}`,
    '08-simulation': html`${unsafeSVG(svg08simulation)}`,
    '08-standby': html`${unsafeSVG(svg08standby)}`,
    '08-switch-horizontal-off': html`${unsafeSVG(svg08switchhorizontaloff)}`,
    '08-switch-horizontal-off-large': html`${unsafeSVG(svg08switchhorizontalofflarge)}`,
    '08-switch-horizontal-on': html`${unsafeSVG(svg08switchhorizontalon)}`,
    '08-switch-horizontal-on-large': html`${unsafeSVG(svg08switchhorizontalonlarge)}`,
    '08-system': html`${unsafeSVG(svg08system)}`,
    '08-tank': html`${unsafeSVG(svg08tank)}`,
    '08-temp-cold': html`${unsafeSVG(svg08tempcold)}`,
    '08-temp-hot': html`${unsafeSVG(svg08temphot)}`,
    '08-temp-hotcold': html`${unsafeSVG(svg08temphotcold)}`,
    '08-threeway-analog-left-0': html`${unsafeSVG(svg08threewayanalogleft0)}`,
    '08-threeway-analog-left-100': html`${unsafeSVG(svg08threewayanalogleft100)}`,
    '08-threeway-analog-left-25': html`${unsafeSVG(svg08threewayanalogleft25)}`,
    '08-threeway-analog-left-50': html`${unsafeSVG(svg08threewayanalogleft50)}`,
    '08-threeway-analog-left-75': html`${unsafeSVG(svg08threewayanalogleft75)}`,
    '08-threeway-analog-right-0': html`${unsafeSVG(svg08threewayanalogright0)}`,
    '08-threeway-analog-right-100': html`${unsafeSVG(svg08threewayanalogright100)}`,
    '08-threeway-analog-right-25': html`${unsafeSVG(svg08threewayanalogright25)}`,
    '08-threeway-analog-right-50': html`${unsafeSVG(svg08threewayanalogright50)}`,
    '08-threeway-analog-right-75': html`${unsafeSVG(svg08threewayanalogright75)}`,
    '08-threeway-analog-top-0': html`${unsafeSVG(svg08threewayanalogtop0)}`,
    '08-threeway-analog-top-100': html`${unsafeSVG(svg08threewayanalogtop100)}`,
    '08-threeway-analog-top-25': html`${unsafeSVG(svg08threewayanalogtop25)}`,
    '08-threeway-analog-top-50': html`${unsafeSVG(svg08threewayanalogtop50)}`,
    '08-threeway-analog-top-75': html`${unsafeSVG(svg08threewayanalogtop75)}`,
    '08-threeway-digital-closed': html`${unsafeSVG(svg08threewaydigitalclosed)}`,
    '08-threeway-digital-closed-left': html`${unsafeSVG(svg08threewaydigitalclosedleft)}`,
    '08-threeway-digital-closed-right': html`${unsafeSVG(svg08threewaydigitalclosedright)}`,
    '08-threeway-digital-closed-top': html`${unsafeSVG(svg08threewaydigitalclosedtop)}`,
    '08-threeway-digital-open': html`${unsafeSVG(svg08threewaydigitalopen)}`,
    '08-threeway-digital-static': html`${unsafeSVG(svg08threewaydigitalstatic)}`,
    '08-trend': html`${unsafeSVG(svg08trend)}`,
    '08-twoway-analog-closed': html`${unsafeSVG(svg08twowayanalogclosed)}`,
    '08-twoway-analog-open': html`${unsafeSVG(svg08twowayanalogopen)}`,
    '08-twoway-analog-open-25': html`${unsafeSVG(svg08twowayanalogopen25)}`,
    '08-twoway-analog-open-5': html`${unsafeSVG(svg08twowayanalogopen5)}`,
    '08-twoway-analog-open-50': html`${unsafeSVG(svg08twowayanalogopen50)}`,
    '08-twoway-analog-open-75': html`${unsafeSVG(svg08twowayanalogopen75)}`,
    '08-twoway-digital-closed': html`${unsafeSVG(svg08twowaydigitalclosed)}`,
    '08-twoway-digital-nonreturn': html`${unsafeSVG(svg08twowaydigitalnonreturn)}`,
    '08-twoway-digital-open': html`${unsafeSVG(svg08twowaydigitalopen)}`,
    '08-twoway-digital-static': html`${unsafeSVG(svg08twowaydigitalstatic)}`,
    '08-wiper': html`${unsafeSVG(svg08wiper)}`,
    '08-wiper-fluid': html`${unsafeSVG(svg08wiperfluid)}`,
    '10-autonomous': html`${unsafeSVG(svg10autonomous)}`,
    '10-autopilot': html`${unsafeSVG(svg10autopilot)}`,
    '10-autotrack': html`${unsafeSVG(svg10autotrack)}`,
    '10-joystick': html`${unsafeSVG(svg10joystick)}`,
    '10-keeping-area': html`${unsafeSVG(svg10keepingarea)}`,
    '10-keeping-station': html`${unsafeSVG(svg10keepingstation)}`,
    '10-keeping-track': html`${unsafeSVG(svg10keepingtrack)}`,
    '10-move': html`${unsafeSVG(svg10move)}`,
    '10-propulsion': html`${unsafeSVG(svg10propulsion)}`,
    '10-propulsion-static': html`${unsafeSVG(svg10propulsionstatic)}`,
    '10-rotate': html`${unsafeSVG(svg10rotate)}`,
    '10-rudder': html`${unsafeSVG(svg10rudder)}`,
    '10-thruster-azimuth': html`${unsafeSVG(svg10thrusterazimuth)}`,
    '10-thruster-mainengine': html`${unsafeSVG(svg10thrustermainengine)}`,
    '10-thruster-tunnel': html`${unsafeSVG(svg10thrustertunnel)}`,
    '11-current-1': html`${unsafeSVG(svg11current1)}`,
    '11-current-2': html`${unsafeSVG(svg11current2)}`,
    '11-current-3': html`${unsafeSVG(svg11current3)}`,
    '11-current-4': html`${unsafeSVG(svg11current4)}`,
    '11-wind-1': html`${unsafeSVG(svg11wind1)}`,
    '11-wind-10': html`${unsafeSVG(svg11wind10)}`,
    '11-wind-11': html`${unsafeSVG(svg11wind11)}`,
    '11-wind-12': html`${unsafeSVG(svg11wind12)}`,
    '11-wind-13': html`${unsafeSVG(svg11wind13)}`,
    '11-wind-2': html`${unsafeSVG(svg11wind2)}`,
    '11-wind-3': html`${unsafeSVG(svg11wind3)}`,
    '11-wind-4': html`${unsafeSVG(svg11wind4)}`,
    '11-wind-5': html`${unsafeSVG(svg11wind5)}`,
    '11-wind-6': html`${unsafeSVG(svg11wind6)}`,
    '11-wind-7': html`${unsafeSVG(svg11wind7)}`,
    '11-wind-8': html`${unsafeSVG(svg11wind8)}`,
    '11-wind-9': html`${unsafeSVG(svg11wind9)}`,
    '12-altitute': html`${unsafeSVG(svg12altitute)}`,
    '12-cog': html`${unsafeSVG(svg12cog)}`,
    '12-depht': html`${unsafeSVG(svg12depht)}`,
    '12-hdg': html`${unsafeSVG(svg12hdg)}`,
    '12-heave': html`${unsafeSVG(svg12heave)}`,
    '12-pitch': html`${unsafeSVG(svg12pitch)}`,
    '12-roll': html`${unsafeSVG(svg12roll)}`,
    '12-rot': html`${unsafeSVG(svg12rot)}`,
    '12-sog': html`${unsafeSVG(svg12sog)}`,
    '12-stw': html`${unsafeSVG(svg12stw)}`,
    '12-turn': html`${unsafeSVG(svg12turn)}`,
    '13-Latched': html`${unsafeSVG(svg13Latched)}`,
    '13-coffee': html`${unsafeSVG(svg13coffee)}`,
    '13-container': html`${unsafeSVG(svg13container)}`,
    '13-crane': html`${unsafeSVG(svg13crane)}`,
    '13-winch': html`${unsafeSVG(svg13winch)}`,
    '14-Alarm-outline': html`${unsafeSVG(svg14Alarmoutline)}`,
    '14-Caution-outline': html`${unsafeSVG(svg14Cautionoutline)}`,
    '14-Warning-outline': html`${unsafeSVG(svg14Warningoutline)}`,
    '14-alarm': html`${unsafeSVG(svg14alarm)}`,
    '14-alarm-abandon': html`${unsafeSVG(svg14alarmabandon)}`,
    '14-alarm-acknowledged': html`${unsafeSVG(svg14alarmacknowledged)}`,
    '14-alarm-badge': html`${unsafeSVG(svg14alarmbadge)}`,
    '14-alarm-emergency': html`${unsafeSVG(svg14alarmemergency)}`,
    '14-alarm-fire': html`${unsafeSVG(svg14alarmfire)}`,
    '14-alarm-general': html`${unsafeSVG(svg14alarmgeneral)}`,
    '14-alarm-noack': html`${unsafeSVG(svg14alarmnoack)}`,
    '14-alarm-pob': html`${unsafeSVG(svg14alarmpob)}`,
    '14-alarm-rectified': html`${unsafeSVG(svg14alarmrectified)}`,
    '14-alarm-silenced': html`${unsafeSVG(svg14alarmsilenced)}`,
    '14-alarm-transferred': html`${unsafeSVG(svg14alarmtransferred)}`,
    '14-alarm-trigger': html`${unsafeSVG(svg14alarmtrigger)}`,
    '14-alarm-unack': html`${unsafeSVG(svg14alarmunack)}`,
    '14-alert-off': html`${unsafeSVG(svg14alertoff)}`,
    '14-alert-rectified': html`${unsafeSVG(svg14alertrectified)}`,
    '14-alertheader-aggregated': html`${unsafeSVG(svg14alertheaderaggregated)}`,
    '14-alertheader-group': html`${unsafeSVG(svg14alertheadergroup)}`,
    '14-alerts': html`${unsafeSVG(svg14alerts)}`,
    '14-audio': html`${unsafeSVG(svg14audio)}`,
    '14-audio-low': html`${unsafeSVG(svg14audiolow)}`,
    '14-caution': html`${unsafeSVG(svg14caution)}`,
    '14-caution-badge': html`${unsafeSVG(svg14cautionbadge)}`,
    '14-caution-color': html`${unsafeSVG(svg14cautioncolor)}`,
    '14-exclamationmark': html`${unsafeSVG(svg14exclamationmark)}`,
    '14-message': html`${unsafeSVG(svg14message)}`,
    '14-message-none': html`${unsafeSVG(svg14messagenone)}`,
    '14-mute': html`${unsafeSVG(svg14mute)}`,
    '14-notification': html`${unsafeSVG(svg14notification)}`,
    '14-notification-empty': html`${unsafeSVG(svg14notificationempty)}`,
    '14-rectified': html`${unsafeSVG(svg14rectified)}`,
    '14-running': html`${unsafeSVG(svg14running)}`,
    '14-running-color': html`${unsafeSVG(svg14runningcolor)}`,
    '14-signal-fail': html`${unsafeSVG(svg14signalfail)}`,
    '14-warning': html`${unsafeSVG(svg14warning)}`,
    '14-warning-acknowledged': html`${unsafeSVG(svg14warningacknowledged)}`,
    '14-warning-badge': html`${unsafeSVG(svg14warningbadge)}`,
    '14-warning-noack': html`${unsafeSVG(svg14warningnoack)}`,
    '14-warning-rectified': html`${unsafeSVG(svg14warningrectified)}`,
    '14-warning-silenced': html`${unsafeSVG(svg14warningsilenced)}`,
    '14-warning-transferred': html`${unsafeSVG(svg14warningtransferred)}`,
    '14-warning-unacknowledged': html`${unsafeSVG(svg14warningunacknowledged)}`,
    '15-Forward10S': html`${unsafeSVG(svg15Forward10S)}`,
    '15-Fullscreen': html`${unsafeSVG(svg15Fullscreen)}`,
    '15-Galleryview': html`${unsafeSVG(svg15Galleryview)}`,
    '15-Mic': html`${unsafeSVG(svg15Mic)}`,
    '15-Radio': html`${unsafeSVG(svg15Radio)}`,
    '15-Replay10S ': html`${unsafeSVG(svg15Replay10S)}`,
    '15-Singleview': html`${unsafeSVG(svg15Singleview)}`,
    '15-call': html`${unsafeSVG(svg15call)}`,
    '15-call-active': html`${unsafeSVG(svg15callactive)}`,
    '15-call-end': html`${unsafeSVG(svg15callend)}`,
    '15-camera-tilt': html`${unsafeSVG(svg15cameratilt)}`,
    '15-contacts': html`${unsafeSVG(svg15contacts)}`,
    '15-history': html`${unsafeSVG(svg15history)}`,
    '15-live': html`${unsafeSVG(svg15live)}`,
    '15-loop': html`${unsafeSVG(svg15loop)}`,
    '15-mic-muted': html`${unsafeSVG(svg15micmuted)}`,
    '15-pa': html`${unsafeSVG(svg15pa)}`,
    '15-pa-list': html`${unsafeSVG(svg15palist)}`,
    '15-pause': html`${unsafeSVG(svg15pause)}`,
    '15-pause-circle': html`${unsafeSVG(svg15pausecircle)}`,
    '15-play': html`${unsafeSVG(svg15play)}`,
    '15-play-circle': html`${unsafeSVG(svg15playcircle)}`,
    '15-rank-1': html`${unsafeSVG(svg15rank1)}`,
    '15-rank-2': html`${unsafeSVG(svg15rank2)}`,
    '15-rank-3': html`${unsafeSVG(svg15rank3)}`,
    '15-rank-4': html`${unsafeSVG(svg15rank4)}`,
    '15-rank-5': html`${unsafeSVG(svg15rank5)}`,
    '15-rank-6': html`${unsafeSVG(svg15rank6)}`,
    '15-record': html`${unsafeSVG(svg15record)}`,
    '15-skip-next': html`${unsafeSVG(svg15skipnext)}`,
    '15-skip-next-filled': html`${unsafeSVG(svg15skipnextfilled)}`,
    '15-skip-previous': html`${unsafeSVG(svg15skipprevious)}`,
    '15-skip-previous-filled': html`${unsafeSVG(svg15skippreviousfilled)}`,
    '16-command-available': html`${unsafeSVG(svg16commandavailable)}`,
    '16-command-in': html`${unsafeSVG(svg16commandin)}`,
    '16-command-no': html`${unsafeSVG(svg16commandno)}`,
    '16-command-partial': html`${unsafeSVG(svg16commandpartial)}`,
    '16-command-request': html`${unsafeSVG(svg16commandrequest)}`,
    '16-command-shared': html`${unsafeSVG(svg16commandshared)}`,
    '16-command-take': html`${unsafeSVG(svg16commandtake)}`,
    '16-lock': html`${unsafeSVG(svg16lock)}`,
    '17-ship-bulkcarrier': html`${unsafeSVG(svg17shipbulkcarrier)}`,
    '17-ship-carferry': html`${unsafeSVG(svg17shipcarferry)}`,
    '17-ship-container': html`${unsafeSVG(svg17shipcontainer)}`,
    '17-ship-fishing': html`${unsafeSVG(svg17shipfishing)}`,
    '17-ship-highspeed': html`${unsafeSVG(svg17shiphighspeed)}`,
    '17-ship-navy': html`${unsafeSVG(svg17shipnavy)}`,
    '17-ship-offshore': html`${unsafeSVG(svg17shipoffshore)}`,
    '17-ship-passenger': html`${unsafeSVG(svg17shippassenger)}`,
    '17-ship-sailboat': html`${unsafeSVG(svg17shipsailboat)}`,
    '17-ship-sailship': html`${unsafeSVG(svg17shipsailship)}`,
    '17-ship-tanker': html`${unsafeSVG(svg17shiptanker)}`,
    '17-ship-tugboat': html`${unsafeSVG(svg17shiptugboat)}`,
    '17-ship-yacht': html`${unsafeSVG(svg17shipyacht)}`,
    '18-ais-Notcommand': html`${unsafeSVG(svg18aisNotcommand)}`,
    '18-ais-aground': html`${unsafeSVG(svg18aisaground)}`,
    '18-ais-anchor': html`${unsafeSVG(svg18aisanchor)}`,
    '18-ais-fishing': html`${unsafeSVG(svg18aisfishing)}`,
    '18-ais-moored': html`${unsafeSVG(svg18aismoored)}`,
    '18-ais-notunderway': html`${unsafeSVG(svg18aisnotunderway)}`,
    '18-ais-underwaysailing': html`${unsafeSVG(svg18aisunderwaysailing)}`,
    '18-ais-underwayusingengine': html`${unsafeSVG(svg18aisunderwayusingengine)}`,
    '19-analytics': html`${unsafeSVG(svg19analytics)}`,
    '19-current': html`${unsafeSVG(svg19current)}`,
    '19-hide': html`${unsafeSVG(svg19hide)}`,
    '19-limits-attention': html`${unsafeSVG(svg19limitsattention)}`,
    '19-limits-improving': html`${unsafeSVG(svg19limitsimproving)}`,
    '19-limits-inside': html`${unsafeSVG(svg19limitsinside)}`,
    '19-limits-outside-over': html`${unsafeSVG(svg19limitsoutsideover)}`,
    '19-limits-outside-under': html`${unsafeSVG(svg19limitsoutsideunder)}`,
    '19-pilot-onboard': html`${unsafeSVG(svg19pilotonboard)}`,
    '19-speed': html`${unsafeSVG(svg19speed)}`,
    '19-speed-good': html`${unsafeSVG(svg19speedgood)}`,
    '19-speed-high': html`${unsafeSVG(svg19speedhigh)}`,
    '19-speed-low': html`${unsafeSVG(svg19speedlow)}`,
    '19-swell': html`${unsafeSVG(svg19swell)}`,
    '19-temperature': html`${unsafeSVG(svg19temperature)}`,
    '19-time-less': html`${unsafeSVG(svg19timeless)}`,
    '19-time-more': html`${unsafeSVG(svg19timemore)}`,
    '19-trend-down': html`${unsafeSVG(svg19trenddown)}`,
    '19-trend-up': html`${unsafeSVG(svg19trendup)}`,
    '19-trophy': html`${unsafeSVG(svg19trophy)}`,
    '19-view': html`${unsafeSVG(svg19view)}`,
    '19-wave': html`${unsafeSVG(svg19wave)}`,
    '19-weather': html`${unsafeSVG(svg19weather)}`,
    '20-cell-bad': html`${unsafeSVG(svg20cellbad)}`,
    '20-cell-full': html`${unsafeSVG(svg20cellfull)}`,
    '20-cell-low': html`${unsafeSVG(svg20celllow)}`,
    '20-cell-medium': html`${unsafeSVG(svg20cellmedium)}`,
    '20-cell-off': html`${unsafeSVG(svg20celloff)}`,
    '20-satellite-communication ': html`${unsafeSVG(svg20satellitecommunication)}`,
    '20-sensor-gps-bad': html`${unsafeSVG(svg20sensorgpsbad)}`,
    '20-sensor-gps-full': html`${unsafeSVG(svg20sensorgpsfull)}`,
    '20-sensor-gps-low': html`${unsafeSVG(svg20sensorgpslow)}`,
    '20-sensor-gps-medium': html`${unsafeSVG(svg20sensorgpsmedium)}`,
    '20-sensor-gyro': html`${unsafeSVG(svg20sensorgyro)}`,
    '20-sensor-wind': html`${unsafeSVG(svg20sensorwind)}`,
    'Chart': html`${unsafeSVG(svgChart)}`,
    'Swimming': html`${unsafeSVG(svgSwimming)}`,
    'battery_full': html`${unsafeSVG(svgbatteryfull)}`,
    'kayaking': html`${unsafeSVG(svgkayaking)}`,
    'kitesurfing': html`${unsafeSVG(svgkitesurfing)}`,
    'logo-company': html`${unsafeSVG(svglogocompany)}`,
    'logo-oicl': html`${unsafeSVG(svglogooicl)}`,
    'rowing': html`${unsafeSVG(svgrowing)}`
}
