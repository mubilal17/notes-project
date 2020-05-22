
var script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
document.head.appendChild(script);

function typeset(input, elementId)
{
    MathJax.startup.promise = MathJax.startup.promise
        .then(() =>
        {
            let out = MathJax.tex2chtml(input, { display: false })
            $('#' + elementId).html(out);
            return MathJax.typesetPromise()
        })
        .catch((err) => console.log('Typeset failed: ' + err.message));
    return MathJax.startup.promise;
}

window.typeset = typeset;