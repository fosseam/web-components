# Dark- / Lightmode Toggle (dali-toggle)

A simple Web Compomponent, short WebCo, for toggle button between Dark and Lightmode.   
To make things simple, we want to follow a Buildless an YOLO approach. This means yo don't local Build-Environment and you can do everything Online, just in your browser. For this we develop the Component inside a dev.html. Before Releasing, we extract the js-module into a .mjs File.

## Files & Meaning:
- dalitoggle.mjs: Javascript Module with Custom-Tag aka WebComponent
- dev.html: To develop stuff YOLO and Buildless. This is the WebCo-Dev inside HTML
- index.html: This a simple sample with a CDN Reference.


## Short Release-History:

- 0.7.5: Initial Commit
- 0.7.6: CleanUp Spyke-Artefacts

## Roadmap:

- Recode to make stuff simpler
- Some Custom-Properties:
  - Size (small, medium, big)  
  - IconDark, IconLight  
- Try it in Vue, React, Svelte & Angular
- (Automatic) UnitTests