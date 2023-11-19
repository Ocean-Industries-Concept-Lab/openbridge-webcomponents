
<script setup lang="ts">
import "openbridge-webcomponents";
import { ref, onMounted, computed } from "vue";
import { type Configuration, ConfigurationZod, type Page, type PalettUrl, type App } from "@/business/model";

interface MenuItem {
    id: string;
    name: string;
    icon: string;
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
            selectedPage.value = config.value?.apps[0].pages[0];
        });
    
});

const briliance = ref("day");

function onBrilianceChange(event: CustomEvent) {
    // set data-ob-theme attribute on html element
    document.documentElement.setAttribute("data-ob-theme", event.detail.value);
    briliance.value = event.detail.value;
};

const showNavigation = ref(false);
const showBrilliance = ref(false);
const showAppMenu = ref(true);

const selectedAppIdx = ref(0);

const app = computed(() => {
    return config.value?.apps[selectedAppIdx.value] ?? null;
});

const appMenu = ref<null | HTMLElement>(null);

const apps = computed((): MenuItem[] => {
    return config.value?.apps.map((a, idx): MenuItem => {
        return {
            id: idx.toString(),
            name: a.name,
            icon: a.appIcon,
        };
    }) ?? [];
});

function onAppSelected(event: CustomEvent) {
    selectedAppIdx.value = parseInt(event.detail.id);
    selectedPage.value = app.value?.pages[0] ?? null;
    showAppMenu.value = false;
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

</script>

<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
        <header>
            <ob-top-bar 
                :title="app?.name"
                :pageName="selectedPage?.name"
                :date="date"
                @menu-button-clicked="showNavigation = !showNavigation; showBrilliance = false; showAppMenu = false"
                @dimming-button-clicked="showBrilliance = !showBrilliance; showNavigation = false; showAppMenu = false"
                @apps-button-clicked="showAppMenu = !showAppMenu; showNavigation = false; showBrilliance = false;"
                        
            ></ob-top-bar>
        </header>
        <main>
            <div class="content">
                <iframe v-if="contentIframeUrl" :src="contentIframeUrl" width="100%" height="100%" frameborder="0"></iframe>
                <ob-navigation-menu v-if="showNavigation && app" class="navigation-menu">
                    <ob-navigation-item v-for="page, i in pages" :key="i" slot="main" :checked="selectedPage === page" :icon="page.icon" :label="page.name" @click="onPageClick(page.url, page)"></ob-navigation-item>
                    
                    <ob-navigation-item slot="footer" icon="03-support" label="Help" @click="onPageClick(app.configurationPage, null)" ></ob-navigation-item>
                    <ob-navigation-item slot="footer" icon="03-settings" label="Settings" @click="onPageClick(app.configurationPage, null)"></ob-navigation-item>
                    <ob-navigation-item slot="footer" icon="08-alert-list" label="Alert" href="#"></ob-navigation-item>
                    
                    <img name="logo" src="https://via.placeholder.com/320x96" alt="logo">
                </ob-navigation-menu>
                <ob-brilliance-menu @brilliance-changed="onBrilianceChange" class="brilliance" v-if="showBrilliance"></ob-brilliance-menu>
                <ob-app-menu class="app-menu" :items.prop="apps" :selectedItemId.prop="selectedAppIdx.toString()"  @app-selected="onAppSelected" v-if="showAppMenu" ref="appMenu"></ob-app-menu>
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
}
</style>
