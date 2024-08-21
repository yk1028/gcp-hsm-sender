# GCP-HSM-Sender
> gcp hsm을 사용한 전송

## Configuration
> config.ts에서 설정
1. xpla testnet or xpla mainnet 선택
   - `const xpla = xpla_testnet` or `const xpla = xpla_mainnet`
2. service account 사용 방식 설정
   1. service account file 사용
      - `const kms = new KeyManagementServiceClient({ keyFile: './service-account.json' });`
   2. service account가 등록된 gcp instance 내에서 사용
      - `const kms = new KeyManagementServiceClient();` 
3. 사용하려는 hsm key의 version 정보 입력
```
const versionName = kms.cryptoKeyVersionPath(
    "h-common",         // project
    "asia-northeast3",  // region
    "test-key-ring2",   // keyring
    "test-key3",        // key
    "1",                // version
);
```

## Send
- send.ts에 tagetAddress, amount 입력후 `ts-node send.ts`로 실행
- configuration에서 설정한 gcp hsm key에서 targetAddress로 amount만큼 전송
