var reset = function() {
    d = {};
    d['move'] = 0;
    d['white'] = null;
    d['black'] = null;
    for (var i = 0; i < 6; i++) {
        d["m" + i] = null;
    }
    wave.getState().submitDelta(d);
}

var cell_clicked = function() {
    d = {};
    
    var move = parseInt(wave.getState().get('move'));
    viewer = wave.getViewer().getId();
    if (!wave.getState().get('black')) {
        d['black'] = viewer;
    } else {
        if (wave.getState().get('black') != viewer) {
            return;
        }
    }
    
    clicked = $(this).attr("id");
    for (var i = 0; i < 6; i++) {
        if (wave.getState().get('m' + i) == clicked) {
            return;
        }
    }
    
    d['move'] = move + 1;
    d["m" + (move % 6)] = clicked;
    wave.getState().submitDelta(d);
}

var bind_cells = function() {
    for (var i = 0; i < 9; i++) {
        $("#c" + i).bind('click', cell_clicked);
    }
}

function stateUpdated() {
    var div = document.getElementById('turn');
    if (!wave.getState().get('move')) {
        div.innerHTML = "not yet.";
    } else {
        div.innerHTML = "turn:" + wave.getState().get('move');
    }
    $("b").html("black:" + wave.getState().get('black'));
    $("w").html("white:" + wave.getState().get('white'));
    
    for (var i = 0; i < 9; i++) {
        $("#c" + i).css('backgroundColor', 'Black');
    }

    for (var i = 0; i < 6; i++) {
        var m = wave.getState().get("m" + i);
        if (m) {
            if (i % 2) {
                $("#" + m).css('backgroundColor', 'Red');
            } else {
                $("#" + m).css('backgroundColor', 'Blue');
            }
        }
    }
} 

function init() {
    if (wave && wave.isInWaveContainer()) {
        wave.setStateCallback(stateUpdated);
        bind_cells();
    }
}
