// const { nanoid } = require('nanoid');
const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {

	sequelize.define('user', {
		id: {
			primaryKey: true,
			// autoIncrement: true,
			type: DataTypes.UUID,
			defaultValue: UUIDV4,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(15),
			allowNull: false,
			validate: {
				min: 2,
				max: 15,
			}
		},
		lastName: {
			type: DataTypes.STRING(15),
			allowNull: false,
			validate: {
				min: 2,
				max: 15,
			}
		},
		email: {
			type: DataTypes.STRING(30),
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
				// unique: {
				// 	args:true,
				// 	msg: 'Email address already in use'
				// }
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		active: {
			type: DataTypes.BOOLEAN,

		}

		// role: {
		// 	type: DataTypes.ENUM(["ROLE_USER", "ROLE_ADMIN", "ROLE_SELLER"]),
		// 	allowNull: false,
		// 	default: "ROLE_USER"

		// },
		// accountType: {
		// 	type: DataTypes.ENUM(["facebook", "google"]),
		//   },
	});

};