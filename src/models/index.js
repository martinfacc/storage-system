import System from './system.js'
import File from './file.js'

System.hasMany(File, {
	foreignKey: 'systemId',
	sourceKey: 'id',
})
File.belongsTo(System, {
	foreignKey: 'systemId',
	targetKey: 'id',
	as: 'system',
})

export { System, File }
