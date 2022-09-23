import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../database.js'

class File extends Model {}
File.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		extension: DataTypes.STRING,
		systemId: {
			type: DataTypes.UUID,
			allowNull: false
		}
	},
	{
		sequelize,
		modelName: 'File',
	}
)

export default File
