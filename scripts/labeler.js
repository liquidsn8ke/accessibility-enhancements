Hooks.on("renderActorSheet", () => {
    
    for (const element of document.querySelectorAll("[title]")) {
        const labelText = element.getAttribute("title");
        element.setAttribute("aria-label", labelText);
    }

})