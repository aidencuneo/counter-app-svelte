<script>
    import { onMount } from "svelte";
    import { addDays, dateToStr, getDaysInMonth, today } from "./dates";
    import Button from "./Button.svelte";
    import Icon from "./Icon.svelte";

    let { selectedDate = $bindable(), hasButtons = true } = $props();

    let year = $state();
    let month = $state();
    let day = $state();

    let yearSelector = $state();
    let monthSelector = $state();
    let daySelector = $state();

    const changeDate = date => {
        year = '' + date.getFullYear();
        month = '' + (date.getMonth() + 1);
        day = '' + date.getDate();
    }

    const prevDay = () => changeDate(new Date(addDays(selectedDate, -1)));
    const nextDay = () => changeDate(new Date(addDays(selectedDate, 1)))

    onMount(() => changeDate(new Date(selectedDate)));

    $effect(() => {
        // Update selector options
        const date = new Date();
        const daysInMonth = getDaysInMonth(year, month);
        const isCurYear = year == date.getFullYear();
        const isCurMonth = month == date.getMonth() + 1;

        yearSelector.innerHTML = '';
        monthSelector.innerHTML = '';
        daySelector.innerHTML = '';

        let monthLimit = isCurYear ? date.getMonth() + 1 : 12;
        let dayLimit = isCurMonth ? date.getDate() : daysInMonth;

        for (let i = date.getFullYear(); i >= 1970; --i)
            yearSelector.innerHTML += `<option value="${i}">${i}</option>`;

        for (let i = 1; i <= monthLimit; ++i)
            monthSelector.innerHTML += `<option value="${i}">${i}</option>`;

        for (let i = 1; i <= dayLimit; ++i)
            daySelector.innerHTML += `<option value="${i}">${i}</option>`;

        if (month > monthLimit)
            month = '' + monthLimit;

        if (day > dayLimit)
            day = '' + dayLimit;

        // Confirm selected date
        selectedDate = dateToStr(new Date(
            year,
            month - 1,
            day,
        ));
    });
</script>

<div>
    {#if hasButtons}
        <Button bg="#a9d4ff" padding="" onclick={prevDay}>
            <Icon style="font-size: 140%; margin-top: 3px;">chevron_left</Icon>
        </Button>
    {/if}

    <select bind:this={yearSelector} bind:value={year}></select>
    <select bind:this={monthSelector} bind:value={month}></select>
    <select bind:this={daySelector} bind:value={day}></select>

    {#if hasButtons}
        <Button bg="#a9d4ff" padding="" onclick={nextDay} disabled={selectedDate == today()}>
            {#if selectedDate != today()}
                <Icon style="font-size: 140%; margin-top: 3px;">chevron_right</Icon>
            {/if}
        </Button>
    {/if}
</div>

<style>
    div {
        display: flex;
    }

    select {
        text-align: center;
        text-align-last: center;
        padding: 12px 3px;
    }
</style>
