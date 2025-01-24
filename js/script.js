//Selecionando elementos necessários
const previusOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator{
    constructor(previusOperationText, currentOperationText){
        this.previusOperationText = previusOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    //Adiciona dígito na calculadora screen
    addDigit(digit){
        //verifique se a operação atual já possui um ponto
        if(digit === "." && this.currentOperationText.innerText.includes("."))
            return 

        this.currentOperation = digit
        this.updateScreen()
    }

    //processar todas as operações da calculadora
    processOperation(operation){
        //verifique se o valor atual está vazio
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            //Mudar operação
            if(this.previusOperationText.innerText !== ""){
                this.changeOperation(operation)
            }
            return
        }

        //obter o valor atual e anterior
        let operationValue
        let previous = +this.previusOperationText.innerText.split(" ")[0]
        let current = +this.currentOperationText.innerText

        switch(operation){
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break
             case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "DEL":
                this.processDelOperator()
                break
            case "CE":
                this.processClearCurrentOperation()
                break
            case "C":
                this.processClearOperation()
                break
                case "=":
                this.processEqualOperator()
                break
            default:
                return
        }
    }


    //Alterar valores da tela da calculadora
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
    ){

        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation
        }else{
            //Checar se o valor for zero
            if(previous === 0){
                operationValue = current
            }

            //adicione o valor atual ao anterior
            this.previusOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }

    //alterar operação matemática
    changeOperation(operation){
        const mathOperation = ["*", "/", "+", "-"]

        if(!mathOperation.includes(operation)){
            return
        }

        this.previusOperationText.innerText = this.previusOperationText.innerText.slice(0, -1) + operation;
    }
    //exclui o último dígito
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }
    //Limpar operação atual
    processClearCurrentOperation(){
        this.currentOperationText.innerText = ""
    }
    //limpar todas as operações
    processClearOperation(){
        this.currentOperationText.innerText = ""
        this.previusOperationText.innerText = ""
    }
    //Processar uma operação
    processEqualOperator(){
        const operation = previusOperationText.innerText.split(" ")[1]
        this.processOperation(operation)
    }
}


const calc = new Calculator(previusOperationText, currentOperationText)

buttons.forEach((btn)=>{
    btn.addEventListener("click", (e)=>{
        const value = e.target.value

        if(+value >= 0 || value === "."){
            calc.addDigit(value)
        }else{
            calc.processOperation(value)   
        }
    })
})