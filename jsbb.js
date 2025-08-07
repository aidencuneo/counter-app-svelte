function compileScript(code, filename) {
    return code;

    let out = '';

    for (let line of code.split('\n'))
        out += line + '\n';

    return out.trim();
}

// Isolate the script portion of a file and compile it
function compileFile(code, filename) {
    if (filename.endsWith('.svelte')) {
        let start = code.indexOf('<script>');
        let end = code.lastIndexOf('</script>');

        return code.substring(0, start)
            + '<script>\n'
            + compileScript(code.substring(start + 8, end), filename)
            + '\n</script>'
            + code.substring(end + 9);
    }

    return compileScript(code, filename);
}

export default function JSBB() {
    // Get name of current directory
    let name = process.cwd().split('/').pop();

    return {
        name: 'jsbb',
        enforce: 'pre',

        transform(code, id) {
            if (!id.endsWith('.svelte') && !id.endsWith('.js') || !id.includes(`${name}/src/`))
                return null;

            if (id.endsWith('Icon.svelte')) {
                console.log(code);
                console.log(compileFile(code, id));
            }

            // return null;

            return {
                code: compileFile(code, id),
            };
        }
    };
}
