// Add labels to most static UI elements
Hooks.on("ready", () => {
    
    // EXPERIMENTAL - Attempt to mass label everything with a tooltip
    for (const element of document.querySelectorAll("[data-tooltip]")) {
        const labelText = element.getAttribute("data-tooltip");
        element.setAttribute("aria-label", labelText);
    }

    // EXPERIMENTAL - Attempt to mass label everything with alt text
    for (const element of document.querySelectorAll("[alt]")) {
        const labelText = element.getAttribute("alt");
        element.setAttribute("aria-label", labelText);
    }
    
    // EXPERIMENTAL - Attempt to mass label everything with a title
    for (const element of document.querySelectorAll("[title]")) {
        const labelText = element.getAttribute("title");
        element.setAttribute("aria-label", labelText);
    }

    // Add a role description to all draggable elements (Didn't make much difference for Nick)
    for (const element of document.querySelectorAll("[draggable]")) {
        const labelText = "Draggable";
        element.setAttribute("aria-roledescription", labelText);
    }

    // Manually set some labels that are more concise and clear

    // Give labels to the sidebar tabs
    for (const tab of document.querySelectorAll("nav.tabs a")) {
        const labelText = tab.getAttribute("data-tab");
        tab.setAttribute("aria-label", labelText);
    }
    
    // Give labels to the canvas controls
    for (const tool of document.querySelectorAll("nav#controls li")) {
        const labelText = tool.getAttribute("data-tooltip");
        tool.setAttribute("aria-label", labelText);
    }

    // Give labels to the macro bar
    for (const macro of document.querySelectorAll("nav#action-bar li")) {
        const labelText = macro.getAttribute("data-tooltip");
        macro.setAttribute("aria-label", labelText);
    }

    // Give labels to the macro bar
    for (const macro of document.querySelectorAll("nav#action-bar li")) {
        const labelText = macro.getAttribute("data-tooltip");
        macro.setAttribute("aria-label", labelText);
    }
    
    // Give labels to the players list
    for (const playerlist of document.querySelectorAll("ol#player-list")) {
        playerlist.setAttribute("aria-label", "List of Users");
        for (const player of playerlist.querySelectorAll("li.player span.playername")) {
            const labelText = player.getAttribute("data-tooltip");
            player.setAttribute("aria-label", labelText)
        }
    }

    /*

    // Give labels to the scene buttons
    for (const scene of document.querySelectorAll("nav#navigation li")) {
        const labelText = scene.innerText;
        scene.setAttribute("aria-label", labelText);
    }

    */
    
})


Hooks.on("renderActorSheet", () => {
    
    for (const element of document.querySelectorAll("[title]")) {
        const labelText = element.getAttribute("title");
        element.setAttribute("aria-label", labelText);
    }

})