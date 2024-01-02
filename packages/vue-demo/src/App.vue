
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { type Configuration, ConfigurationZod, type Page, type PalettUrl, type App } from "@/business/model";
import TopBar from "openbridge-webcomponents-vue/components/top-bar/TopBar";
import NavigationMenu from "openbridge-webcomponents-vue/components/navigation-menu/NavigationMenu";
import "openbridge-webcomponents/dist/components/navigation-item/navigation-item.js";
import Obi03Support from "openbridge-webcomponents-vue/icons/Obi03Support";
import Obi03Settings from "openbridge-webcomponents-vue/icons/Obi03Settings";
import BrillianceMenu from "openbridge-webcomponents-vue/components/brilliance-menu/BrillianceMenu";
import AppMenu from "openbridge-webcomponents-vue/components/app-menu/AppMenu";
import ObcAlertTopbarElement from "openbridge-webcomponents-vue/components/alert-topbar-element/ObcAlertTopbarElement";
import AlertMenu from "openbridge-webcomponents-vue/components/alert-menu/AlertMenu";
import AlertMenuItem from "openbridge-webcomponents-vue/components/alert-menu-item/AlertMenuItem";
import NotificationMessageItem from "openbridge-webcomponents-vue/components/notification-message-item/NotificationMessageItem";

import "openbridge-webcomponents/dist/icons/icon-14-alarm-unack"

import {AlertType} from "openbridge-webcomponents/dist/types"

if (import.meta.env.PROD) {
    //@ts-expect-error TS2306
     import("openbridge-webcomponents/dist/icons/index.js");
}


const date = ref(new Date().toISOString());

const config = ref<null | Configuration>(null);
onMounted(() => {
    // update date every second
    setInterval(() => {
        date.value = new Date().toISOString();
    }, 1000);

    // get config url from query string
    const urlParams = new URLSearchParams(window.location.search);
    const configUrl = urlParams.get("configUrl") ?? import.meta.env.BASE_URL+ "config.json";

    // load config from url
    fetch(configUrl)
        .then((response) => response.json())
        .then((configData) => {
            config.value = ConfigurationZod.parse(configData);
            app.value = config.value?.apps[0];
            selectedPage.value = config.value?.apps[0].pages[0];
        });
    
    //@ts-expect-error TS2306
    import("openbridge-webcomponents/dist/icons/index.js");
});

function icon2element(icon: string, slot?: string): string {
    icon = "obi-" + icon;
    return `<${icon} slot="${slot}"></${icon}>`;
}

const briliance = ref("day");

function onBrilianceChange(event: CustomEvent) {
    // set data-obc-theme attribute on html element
    document.documentElement.setAttribute("data-obc-theme", event.detail.value);
    briliance.value = event.detail.value;
};

const showNavigation = ref(false);
const showBrilliance = ref(false);
const showAppMenu = ref(false);
const showAlertMenu = ref(false);

function hideAll() {
    showNavigation.value = false;
    showBrilliance.value = false;
    showAppMenu.value = false;
    showAlertMenu.value = false;
}

const app = ref<null | App>(null);

const appMenu = ref<null | HTMLElement>(null);

function onAppSelected(selectedApp: App) {
    app.value = selectedApp;
    selectedPage.value = app.value?.pages[0] ?? null;
    showAppMenu.value = false;
    appSearch.value = "";
}


const pages = computed(() => {
    return app.value?.pages;
});

const selectedPage = ref<null | Page>(null);
const url = ref<null | PalettUrl>(null);

function onPageClick(u: PalettUrl, p: Page | null) {
    selectedPage.value = p;
    url.value = u;
    showNavigation.value = false;
}

const contentIframeUrl = computed(() => {
    if (!selectedPage.value) {
        return null;
    }
    const u = selectedPage.value.url;
    const palette = briliance.value;
    if (palette === "day") {
        return u.dayUrl;
    } else if (palette === "night") {
        return u.nightUrl;
    } else if (palette === "dusk") {
        return u.duskUrl;
    } else {
        return u.brightUrl;
    }
});

const appSearch = ref("");

function onAppSearchChange(event: CustomEvent) {
    appSearch.value = (event.detail as string);
}

const filteredApps = computed(() => {
    if (!config.value) {
        return [];
    }
    return config.value.apps.filter((a) => a.name.toLowerCase().includes(appSearch.value.toLowerCase()));
});

</script>

<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
        <header>
            <TopBar 
                :app-title="app?.name"
                :page-name="selectedPage?.name"
                :date="date"
                @menu-button-clicked="hideAll(); showNavigation = !showNavigation;"
                @dimming-button-clicked="hideAll(); showBrilliance = !showBrilliance;"
                @apps-button-clicked="hideAll(); showAppMenu = !showAppMenu;"
                show-apps-button
                show-dimming-button
                show-clock
                wide-menu-button
            >
            <template #alerts>
                <obc-alert-topbar-element :n-alerts="2" :max-width="480" :alert-type="AlertType.Alarm" @alertclick="hideAll(); showAlertMenu = !showAlertMenu;">
                        <notification-message-item time="2024-01-02T12:53:05Z">
                            <obi-14-alarm-unack slot="icon" use-css-color></obi-14-alarm-unack>
                            <div slot="message">This is a message</div>
                        </notification-message-item>
                </obc-alert-topbar-element>
            </template>
            </TopBar>
        </header>
        <main>
            <div class="content">
                <iframe v-if="contentIframeUrl" :src="contentIframeUrl" width="100%" height="100%" frameborder="0"></iframe>
                <NavigationMenu v-if="showNavigation && app" class="navigation-menu">
                    <obc-navigation-item v-for="page in pages" :key="page.name + page.url" slot="main" :checked="selectedPage === page" :icon="page.icon" :label="page.name" @click="onPageClick(page.url, page)" v-html="icon2element(page.icon, 'icon')">
                    </obc-navigation-item>
                    
                    <template #footer>
                    <obc-navigation-item label="Help" @click="onPageClick(app.helpPage, null)" >
                        <obi-03-support slot="icon"></obi-03-support>
                    </obc-navigation-item>
                    <obc-navigation-item label="Settings" @click="onPageClick(app.configurationPage, null)">
                        <obi-03-settings slot="icon"></obi-03-settings>
                    </obc-navigation-item>
                    <obc-navigation-item label="Alert" href="#">
                        <obi-14-alerts slot="icon"></obi-14-alerts>
                    </obc-navigation-item>
                    </template>
                    
                    
                    <img name="logo" src="https://via.placeholder.com/320x96" alt="logo">
                </NavigationMenu>
                <BrillianceMenu @brilliance-changed="onBrilianceChange" class="brilliance" v-if="showBrilliance"></BrillianceMenu>
                <AppMenu class="app-menu"  @search="onAppSearchChange" v-if="showAppMenu" ref="appMenu">
                    <obc-app-button v-for="a, i in filteredApps" :key="i" :icon="a.appIcon" :label="a.name" @click="() => onAppSelected(a)" :checked="a === app" v-html="icon2element(a.appIcon, 'icon')">
                    </obc-app-button>
                </AppMenu>
                <AlertMenu v-if="showAlertMenu" class="alert-menu">
                    <AlertMenuItem message="This is a message" time="2024-01-02T12:53:05Z" time-since="1h 2m" :alert-type="AlertType.Alarm" acknowledgeble>
                        <template #icon>
                            <obi-14-alarm-unack use-css-color></obi-14-alarm-unack>
                        </template>
                    </AlertMenuItem>
                </AlertMenu>
            </div>
          </main>
</template>

<style scoped>
header {
    position: relative;
    z-index: 1;
}

.content {
    isolation: isolate;
    position: absolute;
    top: 48px;
    bottom: 0;
    left: 0;
    right: 0;

    .navigation-menu {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
    }

    .brilliance {
        position: absolute;
        top: 4px;
        right: 48px;
        bottom: 0;
    }

    .app-menu {
        position: absolute;
        top: 4px;
        right: 4px;
        bottom: 0;
    }

    .alert-menu {
        position: absolute;
        top: 4px;
        right: 104px;
        bottom: 0;
    }
}
</style>
