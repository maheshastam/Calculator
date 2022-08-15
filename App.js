
import { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';

export default class App extends Component {

  constructor(){
    super()
    this.state={
      expression:"",
      result:""
    }
    this.operations=['AC','/','*','-','+','=']
  }
  
  calculateResult(){
    const text = this.state.expression
    this.setState({
      result: eval(text)
    })

    
  }

  buttonPressed(text){
    console.log(text)
   
    switch(text){
      case '\u{232B}':
        console.log(this.state.expression)
        const x = this.state.expression.split('')
        x.pop()
        this.setState({
          expression: x.join('')
        })
        break
      default:
        this.setState({
          expression: this.state.expression+text})
    }    
  }

  validate(){
    const text = this.state.expression
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
      return true
  }

  operate(operation){
    switch(operation){
      case 'AC':
        this.setState({
          expression: '',
          result: ''
        })
        break
      case '=':     
        return this.validate() && this.calculateResult()        
      case '+':
      case '-':
      case '*':
      case '/':
        console.log(this.state.expression)
        const lastChar = this.state.expression.split('').pop()
        if(this.operations.indexOf(lastChar)>0) return
        if(this.state.expression == "" ) {
          if(operation=='-') 
          this.setState({
            expression:this.state.expression + operation
          })
          else return
        }

        this.setState({
          expression:this.state.expression + operation
        })   
    }
  }

  render() {

    let rows =[]
    let nums=[[7,8,9],[4,5,6],[1,2,3],['.',0,'\u{232B}']]
    for(let i=0;i<4;i++){
      let row=[]
      for(let j=0;j<3;j++){
        row.push(
          <TouchableOpacity key={nums[i][j]} onPress={()=> this.buttonPressed(nums[i][j])} style={styles.btn}>
            <Text style={styles.btnText}>
              {nums[i][j]}
            </Text>
          </TouchableOpacity>)
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    
    let ops= []
    for(let i=0;i<6;i++){
      ops.push(
      <TouchableOpacity key={this.operations[i]} style={styles.btn} onPress={()=> this.operate(this.operations[i])}>
        <Text style={styles.btnText}>
          {this.operations[i]}
        </Text>
      </TouchableOpacity>)
    }

    return (      
      <View style={styles.container}>
        <View style={styles.expression}>
          <Text style={styles.expressionText}>
            {this.state.expression}
          </Text>
        </View>

        <View style={styles.result}>
          <Text style={styles.resultText}>
            {this.state.result}
          </Text>
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
  },
  expression: {
    flex: 2,
    backgroundColor:'white',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  expressionText: {
    fontSize: 30,
    color: 'black'

  },
  result: {
    flex: 1,
    backgroundColor:'white',
    justifyContent: 'space-around',
    alignItems: 'flex-end'

  },
  resultText: {
    fontSize: 20,
    color: 'black'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
    
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  btn: {
    flex:1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'

  },
  btnText: {
    fontSize: 35,
    color:'black'

  },
 
  numbers : {
    flex: 3,
    backgroundColor:'#fafafa'
  },
  operations: {
    flex: 1,
    justifyContent:'space-around',
    backgroundColor:'#ededed'
  }
});
