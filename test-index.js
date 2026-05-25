const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

if (html.includes('--header-bg-img') && html.includes('mix-blend-mode: multiply') && html.includes('filter: invert(1) sepia(1) saturate(10000%) hue-rotate(345deg)')) {
    console.log("CSS looks correct.");
} else {
    console.log("CSS missing features.");
}

if (html.includes('id="header-bg-url"') && html.includes('id="header-opacity-slider"')) {
    console.log("HTML inputs look correct.");
} else {
    console.log("HTML inputs missing.");
}

if (html.includes('jsonConfig') && html.includes('updateHeaderConfig')) {
    console.log("JS looks correct.");
} else {
    console.log("JS missing.");
}
