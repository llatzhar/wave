/*
var dump_all = function(object) {
    str = "";
    for (var i in object){
        str = str + i + "=" + object[i] + "\n\n";
    }
    alert(str);
}

var dump_name = function(object) {
    str = "";
    for (var i in object){
        str = str + i + "\n";
    }
    alert(str);
}
*/

var reset = function() {
    d = {};
    d['move'] = 0;
    d['m1'] = null;
    d['m2'] = null;
    d['m3'] = null;
    d['m4'] = null;
    d['m5'] = null;
    d['m6'] = null;
    wave.getState().submitDelta(d);
}

var cell_clicked = function() {
    $(this).css('backgroundColor', 'Yellow');
    
    d = {};
    var move = parseInt(wave.getState().get('move'));
    d['move'] = move + 1;
    d["m" + (move % 6)] = $(this).attr("id");
    wave.getState().submitDelta(delta);
}

$(function() {
    bind_cells();
});

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
    if (wave.getState().get('black')) {
        for (var i = 0; i < 3; i++) {
            $("#" + wave.getState().get('black')[i]).css('backgroundColor', 'Blue');
        }
    } else {
        //document.getElementById('b').innerHTML = "black is null";
    }

    document.getElementById('b').innerHTML = wave.getState().get('arr') + ':' + wave.getState().get('obj');
    if (wave.getState().get('white')) {
        for (var i = 0; i < 3; i++) {
            $("#" + wave.getState().get('black')[i]).css('backgroundColor', 'Red');
        }
    } else {
        document.getElementById('w').innerHTML = "white is null";
    }
} 

function init() {
    if (wave && wave.isInWaveContainer()) {
        wave.setStateCallback(stateUpdated);
    }
}
