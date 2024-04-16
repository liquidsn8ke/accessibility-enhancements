const NOTIFICATIONSOUND = new Audio("/modules/accessibility-enhancements/assets/open.wav");
const CREATEITEMSOUND = new Audio("/modules/accessibility-enhancements/assets/equip.wav");

Hooks.on("init", () => {
    game.settings.register('accessibility-enhancements', 'enableSoundEffects', {
        name: 'Enable Sound Effects',
        hint: 'Disable to stop the "pop" sound when rendering applications and the rustling sound when items are created.',
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
        onChange: value => { },
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
