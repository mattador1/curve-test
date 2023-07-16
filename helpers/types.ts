export type EthereumAddress = string;

export enum Network {
  mainnet = "mainnet",
}

// expandable
export enum NetworkName {
  arbitrum = "arbitrum",
  ethereum = "ethereum",
}

// expandable
export enum TokenSymbol {
  USDC = "USDC",
  USDT = "USDT",
  DAI = "DAI",
  FRAX = "FRAX",
  WETH = "WETH",
  WBTC = "WBTC",
  LINK = "LINK",
  UNI = "UNI",
  sGLP = "sGLP",
  sGMX = "sGMX",
  GMX = "GMX",
  GLP = "GLP",
  esGMX = "esGMX",
  agEUR = "agEUR",
  EURT = "EURT",
  EURS = "EURS",
  CRV = "CRV",
  CVX = "CVX",
  EUROC = "EUROC",
  ThreeEURpool = "ThreeEURpool",
  ETH_onCurve = "ETH_onCurve",
}

export type TokenContract = {
  readonly [key in NetworkName]: TokenDetails;
};

type TokenDetails = {
  readonly [key in Network]: {
    readonly [key in TokenSymbol]: {
      address: EthereumAddress;
      decimals: number;
    };
  };
};
