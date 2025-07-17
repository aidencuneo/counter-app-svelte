<script>
    import Chart from 'chart.js/auto';
    import regression from 'regression';
    import { round } from './util.js';
    import { gatherValues } from './data.js';
    import { getRandColour } from './colourUtil.js';

    let { name, timeMode } = $props();

    let canvas = $state();
    let lastChart;

    $effect(() => {
        name, timeMode;

        if (!name)
            return;

        let valuesDict = gatherValues(name);
        let labels = Object.keys(valuesDict);

        // Ascending order
        labels.sort((a, b) => new Date(a) - new Date(b));
        let values = labels.map(x => valuesDict[x]);

        if (lastChart)
            lastChart.destroy();

        lastChart = new Chart(
            canvas,
            {
                type: 'line',
                data: {
                    labels,
                    datasets: [{
                        label: name,
                        data: values,
                        // backgroundColor: getRandColour(),
                    }],
                },
            },
        );

        // // Display details
        // let total = data.reduce((a, b) => a + b, 0);
        // let average = total / data.length;
        // let gradient = regression.linear(data.map((x, i) => [i, x])).equation[0];
        // let gradientSign = gradient < 0 ? '' : '+';

        // totalStatDiv.innerText = 'Total: ' + round(total, 2);
        // averageStatDiv.innerText = 'Average: ' + round(average, 2);
        // maxStatDiv.innerText = 'Max: ' + round(Math.max(...data), 2);
        // gradientStatDiv.innerText = 'Gradient: ' + gradientSign + round(gradient, 2);

        // // Streaks
        // let longestStreak = 0;
        // let currentStreak = 0;
        // let longestZeroStreak = 0;
        // let currentZeroStreak = 0;

        // for (let i = 0; i < data.length; ++i) {
        //     if (data[i]) {
        //         ++currentStreak;
        //         longestStreak = Math.max(longestStreak, currentStreak);
        //         currentZeroStreak = 0;
        //     } else {
        //         ++currentZeroStreak;
        //         longestZeroStreak = Math.max(longestZeroStreak, currentZeroStreak);
        //         currentStreak = 0;
        //     }
        // }

        // longestStreakStatDiv.innerText = 'Longest Streak: ' + longestStreak;
        // currentStreakStatDiv.innerText = 'Current Streak: ' + currentStreak;
        // longestZeroStreakStatDiv.innerText = 'Longest Zero Streak: ' + longestZeroStreak;
        // currentZeroStreakStatDiv.innerText = 'Current Zero Streak: ' + currentZeroStreak;
    });
</script>


<div>Nothing to see here</div>
<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        margin-bottom: 15px;
    }
</style>
