<script>
    import { getLightOrDark } from './colourUtil';

    let { children, onclick, bg, padding } = $props();
</script>

<button
    {onclick}
    style:background={bg}
    style:color={'#' + getLightOrDark(bg.substring(1))}
    style:padding={(padding ?? 15) + 'px'}
>
    {@render children?.()}
</button>

<style>
    button {
        display: block;
        font: inherit;
        border: none;
        width: 100%;
        /* flex-grow: 1; */
        text-align: center;
        user-select: none;
    }
</style>
