Events.on(UnitDamageEvent, event =>{
	
	const unit = event.unit;
	const bullet = event.bullet;
	
	const blessingOfStars = Vars.content.statusEffect("elfly-blessing-of-stars");
	
	if (unit == null || !unit.hasEffect(blessingOfStars) || unit.hasEffect(StatusEffects.invincible)) return;
	var chance = 0.3;
	if (unit.hasEffect(StatusEffects.boss)){
		chance = 0.5
	}
	if (Math.random() < chance){
		unit.apply(StatusEffects.invincible, 2 * 60);
	}
});
