const tool = require("elfly/libs/tool");

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
		if(!unit.hasEffect(timer)){
			unit.apply(timer, 10 * 60);
			unit.apply(retaliation, 4 * 60);
		}
	}
	
	if (unit.hasEffect(phaseChanging)) return;
	//below is phase changing
	if (unit.health <= unit.maxHealth * 0.2 && !unit.hasEffect(moonyPhaseTwo)){
		unit.apply(moonyPhaseTwo, 10000 * 86400 * 60);
		unit.apply(phaseChanging, 600);
		unit.apply(blessingOfMoon, 600 * 60);
		unit.apply(timer, 180 * 60);
		unit.apply(retaliation, 180 * 60);
		tool.setToast(Icon.warning, "warning.moony-phase-two");
	}
	
	if (!unit.hasEffect(moonyPhaseTwo) ||　unit.hasEffect(phaseChanging)) return;
		
	if (unit.health <= unit.maxHealth * 0.1 && !unit.hasEffect(moonyPhaseThree)){
		unit.apply(moonyPhaseThree, 10000 * 86400 * 60);
		unit.apply(phaseChanging, 600);
		unit.apply(retaliation, 10000 * 86400 * 60);
		tool.setToast(Icon.warning, "warning.moony-phase-three");
		if(unit.hasEffect(timer)){
			unit.apply(blessingOfSun, 180 * 60);
		}
	}
});
