This module provides several minor modifications to the Foundry interface in order to improve accessibility. 

I won't pretend that it's perfect - there are a lot of places with obvious paths for improvement that I have not taken due to a lack of time or skill. About the best I can say is that I did better than I had expected - this module's goal is more about getting the player experience closer to serviceable by patching obvious holes while we wait for core improvements. My hope is that others with higher power levels will see the terrible job I've done and improve on it. To that end, I've listed some of the known issues and limitations in this readme file- perhaps they can serve as inspiration to someone.

**Code contributions are very, very welcome. This is a side project for me and I am bad at programming. Not only that, but I also do not personally use a screen reader, so I am very dependent on the support of other, more talented individuals in keeping it functional.**

## Features

### Labelled fields

Several static UI elements have been given a label which allows screen readers to determine their function. The affected buttons are: 
 - Scene navigation buttons
 - Macro bar buttons
 - Canvas controls & layer tools
 - Sidebar tab navigation buttons

In addition, all documents within compendiums have a label applied to their directory listing when that compendium is open.

(Note: *IN THEORY*, this should work with modules that add new buttons to these locations, since I didn't hardcode any of the values. No guarantees though.)

#### Known issues & limitations

- There are likely many more buttons which are not labelled. If anyone wants to point me at them I can see if I can hit them too. Static buttons (which are always present) are a lot easier to do but I will try others.
- Here I mostly targeted "lists" of buttons so it's likely some one-offs (like the macro directory button or the scene navigation collapse button) were skipped
- Empty macro "slots" got no label, but I think getting the name of the macro to appear was the most important.

### 'Add Item' Button

If a compendium of the "item" type is open, the module adds a button beside each displayed item. Clicking on the button adds a copy of that item to your character.

(Note: A Foundry Item is a document which is added to an Actor. It encompasses the Pathfinder concepts of feats, actions, effects, ancestries, equipment, etc, not only physical objects.)

#### Known issues & limitations

- It finds your character by checking your user's "assigned" actor, so if you don't have one set, this won't work. You can set one easily, but this creates unfortunate edge cases.
    - If you have several characters (EG- you own a familiar, or an animal companion) you would need to change your assigned actor when adding items to them or the items would be added to your PC.
    - It also makes the feature borderline useless for a GM. 
- This module was designed with the PF2E system in mind, and I would not be surprised if aspects of (if not everything about) the "add item" button didn't work on other systems. If it turns out to be iredeemably broken we should add a setting to disable it for other systems, but I don't have time to test it right now.
  - Even in the PF2E system, I think it's essentially impossible to make the "add item" button work for spells, but it seems to work for everything else at least.
    - Ideally, the button would not appear for spells at all.
  - I'd like to add the "add item" button to the compendium browser and the compendium tab too.
- If the module is enabled in the world, the button shows for all users. It'd be better if the button was governed by a client-side setting so that sighted users could choose to disable it. That said, it's theoretically harmless if not even potentially useful even for them, so that's not so bad.
