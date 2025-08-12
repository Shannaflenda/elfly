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

module.exports = {
	getBulletMultiplier: getBulletMultiplier,
	getUnitRealHealth: getUnitRealHealth,
};