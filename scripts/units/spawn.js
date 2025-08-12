Events.on(UnitSpawnEvent, event =>{
	
	const unit = event.unit;
	
	const blessingOfStars = Vars.content.statusEffect("elfly-blessing-of-stars");
	const blessingOfMoon = Vars.content.statusEffect("elfly-blessing-of-moon");
	
	var chance = 0.1;
	if (unit.hasEffect(StatusEffects.boss)){
		chance = 1;
	}
	
	if (Math.random() < chance){
		if (Math.random() < 0.5){
			unit.apply(blessingOfStars, 999999);
		}else{
			unit.apply(blessingOfMoon, 999999);
		}
	}
});