const tool = require("elfly/libs/tool");

Events.on(UnitDamageEvent, event =>{
	
	const unit = event.unit;
	const bullet = event.bullet;
	
	const erosionOfMoon = Vars.content.statusEffect("elfly-erosion-of-moon");
	
	if (unit == null || !unit.hasEffect(erosionOfMoon)) return;
	
	if (bullet.owner != null && bullet.owner instanceof Healthc){
		
		var mul = 0;
		var bulletRealDamage;
		var percent;
		var unitRealHealth;
		
		mul = tool.getBulletMultiplier(bullet);
		bulletRealDamage = bullet.damage * mul;
		percent = Math.min(Math.log1p(bulletRealDamage), 12) * 0.01;
		if(bullet.type.status != erosionOfMoon){
			percent = percent * percent
		}
		unitRealHealth = tool.getUnitRealHealth(unit);
		unit.damagePierce(Math.min(unitRealHealth * percent, bulletRealDamage * 15));
	}
});
