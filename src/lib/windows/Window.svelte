<script>
    let { onHide, children, ...props } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<wrapper onclick={onHide}>
    <inner {...props} onclick={e => e.stopPropagation()}>
        {@render children?.()}
    </inner>
</wrapper>

<style>
    wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(18, 18, 18, 0.25);
        color: #eeeeee;
        z-index: 2;
    }

    inner {
        min-height: 100px;
        min-width: 100px;
        width: 85vw;
        max-height: 85vh;
        margin-bottom: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #121212;
        color: #eeeeee;
        border-radius: 6px;
        box-shadow: 0 0 10px #121212;
        overflow: hidden;
    }
</style>
