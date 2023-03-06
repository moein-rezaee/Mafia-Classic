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

const PLAYERS = "players";
const CHARACTERS = "characters";

$(() => {
    clicks.forEach(i => on.click(i.selector, i.func));

    let list = storage.run(PLAYERS);
    if (list && list.length > 0) {
        Player.List = list.fromJson();
        Player.List.forEach(i => dom.addPlayer(i));
    }

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
        storage.run(PLAYERS, this.List.toJson());
        $('players').html("")
        this.List.forEach(i => dom.addPlayer(i));
    }

    static Delete(player) {
        // let res = storage.run(PLAYERS)
        // if (res && res.length > 0) {
        //     this.List =
        // }
        
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

const clicks = [
    {
        selector: '.addPlayer .btn',
        func() {
            let p = new Player();
            p.name = $('.txtName').val();
            Player.Add(p);
        }
    },
    {
        selector: '.removePlayer',
        func(e) {
            dom.removePlayer(e);
            Player.delete(e)
        }
    }
];



var dom = {
    addPlayer: player => {
        let res = `<div class="playerCondition">
                    <a href="#" class="ligthShadow btn ico danger removePlayer">
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
        $('.txtName').val("");
        $('players').append(res);
    },
    removePlayer: e => e.parent('.playerCondition').remove()
}

var on = {
    click: (selector, func) => $("body").delegate(selector, "click", function (e) {
        e.preventDefault();
        if (func) func($(this));
    })
}


const storage = {
    run(key, value) {
        if (value != null)
            localStorage.setItem(key, value);
        return localStorage.getItem(key);
    },
    remove: key => localStorage.removeItem(key)
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