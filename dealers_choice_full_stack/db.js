const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_full_stack')

const Flower = sequelize.define('flower', {
    name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.INTEGER
    }
})

const syncAndSeed = async () => {
    await Flower.create({ name: 'Roses', price: '$12'})
    await Flower.create({ name: 'Peonies', price: '$10'})
    await Flower.create({ name: 'Lilies', price: '$8'})

}

module.exports = {
    Flower,
    syncAndSeed
}

