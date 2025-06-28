<script>
    import { getLightOrDark } from './colourUtil';

    export let children, onclick, bg;
</script>

<button {onclick} style="background: {bg}; color: color: #{getLightOrDark(bg.substring(1))}">
    {@render children?.()}
</button>

<style>
    button {
        display: block;
        font: inherit;
        border: none;
        padding: 15px;
        width: 100%;
        /* flex-grow: 1; */
        text-align: center;
        user-select: none;
    }
</style>
