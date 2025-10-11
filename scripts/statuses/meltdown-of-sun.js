const tool = require("elfly/libs/tool");

Events.on(UnitDamageEvent, e =>{
	
	const unit = e.unit;
	const bullet = e.bullet;
	const owner = e.bullet.owner;
	
	const meltdownOfSun = Vars.content.statusEffect("elfly-meltdown-of-sun");
	
	if (unit == null || !unit.hasEffect(meltdownOfSun)) return;
	
	var damage = unit.maxHealth * Math.ceil(unit.getDuration(meltdownOfSun) / 60) * 0.01;
	
	unit.health -= damage;
	unit.unapply(meltdownOfSun);
	
	if (owner.block != null && owner.block.name == "elfly-soul-distorter") {
		owner.health += Math.min(damage, owner.maxHealth - owner.health);
	}
});

Events.on(BuildDamageEvent, e =>{
	
	const building = e.build;
	const bullet = e.source.type;
	const owner = e.source.owner;
	
	const meltdownOfSun = Vars.content.statusEffect("elfly-meltdown-of-sun");
		
	if (building == null || bullet.status != meltdownOfSun) return;
	
	var damage = building.maxHealth * Math.ceil(bullet.statusDuration / 60) * 0.01;
	
	building.health -= damage;
	
	if (owner.block != null && owner.block.name == "elfly-soul-distorter") {
		owner.health += Math.min(damage, owner.maxHealth - owner.health);
	}
	
	
});
