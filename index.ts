import {getHashedName, getNameAccountKey, NameRegistryState, performReverseLookup} from "@bonfida/spl-name-service"
import {Connection, clusterApiUrl, PublicKey} from "@solana/web3.js";

async function getAddressByDomain(){
    const domain = "bonfida.sol";
    const hashedName= await getHashedName(domain.replace(".sol", ""));
    const nameAccountKey = await getNameAccountKey(
        hashedName,
        undefined,
        new PublicKey("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx")
    );
    const owner = await NameRegistryState.retrieve(
        new Connection(clusterApiUrl("mainnet-beta")),
        nameAccountKey
    );
    console.log(owner.registry.owner.toBase58());
}

async function getDomainByAddress(){
    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    const domainKey =  new PublicKey(
        "Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb"
    )
    const domainName = await performReverseLookup(
        connection, domainKey
    )
    console.log(domainName);
}

getAddressByDomain()
getDomainByAddress()