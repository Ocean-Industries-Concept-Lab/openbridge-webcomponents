<script lang="ts">
    import ObcButton from '../lib/components/ObcButton.svelte';
    import ObcAzimuthThruster from "../lib/navigation-instruments/ObcAzimuthThruster.svelte";
    import {InstrumentState} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/types.js';
    import { ButtonVariant } from "@oicl/openbridge-webcomponents/dist/components/button/button.js";
    import '@oicl/openbridge-webcomponents/src/palettes/variables.css';

    function onButtonClick() {
        console.log('Button clicked');
        
    }
</script>

<ObcButton on:click={onButtonClick} variant={ButtonVariant.Normal} fullWidth>I'm a button
    <div slot="leading-icon">🚀</div>
</ObcButton>
<div class="container">
    <ObcAzimuthThruster angle={70} angleSetpoint={45} state={InstrumentState.inCommand} thrust={60}></ObcAzimuthThruster>
</div>

<style>
    .container {
        height: 200px;
        width: 200px;
    }
</style>