import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db.js'

class File extends Model { }
File.init({
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	extension: DataTypes.STRING,
}, {
	sequelize,
	modelName: 'File'
})

export default File
