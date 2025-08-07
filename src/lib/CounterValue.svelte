<script>
    import { timeToNum } from './dates';
    import { asID, round } from './util';
    import * as data from './data';

    let { value = $bindable(), date } = $props();

    const changeValue = () => {
        const newValue = prompt('Enter a new value:', value);
        const time = timeToNum(newValue);
        let calculated = undefined;
        let evalVars = '';
        let evalVarNames = {};

        let counters = data.getCounters();
        let values = data.getValues();

        for (let i = 0; i < counters.length; ++i) {
            let varName = asID(counters[i][0]);
            evalVarNames[varName] = (evalVarNames[varName] ?? 0) + 1;

            if (evalVarNames[varName] > 1)
                varName += evalVarNames[varName];

            evalVars += `const ${varName} = ${values[counters[i][0]][date] ?? 0};`;
        }

        try {
            calculated = eval(evalVars + newValue);
        } catch {}

        if (!isNaN(+newValue))
            value = +newValue;
        else if (!isNaN(calculated))
            value = calculated;
        else if (time)
            value = time;
    }
</script>

<wrapper>
    <button onclick={() => --value}>－</button>
    <button id="value" onclick={changeValue}>{round(value, 2)}</button>
    <button onclick={() => ++value}>＋</button>
</wrapper>

<style>
    wrapper {
        display: flex;
        flex-direction: row;
        font-weight: bold;
        text-align: center;
        font-size: 22px;
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
