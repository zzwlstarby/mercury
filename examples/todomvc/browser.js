var hg = require('../../index.js');
var TimeTravel = require('../../time-travel.js');
var document = require('global/document');
var window = require('global/window');
var rafListen = require('./lib/raf-listen.js');
var localStorage = window.localStorage;

var Input = require('./input.js');
var State = require('./state.js');
var Update = require('./update.js');

function App() {
    // load from localStorage
    var storedState = localStorage.getItem('todos-mercury');
    var initialState = storedState ? JSON.parse(storedState) : null;

    var state = State(initialState);
    state.handles.set(hg.handles(Update, state));

    rafListen(state, function onChange(value) {
        localStorage.setItem('todos-mercury',
            JSON.stringify(value));
    });

    return state;
}

App.render = require('./render.js');

var app = App();
window.undo = TimeTravel(app);
hg.app(document.body, app, App.render);

module.exports = App;
