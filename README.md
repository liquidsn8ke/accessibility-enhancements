This module provides several minor modifications to the Foundry interface in order to improve accessibility.

I won't pretend that it's perfect - there are a lot of places with obvious paths for improvement that I have not taken due to a lack of time or skill. About the best I can say is that I did better than I had expected - this module's goal is more about getting the player experience closer to serviceable by patching obvious holes while we wait for core improvements. My hope is that others with higher power levels will see the terrible job I've done and improve on it. To that end, I've listed some of the known issues and limitations in this readme file- perhaps they can serve as inspiration to someone.

**Code contributions are very, very welcome. I do not personally use a screen reader, so any support that can be offered is appreciated.**

# Features

## Labelled fields

Several static UI elements have been given a label which allows screen readers to determine their function. This mostly affects buttons like the sidebar tab buttons or the scene controls, which don't have any inner text to fall back on and so weren't very accessible.

Uses manually chosen labels for some and attempts to fallback automatically generated labels for others. I welcome feedback on labels which are unclear or too long, and any buttons which are missing labels.

(Note: *IN THEORY*, this should work with modules that add new buttons to these locations, since I didn't hardcode any of the values. No guarantees though.)

## Drag & Drop Alternatives

The module provides two new ways to add items to a character that do not require drag and drop.

(Note: A Foundry Item is a document which is added to an Actor. It encompasses the Pathfinder concepts of feats, actions, effects, ancestries, equipment, etc, not only physical objects.)

  - probably only works in Pathfinder 2e
  - requires the core "create new items" permission to be enabled for the user
  - uses the controlled token, and will fall back to the assigned actor if the former is not found. This means that you can theoretically now add items to familiars and animal companions too, if you are able to select their token. This hasn't been tested yet. 
  - doesn't ask which feat slot to place a feat in, nor which spell list, which means it can't be used for spells at all and always puts feats in the "bonus feats" slot.

### Button

If a compendium of items is open, the module adds a button beside each displayed item. Clicking on the button adds a copy of that item to your character.

- I'd like to add the button to the compendium browser and the compendium sidebar tab too.
- If the module is enabled in the world, the button shows for all users. It'd be better if the button was governed by a client-side setting so that sighted users could choose to disable it. That said, it's theoretically harmless if not even potentially useful even for them, so that's not so bad.

### Hotkey

Registers a hotkey (currently 'X') which checks every element beneath the mouse cursor. If any of them correspond to an item document, it tries to add it to the actor in the same way as the above. Unlike the dedicated button, this hotkey supports the compendium browser and the compendium sidebar.

The hotkey cannot be rebound but it can be disabled in the module settings.

- It'd be neat if this would prioritise the screen reader's "focused" element over the hovered one if one was present, but I'm not sure what selector to use for that.

## Audio Feedback

Adds sound cues for certain actions to provide non-visual feedback that they were executed successfully. The sounds can be disabled by a clientside module setting.

### Create Item

Plays a "rummaging" sound on the "createItem" hook. Helps to provide feedback that you successfully added an item to your sheet.

### Render Application

Plays a "ding" sound effect on the "renderApplication" hook. That doesn't cover every time a new window is opened but it does cover a lot, including cases like choiceset popups which were previously not signposted to screen readers at all.

- It would be better if we drew the screenreader's focus to new applications instead, but that's more difficult.
  - Apparently the "sell all treasure" button does this correctly - copy whatever it's doing? Something to do with web dialogs.
