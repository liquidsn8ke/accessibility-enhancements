
// Function that adds an item to an actor. Needs the actor's ID & the item's UUID.
async function addItemToActor(itemUUID, myActor) {
    // Create item
    const itemData = (await fromUuid(itemUUID)).toObject();
    console.log(itemData);
    itemData.flags = mergeObject(itemData.flags ?? {}, { core: { sourceId: itemUUID } });
    // Add the item
    await myActor.createEmbeddedDocuments("Item", [itemData]);
}

const VALIDITEMS = ["ancestry", "class", "background", "heritage", "equipment", "action", "weapon", "treasure", "kit", "equipment", "container", "consumable", "armor", "feat", "effect"];
const INVALIDITEMS = ["spell"];
const NOTIFICATIONSOUND = new Audio("/modules/accessibility-enhancements/assets/ding.mp3");
const CREATEITEMSOUND = new Audio("/modules/accessibility-enhancements/assets/yoink.mp3");

Hooks.on("init", () => {

    game.settings.register('accessibility-enhancements', 'enableSoundEffects', {
        name: 'Enable Sound Effects',
        hint: 'Disable to stop the "ping" sound on rendered applications.',
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
        onChange: value => {},
    });

    game.settings.register('accessibility-enhancements', 'addItemHotkey', {
        name: 'Enable Hotkey',
        hint: 'Disable to remove the hotkey (Requires refresh to take effect)',
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
        onChange: value => {},
    });
    
    if ( game.settings.get('accessibility-enhancements', 'addItemHotkey') === true ) {
        // Adds a keybinding which can add hovered items to the character sheet.
        window.addEventListener('keydown', event => {
            console.log(event);
            if ( event.code === "KeyX" ) {
                const myActor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
                let itemUUID = "" ;

                const hoveredElement = document.querySelectorAll("li:hover")[0];
                const activeElement = document.querySelectorAll("li:active")[0];
                console.log(hoveredElement, " is hovered")
                console.log(activeElement, " is active")
                let entry = document.querySelectorAll("li:active")[0] || document.querySelectorAll("li:hover")[0];
                console.log(entry);

                if (entry.getAttribute("data-entry-uuid")) {
                    // Compendium browser
                    itemUUID = entry.getAttribute("data-entry-uuid");
                } else if (entry.getAttribute("data-uuid")) {
                    // Compendium sidebar
                    itemUUID = entry.getAttribute("data-uuid");
                } else if (entry.getAttribute("data-document-id")) {
                    // Compendium window
                    const itemID = entry.getAttribute("data-document-id");
                    const sourceCompendium = entry.offsetParent.getAttribute("id").replace("compendium-", "Compendium.");       //Why use good code when bad code do trick
                    itemUUID = sourceCompendium + ".Item." + itemID;
                }
                addItemToActor(itemUUID, myActor);
                /* Attempt to exclude spells
                if (VALIDITEMS.includes(fromUuid(itemUUID).type)) {
                    ui.notifications.info("Item has been added to actor");
                    addItemToActor(itemUUID, myActor);
                } else if (INVALIDITEMS.includes(fromUuid(itemUUID).type)) {
                    ui.notifications.error("This feature does not support spells");
                } else {
                    return;
                }   
                */
            } else {
                return;
            }
        })
    }
})

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

// Add buttons to compendium popout window when it is opened
Hooks.on("renderCompendium", () => {

    console.log("Hook Debug Render Compendium");

    // Incredibly skillful way to check if the compendium's already been yassified
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
                // If the document is an item, also add a button to add it to selected actor (this likely only supports PF2E- should I add a setting to remove it for other systems?)
                if ( entry.classList.contains("item") ) {
                    //Create the button
                    const label = document.createElement("label");
                    label.innerHTML = `<button type="button">Add To Actor</button>`
                    label.setAttribute("style", "max-width: 6rem");
                    entry.appendChild(label);
                    label.firstChild.addEventListener("click", () => {
                        // Gather info
                        const itemID = entry.getAttribute("data-uuid") || entry.getAttribute("data-document-id");                   //This isn't standardised between item types, but checking both gives us coverage
                        const myActor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
                        const sourceCompendium = entry.offsetParent.getAttribute("id").replace("compendium-", "Compendium.");       //Why use good code when bad code do trick
                        console.log(itemID + " button clicked in " + sourceCompendium + " by " + myActor.name);
                        const itemUUID = sourceCompendium + ".Item." + itemID;
                        addItemToActor(itemUUID, myActor);
                    })
                }
            }
            compendium.setAttribute("data-labelled", true);
        }
    }
})

Hooks.on("renderApplication", (element) => {

    console.log("Hook Debug Render Application");

    // Play a sound when a window opens
    if ( element.template !== "systems/pf2e/templates/system/effects-panel.hbs" ) {
        if ( game.settings.get('accessibility-enhancements', 'enableSoundEffects') === true ) {
            NOTIFICATIONSOUND.play();
        }
    }

})
Hooks.on("createItem", () => {

    console.log("Hook Debug Create Item");

    // Play a sound when an item is created
    if ( game.settings.get('accessibility-enhancements', 'enableSoundEffects') === true ) {
        CREATEITEMSOUND.play();
    }

})

Hooks.on("renderActorSheet", () => {

    console.log("Hook Debug Render Actor Sheet");

    for (const element of document.querySelectorAll("[title]")) {
        const labelText = element.getAttribute("title");
        element.setAttribute("aria-label", labelText);
    }

})
