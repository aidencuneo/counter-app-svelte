<script>
    let { value = $bindable() } = $props();
</script>

<wrapper>
    <button onclick={() => --value}>－</button>
    <button id="value">{value}</button>
    <button onclick={() => ++value}>＋</button>
</wrapper>

<style>
    wrapper {
        display: flex;
        flex-direction: row;
        font-weight: bold;
        text-align: center;
    }

    button {
        font: inherit;
        color: inherit;
        background: inherit;
        border: none;
        padding-left: 5px;
    }

    #value {
        width: 50px;
    }
</style>
