export default function formatarNomes(nome: string): string {
    var palavras = nome.split('.');
    for (var i = 0; i < palavras.length; i++) {
        var palavra = palavras[i];
        if (palavra.length > 0) {
            palavras[i] = palavra.charAt(0).toUpperCase() + palavra.slice(1);
        }
    }
    return palavras.join(' ').trim();
}
