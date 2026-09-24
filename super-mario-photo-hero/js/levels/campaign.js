(function() {
  var stages = [
    { label: '1-1 草原启程', background: '#7974FF', exit: 204, music: 'overworld' },
    { label: '1-2 地下通道', background: '#111827', exit: 137, music: 'underground' },
    { label: '2-1 云端跳跃', background: '#55C7ED', exit: 135, music: 'overworld' },
    { label: '2-2 城堡阶梯', background: '#47334F', exit: 137, music: 'underground' }
  ];

  var toastTimer;

  function makeSprite(image, position, size, speed, frames) {
    return new Mario.Sprite(image, position, size, speed || 0, frames);
  }

  function createExtraLevel(index) {
    var stage = stages[index];
    var underground = stage.music === 'underground';
    level = new Mario.Level({
      playerPos: [56, 192],
      loader: function() { Mario.loadCampaignStage(index, false, false); },
      background: stage.background,
      scrolling: true,
      invincibility: [144, 192, 240],
      exit: stage.exit,
      floorSprite: makeSprite('sprites/tiles.png', underground ? [0,32] : [0,0], [16,16]),
      cloudSprite: makeSprite('sprites/tiles.png', [0,320], [48,32]),
      wallSprite: makeSprite('sprites/tiles.png', underground ? [32,32] : [0,16], [16,16]),
      brickSprite: makeSprite('sprites/tiles.png', [16,0], [16,16]),
      brickBounceSprite: makeSprite('sprites/tiles.png', [32,0], [16,16]),
      rubbleSprite: function() { return makeSprite('sprites/items.png', [64,0], [8,8], 3, [0,1]); },
      ublockSprite: makeSprite('sprites/tiles.png', [48,0], [16,16]),
      superShroomSprite: makeSprite('sprites/items.png', [0,0], [16,16]),
      fireFlowerSprite: makeSprite('sprites/items.png', [0,32], [16,16], 20, [0,1,2,3]),
      starSprite: makeSprite('sprites/items.png', [0,48], [16,16], 20, [0,1,2,3]),
      coinSprite: function() { return makeSprite('sprites/items.png', [0,96], [16,16], 6, [0,0,0,0,1,2,1]); },
      bcoinSprite: function() { return makeSprite('sprites/items.png', [0,112], [16,16], 20, [0,1,2,3]); },
      goombaSprite: function() { return makeSprite('sprites/enemy.png', [0,16], [16,16], 3, [0,1]); },
      koopaSprite: function() { return makeSprite('sprites/enemy.png', [96,0], [16,32], 2, [0,1]); },
      pipeLEndSprite: makeSprite('sprites/tiles.png', [0,128], [16,16]),
      pipeREndSprite: makeSprite('sprites/tiles.png', [16,128], [16,16]),
      pipeLMidSprite: makeSprite('sprites/tiles.png', [0,144], [16,16]),
      pipeRMidSprite: makeSprite('sprites/tiles.png', [16,144], [16,16]),
      pipeUpMid: makeSprite('sprites/tiles.png', [0,144], [32,16]),
      pipeSideMid: makeSprite('sprites/tiles.png', [48,128], [16,32]),
      pipeLeft: makeSprite('sprites/tiles.png', [32,128], [16,32]),
      pipeTop: makeSprite('sprites/tiles.png', [0,128], [32,16]),
      flagPoleSprites: [
        makeSprite('sprites/tiles.png', [256,128], [16,16]),
        makeSprite('sprites/tiles.png', [256,144], [16,16]),
        makeSprite('sprites/items.png', [128,32], [16,16])
      ],
      LPipeSprites: [
        makeSprite('sprites/tiles.png', [32,128], [16,16]),
        makeSprite('sprites/tiles.png', [32,144], [16,16]),
        makeSprite('sprites/tiles.png', [48,128], [16,16]),
        makeSprite('sprites/tiles.png', [48,144], [16,16]),
        makeSprite('sprites/tiles.png', [64,128], [16,16]),
        makeSprite('sprites/tiles.png', [64,144], [16,16])
      ],
      cloudSprites: [
        makeSprite('sprites/tiles.png', [0,320], [16,32]),
        makeSprite('sprites/tiles.png', [16,320], [16,32]),
        makeSprite('sprites/tiles.png', [32,320], [16,32])
      ],
      hillSprites: [
        makeSprite('sprites/tiles.png', [128,128], [16,16]),
        makeSprite('sprites/tiles.png', [144,128], [16,16]),
        makeSprite('sprites/tiles.png', [160,128], [16,16]),
        makeSprite('sprites/tiles.png', [128,144], [16,16]),
        makeSprite('sprites/tiles.png', [144,144], [16,16]),
        makeSprite('sprites/tiles.png', [160,144], [16,16])
      ],
      bushSprite: makeSprite('sprites/tiles.png', [176,144], [48,16]),
      bushSprites: [
        makeSprite('sprites/tiles.png', [176,144], [16,16]),
        makeSprite('sprites/tiles.png', [192,144], [16,16]),
        makeSprite('sprites/tiles.png', [208,144], [16,16])
      ],
      qblockSprite: makeSprite('sprites/tiles.png', [384,0], [16,16], 8, [0,0,0,0,1,2,1])
    });

    // Each layout uses the original engine and tiles, with a distinct route.
    if (index === 1) {
      level.putFloor(0, 142);
      [[18,9],[19,9],[20,9],[38,8],[39,8],[40,8],[68,9],[69,9],[70,9],
       [96,7],[97,7],[98,7],[113,9],[114,9]].forEach(function(pos) {
        level.putBrick(pos[0], pos[1], null);
      });
      [[14,2],[28,3],[48,2],[61,4],[83,3],[105,4],[122,2]].forEach(function(pos) {
        level.putPipe(pos[0], 13, pos[1]);
      });
      [[22,7],[23,7],[41,6],[42,6],[72,7],[73,7],[99,5],[100,5],[116,7]].forEach(function(pos) {
        level.putCoin(pos[0], pos[1]);
      });
      [[31,1],[33,2],[35,3],[37,4],[57,1],[59,2],[88,1],[90,2],[92,3],[94,4],
       [114,1],[116,2],[118,3],[120,4]].forEach(function(pos) {
        level.putWall(pos[0], 13, pos[1]);
      });
      [24,44,76,108].forEach(function(x) { level.putGoomba(x,12); });
      [53,101].forEach(function(x) { level.putKoopa(x,11); });
      level.putQBlock(16,9,new Mario.Bcoin([256,144]));
      level.putQBlock(55,9,new Mario.Mushroom([880,144]));
      level.putQBlock(86,9,new Mario.Bcoin([1376,144]));
      level.putFlagpole(131);
    } else if (index === 2) {
      [[0,23],[27,50],[54,77],[81,104],[108,139]].forEach(function(span) {
        level.putFloor(span[0], span[1]);
      });
      [[24,10],[25,10],[51,10],[52,10],[78,10],[79,10],[105,10],[106,10]].forEach(function(pos) {
        level.putBrick(pos[0], pos[1], null);
      });
      [[15,9],[16,9],[36,8],[37,8],[63,9],[64,9],[91,8],[92,8],[119,9],[120,9]].forEach(function(pos) {
        level.putQBlock(pos[0], pos[1], new Mario.Bcoin([pos[0]*16, pos[1]*16]));
      });
      [[24,7],[25,7],[51,7],[52,7],[78,7],[79,7],[105,7],[106,7],
       [39,6],[40,6],[94,6]].forEach(function(pos) { level.putCoin(pos[0], pos[1]); });
      [[7,3],[29,2],[50,3],[74,2],[97,3],[122,2]].forEach(function(pos) {
        level.putCloud(pos[0], pos[1]);
      });
      [18,43,68,96,116].forEach(function(x) { level.putGoomba(x,12); });
      [59,88].forEach(function(x) { level.putKoopa(x,11); });
      level.putFlagpole(129);
    } else {
      level.putFloor(0, 144);
      [[14,1],[16,2],[18,3],[20,4],[22,5],[39,1],[41,2],[43,3],[45,4],
       [65,1],[67,2],[69,3],[71,4],[73,5],[94,1],[96,2],[98,3],[100,4],
       [119,1],[121,2],[123,3],[125,4],[127,5]].forEach(function(pos) {
        level.putWall(pos[0],13,pos[1]);
      });
      [[30,9],[31,9],[32,9],[52,8],[53,8],[54,8],[83,9],[84,9],[85,9],
       [108,8],[109,8],[110,8]].forEach(function(pos) {
        level.putBrick(pos[0],pos[1],null);
      });
      [[11,7],[34,7],[58,6],[78,7],[103,6],[116,7]].forEach(function(pos) {
        level.putCoin(pos[0],pos[1]);
      });
      [[26,2],[48,3],[89,2],[112,3]].forEach(function(pos) { level.putPipe(pos[0],13,pos[1]); });
      [28,36,57,62,87,106,116].forEach(function(x) { level.putGoomba(x,12); });
      [50,80,115].forEach(function(x) { level.putKoopa(x,11); });
      level.putQBlock(33,9,new Mario.Mushroom([528,144]));
      level.putQBlock(55,9,new Mario.Bcoin([880,144]));
      level.putQBlock(108,6,new Mario.Bcoin([1728,96]));
      level.putFlagpole(131);
    }

    music.overworld.pause();
    music.underground.pause();
    music[stage.music].currentTime = 0;
    music[stage.music].play();
  }

  function updateStageUI(index, message) {
    var selector = document.getElementById('stage-select');
    var toast = document.getElementById('stage-toast');
    if (selector) selector.value = String(index);
    if (!toast) return;
    toast.textContent = message || stages[index].label;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function() { toast.classList.remove('is-visible'); }, 1900);
  }

  Mario.currentStageIndex = 0;
  Mario.loadCampaignStage = function(index, resetPlayer, announce, message) {
    index = parseInt(index, 10);
    if (isNaN(index)) index = 0;
    index = Math.max(0, Math.min(stages.length - 1, index));
    Mario.currentStageIndex = index;
    if (resetPlayer) player = new Mario.Player([0,0]);
    fireballs = [];
    updateables = [];
    gameTime = 0;

    if (index === 0) Mario.oneone();
    else createExtraLevel(index);

    player.pos = level.playerPos.slice(0);
    player.vel = [0,0];
    player.acc = [0,0];
    player.jumping = 0;
    player.jumpHeld = false;
    player.canJump = true;
    player.standing = false;
    player.crouching = false;
    player.piping = false;
    player.exiting = false;
    player.noInput = false;
    player.stageTransitionScheduled = false;
    player.noRun();
    player.noCrouch();
    vX = 0;
    if (window.input) input.reset();

    level.stageIndex = index;
    level.stageName = stages[index].label;
    level.loader = function() { Mario.loadCampaignStage(index, false, false); };
    level.nextStage = function() {
      var next = (index + 1) % stages.length;
      var text = index === stages.length - 1 ? '全部关卡完成！重新出发' : '完成本关：' + stages[next].label;
      Mario.loadCampaignStage(next, false, true, text);
    };
    if (announce) updateStageUI(index, message || ('进入 ' + stages[index].label));
    else updateStageUI(index, '');
  };

  document.addEventListener('DOMContentLoaded', function() {
    var selector = document.getElementById('stage-select');
    if (!selector) return;
    selector.addEventListener('change', function() {
      if (player && (player.exiting || player.piping || player.dying)) {
        selector.value = String(Mario.currentStageIndex);
        return;
      }
      if (window.input) input.reset();
      Mario.loadCampaignStage(selector.value, true, true);
    });
  });
})();
