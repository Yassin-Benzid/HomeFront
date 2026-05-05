import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  // Taux de change fixe EUR -> TND (taux officiel approximatif 2026)
  private readonly EUR_TO_TND_RATE = 3.4;

  constructor() { }

  /**
   * Convertit un montant d'Euro en Dinar Tunisien
   * @param eurAmount Montant en Euro
   * @returns Montant converti en Dinar Tunisien
   */
  convertEurToTnd(eurAmount: number): number {
    if (!eurAmount || eurAmount < 0) return 0;
    return Math.round((eurAmount * this.EUR_TO_TND_RATE) * 100) / 100;
  }

  /**
   * Formatte un montant en Dinard Tunisien
   * @param amount Montant en TND
   * @returns Chaine formatée avec symbole TND
   */
  formatTnd(amount: number): string {
    return `${amount.toFixed(2)} TND`;
  }

  /**
   * Convertit et formatte directement un montant EUR en TND
   * @param eurAmount Montant en Euro
   * @returns Chaine formatée en TND
   */
  convertAndFormat(eurAmount: number): string {
    return this.formatTnd(this.convertEurToTnd(eurAmount));
  }

  /**
   * Retourne le taux de change actuel
   */
  getExchangeRate(): number {
    return this.EUR_TO_TND_RATE;
  }
}