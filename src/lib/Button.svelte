<script>
    import { getLightOrDark } from './colourUtil';

    let { children, onclick, bg, padding, ...props } = $props();
</script>

<button
    {onclick}
    {...props}
    style:background={bg}
    style:color={'#' + getLightOrDark(bg.substring(1))}
    style:padding={(padding ?? 12) + 'px'}
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
