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
    constructor(name) {
        this.id = getId();
        this.characterId = 0;
        this.name = name;
        this.inGame = IN_GAME.ACTIVE;
        this.state = STATE.LIVE;
    }
    static List = [];

    static Get(id) { return this.List.find(i => i.id == id) };

    static Add(player) {
        this.List.push(player);
        storage.run(PLAYERS, this.List.toJson());
        $('players').html("")
        this.List.forEach(i => dom.addPlayer(i));
    }

    static Delete(id) {
        let found = this.Get(id);
        if (found) {
            this.List.remove(found);
            storage.run(PLAYERS, this.List.toJson())
        }
    }

    static Edit() {
        storage.run(PLAYERS, this.List.toJson())
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
            let name = $('.txtName').val();
            if (name.length >= 2) {
                p.name = name;
                Player.Add(p);
            } else {
                // showMessage("خطا", "لطفا نام کاربر را وارد نمایید.", "error");
                // return false;
            }
        }
    },
    {
        selector: '.removePlayer',
        func(e) {
            let id = e.closest(".playerCondition").attr("id");
            Player.Delete(id);
            dom.removePlayer(e);
        }
    },
    {
        selector: '.playerCondition .checkbox input',
        func(e) {
            let id = e.closest(".playerCondition").attr("id");
            let inGame = e.is(':checked');
            let found = Player.Get(id);
            found.inGame = inGame;
            Player.Edit(found);
        }
    }
];




var dom = {
    addPlayer: player => {
        let res = `<div id="${player.id}" class="playerCondition">
                    <a href="#" class="ligthShadow btn ico danger removePlayer">
                        <icon class="disAgree"></icon>
                    </a>
                    <div class="inputBox ligthShadow left">
                        <input type="text" placeholder="نام بازکن" value="${player.name}" disabled>
                    </div>
                    <label for="chk#${player.id}" class="checkbox ligthShadow rigth">
                        <input id="chk#${player.id}" type="checkbox" class="hide" ${player.inGame ? "checked" : "" }>
                        <span class="checkmark"></span>
                    </label>
                </div>`;
        $('.txtName').val("");
        $('players').append(res);
    },
    removePlayer: e => e.parent('.playerCondition').remove()
}

const message = {
    show(title, text, bg) {
        let alert = `
            <div msg=${bg} class='alertBox'>
                <title>${title}</title>
                <p class='txtBox'>${text}</p>
            </div>`;
        $("body").prepend(alert);
    }
}

var on = {
    click: (selector, func) => $("body").delegate(selector, "click", function (e) {
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
function getId() {

    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
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
})

defineMethod("remove", function (i) {
    const index = this.indexOf(i);
    if (index > -1) {
        this.splice(index, 1);
    }
});


