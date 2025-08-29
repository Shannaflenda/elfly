require("elfly/units/moony")
require("elfly/units/spawn")
require("elfly/statuses/retaliation")
require("elfly/statuses/erosion-of-moon")
require("elfly/statuses/meltdown-of-sun")
require("elfly/statuses/blessing-of-stars")

Object.keys(Planets).forEach(p =>{if (Planets[p]!=null){Planets[p].alwaysUnlocked = true}})
Object.keys(UnitTypes).forEach(p =>{if (UnitTypes[p]!=null){UnitTypes[p].hidden = false}})
Object.keys(Blocks).forEach(p =>{if (Blocks[p]!=null){Blocks[p].buildVisibility = BuildVisibility.shown}})
Blocks.scatter.targetGround = true
Blocks.scatter.ammoTypes.each((k, v) => {v.collidesGround = true})
Blocks.scatter.ammoTypes.each((k, v) => {if (v.fragBullet != null){v.fragBullet.collidesGround = true}})
Blocks.ripple.targetAir = true
Blocks.ripple.ammoTypes.each((k, v) => {v.collidesAir = true})
Blocks.ripple.ammoTypes.each((k, v) => {if (v.fragBullet != null){v.fragBullet.collidesAir = true}})

function setB(b, h, t) {
	if (b.spawnUnit != null) {
		if (b.spawnUnit.targetAir != null) {
			b.spawnUnit.targetAir = true;
		}
		if (b.spawnUnit.targetGround != null) {
			b.spawnUnit.targetGround = true;
		}
		if (b.spawnUnit.health < 400000) {
			b.spawnUnit.health = Math.floor(Mathf.lerp(0, 400000, Math.log1p(b.spawnUnit.health) / Math.log1p(400000)));
		}
		var f = 0
		b.spawnUnit.weapons.forEach(w => {
			if (w.bullet.fragBullet != null) {
				f = f + 1;
			}
		});
		if (b.spawnUnit.lifetime != null && f == 0) {
			b.spawnUnit.lifetime = 3600;
		}
		b.spawnUnit.weapons.forEach(w => {
			setB(w.bullet, h, t);
		});
	}
	if (b.collidesAir != null) {
		b.collidesAir = true;
	}
	if (b.collidesGround != null) {
		b.collidesGround = true;
	}
	var ma = Math.floor(8 * Math.sqrt(h) / t);
	if (b.damage < ma) {
		b.damage = Math.floor(Mathf.lerp(0, ma, Math.log1p(b.damage) / Math.log1p(ma)));
	}
	if (b.splashDamage > 0 && b.splashDamage < ma) {
		b.splashDamage = Math.floor(Mathf.lerp(0, ma, Math.log1p(b.splashDamage) / Math.log1p(ma)));
	}
	if (b.fragBullet != null) {
		setB(b.fragBullet, h, t);
	}
}

Object.keys(Blocks).forEach(b => {
	if (Blocks[b] != null) {
		var block = Blocks[b];
		if (block.category == Category.turret){
			if (block.targetAir != null) {
				block.targetAir = true;
			}
			if (block.targetGround != null) {
				block.targetGround = true;
			}
			
			if (block.ammoTypes != null){
				block.ammoTypes.each((k, v) => {
					var health = block.health > 0 ? block.health : block.scaledHealth * block.size * block.size;
					setB(v, health, Math.sqrt((60 / block.reload) * block.shoot.shots * v.reloadMultiplier));
				});
			}
			if (block.shootType != null){
				var health = block.health > 0 ? block.health : block.scaledHealth * block.size * block.size;
				setB(block.shootType, health, Math.sqrt((60 / block.reload) * block.shoot.shots * block.shootType.reloadMultiplier));
			}
		}
	}
});
