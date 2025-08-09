<script>
    import '@fontsource/material-icons';

    let { children, padding = '0', ...props } = $props();
</script>

<span {...props} style:padding={padding}>
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
        user-select: none;
    }
</style>
