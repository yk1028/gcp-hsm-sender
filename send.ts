import { Key, MsgSend } from '@xpla/xpla.js';
import { GcpHsmKey } from './hsm/GcpHsmKey';
import { GcpHsmSigner } from './hsm/GcpHsmSigner';

import { kms, versionName, xpla_testnet } from './config';

const send = async () => {

	const targetAddress = "xpla16msz93uttjw7dcl9kutf8sw9metuql58s59ujz"
	const amount = "1000000000000000000axpla" // 1xpla

	// GCP HSM
	const gcpHsmUtils = new GcpHsmSigner(kms, versionName);
	const pubkey = await gcpHsmUtils.getPublicKey();
	const gcpHsmKey: Key = new GcpHsmKey(gcpHsmUtils, pubkey);

	const gcpHsmWallet = xpla_testnet.wallet(gcpHsmKey);

	console.log("GCP HSM wallet addr = ", gcpHsmWallet.key.accAddress);

	const send = new MsgSend(
		gcpHsmWallet.key.accAddress,
		targetAddress,
		amount
	);

	try {
		const tx = await gcpHsmWallet.createAndSignTx({
			msgs: [send],
			memo: 'gcp hsm send test',
		})

		const result = await xpla_testnet.tx.broadcast(tx);

		console.log("+++ result: ", result);
	} catch (err) {
		console.log("+++ error: ", err);
	}
}

send();