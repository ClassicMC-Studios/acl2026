// =============================================
//   MAIN MENU  —  uses moss.js framework only
//   No direct canvas context (c.*) calls
// =============================================

createCanvas(480, 270);

let gameState = "menu";

const COL = {
    bg        : "#0d0d1a",
    titleColor: "#c4b5fd",
    titleStroke: "#7c3aed",
    titleGlow : "rgba(139,92,246,0.15)",
    subtitle  : "#818cf8",
    tagline   : "rgba(167,139,250,0.65)",
    divider   : "rgba(167,139,250,0.35)",
    btnIdle   : "#3b0764",
    btnHover  : "#7c3aed",
    btnBorder : "#7c3aed",
    btnBorderHover: "#c4b5fd",
    btnText   : "#c4b5fd",
    btnTextHover: "#ffffff",
    btnGlow   : "rgba(139,92,246,0.2)",
    ember     : ["#a78bfa","#818cf8","#6ee7b7","#fbbf24"],
    footer    : "rgba(100,100,130,0.55)",
};

let frame      = 0;
let pulseTimer = 0;
let selected   = -1;

const BUTTONS = [
    { label: "PLAY",    sub: "Start your journey",   action: goToGame  },
    { label: "OPTIONS", sub: "Settings & controls",  action: goOptions },
    { label: "CREDITS", sub: "Who made this",        action: goCredits },
];

const BTN_W  = 180;
const BTN_H  = 36;
const BTN_GAP = 46;

function getBtnX() { return canvas.width / 2 - BTN_W / 2; }
function getBtnY(i) {
    const totalH = BUTTONS.length * BTN_H + (BUTTONS.length - 1) * (BTN_GAP - BTN_H);
    const startY = canvas.height / 2 + 10;
    return startY + i * BTN_GAP;
}

// ── embers ────────────────────────────────────
const EMBER_COUNT = 30;
let embers = [];

function spawnEmber() {
    return {
        x    : random(canvas.width),
        y    : canvas.height + 4,
        vx   : (Math.random() - 0.5) * 0.5,
        vy   : -(0.35 + Math.random() * 0.6),
        r    : 1 + Math.random() * 2.5,
        life : 1,
        decay: 0.003 + Math.random() * 0.004,
        col  : COL.ember[random(COL.ember.length)],
    };
}

for (let i = 0; i < EMBER_COUNT; i++) {
    let e = spawnEmber();
    e.y    = random(canvas.height);
    e.life = Math.random();
    embers.push(e);
}

function updateEmbers() {
    for (let e of embers) {
        e.x   += e.vx + Math.sin(frame * 0.03 + e.y * 0.05) * 0.15;
        e.y   += e.vy;
        e.life -= e.decay;
        if (e.life <= 0 || e.y < -10) Object.assign(e, spawnEmber());
    }
}

function drawEmbers() {
    noStroke();
    for (let e of embers) {
        selectColor(e.col);
        circle(e.x, e.y, e.r * e.life, e.life * 0.85);
    }
    strokeActive();
}

// ── starfield ─────────────────────────────────
function drawStars() {
    noStroke();
    for (let s = 0; s < 40; s++) {
        const sx  = (s * 137 + 17) % canvas.width;
        const sy  = (s * 97  + 53) % (canvas.height - 40);
        const bri = 0.1 + 0.08 * Math.sin(frame * 0.02 + s);
        selectColor(`rgba(180,160,255,${bri.toFixed(3)})`);
        circle(sx, sy, 0.7, 1);
    }
    strokeActive();
}

// ── title ─────────────────────────────────────
function drawTitle() {
    const cx  = canvas.width / 2;
    const bob = Math.sin(frame * 0.04) * 2;
    const ty  = 58 + bob;

    // glow
    noStroke();
    for (let g = 5; g > 0; g--) {
        selectColor(COL.titleGlow);
        circle(cx, ty - 8, g * 18, 0.06);
    }
    strokeActive();

    // title
    selectColor(COL.titleColor);
    strokeColor(COL.titleStroke);
    strokeSize(2);
    strokeActive();
    text("MOSS QUEST", cx, ty, "bold 36px sans-serif");

    // subtitle
    selectColor(COL.subtitle);
    noStroke();
    text("A Card Game Adventure", cx, ty + 20, "11px sans-serif");
    strokeActive();

    // divider
    strokeColor(COL.divider);
    strokeSize(1);
    line(cx - 80, ty + 30, cx + 80, ty + 30);
}

// ── buttons ───────────────────────────────────
function drawButtons() {
    const bx = getBtnX();

    for (let i = 0; i < BUTTONS.length; i++) {
        const btn   = BUTTONS[i];
        const by    = getBtnY(i);
        const hover = selected === i;
        const slideX = hover ? -3 : 0;

        // glow
        if (hover) {
            noStroke();
            selectColor(COL.btnGlow);
            rect(bx + slideX - 8, by - 8, BTN_W + 16, BTN_H + 16);
            strokeActive();
        }

        // fill
        noStroke();
        selectColor(hover ? COL.btnHover : COL.btnIdle);
        rect(bx + slideX, by, BTN_W, BTN_H, hover ? 0.97 : 0.85);

        // border
        strokeColor(hover ? COL.btnBorderHover : COL.btnBorder);
        strokeSize(hover ? 2 : 1);
        strokeActive();
        rect(bx + slideX, by, BTN_W, BTN_H);

        // left accent bar
        noStroke();
        selectColor(hover ? COL.btnBorderHover : COL.btnBorder);
        rect(bx + slideX, by, 3, BTN_H, 1);
        strokeActive();

        // main label
        selectColor(hover ? COL.btnTextHover : COL.btnText);
        noStroke();
        text(btn.label, bx + slideX + BTN_W / 2, by + 14, `${hover ? "bold " : ""}13px sans-serif`);

        // sub label
        selectColor(hover ? COL.tagline : "rgba(100,80,140,0.7)");
        text(btn.sub, bx + slideX + BTN_W / 2, by + 27, "8px sans-serif");
        strokeActive();
    }
}

// ── footer ────────────────────────────────────
function drawFooter() {
    const cx = canvas.width / 2;
    selectColor(COL.footer);
    noStroke();
    text("v0.1 ALPHA  ·  moss engine  ·  press ENTER to play", cx, canvas.height - 6, "7px monospace");
    strokeActive();
}

// ── hover detection ───────────────────────────
function updateHover() {
    selected = -1;
    for (let i = 0; i < BUTTONS.length; i++) {
        const by = getBtnY(i);
        if (isInside(mouse, { x: getBtnX() - 6, y: by, width: BTN_W + 12, height: BTN_H })) {
            selected = i;
        }
    }
    canvas.style.cursor = selected >= 0 ? "pointer" : "default";
}

// ── actions ───────────────────────────────────
function goToGame() {
    window.location.href = "./game.html";
}
function goOptions() {
    alert("Options coming soon!");
}
function goCredits() {
    alert("Made with the Moss.js framework.");
}

// ── click & keyboard ──────────────────────────
mouseClicked(function () {
    if (selected >= 0) BUTTONS[selected].action();
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") goToGame();
});

// ── render (called by moss main loop) ─────────
function render() {
    frame++;
    pulseTimer += 0.04;
    updateEmbers();
    updateHover();

    bg(COL.bg);
    drawStars();
    drawEmbers();
    drawTitle();
    drawButtons();
    drawFooter();
}

main();