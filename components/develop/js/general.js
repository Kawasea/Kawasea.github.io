document.addEventListener('DOMContentLoaded', function() {
    const head = document.getElementsByTagName('head')[0];

    let css = document.createElement('link');
    css.rel = 'stylesheet';
    css.type = 'text/css';

    css.href = 'css/reset.css';
    head.appendChild(css);

    css.href = 'css/style.css';
    head.appendChild(css);
});