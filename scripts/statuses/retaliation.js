Events.on(UnitDamageEvent, event =>{
	
	const unit = event.unit;
	const bullet = event.bullet;
	
	const retaliation = Vars.content.statusEffect("elfly-retaliation");
	const retaliationImmune = Vars.content.statusEffect("elfly-retaliation-immune");
	
	if (unit == null || !(unit.hasEffect(retaliation) || unit.isImmune(retaliation))) return;
	
	if (bullet.owner != null && bullet.owner instanceof Healthc){
		
		var mul = 0;
		var mulb = 0.4;
		var mulu = 0.4;
		
		if(unit.hasEffect(StatusEffects.boss)){
			mulb = 1;
			mulu = 1;
		}
		if(unit.type.name == "elfly-moony"){
			mulb = 1;
			mulu = 3;
		}
		
		if(bullet.owner instanceof Building){
			mul = mulb * Vars.state.rules.blockDamage(bullet.team);
		}
		if(bullet.owner instanceof Unit){
			if (bullet.owner.isImmune(retaliationImmune)) return;
			mul = mulu * bullet.owner.damageMultiplier * Vars.state.rules.unitDamage(bullet.team);
		}
		bullet.owner.damagePierce(bullet.damage * mul);
	}
});
