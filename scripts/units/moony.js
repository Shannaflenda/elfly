Events.on(UnitDamageEvent, event =>{
	
	const unit = event.unit;
	const bullet = event.bullet;
	const timer = Vars.content.statusEffect("elfly-timer");
	
	const blessingOfMoon = Vars.content.statusEffect("elfly-blessing-of-moon");
	const blessingOfSun = Vars.content.statusEffect("elfly-blessing-of-sun");
	
	const phaseChanging = Vars.content.statusEffect("elfly-phase-changing");
	const moonyPhaseTwo = Vars.content.statusEffect("elfly-moony-phase-two");
	const moonyPhaseThree = Vars.content.statusEffect("elfly-moony-phase-three");
	
	const retaliation = Vars.content.statusEffect("elfly-retaliation");
	const retaliationImmune = Vars.content.statusEffect("elfly-retaliation-immune");
	
	if (unit == null || unit.type.name != "elfly-moony") return;
	
	if (unit.hasEffect(moonyPhaseTwo)){
		if(bullet.owner != null && bullet.owner instanceof Healthc && unit.hasEffect(retaliation)){
			var mul = 0;
			if (bullet.owner instanceof Building){
				mul = 1 * Vars.state.rules.blockDamage(bullet.team);
				
			}
			if (bullet.owner instanceof Unit){
				if (bullet.owner.isImmune(retaliationImmune)) return;
				mul = 3 * bullet.owner.damageMultiplier * Vars.state.rules.unitDamage(bullet.team);
			}
			bullet.owner.damagePierce(bullet.damage * mul);
		}
	}
	
	if (unit.hasEffect(phaseChanging)) return;
	
	if (unit.health <= unit.maxHealth * 0.2 && !unit.hasEffect(moonyPhaseTwo)){
		unit.apply(moonyPhaseTwo, 10000 * 86400 * 60);
		unit.apply(phaseChanging, 600);
		unit.apply(blessingOfMoon, 600 * 60);
		unit.apply(timer, 180 * 60);
		unit.apply(retaliation, 180 * 60);
	}
	
	if (!unit.hasEffect(moonyPhaseTwo) ||　unit.hasEffect(phaseChanging)) return;
		
	if (unit.health <= unit.maxHealth * 0.1 && !unit.hasEffect(moonyPhaseThree)){
		unit.apply(moonyPhaseThree, 10000 * 86400 * 60);
		unit.apply(phaseChanging, 600);
		if(unit.hasEffect(timer)){
			unit.apply(retaliation, unit.getDuration(retaliation) + 300 * 60);
			unit.apply(blessingOfSun, 180 * 60);
		}
	}
});
