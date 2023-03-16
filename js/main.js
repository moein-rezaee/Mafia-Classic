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

const INFINITE = "∞";

const IN_GAME = {
  ACTIVE: true,
  DEACTIVE: false,
};

const PLAYERS = "players";
const CHARACTERS = "characters";
let list = "";
$(() => {
  clicks.forEach((i) => on.click(i.selector, i.func));

  list = storage.run(PLAYERS);
  if (list && list.length > 0) {
    Player.List = list.fromJson();
    Player.List.forEach((i) => dom.addPlayer(i));
  }
  $(".smallCharacter .parent").each(function () {
    console.log($(this).attr("id"));
  });
});

class Player {
  constructor(name) {
    this.id = getId();
    this.characterId = 0;
    this.name = name;
    this.inGame = IN_GAME.ACTIVE;
    this.state = STATE.LIVE;
    this.side = SIDE.CITY;
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
    this.id = id || 0;
    this.name = name || "";
    this.description = description || "";
    this.counterAbility = counterAbility || INFINITE;
    this.nickname = nickname || "";
    this.side = side || "default" || SIDE.CITY;
  }
}




// createCaracter
const DOCTER_LECTER = new Character(
  5,
  "دکتر لکتر",
  "هرشب یک نفر را انتخاب می کند و اگر مورد حمله قرارگیرد، آن نفر نجات پیدا می کند. فقط یک شب می تواند خودش را انتخاب کند.",
  INFINITE,
  "(جراح)",
  SIDE.MAFIA
);

const DIE_HARD = new Character(
  2,
  "جان سخت",
  "دو شب در طول بازی به گرداننده اعلام مکیند که کارت های خارج شده از بازی را برای فردا رو کند یکبار در طول بازی از حمله شبانه درامان است.",
  2,
  "(گورکن)",
  SIDE.CITY
);

const DETECTIVE = new Character(
  1,
  "کارآگاه",
  "هرشب یک نفر را انتخاب میکند و گرداننده به او اعلام میکند که آیا او مافیا هست یا نه!",
  INFINITE,
  "",
  SIDE.CITY
);

const CITYZEN = new Character(
  0,
  "شهروند",
  "قابلیت خاصی ندارد فقط هر روز صحب می کند و رای میگیرد.",
  0,
  "",
  SIDE.CITY
);

const DOCTOR = new Character(
  3,
  "دکتر",
  "هرشب یک نفر را انتخاب می کند و اگر مورد حمله قرارگیرد، آن نفر نجات پیدا می کند. فقط یک شب می تواند خودش را انتخاب کند.",
  INFINITE,
  "",
  SIDE.CITY
);

const GOD_FATHER = new Character(
  8,
  "پدرخوانده",
  "هرشب تصمیم میگیرد مافیا چه کسی را بکشد.",
  INFINITE,
  "(رییس گروه)",
  SIDE.MAFIA
);

const MAFIA = new Character(
  10,
  "مافیا ساده",
  "قابلیت خاصی ندارد فقط هر روز صحب می کند و رای میگیرد.",
  0,
  "",
  SIDE.MAFIA
);

const JOKER = new Character(
  7,
  "جوکر",
  "دو شب در طول بازی یک نفر را انتخاب می کند ، گرداننده گروه آن بازیکن را با کارآگاه برعکس می گوید.",
  2,
  "(شارلاتان)",
  SIDE.MAFIA
);

const SPACIAL = new Character(
  9,
  "حرفه ای",
  "هر شب می تواند یک نفر را انتخاب کند اگر آن شخص مافیا باشد ، مافیا کشته می شود . اگر شهروند باشد ، کلانتر کشته می شود و اگر مستقل را انتخاب کند هیچ اتفاقی نمی افتد.",
  INFINITE,
  "(کلانتر)",
  SIDE.CITY
);
const CONDUCTOR = new Character(
  100,
  "گرداننده",
  "برای انتخاب نقش، اسم بازیکن رو انتخاب کن و سپس نقشش رو انتخاب کن. توجه کن تا زمانی که بازیکن رو از حالت انتخاب در نیاری با انتخاب نقش، نقش بازیکن انتخاب شده عوض میشه.",
  INFINITE,
  "",
  null
);

var characters = [
  CONDUCTOR,
  GOD_FATHER,
  MAFIA,
  JOKER,
  DOCTER_LECTER,
  DETECTIVE,
  DIE_HARD,
  CITYZEN,
  DOCTOR,
  SPACIAL,
];

// endCharacterObjects

// lastMove

class lastMove {
  constructor(id, title, subTitle, rule, show) {
    this.id = id || 0;
    this.title = title || "" || "default";
    this.subTitle = subTitle || "" || "default";
    this.rule = rule || "" || "default";
    this.show = show || true;
  }
}

const lie = new lastMove(
  0,
  "دروغ سیزده",
  "یک دروغ درباره خودش می گوید",
  "و گرداننده یا خدای بازی تایید می کند.مثلا اگر فردی که از بازی خارج می شود شهروند باید می تواند به عنوان دروغ بگوید من مافیا بودم و گرداننده می تواند دروغ را تایید کند.",
  true,
)

const GreenCard = new lastMove(
  1,
  "برگ سبز",
  "غم از دست رفته",
  "یک نفر را انتخاب کن ! فردا از غصه رفتن تو عزادار است و کلا در رای گیری شرکت داده نمی شود",
  true,
)
const MIND = new lastMove(
  2,
  "ذهن زیبا",
  "اگر نقش کسی را دقیق حدس بزند در بازی می ماند.",
  "توجه کنید که حدس زدن یک نقش از بین شهروند ها می تواند فرد را در بازی نگه دارد چون که اگر فردی که کارت را کشیده اگر از اعضای مافیا باشد می تواند با گفتم نقش یکی از هم تیمی هایش یک شب دیگر در بازی بماند و همین یک شب بیشتر ماندن در بازی شاید بازی را به نفع مافیا تمام کند",
  true,
)
const CERMONY = new lastMove(
  3,
  "جشن مافیا",
  "فردا توی روز هیچکس از بازی بیرون نمی رود.",
  "در مورد این کارت باید گفت که این جشن برای مافیا برگزار می شود و فردا فقط صحبت می شود و هیچکس از بازی با رای گیری بیرو نمیرود",
  true,
)
const census = new lastMove(
  4,
  "بخت و اقبال",
  "یک نفر را انتخاب می کند و گرداننده بین این دو بازیکن قرعه مرگ میاندازد و کسی که ببرد تو بازی می ماند.",
  "بخت و اقبال یکی از حساس ترین کارت های حرکت آخر است زیرا اگر مافیا این کارت را بکشد می تواند بازی را به نفع خودش تمام کند، پس از این کارت در بازی های حساس استفاده کنید",
  true,
)
const redCarpet = new lastMove(
  6,
  "فرش قرمز",
  "فردی که فرش قرمز بگیرد فردا مستقیم به دفاعیه می رود.",
  "حتی اگر آن فرد  هیچ رای نداشته باشد فردا در محاکمه می باشد باید دفاع کند و اگر کسی فرش قرمز داشته باشد شهردار بازی در مورد آن تصمیم می گیرد یعنی اگر حتی فردا کسی دیگر وارد دفاع نشود باز هم گرداننده بازی را در خواب نیم روزی برده تا شهردار بازی در مورد فردی که کارت فرش قرمز دارد تصمیم بگیرد",
  true,
)

const lastMoveCards = [
  lie,
  GreenCard,
  MIND,
  CERMONY,
  census,
  redCarpet
]


// end astMove


let playerCharacter = "";
let characterObject = "";
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
    func: (e) => nextPage(e),
  },

  {
    selector: ".prev",
    func: (e) => prevPage(e),
  },

  {
    selector: ".btn.cancle",
    func: (e) => cancel(e),
  },

  {
    selector: ".players .next",
    func(e) {
      if (Player.List.length < 5) {
        message.show(
          "خطا",
          ".حداقل تعداد کاربر وارد شده 5 نفر می باشد",
          "error"
        );
        return false;
      } else {
        $("aboutcard").html("");
        dom.ability(CONDUCTOR.id);
        dom.smallCard();
        dom.card();
      }
      return true;
    },
  },

  {
    selector: ".rules .parent",
    func: (e) => chooseSmallCard(e),
  },
  {
    selector: ".rules .card",
    // تابع تک خطی اینطوری باشد
    func: (e) => selectCard(e),
  },

  {
    selector: ".rules .next",
    func: (e) => dom.gamePlayeItem(e),
  },

  {
    selector: ".gamePlay .item , .gamePlay2 .item",
    func: (e) => gamePlayItem(e),
  },
  {
    selector: ".gamePlay2 .checkbox",
    func: (e) => checkProp(e),
  },
  {
    selector: ".gamePlay .checkbox",
    func(e) {
      checkProp(e);
    },
  },

  {
    selector: "backWard .election .shut",
    func(e) {
      e.closest(".election").addClass("hide");
      e.closest(".election").removeClass("active");
      e.closest("m-content").find(".kick").addClass("active");
      setTimeout(function () {
        dom.finallMove(e);
      })
      electionShut(e);
    },
  },
  {
    selector: "backWard .closeModal",
    func() {
      closeModal();
    },
  },
  {
    selector: ".gamePlay .next",
    func(e) {
      gamePlayItem(e);
      dom.gamePlayeItem(e)

    },
  },
  {
    selector: ".gamePlay2 .item",
    func(e) {
      e.find(".checkbox").toggleClass("hide");
      // gamePlayItem(e)
    },
  },
  {
    selector: ".gamePlay2 #btnTimer",
    func(e) {
      $("backward").toggleClass("hide");
      $("backward .election").removeClass("active");
      $("backward .timer").addClass("active");
      startTime()
    },
  },
  {
    selector: "backWard .exit",
    func(e) {
      $("backward").toggleClass("hide");
      electionExit(e);

    },
  },
];

var dom = {
  addPlayer: (player) => {
    let res = `<div id="${player.id}" class="playerCondition">
                    <a href="#" class="ligthShadow btn ico danger removePlayer">
                        <icon class="disAgree"></icon>
                    </a>
                    <div class="inputBox ligthShadow left">
                        <input type="text" placeholder="نام بازکن" value="${player.name
      }" disabled>
                    </div>
                    <label for="chk#${player.id
      }" class="checkbox ligthShadow rigth">
                        <input id="chk#${player.id
      }" type="checkbox" class="hide" ${player.inGame ? "checked" : ""
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
    Player.List.filter((i) => i.inGame == IN_GAME.ACTIVE).forEach((i) => {
      res += `
      <div id="sc#${i.id}" class="parent">
      <span class="ligthShadow">${i.name}</span>
      <div class="smallCard pending" chID="${i.characterId}">
        <div class="ImageParent ligthShadow">
          <img src="" alt="" onerror="this.src='./images/Question.png'">
        </div>
        <div class="caracterName">
          <span class="miniTitle"></span>
        </div>
      </div>
    </div>`;
      $(".smallCharacter").html(res);
    });
  },
  card: () => {
    let res = "";
    characters
      .filter((i) => i.id != 100)
      .forEach((i) => {
        res += `
    <div id="${i.id}"  class="card ${i.side} big">
      <div class="caracter">
        <div class="shield">
          <div class="selectedCaracter">
            <img src="./images/${i.side}/${i.id}.png" alt="${i.name}">
          </div>
        </div>
        <div class="nameBox title">
            ${i.name}
        </div>
      </div>
    </div>`;
        //اصلاح شود
        $(".mainCharacter").html(res);
      });
  },

  ability: (e) => {
    let res = "";
    characters
      .filter((i) => i.id == e)
      .forEach((i) => {
        res += `
      <ability class=${i.side}>
      <div class="ligthShadow">
        <div class="imageParent">
          <img src="./images/${i.side}/${i.id}.png" alt="${i.name}" onerror="this.src='./images/conductor.png'"/>
        </div>
      </div>
      <div class="box">
        <name>
          <span class='nameCharacter'>${i.name}</span>
          <span>${i.nickname}</span>
        </name>
        <div class="info">
          <span class="nigth"></span>
          <span>${i.counterAbility}</span>
        </div>
      </div>
      <p class="description">
        ${i.description}
      </p>
      </ability>
      `;
        $("aboutCard").html(res);
      });
  },

  gamePlayeItem: (e) => {
    let res = "";
    let id = e.attr("id");
    // let character = characters.find((i) => i.id == id);
    Player.List.filter((i) => i.inGame == IN_GAME.ACTIVE).forEach((i) => {
      res += `
    <div class="item" cardID=${i.characterId} playerID=${i.id}>
      <div class="card ${i.side} unknow">
          <span class="cardTitle ligthShadow">${i.name}</span>
          <div class="caracter">
              <div class="shield">
                  <div class="selectedCaracter">
                      <img src="" alt="" onerror="this.src='./images/Question.png'">
                  </div>
              </div>
              <div class="nameBox title">
                 
              </div>
          </div>
      </div>
      <label class="checkbox ligthShadow hide">
          <input type="checkbox" class="hide" checked="checked">
          <span class="checkmark"></span>
      </label>
  </div>
      `;
      $(".nightCard").html(res);
      $(".choosesCaracter .cards").html(res)
    });
  },

  finallMove: (e) => {
    let i = randomCard();
    let obj = lastMoveCards[i];
    let res = `
      <last>
          <h1 class="titleKick warning">${obj.title}</h1>
          <h3>${obj.subTitle}</h3>
          <div>
              <h2 class='hide'>یک نفر را انتخاب کن</h2>
              <p>
                ${obj.rule}
              </p>
          </div>
        </last>
      `

    $(".kick").html(res);
  }
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
    let box = $(".alertBox").addClass("active");
    setTimeout(function () {
      box.removeClass("active");
    }, 3000);
    return false;
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
  btn.parent().addClass("hide");
  page.next("page").attr("active", true);
  page.removeAttr("active");
  page.next().find(".panelEvent, .parentBtns ,.pnlBtns").removeClass("hide");
};

const prevPage = (btn) => {
  let page = btn.closest("page");
  // if (btn.hasClass("cancle")) {
  //   message.show("هشدار", "آیا می خواهید از بازی خارج شوید؟", "pending");
  //   $(".modal").addClass("active");
  //   return false;
  // }

  btn.closest("page").prev().find(".panelEvent").removeClass("hide");
  page.removeAttr("active");
  page.prev().attr("active", true);
  page.next().removeAttr("active");
};

const cancel = (btn) => {
  btn.closest("page");

  btn.closest(".pagesParent").find(".welcome").attr("active", "true") &&
    btn
      .closest(".pagesParent")
      .find(".welcome .welcomePage ")
      .removeClass("hide");
  btn.closest("page").removeAttr("active");
};

let character = "";

const selectCard = (e) => {
  $(".card.selected").removeClass("selected");
  e.find(".card").addClass("selected");
  e.removeClass("big");

  let id = e.attr("id");
  character = characters.find((i) => i.id == id);
  let side = character.side;
  let card = $(".rules .parent .smallCard.selected");
  if (
    $(".parent .smallCard").hasClass("selected") &&
    e
      .closest(".mainCharacter")
      .children(".card.selected")
      .removeClass("selected")
  ) {
    e.toggleClass("selected");
    e.attr("disabled", "disabled");
    $(".rules .parent .smallCard.selected").attr("chID", id);
    $(".rules .parent .smallCard.selected img").attr(
      "src",
      `./images/${character.side}/${id}.png`
    );
    card.find(".miniTitle").text(`${character.name}`);
    card.find(".miniTitle").addClass(character.side);
    res.characterId = id;
    res.side = side;
    $(
      `.rules .parent .smallCard[chID=${$(".card.selected").attr("id")}]`
    ).addClass(character.side);
    $("ability").addClass(e.SIDE);
    dom.ability(id);
  }
};

let res = "";

const chooseSmallCard = (e) => {
  res = Player.List.find((i) => i.id == e.attr("id").split("#")[1]);
  let smallCard = e.find(".smallCard");
  $(".smallCard.pending.selected").removeClass("selected");
  smallCard.addClass("selected");

  if (e.attr("chID") != $(".card").attr("id")) {
    $(".card").removeClass("selected");
    e.parents("interduce").find(".mainCharacter .card:not('.big')").addClass("disabled");
  }

  if (smallCard.hasClass("selected") != true) {
    smallCard.addClass("selected");
  }
};
let card = "";
const gamePlayItem = (e) => {
  e.closest(".nightCard").find(".item .card:not('.unknow')").addClass("hide");
  card = characters.find((i) => i.id == e.attr("cardID"));
  let res = e.find(".card");
  res.toggleClass("unknow");
  res.attr("disabled", "disabled");
  // e.find(".checkbox").toggleClass("hide");
  if (res.hasClass("unknow")) {
    e.find(".card img").attr("src", "");
    e.find(".card .nameBox").text("");
  } else {
    e.find(".card img").attr("src", `./images/${card.side}/${card.id}.png`);
    e.find(".card .nameBox").text(card.name);
    // $('.item.select').remove()
  }
};

let propCharacter = "";
let palyerID = "";
const checkProp = (e) => {
  let palyerID = e.closest(".item").attr("playerID");
  propCharacter = Player.List.find((i) => i.id == palyerID);
  if (
    e.closest(".item").find("input[type=checkbox]").prop("checked") == false
  ) {
    $("backWard").toggleClass("hide");
  }

  $("backWard .exit").attr("id", palyerID);
  $("backWard .shut").attr("id", palyerID);
};


const electionShut = (e) => {
  e.parents("body").find(`.gamePlay2 .item[playerID=${e.attr("id")}]`).addClass("mafiaDie");
  e.parents("body").find(`.gamePlay2 .item[playerID=${e.attr("id")}]`).attr("disabled", "disabled");
  e.parents("body").find(`.gamePlay2 .item[playerID=${e.attr("id")}] .card`).addClass("disabled");
}

const electionExit = (e) => {
  e.parents("body").find(`.gamePlay2 .item[playerID=${e.attr("id")}]`).addClass("gameOver");
  e.parents("body").find(`.gamePlay2 .item[playerID=${e.attr("id")}]`).attr("disabled", "disabled");
  e.parents("body").find(`.gamePlay2 .item[playerID=${e.attr("id")}] .card`).addClass("disabled");
}

const closeModal = () => {
  $("backward").addClass("hide");
  $(".shut").attr("id", "");
  $(".exit").attr("id", "");
  $(".timer").removeClass("active");
  $(".kick").removeClass("active")
  $(".election").addClass("active")
}


let randomCardIndex = ""
const randomCard = () => {
  randomCardIndex = lastMoveCards[Math.floor(Math.random() * lastMoveCards.length)];
  if (randomCardIndex.show == false) {
    randomCard() // recursiveFunction
    return randomCardIndex.id;
  }
  else {
    randomCardIndex.show = false
    return randomCardIndex.id;
  }

}

// Timer

function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    // minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

const startTime = () => {
  // window.onload = function () {
    var fiveMinutes = 30 * 1,
      display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
  // };
}