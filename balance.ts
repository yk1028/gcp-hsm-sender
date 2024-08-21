import { Key } from '@xpla/xpla.js';
import { GcpHsmKey } from './hsm/GcpHsmKey';
import { GcpHsmSigner } from './hsm/GcpHsmSigner';

import { kms, versionName, xpla } from './config';

class BigDecimal {

    static decimals = 18
    bigint

    constructor(value) {
        let [ints, decis] = String(value).split(".").concat("");
        decis = decis.padEnd(BigDecimal.decimals, "0");
        this.bigint = BigInt(ints + decis);
    }
    static fromBigInt(bigint) {
        return Object.assign(Object.create(BigDecimal.prototype), { bigint });
    }
    divide(divisor) { // You would need to provide methods for other operations
        return BigDecimal.fromBigInt(this.bigint * BigInt("1" + "0".repeat(BigDecimal.decimals)) / divisor.bigint);
    }
    toString() {
        let s = this.bigint.toString().replace("-", "").padStart(BigDecimal.decimals + 1, "0");
        s = (s.slice(0, -BigDecimal.decimals) + "." + s.slice(-BigDecimal.decimals))
            .replace(/(\.0*|0+)$/, "");
        return this.bigint < 0 ? "-" + s : s;
    }
}

const balance = async () => {

    // GCP HSM
    const gcpHsmUtils = new GcpHsmSigner(kms, versionName);
    const pubkey = await gcpHsmUtils.getPublicKey();
    const gcpHsmKey: Key = new GcpHsmKey(gcpHsmUtils, pubkey);

    const gcpHsmWallet = xpla.wallet(gcpHsmKey);
    const [axpla] = await xpla.bank.balance(gcpHsmWallet.key.accAddress)

    var a = new BigDecimal(axpla.get("axpla").amount);
    var b = new BigDecimal("1000000000000000000");

    console.log("GCP HSM addr :", gcpHsmWallet.key.accAddress);
    console.log(`Balance      : ${axpla.get("axpla").amount} axpla`)
    console.log(`Balance      : ${a.divide(b).toString()} xpla`)
}

balance();