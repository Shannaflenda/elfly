require("elfly/units/moony")
require("elfly/units/spawn")
require("elfly/statuses/retaliation")
require("elfly/statuses/erosion-of-moon")
require("elfly/statuses/meltdown-of-sun")
require("elfly/statuses/blessing-of-stars")

Object.keys(Planets).forEach(p =>{if (Planets[p]!=null){Planets[p].alwaysUnlocked = true}})
Object.keys(UnitTypes).forEach(p =>{if (UnitTypes[p]!=null){UnitTypes[p].hidden = false}})
Object.keys(Blocks).forEach(p =>{if (Blocks[p]!=null){Blocks[p].buildVisibility = BuildVisibility.shown}})
	