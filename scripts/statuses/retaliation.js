Events.on(UnitDamageEvent, event =>{
	
	const unit = event.unit;
	const bullet = event.bullet;
	
	const retaliation = Vars.content.statusEffect("elfly-retaliation");
	const retaliationImmune = Vars.content.statusEffect("elfly-retaliation-immune");
	
	if (unit == null || !unit.hasEffect(retaliation) || unit.type.name == "elfly-moony") return;
	
	if (bullet.owner != null && bullet.owner instanceof Healthc){
		
		var mul = 0;
		if(bullet.owner instanceof Building){
			mul = 0.4 * Vars.state.rules.blockDamage(bullet.team);
		}
		
		if(bullet.owner instanceof Unit){
			if (bullet.owner.isImmune(retaliationImmune)) return;
			mul = 0.4 * bullet.owner.damageMultiplier * Vars.state.rules.unitDamage(bullet.team);
		}
		bullet.owner.damagePierce(bullet.damage * mul);
	}
});
