require("elfly/units/moony")
require("elfly/units/spawn")
require("elfly/statuses/retaliation")
require("elfly/statuses/erosion-of-moon")
require("elfly/statuses/meltdown-of-sun")
require("elfly/statuses/blessing-of-stars")

Object.keys(Planets).forEach(p =>{if (Planets[p]!=null){Planets[p].alwaysUnlocked = true}})
Object.keys(UnitTypes).forEach(p =>{if (UnitTypes[p]!=null){UnitTypes[p].hidden = false}})
Object.keys(Blocks).forEach(p =>{if (Blocks[p]!=null){Blocks[p].buildVisibility = BuildVisibility.shown}})

function setB(b, h, t) {
	if (b.spawnUnit != null) {
		if (b.spawnUnit.targetAir != null) {
			b.spawnUnit.targetAir = true;
		}
		if (b.spawnUnit.targetGround != null) {
			b.spawnUnit.targetGround = true;
		}
		if (b.spawnUnit.health < 40000) {
			b.spawnUnit.health = Math.floor(Mathf.lerp(0, 40000, Math.log1p(b.spawnUnit.health) / Math.log1p(40000)));
		}
		var f = 0;
		b.spawnUnit.weapons.forEach(w => {
			if (w.bullet.fragBullet != null &&　w.bullet.fragBullet.spawnUnit != null) {
				f = f + 1;
			}
		});
		if (b.spawnUnit.lifetime != null && f == 0 && b.spawnUnit.lifetime < 3600) {
			b.spawnUnit.lifetime = 3600;
		}
		b.spawnUnit.weapons.forEach(w => {
			setB(w.bullet, h, t);
		});
	}else {
		if (b.collidesAir != null) {
			b.collidesAir = true;
		}
		if (b.collidesGround != null) {
			b.collidesGround = true;
		}
		if (b.collidesTiles != null) {
			b.collidesTiles = true;
		}
		var ma = Math.floor(8 * Math.sqrt(h) / t);
		var bd = 0;
		var ad = 0;
		
		if (b.lightning > 0) {
			b.lightningDamage = b.lightningDamage > 0 ? b.lightningDamage : b.damage;
			bd = bd + b.lightningDamage * 20 * b.lightning;
			if (b.lightningDamage < ma) {
				b.lightningDamage = Math.floor(Mathf.lerp(0, ma, Math.log1p(b.lightningDamage) / Math.log1p(ma)));
			}
			ad = ad + b.lightningDamage * 20 * b.lightning;
		}
		if (b.damage > 0) {
			bd = bd + b.damage * 20;
			if (b.damage < ma) {
				b.damage = Math.floor(Mathf.lerp(0, ma, Math.log1p(b.damage) / Math.log1p(ma)));
			}
			ad = ad + b.damage * 20;
		}
		var sma = Math.floor(ma * 2.5);
		if (b.splashDamage > 0) {
			bd = bd + b.splashDamage * b.splashDamageRadius;
			if (b.splashDamage < sma) {
				b.splashDamage = Math.floor(Mathf.lerp(0, sma, Math.log1p(b.splashDamage) / Math.log1p(sma)));
			}
			ad = ad + b.splashDamage * b.splashDamageRadius;
		}
		if (bd > 0) {
			b.buildingDamageMultiplier = Math.floor((b.buildingDamageMultiplier * bd / ad) * 10000) / 10000;
		}
	}
	
	if (b.fragBullet != null) {
		setB(b.fragBullet, h, t);
	}
	if (b.intervalBullet != null) {
		setB(b.intervalBullet, h, t);
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
