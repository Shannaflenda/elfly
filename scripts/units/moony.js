Events.on(UnitDamageEvent, event =>{
	
	const phaseChanging = Vars.content.statusEffect("elfly-phase-changing");
	const blessingOfMoon = Vars.content.statusEffect("elfly-blessing-of-moon");
	const moonyPhaseTwo = Vars.content.statusEffect("elfly-moony-phase-two");
	const moonyPhaseThree = Vars.content.statusEffect("elfly-moony-phase-three");
	const unit = event.unit;
	const bullet = event.bullet;
	
	if (unit == null || unit.type.name != "elfly-moony") return;
	
	/*if (unit.hasEffect(moonyPhaseTwo)){
		if(bullet.owner != null){
			if(bullet.owner instanceof Buildingc){
				const buildingz = (Building)bullet.owner;
				buildingz.damagePierce(bullet.damage * 1);
			}
			if(bullet.owner instanceof Unitc){
				const unitz = (Unit)bullet.owner;
				unitz.damagePierce(bullet.damage * 3);
			}
		}
	}*/
	
	if (unit.hasEffect(phaseChanging)) return;
	
	if (unit.health <= unit.maxHealth * 0.2 && !unit.hasEffect(moonyPhaseTwo)){
		unit.apply(moonyPhaseTwo, 51840000000);
		unit.apply(phaseChanging, 600);
		unit.apply(blessingOfMoon, 36000);
	}
	
	if (!unit.hasEffect(moonyPhaseTwo) ||　unit.hasEffect(phaseChanging)) return;
		
	if (unit.health <= unit.maxHealth * 0.1 && !unit.hasEffect(moonyPhaseThree)){
		unit.apply(moonyPhaseThree, 51840000000);
		unit.apply(phaseChanging, 600);
	}
});
