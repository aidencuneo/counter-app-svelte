<script>
    import Button from './Button.svelte';

    let { page = $bindable() } = $props();
</script>

<div>
    <Button
        bg={page == 'counters' ? '#a9d4ff' : '#eee'}
        onclick={() => page = 'counters'}
    >
        Counters
    </Button>

    <Button
        bg={page == 'stats' ? '#a9d4ff' : '#eee'}
        onclick={() => page = 'stats'}
    >
        Stats
    </Button>
</div>

<style>
    div {
        display: flex;
        text-align: center;
        font-size: 22px;
        user-select: none;
    }
</style>
