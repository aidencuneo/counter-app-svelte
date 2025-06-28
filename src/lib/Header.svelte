<script>
    import Button from './Button.svelte';

    let { getPage, setPage } = $props();
</script>

<div>
    <Button
        bg={getPage() == 'counters' ? '#a9d4ff' : '#eee'}
        onclick={() => setPage('counters')}
    >
        Counters
    </Button>

    <Button
        bg={getPage() == 'stats' ? '#a9d4ff' : '#eee'}
        onclick={() => setPage('stats')}
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
