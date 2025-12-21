import TonWeb from "https://unpkg.com/tonweb@latest/dist/tonweb.js"
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {
    apiKey: process.env.TONCENTER_API_KEY // Обязательно для продакшена
}));

async function createWallet() {
    const WalletClass = tonweb.wallet.all['v4r2']; // Рекомендуемая версия
    const keyPair = TonWeb.utils.keyPair.crypto.generateKeyPair(); // Генерация ключей
    
    const wallet = new WalletClass(tonweb.provider, {
        publicKey: keyPair.publicKey,
        wc: 0 // workchain
    });
    
    const address = (await wallet.getAddress()).toString(true, true, true); // bounceable
    
    console.log('Address:', address);
    console.log('Private key (hex):', keyPair.secretKey.toString('hex'));
    console.log('Public key (hex):', keyPair.publicKey.toString('hex'));
    
    return { address, keyPair };
}

// Использование
const walletData = await createWallet();
const address = walletData.address; // Сохраняем в переменную
async function withdrawTON(toAddress, amountNanoTON, privateKeyHex, memo = '') {
    const WalletClass = tonweb.wallet.all['v4r2'];
    const keyPair = {
        secretKey: TonWeb.utils.hexToBytes(privateKeyHex),
        publicKey: TonWeb.utils.keyPair.crypto.createPublicKey(privateKeyHex)
    };
    
    const wallet = new WalletClass(tonweb.provider, { publicKey: keyPair.publicKey });
    
    // Получаем seqno (номер транзакции)
    const seqno = (await wallet.methods.seqno().call()).seqno;
    
    // Создаем транзакцию (amount в наноTON, 1 TON = 1_000_000_000 nanoTON)
    const transfer = await wallet.methods.transfer({
        secretKey: keyPair.secretKey,
        toAddress,
        amount: TonWeb.utils.toNano(amountNanoTON.toString()), // Пример: '0.5' TON
        seqno,
        payload: memo ? TonWeb.utils.toBytes(memo) : undefined,
        sendMode: 3 // Автопополнение + деструкция при нуле
    }).send();
    
    console.log('Tx hash:', transfer['@type']);
    return transfer;
}

// Использование
await withdrawTON('EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N', 0.1, walletData.keyPair.secretKey.toString('hex'), 'Вывод средств');
