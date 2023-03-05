const SIDE = {
    MAFIA: "mafia",
    CITY: "city",
};

const STATE = {
    LIVE: "live",
    DIE: "die",
    Election: "election",
    KICK: "kick"
};

const IN_GAME = {
    ACTIVE: true,
    DEACTIVE: false
}

$(() => {
    clicks.forEach(i => on.click(i.selector, i.func));
});

class Player {
    constructor(id, name, inGame, state, characterId) {
        this.id = id || 0;
        this.characterId = characterId || 0;
        this.name = name || "";
        this.inGame = inGame || IN_GAME.ACTIVE;
        this.state = state || STATE.LIVE;
    }
    static List = [];

    static Add(player) {
        this.List.push(player);
    }
}

class Character {
    constructor(id, name, description, counterAbility, nickname, side) {
        this.id = id || 0;
        this.name = name || "";
        this.description = description || "";
        this.counterAbility = counterAbility || 0;
        this.nickname = nickname || "";
        this.side = side || null;
    }
}

var characters = [];

var clicks = [
    {
        selector: '.addPlayer .btn',
        func: () => {
            let p = new Player(1, $('.txtName').val());
            Player.Add(p);
            dom.addPlayer(p);
        }
    },
];

var dom = {
    addPlayer: player => {
        let res = `<div class="playerCondition">
                    <a href="#" class="ligthShadow btn ico danger left">
                        <icon class="disAgree"></icon>
                    </a>
                    <div class="inputBox ligthShadow left">
                        <input type="text" placeholder="نام بازکن" value="${player.name}" disabled>
                    </div>
                    <label class="checkbox ligthShadow rigth">
                        <input type="checkbox" class="hide" checked="checked">
                        <span class="checkmark"></span>
                    </label>
                </div>`;
        $('players').append(res);
    }
}

var on = {
    click: (selector, func) => $("body").delegate(selector, "click", function (e) {
        e.preventDefault();
        if (func) func($(this));
    })
}

function defineMethod(name, func) {
    Object.defineProperty(Object.prototype, name, {
        value: func,
        writable: true,
        configurable: true
    });
}

defineMethod("toJson", function () {
    return JSON.stringify(this);
});

defineMethod("fromJson", function () {
    return JSON.parse(this);
});