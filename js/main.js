const SIDE = {
  MAFIA: "mafia",
  CITY: "city",
};

const STATE = {
  LIVE: "live",
  DIE: "die",
  Election: "election",
  KICK: "kick",
};

const IN_GAME = {
  ACTIVE: true,
  DEACTIVE: false,
};

let mafiaName = ["گادفادر", "مافیا", "جوکر", "دکتر لکتر"];
let cityName = ["شهروند", "دکتر", "کارآگاه", "جان سخت", "شهردار", "حرفه ای"];

const PLAYERS = "players";
const CHARACTERS = "characters";

$(() => {
  clicks.forEach((i) => on.click(i.selector, i.func));

  let list = storage.run(PLAYERS);
  if (list && list.length > 0) {
    Player.List = list.fromJson();
    Player.List.forEach((i) => dom.addPlayer(i));
  }
});

class Player {
  constructor(name) {
    this.id = randomNumber();
    this.characterId = 0;
    this.name = name;
    this.inGame = IN_GAME.ACTIVE;
    this.state = STATE.LIVE;
    this.side = SIDE.MAFIA;
  }
  static List = [];

  static Get(id) {
    return this.List.find((i) => i.id == id);
  }

  static Add(player) {
    this.List.push(player);
    storage.run(PLAYERS, this.List.toJson());
    $("players").html("");
    this.List.forEach((i) => dom.addPlayer(i)); // for show playerName
  }

  static Delete(id) {
    let found = this.Get(id);
    if (found) {
      this.List.remove(found);
      storage.run(PLAYERS, this.List.toJson());
    }
  }

  static Edit() {
    storage.run(PLAYERS, this.List.toJson());
  }
}

class Character {
  constructor(id, name, description, counterAbility, nickname, side) {
    this.id = id || randomNumber();
    this.name = name || "";
    this.description = description || "";
    this.counterAbility = counterAbility || 0;
    this.nickname = nickname || randomName();
    this.side = side || SIDE.MAFIA || SIDE.CITY;
  }
}

const character = new Character(); // object

var characters = [
  (id = character.id),
  (fName = character.name),
  (side = SIDE.MAFIA),
  (nickname = character.nickname),
];
const clicks = [
  {
    selector: ".addPlayer .btn",
    func() {
      let p = new Player();
      let name = $(".txtName").val();
      if (name.length >= 2) {
        p.name = name;
        Player.Add(p);
      } else {
        message.show(
          "خطا",
          ".نام کاربر وارد شده کمتر از حد مجاز می باشد",
          "error"
        );
        let box = $(".alertBox").addClass("active");
        setTimeout(function () {
          box.removeClass("active");
        }, 3000);
        return false;
      }
    },
  },
  {
    selector: ".removePlayer",
    func(e) {
      let id = e.closest(".playerCondition").attr("id");
      Player.Delete(id);
      dom.removePlayer(e);
    },
  },
  {
    selector: ".playerCondition .checkbox input",
    func(e) {
      let id = e.closest(".playerCondition").attr("id");
      let inGame = e.is(":checked");
      let found = Player.Get(id);
      found.inGame = inGame;
      Player.Edit(found);
    },
  },

  {
    selector: "backWard , .closeBtn",
    func(e) {
      $("backward").removeClass("active");
      $(".alertBox").addClass("hide");
    },
  },

  {
    selector: ".next",
    func(e) {
      nextPage(e);
      // checkCondition();
    },
  },
  {
    selector: ".prev",
    func(e) {
      prevPage(e);
    },
  },
  {
    selector: ".btn.cancle",
    func(e) {
      cancel(e);
    },
  },
  {
    selector: ".players .next",
    // تابع تک خطی اینطوری باشد
    func(e) {
      dom.smallCard();
      dom.card();
      checkCondition();
      randomName();
    },
  },
  {
    selector: ".card",
    // تابع تک خطی اینطوری باشد
    func: (e) => $(e).toggleClass("selected"),
  },
];

var dom = {
  addPlayer: (player) => {
    let res = `<div id="${player.id}" class="playerCondition">
                    <a href="#" class="ligthShadow btn ico danger removePlayer">
                        <icon class="disAgree"></icon>
                    </a>
                    <div class="inputBox ligthShadow left">
                        <input type="text" placeholder="نام بازکن" value="${
                          player.name
                        }" disabled>
                    </div>
                    <label for="chk#${
                      player.id
                    }" class="checkbox ligthShadow rigth">
                        <input id="chk#${
                          player.id
                        }" type="checkbox" class="hide" ${
      player.inGame ? "checked" : ""
    }>
                        <span class="checkmark"></span>
                    </label>
                </div>`;
    $(".txtName").val("");
    $("players").append(res);
  },
  removePlayer: (e) => e.parent(".playerCondition").remove(),

  smallCard: () => {
    let res = "";
    Player.List.forEach((i) => {
      res += `
      <div id="sc#${i.id}" class="parent">
      <span class="ligthShadow">${i.name}</span>
      <div class="smallCard pending">
        <div class="ImageParent ligthShadow">
          <img src="./Icons/Question.png" alt="">
        </div>
        <div class="caracterName hide">
          <span class="miniTitle">دکترلکتر</span>
        </div>
      </div>
    </div>`;
      $(".smallCaracter").html(res);
    });
  },

  card: () => {
    let res = "";
    Player.List.forEach((i) => {
      res += `
    <div id="${i.id}"  class="card ${character.side}" inGame=${i.inGame}>
    <span class="cardTitle ligthShadow" name=${i.name}>${i.name}</span>
      <div class="caracter">
        <div class="shield">
          <div class="selectedCaracter">
            <img src="./images/${character.side}/${i.id}.png" alt="${character.side}">
          </div>
        </div>
        <div class="nameBox title">
            ${character.nickname}
        </div>
      </div>
    </div>`;
      $(".mainCaracter").html(res);
    });
  },
};

const message = {
  show(title, text, bg) {
    let alert = `
            <div msg=${bg} class='alertBox'>
            <a class="ico closeBtn">
            <icon class='close'></icon>
            </a>
                <title>${title}</title>
                <p class='txtBox'>${text}</p>
            </div>`;
    $("body").prepend(alert);
  },
};

var on = {
  click: (selector, func) =>
    $("body").delegate(selector, "click", function (e) {
      if (func) func($(this));
    }),
};

const storage = {
  run(key, value) {
    if (value != null) localStorage.setItem(key, value);
    return localStorage.getItem(key);
  },
  remove: (key) => localStorage.removeItem(key),
};
function getId() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

function defineMethod(name, func) {
  Object.defineProperty(Object.prototype, name, {
    value: func,
    writable: true,
    configurable: true,
  });
}

defineMethod("toJson", function () {
  return JSON.stringify(this);
});

defineMethod("fromJson", function () {
  return JSON.parse(this);
});

defineMethod("remove", function (i) {
  const index = this.indexOf(i);
  if (index > -1) {
    this.splice(index, 1);
  }
});

const nextPage = (btn) => {
  let page = btn.closest("page");
  let pnlBtn = btn.parent().addClass("hide");
  let next = page.next("page").attr("active", true);
  let prev = page.removeAttr("active");
  let btns = page
    .next()
    .find(".panelEvent, .parentBtns ,.pnlBtns")
    .removeClass("hide");
};

const prevPage = (btn) => {
  let page = btn.closest("page");
  // if (btn.hasClass("cancle")) {
  //   message.show("هشدار", "آیا می خواهید از بازی خارج شوید؟", "pending");
  //   $(".modal").addClass("active");
  //   return false;
  // }

  let pnlBtn = btn
    .closest("page")
    .prev()
    .find(".panelEvent")
    .removeClass("hide");
  let item = page.removeAttr("active");
  let prev = page.prev().attr("active", true);
  let next = page.next().removeAttr("active");
};

const cancel = (btn) => {
  let page = btn.closest("page");
  let welcomePage =
    btn.closest(".pagesParent").find(".welcome").attr("active", "true") &&
    btn
      .closest(".pagesParent")
      .find(".welcome .welcomePage ")
      .removeClass("hide");
  let here = btn.closest("page").removeAttr("active");
};

function randomNumber(maxLimit = 7) {
  let rand = Math.random() * maxLimit;
  rand = Math.floor(rand);
  return rand;
}

const checkCondition = () => {
  let state = false;
  Player.List.forEach((i) => {
    if ($(`.card[inGame=${state}]`).length > 0) {
      $(`.card[inGame=${state}]`).addClass("hide");
    }
  });
};

function randomName(name) {
  Player.List.forEach((i) => {
    if (i.inGame == true)
      mafiaName[Math.floor(Math.random() * mafiaName.length)];
    return name;
  });
}
