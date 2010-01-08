var reset = function() {
    d = {};
    d['over'] = null;
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
    if (wave.getState().get("over")) {
        return;
    }

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

var HITS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

var is_line = function(stones) {
    for (h = 0; h < HITS.length; h++) {
        if ((stones[0] == HITS[h][0]) &&
            (stones[1] == HITS[h][1]) &&
            (stones[2] == HITS[h][2])) {
            return true;
        }
    }
    return false;
}

var is_over = function() {
    if (!wave.getState().get('move')) {
        return false;
    }

    if (parseInt(wave.getState().get('move')) > 4) {
        var blacks = [];
        blacks[0] = parseInt(wave.getState().get('m0').replace('c', ''));
        blacks[1] = parseInt(wave.getState().get('m2').replace('c', ''));
        blacks[2] = parseInt(wave.getState().get('m4').replace('c', ''));
        $("#debug").html("b=" + blacks[0] + blacks[1] + blacks[2]);
        if (is_line(blacks.sort())) {
            return "black";
        }
    }

    if (parseInt(wave.getState().get('move')) > 5) {
        var whites = [];
        whites[0] = parseInt(wave.getState().get('m1').replace('c', ''));
        whites[1] = parseInt(wave.getState().get('m3').replace('c', ''));
        whites[2] = parseInt(wave.getState().get('m5').replace('c', ''));
        $("#debug").html("b=" + blacks[0] + blacks[1] + blacks[2] + " w=" + whites[0] + whites[1] + whites[2]);
        if (is_line(whites.sort())) {
            return "white";
        }
    }
    return null;
}

function stateUpdated() {
    var move = wave.getState().get('move');
    if (move == null) {
        $("#move").html("not yet.");
        $("#turn").html("black");
    } else {
        $("#move").html(move);
        $("#turn").html(turn_name(move));
    }
    $("#b").html(wave.getState().get('black'));
    $("#w").html(wave.getState().get('white'));
    
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

    if (!wave.getState().get('over')) {
        r = is_over();
        if (r) {
            $("#result").html('winner: ' + r);
            wave.getState().submitDelta({'over': 'over'});
        } else {
            $("#result").html('winner: ');
        }
    }
}

function init() {
    if (wave && wave.isInWaveContainer()) {
        wave.setStateCallback(stateUpdated);
        bind_cells();

        if (wave.getState().get('move') == null) {
            reset();
        }
    }
}
