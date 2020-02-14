import React, { Component } from "react";
import "./Calculator.css";
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  currentPosition: 0
};

class Calculator extends Component {
  state = { ...initialState }; // faz clone do stado conforme o schema 'initialState' usando o spread operator

  constructor(props) {
    super(props);
    // abaixo binda os métodos direto no contexto 'this' da classe
    this.clearMemmory = this.clearMemmory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemmory() {
    this.setState({ ...initialState }); // para limpar o state aplica o schema anterior limpo
  }

  setOperation(operation) {
    if (this.state.currentPosition === 0) { // caso não tenha sido informado nenhuma operação anteriormente (valor igual a )
      this.setState({ operation, currentPosition: 1, clearDisplay: true }); // atualiza o state passando a nova operação, atualizando a currentPosition para 1 (já q agora tem uma operacação) e seta variável para limpar display para true (essa variável será verificada antes de entrar o próximo digito)
    } else {
      const equals = operation === "="; // define verdadeiro caso a operação corrente seja o '=' senão atribui o valor da variável para falso
      const currentOperantion = this.state.operation; // cria variável de ref da operação atual

      const values = [...this.state.values]; //copia o array de valores

      try {

        // A função eval() computa um código JavaScript representado como uma string. - Ref: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/eval
        // Sugestão: mudar o EVAL por um swtich, testando qual é a operação e aplicando o calculo conforme a operação informada
        values[0] = eval(`${values[0]} ${currentOperantion} ${values[1]}`); //executa a operação conforme valores 0 e 1 e a operação informada E SALVA o resultado na posição 0 do array de values novamente
      } catch (error) { // se houver algum erro ao tentar executar a operação acima
        values[0] = this.state.values[0]; //volta o valor do array 0 para o valor default, ou seja, '0'
      }

      values[1] = 0; // muda o valor na posição 1 para 0 novamente após executar a operação falhando ou não (para que a próxima sequência comece da posição 0 novamente)

      // abaixo atualiza o state com base na operação realizada
      this.setState({
        displayValue: values[0], // mostra o valor atualizado conforme operação
        operation: equals ? null : operation, // se variável equals for true (se a operacao for '=') então atualiza a operação com null (reseta a operação), senão atualiza a operação para a informada
        currentPosition: equals ? 0 : 1, // atualiza a posição do ponteiro do array de valroes conforme o tipo da operação atual ser '=' ou não
        clearDisplay: !equals, //seta para limpar o display ou não conforme for '=' ou não
        values //atualiza o array de valores
      });
    }
  }

  addDigit(n) {
    // verifica se o digito informado é '.' e se já contém '.' no display, se já houver ele retorna null parando a sequência
    if (n === "." && this.state.displayValue.includes(".")) { // o includes aqui equiva-le ao Contains
      return;
    }

    const clearDisplay = this.state.displayValue === "0" || this.state.clearDisplay; 
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const i = this.state.currentPosition;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;

      this.setState({ values });
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemmory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}

export default Calculator;
