//@input Component.InteractionComponent interactionComponent
//@input Component.ScriptComponent hoverEventReset
//@input SceneObject dropDownMenu

const interactionComp = script.interactionComponent;
let isActive = false;
let isEnabled = false;

const delayedEvent = script.createEvent('DelayedCallbackEvent');
delayedEvent.bind(function() {
    script.dropDownMenu.enabled = false;
});

interactionComp.onHoverStart.add(function() {
    isActive = true;
    check();
});

interactionComp.onHoverEnd.add(function() {
    isActive = false;
    check();
});

init();

function init() {
    script.hoverEventReset.addOnHoverCallback(hoverReset);
}

function setEnabled(curStatus) {
    isEnabled = curStatus;
    check();
}

function hoverReset() {
    if (isEnabled || isActive) {
        isEnabled = false;
        isActive = false;
        delayedEvent.reset(0.1);
        delayedEvent.enabled = true;
    }
}

function check() {
    if (isEnabled || isActive) {
        script.dropDownMenu.enabled = true;
        delayedEvent.enabled = false;
    } else {
        delayedEvent.reset(0.1);
        delayedEvent.enabled = true;
    }
}

script.setEnabled = setEnabled;
