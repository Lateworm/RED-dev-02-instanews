# Instanews Web App

RED Academy Web Development Project 02

## Dev Tasks

The following tasks represent areas of this project that could use further development

### Animate the movement of the header

I mean, in writing, this feature has been implemented. It just doesn't look very nice the way it seems to happen in two stages.

### Miscellaneous

- Incorporate a <select> field with custom styles applied (you will need a jQuery plugin for this such as Selectric).
- Re-export the loading spinner with anti-aliasing.
- Switch to full Sass syntax.
- restyle h2 and p.

## Project Notes

### CSS Reset

I've built the site using both Eric Meyer's CSS Reset and Normalize.css. Eric Meyer's is attractive because it's much shorter, however it's annoying because it resets margin and padding on headings and paragraphs, and for this project the standard margins here worked well. I've removed mention of h2 and p from the reset file because this was the easiest way to fix the problem, but ultimately I should switch back to Normalize or add some more rules about these elements.

### Miscellaneous

- Another way of avoiding stories with no image would be to try filtering the data before we begin looping over it. Hints for this are .fiter() and .slice().
- Could do something like var data = rawData.results; This may allow me to shorten many other lines of code.

