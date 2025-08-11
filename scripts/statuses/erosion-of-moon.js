Events.on(UnitDamageEvent, event =>{
	
	const unit = event.unit;
	const bullet = event.bullet;
	
	const erosionOfMoon = Vars.content.statusEffect("elfly-erosion-of-moon");
	
	if (unit == null || !unit.hasEffect(erosionOfMoon)) return;
	
	if (bullet.owner != null && bullet.owner instanceof Healthc){
		
		var mul = 0;
		var bulletRealDamage;
		var percent;
		
		if(bullet.owner instanceof Building){
			mul = Vars.state.rules.blockDamage(bullet.team);
		}
		if(bullet.owner instanceof Unit){
			mul = bullet.owner.damageMultiplier * Vars.state.rules.unitDamage(bullet.team);
		}
		bulletRealDamage = bullet.damage * mul;
		percent = Math.min(Math.log1p(bulletRealDamage), 12) * 0.01;
		if(bullet.type.status != erosionOfMoon){
			percent = percent * percent
		}
		unit.damagePierce(unit.maxHealth * percent);
	}
});
