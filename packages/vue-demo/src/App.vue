
<script setup lang="ts">
import "openbridge-webcomponents";
import { ref, onMounted, computed } from "vue";
import { type Configuration, ConfigurationZod, type Page, type PalettUrl } from "@/business/model";

const date = ref(new Date().toISOString());

const config = ref<null | Configuration>(null);
onMounted(() => {
    // update date every second
    setInterval(() => {
        date.value = new Date().toISOString();
    }, 1000);

    // get config url from query string
    const urlParams = new URLSearchParams(window.location.search);
    const configUrl = urlParams.get("configUrl") ?? "/config.json";

    // load config from url
    fetch(configUrl)
        .then((response) => response.json())
        .then((configData) => {
            config.value = ConfigurationZod.parse(configData);
            page.value = config.value?.apps[0].pages[0];
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

const app = computed(() => {
    return config.value?.apps[0];
});

const pages = computed(() => {
    return app.value?.pages;
});

const page = ref<null | Page>(null);
const url = ref<null | PalettUrl>(null);

function onPageClick(u: PalettUrl, p: Page | null) {
    page.value = p;
    url.value = u;
    showNavigation.value = false;
}

const contentIframeUrl = computed(() => {
    if (!page.value) {
        return null;
    }
    const u = page.value.url;
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
                :pageName="page?.name"
                :date="date"
                @menu-button-clicked="showNavigation = !showNavigation"
                @dimming-button-clicked="showBrilliance = !showBrilliance"
                        
            ></ob-top-bar>
        </header>
        <main>
            <div class="content">
                <iframe v-if="contentIframeUrl" :src="contentIframeUrl" width="100%" height="100%" frameborder="0"></iframe>
                <ob-navigation-menu v-if="showNavigation && app" class="navigation-menu">
                    <ob-navigation-item v-for="page, i in pages" :key="i" slot="main" :icon="page.icon" :label="page.name" @click="onPageClick(page.url, page)"></ob-navigation-item>
                    
                    <ob-navigation-item slot="footer" icon="03-support" label="Help" @click="onPageClick(app.configurationPage, null)" ></ob-navigation-item>
                    <ob-navigation-item slot="footer" icon="03-settings" label="Settings" @click="onPageClick(app.configurationPage, null)"></ob-navigation-item>
                    <ob-navigation-item slot="footer" icon="08-alert-list" label="Alert" href="#"></ob-navigation-item>
                    
                    <img name="logo" src="https://via.placeholder.com/320x96" alt="logo">
                </ob-navigation-menu>
            
                <ob-brilliance-menu @brilliance-changed="onBrilianceChange" class="brilliance" v-if="showBrilliance"></ob-brilliance-menu>
            </div>
          </main>
</template>

<style scoped>
.content {
    position: absolute;
    top: 50px;
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
        top: 0;
        right: 48px;
        bottom: 0;
    }
}
</style>
