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

})



Hooks.on("renderApplication", (element) => {

    // Play a sound when a window opens
    if ( element.template !== "systems/pf2e/templates/system/effects-panel.hbs" ) {
        if ( game.settings.get('accessibility-enhancements', 'enableSoundEffects') === true ) {
            NOTIFICATIONSOUND.play();
        }
    }

})

Hooks.on("createItem", () => {

    // Play a sound when an item is created
    if ( game.settings.get('accessibility-enhancements', 'enableSoundEffects') === true ) {
        CREATEITEMSOUND.play();
    }

})
