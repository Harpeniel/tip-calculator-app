import { calculTipAmountValue, calculTipTotalValue } from "./functions.js";

const billInput = document.getElementById('bill-input')
const tipOptions = Array.from(document.querySelectorAll('.options__tip__grid button, #custom-tip'))

const customTip = document.getElementById('custom-tip')
const peopleNumberInput = document.getElementById('people-number')

const tipAmountValue = document.getElementById('tip-amount-value')
const tipTotalValue = document.getElementById('tip-total-value')

const btnReset = document.querySelector('.btn-reset')
btnReset.setAttribute('disabled', '')

let activeOption = document.querySelector('.active')

customTip.addEventListener('focus', e => {
    customTip.parentElement.querySelector('.active').classList.remove('active')
    customTip.classList.add('active')
})
customTip.addEventListener('input', e => {
    const operator = ['+', '-', '*', '/', '%', '=']
    if (Number(customTip.value) > 100) {
        customTip.value = '100'
    }

    if (operator.includes(e.data)) {
        customTip.classList.add('error')
    } else {
        customTip.classList.remove('error')
    }

    if (peopleNumberInput.value &&
        peopleNumberInput.value !== '0' &&
        billInput.value
    ) {
        const data = {
            bill: Number(billInput.value),
            tipPercent: Number(customTip.value),
            peopleNumber: Number(peopleNumberInput.value)
        }
        tipAmountValue.textContent = `$${calculTipAmountValue(data)}`
        tipTotalValue.textContent = `$${calculTipTotalValue(data)}`
        btnReset.removeAttribute('disabled')

    }

})

for (const option of tipOptions) {
    option.addEventListener('click', () => {
        option.parentElement.querySelector('.active').classList.remove('active')
        option.classList.add('active')
        activeOption = option
        if (peopleNumberInput.value &&
            peopleNumberInput.value !== '0' &&
            billInput.value
        ) {
            const data = {
                bill: Number(billInput.value),
                tipPercent: activeOption.tagName === 'INPUT' ?
                    Number(activeOption.value) :
                    Number(activeOption.textContent.replace('%', '')),
                peopleNumber: Number(peopleNumberInput.value)
            }
            tipAmountValue.textContent = `$${calculTipAmountValue(data)}`
            tipTotalValue.textContent = `$${calculTipTotalValue(data)}`
            
            btnReset.removeAttribute('disabled')
            return

        }
        btnReset.setAttribute('disabled', '')

    })
}



billInput.addEventListener('input', e => {
    if (billInput.value &&
        peopleNumberInput.value &&
        peopleNumberInput.value !== '0'
    ) {
        const data = {
            bill: Number(billInput.value),
            tipPercent: activeOption.tagName === 'INPUT' ?
                Number(activeOption.value) :
                Number(activeOption.textContent.replace('%', '')),
            peopleNumber: Number(peopleNumberInput.value)
        }
        tipAmountValue.textContent = `$${calculTipAmountValue(data)}`
        tipTotalValue.textContent = `$${calculTipTotalValue(data)}`
       
        btnReset.removeAttribute('disabled')
        return
        
    }
    btnReset.setAttribute('disabled', '')


})
peopleNumberInput.addEventListener('input', e => {
    const errorMessageElt = document.getElementById('error-message')
    if (peopleNumberInput.value === '0') {
        peopleNumberInput.classList.add('error')
        errorMessageElt.textContent = "Can't be zero"
        return
    } else {
        peopleNumberInput.classList.remove('error')
        errorMessageElt.textContent = ""
    }
    if (peopleNumberInput.value &&
        peopleNumberInput.value !== '0' &&
        billInput.value
    ) {

        const data = {
            bill: Number(billInput.value),
            tipPercent: activeOption.tagName === 'INPUT' ?
                Number(activeOption.value) :
                Number(activeOption.textContent.replace('%', '')),
            peopleNumber: Number(peopleNumberInput.value)
        }
        tipAmountValue.textContent = `$${calculTipAmountValue(data)}`
        tipTotalValue.textContent = `$${calculTipTotalValue(data)}`
        
        btnReset.removeAttribute('disabled')
        return
       
    }
    btnReset.setAttribute('disabled', '')


})

btnReset.addEventListener('click', e => {
    if (!btnReset.getAttribute('disabled')) {
        btnReset.setAttribute('disabled', '')
    } else {
        btnReset.removeAttribute('disabled')
    }
    tipAmountValue.textContent = '$0.00'
    tipTotalValue.textContent = '$0.00'
    billInput.value = ''
    peopleNumberInput.value = ''
    customTip.value = ''
})

