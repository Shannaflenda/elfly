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

function setB(b) {
	b.collidesAir = true;
	b.collidesGround = true;
	if (b.fragBullet != null) {
		setB(b.fragBullet);
	}
}

Object.keys(Blocks).forEach(b => {
	if (Blocks[b] != null) {
		var block = Blocks[b];
		if (block.category == Category.turret){
			if (block.targetAir != null) {
				block.targetAir = true;
				block.targetGround = true;
			}
			if (block.ammoTypes != null){
				block.ammoTypes.each((k, v) => {
					setB(v);
				});
			}
			if (block.shootType != null){
				setB(block.shootType);
			}
		}
	}
});
