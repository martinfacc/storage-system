import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../database.js'

class System extends Model {}
System.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: 'System',
	}
)

export default System
