function getBulletMultiplier(bullet){
	
	var mul = 1;
	
	if(bullet.owner instanceof Building){
		mul = Vars.state.rules.blockDamage(bullet.team);
	}
	if(bullet.owner instanceof Unit){
		mul = bullet.owner.damageMultiplier * Vars.state.rules.unitDamage(bullet.team);
	}
	return mul;
}

function getUnitRealHealth(unit){
	return unit.maxHealth * unit.healthMultiplier * Vars.state.rules.unitHealth(unit.team);
}

function setToast(icon, string){
	var index = 1;
	while(Core.bundle.getOrNull(string + "-" + index) != null){
		Vars.ui.hudfrag.showToast(icon, Core.bundle.format(string + "-" + index));
		index = index + 1;
	}
}

module.exports = {
	getBulletMultiplier: getBulletMultiplier,
	getUnitRealHealth: getUnitRealHealth,
	setToast: setToast,
};