/**
 * Serviço simples de síntese de voz (Text-to-Speech - TTS) nativa do navegador
 * para auxílio na leitura acessível dos estudantes.
 */
export class TTSService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;

  static speak(text: string) {
    if (!this.synth) return;

    // Cancela leituras anteriores
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95; // Velocidade ligeiramente mais calma para melhor compreensão
    utterance.pitch = 1.0;

    this.synth.speak(utterance);
  }

  static stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  static isSupported(): boolean {
    return !!this.synth;
  }
}
