<script>
    import ChartJS from 'chart.js/auto';
    import regression from 'regression';
    import { round } from './util.js';
    import { getRandColour } from './colourUtil';
    import * as data from './data';
    import { onMount } from 'svelte';
    import { addDays, addYears, today } from './dates.js';

    let { name, startDate, endDate, timeMode, infoElems } = $props();

    let canvas = $state();
    let lastChart;

    const getDateRange = () => {
        if (startDate)
            return [startDate, endDate ?? today()];

        let from = today();
        let to = from;

        if (timeMode === '3days')
            to = addDays(to, -2);
        else if (timeMode === '7days')
            to = addDays(to, -6);
        else if (timeMode === '14days')
            to = addDays(to, -13);
        else if (timeMode === 'thismonth')
            to = addDays(to, -new Date(to).getDate() + 1);
        else if (timeMode === 'lastmonth') {
            from = addDays(to, -new Date(to).getDate());
            to = addDays(from, -new Date(from).getDate() + 1);
        } else if (timeMode === '30days')
            to = addDays(to, -29);
        else if (timeMode === '90days')
            to = addDays(to, -89);
        else if (timeMode === 'thisyear') {
            to = `${new Date(to).getFullYear()}-01-01`;
        } else if (timeMode === 'lastyear') {
            from = `${new Date(to).getFullYear() - 1}-12-31`;
            to = `${new Date(to).getFullYear() - 1}-01-01`;
        } else if (timeMode === '1year')
            to = addYears(to, -1);
        else if (timeMode === '2years')
            to = addYears(to, -2);
        else if (timeMode === 'alltime') {
            from = undefined;
            to = undefined;
        }

        return [from, to];
    }

    const redraw = () => {
        if (lastChart)
            lastChart.destroy();

        if (!name)
            return;

        let [from, to] = getDateRange();
        let valuesDict = data.gatherValues(name, from, to);
        let labels = Object.keys(valuesDict);

        // Ascending order
        labels.sort((a, b) => new Date(a) - new Date(b));
        let values = labels.map(x => valuesDict[x]);

        // Get this counter's colour
        let counter = data.getCounters().find(c => c[0] == name);
        let colour = counter ? counter[1] : getRandColour();

        // Draw graph
        lastChart = new ChartJS(
            canvas,
            {
                type: 'line',
                options: {
                    animation: {
                        // Animate a little quicker (default = 1000)
                        duration: 800,
                    },
                },
                data: {
                    labels,
                    datasets: [{
                        label: name,
                        data: values,
                        backgroundColor: colour,
                        borderColor: colour,
                        pointRadius: 4,
                    }],
                },
            },
        );

        // Display details (if the info elems have loaded)
        if (!infoElems.sum)
            return;

        let sum = values.reduce((a, b) => a + b, 0);
        let average = sum / values.length;
        let gradient = regression.linear(values.map((x, i) => [i, x])).equation[0];
        let gradientSign = gradient < 0 ? '' : '+';

        // Streaks
        let nonZeroCount = 0;
        let longestStreak = 0;
        let currentStreak = 0;
        let longestZeroStreak = 0;
        let currentZeroStreak = 0;

        for (let i = 0; i < values.length; ++i) {
            if (values[i]) {
                ++currentStreak;
                longestStreak = Math.max(longestStreak, currentStreak);
                currentZeroStreak = 0;

                ++nonZeroCount;
            } else {
                ++currentZeroStreak;
                longestZeroStreak = Math.max(longestZeroStreak, currentZeroStreak);
                currentStreak = 0;
            }
        }

        // Display all info
        infoElems.count.innerText = `Count: ${values.length} (${nonZeroCount})`;
        infoElems.count.innerHTML = `Count: ${values.length} (${nonZeroCount})`;
        infoElems.sum.innerHTML = `Sum: ${round(sum, 2)}`;
        infoElems.max.innerHTML = `Max: ${round(Math.max(...values), 2)}`;
        infoElems.average.innerHTML = `Average: ${round(average, 2)}`;
        infoElems.nonZeroAverage.innerHTML = `Non-Zero Average: ${round(sum / nonZeroCount, 2)}`;

        infoElems.longestStreak.innerHTML = `Longest Streak: ${longestStreak}`;
        infoElems.currentStreak.innerHTML = `Current Streak: ${currentStreak}`;
        infoElems.longestZeroStreak.innerHTML = `Longest Zero Streak: ${longestZeroStreak}`;
        infoElems.currentZeroStreak.innerHTML = `Current Zero Streak: ${currentZeroStreak}`;
        infoElems.gradient.innerHTML = `Gradient: ${gradientSign}${round(gradient, 4)}`;
    };

    $effect(() => {
        name, startDate, endDate, timeMode, infoElems;
        redraw();
    });
</script>


<div>
    <canvas bind:this={canvas}></canvas>
</div>

<style>
    canvas {
        margin-bottom: 15px;
    }
</style>
