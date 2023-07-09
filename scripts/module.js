Hooks.on("init", () => {

    console.log("Hook Debug Init");

    // Register keybind
    game.keybindings.register("accessibility-tweaks", "addTabIndex", {
        name: "Allow tab cycling",
        hint: "After searching for a document in the compendium tab, press this hotkey to add the tabIndex property to all of the results",
        editable: [],
        onDown: () => {
        },
    });

})

Hooks.on("ready", () => {

    console.log("Hook Debug Ready");
    
    // Give labels to the sidebar tabs
    for (const tab of document.querySelectorAll("nav.tabs a")) {
        const labelText = tab.getAttribute("data-tab");
        tab.setAttribute("aria-label", labelText);
    }

    // Give labels to the scene buttons
    for (const scene of document.querySelectorAll("nav#navigation li")) {
        const labelText = scene.innerText;
        scene.setAttribute("aria-label", labelText);
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
    
})

async function addItemToActor(entry) {
    // Gather info
    const itemID = entry.getAttribute("data-uuid") || entry.getAttribute("data-document-id");
    const myActor = game.user.character;
    const sourceCompendium = entry.offsetParent.getAttribute("id").replace("compendium-", "Compendium.");
    console.log(itemID + " button clicked in " + sourceCompendium + " by " + myActor.name);
    // Create item
    const itemUUID = sourceCompendium + ".Item." + itemID;
    console.log(itemUUID);
    const itemData = (await fromUuid(itemUUID)).toObject();
    console.log(itemData);
    itemData.flags = mergeObject(itemData.flags ?? {}, { core: { sourceId: itemUUID } });
    // Add the item
    await myActor.createEmbeddedDocuments("Item", [itemData]);
}

Hooks.on("renderCompendium", () => {

    console.log("Hook Debug Render Compendium");

    // Half-hearted (non-functional) attempt to check if the compendium's already been labelled (doesn't work)
    for ( const compendium of document.querySelectorAll("div.sidebar-popout.Compendium-sidebar")) {
        const compendiumID = compendium.getAttribute("id").replace("compendium-", "Compendium.");
        if ( compendium.getAttribute("data-labelled") ) {
            continue;
        } else {
            // Add label to entries in the list
            for (const entry of compendium.querySelectorAll(".compendium.directory li")) {
                const labelText = entry.childNodes[3].innerText;
                entry.setAttribute("aria-label", labelText);
                entry.setAttribute("tabindex", 0);
                // If the document is an item, also add a button to add it to selected actor (likely only supports PF2E- should I add a setting to remove it for other systems?)
                if ( entry.classList.contains("item") ) {
                    //Create the button
                    const label = document.createElement("label");
                    label.innerHTML = `<button type="button">Add To Actor</button>`
                    label.setAttribute("style", "max-width: 6rem");
                    entry.appendChild(label);
                    label.firstChild.addEventListener("click", () => addItemToActor(entry))
                }
            }
            compendium.setAttribute("data-labelled", true);
        }
    }
})