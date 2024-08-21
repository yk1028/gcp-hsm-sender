import { KeyManagementServiceClient } from "@google-cloud/kms";
import { LCDClient } from "@xpla/xpla.js";

export const xpla_testnet = new LCDClient({
	chainID: 'cube_47-5',
    URL: 'https://cube-lcd.xpla.dev',
    gasPrices: "850000000000axpla"
});

export const xpla_mainnet = new LCDClient({
	chainID: 'dimension_37-1',
    URL: 'https://dimension-lcd.xpla.dev',
    gasPrices: "850000000000axpla"
});

// GCP HSM
export const kms = new KeyManagementServiceClient({ keyFile: './service-account.json' });

export const versionName = kms.cryptoKeyVersionPath(
    "h-common",
    "asia-northeast3",
    "test-key-ring2",
    "test-key3",
    "1",
);