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

// Reset values
var reset = function() {
    wave.getState().submitDelta({'move': 0});
    wave.getState().submitDelta({'black': [null, null, null]});
    wave.getState().submitDelta({'white': [null, null, null]});
}

var cell_clicked = function() {
    $(this).css('backgroundColor', 'Yellow');
    var move = parseInt(wave.getState().get('move'));
    wave.getState().submitDelta({'move': move + 1});

    // test object
    var obj = {};
    obj['1'] = '2';
    wave.getState().submitDelta({'obj': obj});

    // test array
    var ar = [];
    ar[0] = 8;
    ar[1] = 2;
    wave.getState().submitDelta({'arr': ar});

    if (move % 2 == 0) {
        a = wave.getState().get('black');
    } else {
        a = wave.getState().get('white');
    }
    if (!a) {
        a = [null, null, null];
    }
    a[move % 3] = $(this).attr("id");
    if (move % 2 == 0) {
        wave.getState().submitDelta({'black': a});
    } else {
        wave.getState().submitDelta({'white': a});
    }
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
