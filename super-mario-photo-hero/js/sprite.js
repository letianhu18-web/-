(function() {
  if (typeof Mario === 'undefined')
    window.Mario = {};

  var Sprite = Mario.Sprite = function(img, pos, size, speed, frames, once) {
    this.pos = pos;
    this.size = size;
    this.speed = speed;
    this._index = 0;
    this.img = img;
    this.once = once;
    this.frames = frames;
    this.renderSize = null;
    this.renderOffset = [0, 0];
    this.faceOverlay = null;
    this.flipX = false;
    this.hidden = false;
  }

  Sprite.prototype.update = function(dt, gameTime) {
    if (gameTime && gameTime == this.lastUpdated) return;
    this._index += this.speed*dt;
    if (gameTime) this.lastUpdated = gameTime;
  }

  Sprite.prototype.setFrame = function(frame) {
    this._index = frame;
  }

  Sprite.prototype.render = function(ctx, posx, posy, vX, vY) {
    if (this.hidden || !this.size[0] || !this.size[1]) return;

    var frame;

    if (this.speed > 0) {
      var max = this.frames.length;
      var idx = Math.floor(this._index);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }

    var x = this.pos[0] + frame*this.size[0];
    var y = this.pos[1];
    var drawSize = this.renderSize || this.size;
    var drawX = Math.round(posx - vX) + this.renderOffset[0];
    var drawY = Math.round(posy - vY) + this.renderOffset[1];

    ctx.save();
    ctx.translate(drawX, drawY);
    if (this.flipX) {
      ctx.translate(drawSize[0], 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(resources.get(this.img), x + (1/3), y + (1/3), this.size[0] - (2/3), this.size[1] - (2/3), 0, 0, drawSize[0], drawSize[1]);
    if (this.faceOverlay) {
      var face = this.faceOverlay;
      var faceImage = resources.get(face.img);
      if (faceImage && faceImage.width > 0 && faceImage.height > 0) {
        ctx.drawImage(faceImage, 0, 0, faceImage.width, faceImage.height, face.x, face.y, face.width, face.height);
      }
    }
    ctx.restore();
  }
})();
