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

var turn_name = function(move) {
    if (move % 2) {
        return 'white';
    } else {
        return 'black';
    }
}

var cell_clicked = function() {
    d = {};
    var move = parseInt(wave.getState().get('move'));
    var t = turn_name(move);
    viewer = wave.getViewer().getId();
    if (!wave.getState().get(t)) {
        d[t] = viewer;
    } else {
        if (wave.getState().get(t) != viewer) {
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

//http://github.com/llatzhar/wave/raw/master/n.gif
function stateUpdated() {
    if (!wave.getState().get('move')) {
        $('#turn').html = "not yet.";
    } else {
        var move = wave.getState().get('move');
        $('#turn').html = "turn: " + turn_name(move) + "(" + move + ")"
    }
    $("#b").html("black:" + wave.getState().get('black'));
    $("#w").html("white:" + wave.getState().get('white'));
    
    for (var i = 0; i < 9; i++) {
        $("#c" + i).html('<img src="http://github.com/llatzhar/wave/raw/master/n.gif">');
    }

    for (var i = 0; i < 6; i++) {
        var m = wave.getState().get("m" + i);
        if (m) {
            if (i % 2) {
                $("#" + m).html('<img src="http://github.com/llatzhar/wave/raw/master/w.gif">');
            } else {
                $("#" + m).html('<img src="http://github.com/llatzhar/wave/raw/master/b.gif">');
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
