import React from 'react';
import { StyleSheet, Text, View , Button, TouchableOpacity} from 'react-native';

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      resultText: '',
      calcText: ''
    }
    this.op = ['AC','/', '*','-','+']
  }
  calcResult() {
    let number = this.state.resultText
    this.setState({
      calcText:eval(number)
    })

  }
  val() {
    let last = this.state.resultText.split('').pop()
    if(this.op.indexOf(last)>0) {
      return false
    }
    return true
  }
  btnClicked(number) {
    if(number == '=') {
      return this.val() && this.calcResult()
    }
    this.setState({resultText: this.state.resultText + number})
  }
  opBtnClicked(op) {
    switch (op) {
      case 'AC':
          //let number = this.state.resultText
          //let newNum = number.slice(0, number.length-1)
          this.setState({resultText: ''})
          this.setState({calcText: ''})

        break;
      case '+':
      case '-':
      case '*':
      case '/':
          let last = this.state.resultText.split('').pop()
          if(this.op.indexOf(last)>0) return
          if(this.state.resultText == '') return
          this.setState({
            resultText: this.state.resultText + op
          })
    }
  }

  render() {
    let rows = []
    let nums = [[7,8,9], [4,5,6], [1,2,3], ['',0,'=']]
    for (let i=0; i<4; i++) {
      let row = []
      for (let j=0; j<3; j++) {
        row.push(<TouchableOpacity key = {nums[i][j]} onPress = {()=> this.btnClicked(nums[i][j])} style = {styles.btn}>
                    <Text style = {styles.btnText}>{nums[i][j]}</Text>
                 </TouchableOpacity>)
      }
      rows.push(<View key = {i} style = {styles.row}>{row}</View>)

    }

    let ops = []
    for (let i=0;i<5;i++) {
      ops.push(<TouchableOpacity key = {this.op[i]} style = {styles.btn} onPress = {()=> this.opBtnClicked(this.op[i])}>
                  <Text style = {styles.btnText}>{this.op[i]}</Text>
               </TouchableOpacity>)
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
            <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calc}>
            <Text style={styles.calcText}>{this.state.calcText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
                {rows}
          </View>
          <View style={styles.operations}>
                {ops}
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#000',
  },
  result: {
    flex: 2,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'flex-end'

  },
  calc: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  buttons: {
    flex: 7,
    flexDirection: 'row'
  },

  numbers: {
    flex: 3,
    backgroundColor: 'black'
  },
  operations: {
    flex: 1,
    backgroundColor: '#d67526',
    justifyContent: 'space-around'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  resultText: {
    fontSize: 30,
    color: 'white',
    marginRight: 20

  },
  calcText: {
    fontSize: 24,
    color: 'white',
    marginRight: 20

  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  btnText: {
    fontSize: 30,
    color: 'white'
  }


});
