Object.keys(Planets).forEach(p =>{if (Planets[p]!=null){Planets[p].alwaysUnlocked = true}})
Object.keys(UnitTypes).forEach(p =>{if (UnitTypes[p]!=null){UnitTypes[p].hidden = false}})
Object.keys(Blocks).forEach(p =>{if (Blocks[p]!=null){Blocks[p].buildVisibility = BuildVisibility.shown}})
	
Events.on(UnitDamageEvent, event =>{
	const unit = event.unit;
	if (unit == null || unit.type.name != "elfly-moony") return;
	if (unit.health <= unit.maxHealth / 2 && !unit.hasEffect(StatusEffects.overclock)){
		unit.apply(StatusEffects.overclock, 216000);
	}
})
