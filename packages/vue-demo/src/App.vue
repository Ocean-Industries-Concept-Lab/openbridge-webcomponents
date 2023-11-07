<script setup lang="ts">
import "openbridge-webcomponents";
import { ref } from "vue";

const date = ref(new Date().toISOString());

// update date every second
setInterval(() => {
    date.value = new Date().toISOString();
}, 1000);

const showNavigation = ref(true);
const showBrilliance = ref(true);
</script>

<template>
        <header>
            <ob-top-bar 
                :date="date"
                @menu-button-clicked="showNavigation = !showNavigation"
                @dimming-button-clicked="showBrilliance = !showBrilliance"
                        
            ></ob-top-bar>
        </header>
        <main>
            <div class="content">
                <ob-navigation-menu v-if="showNavigation" class="navigation-menu">
                    <ob-navigation-item slot="main" icon="01-apps" label="Apps" href="#"></ob-navigation-item>
                    <ob-navigation-item slot="main" checked icon="14-alerts" label="Alerts" href="#"></ob-navigation-item>
                    <ob-navigation-item slot="main" icon="04-dimming" label="Dimming" href="#"></ob-navigation-item>
                    
                    <ob-navigation-item slot="footer" icon="03-support" label="Help" href="#"></ob-navigation-item>
                    <ob-navigation-item slot="footer" icon="03-settings" label="Settings" href="#"></ob-navigation-item>
                    <ob-navigation-item slot="footer" icon="08-alert-list" label="Alert" href="#"></ob-navigation-item>
                    
                    <img slot="logo" src="https://via.placeholder.com/320x96" alt="logo">
                </ob-navigation-menu>
            
                <ob-brilliance-menu class="brilliance" v-if="showBrilliance"></ob-brilliance-menu>
            </div>
          </main>
    `
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
