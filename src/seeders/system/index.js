import { System } from '../../models/index.js'
import systems from './data.js'

const systemSeed = () => System.bulkCreate(systems)

export default systemSeed
