<script>
    import { getRandColour } from './colourUtil';
    import Icon from './Icon.svelte';
    import ColourPicker from 'svelte-awesome-color-picker';

    let { colour = $bindable() } = $props();

    let cpIsOpen = $state(false);
    $inspect(cpIsOpen);

    $effect(() => {
        document.body.style.overscrollBehavior = cpIsOpen ? 'none' : '';
    });
</script>

<div>
    <!-- <input type="color" bind:value={colour}> -->
    <span class="colour-picker">
        <ColourPicker
            bind:hex={colour}
            bind:isOpen={cpIsOpen}
            isAlpha={false}
            --picker-height="25vh"
            --picker-width="50vw"
            --slider-width="25px"
            --picker-indicator-size="25px"
            --picker-z-index="10"
            --focus-color="green"
            --cp-input-color="#121212"
        />
    </span>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <span class="icon" onclick={() => colour = getRandColour()}>
        <Icon>refresh</Icon>
    </span>
</div>

<style>
    div {
        display: flex;
        height: 100%;
    }

    div * {
        width: 100%;
    }

    span.colour-picker {
        padding-top: 3px;
        /* opacity: 0; */
    }

    span.icon {
        min-width: 40px;
        max-width: 40px;
        height: 100%;
        align-self: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>
