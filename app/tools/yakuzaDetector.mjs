export async function detectYakuza(message){
    if (message.contains('якудза')) {
        console.log('yakuza')
        return true
    }
}