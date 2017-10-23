# Instanews Web App
RED Academy Web Development Project 02

## Dev Tasks

### Use CSS3 transitions to show and hide the article abstract on hover
This task has been many hours in development. If content is placed into index.html, the feature will work. If identical content is added via jQuery it will not work. it appears as though content added to the DOM via jQuery cannot be detected by .on(), although I can find no documentation to suggest this and various tests outside of 
this project have been successful. At this point I would say this feature has easily taken more development time than any other single feature on the page.

### Incorporate a combination of jQuery and CSS3-based animation to animate the movement of the header on the <select> change
I mean, in writing, this feature has been implemented. It just doesn't look very nice the way it seems to happen in two stages.

### CSS Reset
I've built the site using both Eric Meyer's CSS Reset and Normalize.css. Eric Meyer's is attractive because it's much shorter, however it's annoying because it resets margin and padding on headings and paragraphs, and for this project the standard margins here worked well. I've removed mention of h2 and p from the reset file because this was the easiest way to fix the problem, but ultimately I should switch back to Normalize or add some more rules about these elements.

### Miscellaneous
- Refine the layout to get it as close as possible to to comps.
- The logo and chooser seems to shift again on the second load.
- Test cross-browser.
- Incorporate a <select> field with custom styles applied (you will need a jQuery plugin for this such as Selectric).
- Re-export the loading spinner with anti-aliasing.
- Switch to full Sass syntax.
- Prevent the creation of extra spans at the bottom of the DOM.
- restyle h2 and p.

## Project Notes

- Another way of avoiding stories with no image would be to try filtering the data before we begin looping over it. Hints for this are .fiter() and .slice().
- Could do something like var data = rawData.results; This may allow me to shorten many other lines of code.



