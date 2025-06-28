<script>
    import '@fontsource/material-icons';

    export let children, padding = '0';
</script>

<span {...$$restProps} style="padding: {padding}">
    {@render children?.()}
</span>

<style>
    span {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        vertical-align: middle;
        margin-bottom: 0.11em;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
    }
</style>
