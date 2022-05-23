import User from './user.js'
import System from './system.js'
import File from './file.js'

// Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'roleId', as: 'permissions' })
// Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permissionId', as: 'roles' })

System.hasMany(File, {
	foreignKey: 'systemId',
	sourceKey: 'id'
})
File.belongsTo(System, {
	foreignKey: 'systemId',
	targetKey: 'id',
	as: 'system'
})

export {
	User,
	System,
	File
}