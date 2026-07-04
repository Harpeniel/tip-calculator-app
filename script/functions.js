
/**
 * 
 * @param {number} bill
 * @param {number} tipPercent
 * @param {nmuber} peopleNumber
 * @return {number | string}
 */
export function calculTipAmountValue({ bill, tipPercent, peopleNumber }) {
    if (peopleNumber === 0) {
        return '0.00'
    }
    return ((bill * (tipPercent / 100)) / peopleNumber).toFixed(2)
}


/**
 * 
 * @param {number} bill
 * @param {number} tipPercent
 * @param {number} peopleNumber
 * @return {number | string}
 */
export function calculTipTotalValue({ bill, tipPercent, peopleNumber }) {
      if (peopleNumber === 0) {
        return '0.00'
    }
    const tipAmountValue = (bill * (tipPercent / 100)) / peopleNumber
    return ((bill / peopleNumber) + tipAmountValue).toFixed(2)
}
