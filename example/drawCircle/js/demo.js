window.onload = function () {
    "use strict";

    var undoManager,
        ctrlLimit,
        circleDrawer,
        btnUndo,
        btnRedo,
        btnClear;

    undoManager = new UndoManager();
    console.log(undoManager);
    circleDrawer = new CircleDrawer("view", undoManager);

    ctrlLimit = document.getElementById("ctrlLimit");
    btnUndo = document.getElementById("btnUndo");
    btnRedo = document.getElementById("btnRedo");
    btnClear = document.getElementById("btnClear");

    function updateUI() {
        btnUndo.disabled = !undoManager.isHasUndo();
        btnRedo.disabled = !undoManager.isHasRedo();
    }
    undoManager.setCallback(updateUI);

    btnUndo.onclick = function () {
        console.log('circleDraw undoManager', undoManager);
        undoManager.undo();
        updateUI();
    };
    btnRedo.onclick = function () {
        undoManager.redo();
        updateUI();
    };
    btnClear.onclick = function () {
        undoManager.clear();
        updateUI();
    };
    var handleLimit = function(l) {
        var limit = parseInt(l, 10);
        if (!isNaN(limit)) {
            undoManager.setLimit(limit);
        }
        updateUI();
    };
    ctrlLimit.onchange = function() {
        handleLimit(this.value);
    };
    ctrlLimit.oninput = function() {
        handleLimit(this.value);
    };

    const oCanvas = document.getElementById('view');
    oCanvas.updateView = function() {
        updateUI();
    }
    
    updateUI();
};
