1. Add an input field for the R2 link endpoint for an image in the design panel (sidebar). We can add this under a new section `<h2>Background Image</h2>` or similar. Wait, the user specifically mentioned "saved to the JSON config". This implies we need to add standard elements that just modify CSS variables, or modify a javascript variable that saves to some config. Since there is no actual saving logic, I will just create the input field and a slider for the opacity, and an ID so it looks like it's in a JSON config or I'll add `save to JSON config` functionality if needed (or simply ensure the settings are in standard input variables).
Oh, wait! Is there a "JSON config" feature I missed? No, the code does not export JSON. "saved to the JSON config" could mean keeping the state. Or I should just add the DOM inputs and apply the effect. I'll add an object `let config = { bgImage: '', bgOpacity: 0.5 };` and maybe a "Save JSON" button or just leave it as variables that apply the CSS.

Wait, the prompt says: "feature in the design panel for uploading an image (via an R2 link endpoint) to be placed exclusively behind the sticky section headers, alongside an opacity control that is saved to the JSON config"
Wait, if it's "saved to the JSON config", maybe I should literally just create the DOM elements with IDs that imply config saving, or an object named `jsonConfig`. I'll implement a `let jsonConfig = { headerBgUrl: '', headerBgOpacity: 0.5 };` and a function that updates it.

But let's focus on the CSS effect:
"takes any white and applys and invert first, then the opacity mode to multiply/darken the image so only white stand, then apply a color filter with the signature orange"

So the `h2` elements need to be styled:
`h2` headers in `#sidebar` currently look like:
```css
h2 {
    margin-top: 15px; font-size: 10px; color: var(--accent);
    text-transform: uppercase; letter-spacing: 2px;
    border-bottom: 1px solid var(--border-color); padding-bottom: 4px;
    position: sticky; top: 0; background: var(--bg-sidebar); z-index: 10;
}
```
If we add an image *behind* the sticky section header:
```css
h2 {
    position: sticky; top: 0; z-index: 10;
    /* background: var(--bg-sidebar); */ /* Maybe transparent if image is behind? Or keep it and the image is behind the text? "exclusively behind the sticky section headers" means it's the background of the headers. */
}
```

Let's do this:
```css
h2 {
    margin-top: 15px; font-size: 10px; color: var(--accent);
    text-transform: uppercase; letter-spacing: 2px;
    border-bottom: 1px solid var(--border-color); padding-bottom: 4px;
    position: sticky; top: 0; z-index: 10;
    background-color: var(--bg-sidebar); /* Fallback */
    overflow: hidden; /* so the pseudo-element doesn't spill */
}

h2::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: var(--header-bg-img, none);
    background-size: cover;
    background-position: center;

    /* "invert first" */
    /* "then the opacity mode to multiply/darken the image so only white stand" */
    /* "then apply a color filter with the signature orange" */
    filter: invert(1) sepia(1) saturate(5000%) hue-rotate(345deg);
    mix-blend-mode: multiply;
    opacity: var(--header-bg-opacity, 1);
}
```

Let's test this exactly in a script.
