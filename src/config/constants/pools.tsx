import { CHAIN_ID } from './networks'
import { serializeTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

const serializedTokens = serializeTokens()

const pools: SerializedPoolConfig[] = [
  {
    sousId: 1,
    stakingToken: serializedTokens.payflow,
    earningToken: serializedTokens.payflow,
    contractAddress: {
      97: '',
      56: '0x7A488b7ebFBefdADD684E26cEA9c73d2b71b39D6',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 999,
    tokenPerBlock: '0.086805',
    version: 3,
  },
].filter((p) => !!p.contractAddress[CHAIN_ID])

export default pools
