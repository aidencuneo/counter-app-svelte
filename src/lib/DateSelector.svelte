<script>
    import { onMount } from "svelte";
    import { dateToStr, getDaysInMonth } from "./dates";

    let { selectedDate = $bindable() } = $props();

    let year = $state();
    let month = $state();
    let day = $state();

    let yearSelector = $state();
    let monthSelector = $state();
    let daySelector = $state();

    onMount(() => {
        let date = new Date();

        year = '' + date.getFullYear();
        month = '' + (date.getMonth() + 1);
        day = '' + date.getDate();
    });

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
    <select bind:this={yearSelector} bind:value={year}></select>
    <select bind:this={monthSelector} bind:value={month}></select>
    <select bind:this={daySelector} bind:value={day}></select>
</div>

<style>
    div {
        display: flex;
    }

    select {
        text-align: center;
        text-align-last: center;
        font-size: 22px;
    }
</style>
