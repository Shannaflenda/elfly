const tool = require("elfly/libs/tool");

Events.on(UnitDamageEvent, event =>{
	
	const unit = event.unit;
	const bullet = event.bullet;
	
	const meltdownOfSun = Vars.content.statusEffect("elfly-meltdown-of-sun");
	
	if (unit == null || !unit.hasEffect(meltdownOfSun)) return;
	
	var unitRealHealth = tool.getUnitRealMaxHealth(unit);
	//unit.damagePierce(unitRealHealth * Math.ceil(unit.getDuration(meltdownOfSun) / 60) * 0.01);
	unit.health -= unit.maxHealth * Math.ceil(unit.getDuration(meltdownOfSun) / 60) * 0.01;
	unit.unapply(meltdownOfSun);
});