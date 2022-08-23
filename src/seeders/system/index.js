import { System } from '../../models/index.js'
import systems from './data.json'

const systemSeed = () => System.bulkCreate(systems)

export default systemSeed