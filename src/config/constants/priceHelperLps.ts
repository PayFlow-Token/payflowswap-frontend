import tokens from './tokens'
import { SerializedFarmConfig } from './types'

const priceHelperLps: SerializedFarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absence of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  {
    pid: null,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: null,
    lpSymbol: 'PFT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x0EbCD2E67027936f2A878DF1529bE65640d36ce3',
    },
    token: tokens.payflow,
    quoteToken: tokens.wbnb,
  },
  {
    pid: null,
    lpSymbol: 'HEGG-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x6cb1338a36830eFC75F6e6cE89897a5a8621a1A8',
    },
    token: tokens.hegg,
    quoteToken: tokens.wbnb,
  },
  {
    pid: null,
    lpSymbol: 'MLT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x419ecED7927e3C73D8B93aE6A6E43d8ddeef6A83',
    },
    token: tokens.metaloop,
    quoteToken: tokens.wbnb,
  },
]

export default priceHelperLps
