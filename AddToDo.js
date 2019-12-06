import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
} from 'react-native';
import {Card, CardItem, Body, Icon, Right, Input} from 'native-base';

export default class AddToDo extends React.Component {
  state = {
    showToDo: false,
    msg: 'list item',
    title: 'title',

    toDoNote: {
      title: 'title',
      toDos: [
        {text: 'buy a car', done: false, order: 1},
        {text: 'buy a new tv', done: false, order: 2},
        {text: 'service bike', done: false, order: 3},
      ],
      msg: '',
    },
  };
  setTodos = visible => {
    this.setState({showToDo: visible});
  };

  handletextchange = mytext => {
    this.setState({msg: mytext});
  };
  titletextchange = mytext => {
    this.setState({title: mytext});
  };
  handleTodosDone = index => {
    this.state.toDoNote[index].done = !this.state.toDoNote[index].done;

    this.setState({toDoNote: this.state.toDoNote});
  };
  addNewToDo = () => {
    if (this.state.msg) {
      var newToDo = {text: this.state.msg, done: false, order: ''};
      this.state.toDoNote.push(newToDo);
      this.setState({toDoNote: this.state.toDoNote, msg: ''});
    }
  };
  deleteTodo = index => {
    this.state.toDoNote[toDos].splice(index, 1);
    this.setState({toDoNote: this.state.toDoNote});
  };

  renderToDosList = () => {
    let lastItem = this.props.toDoData.todos.length - 1;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.showAddEditTodo}
        onRequestClose={this.props.onRequestClose}>
        <View style={{margin: 10}}>
          <TextInput
            style={{fontWeight: 'bold', padding: 5}}
            placeholder="Title"
            value={this.props.toDoData.title}
            onChangeText={text => {
              this.props.updateToDoTitle(this.props.cardIndex, text);
            }}
          />
        </View>
        {this.props.toDoData.todos.map((toDos, index) => {
          return (
            <View key={index} style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.handleTodosDone(this.props.cardIndex, index);
                }}>
                {lastItem == index ? (
                  <Text style={styles.paragraph}>+</Text>
                ) : (
                  <Text style={styles.paragraph}>
                    {toDos.done ? ' ☑' : ' ☐'}
                  </Text>
                )}
              </TouchableOpacity>
              <TextInput
                style={{
                  height: 40,
                  width: 110,
                  flex: 1,
                  textDecorationLine: toDos.done ? 'line-through' : 'none',
                }}
                placeholder={lastItem == index ? 'ListItem' : ''}
                value={toDos.text}
                onFocus={() => {
                  this.props.onFocus(this.props.cardIndex, index);
                }}
                onBlur={() => {
                  this.props.onBlur(this.props.cardIndex, index);
                }}
                onChangeText={text => {
                  this.props.updateData(this.props.cardIndex, index, text);
                }}
              />
              {toDos.onFocus && lastItem != index && (
                <TouchableOpacity
                  onPress={() => {
                    this.props.deletetodo(this.props.cardIndex, index);
                  }}>
                  <Text style={styles.paragraph}>(❌)</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </Modal>
    );
  };
  render() {
    return (
      <View>
        {this.renderToDosList()}

        {/* <View style={{flexDirection: 'row', padding: 8, marginTop: 100}}>
          <Text>＋</Text>
          <TextInput
            style={{height: 40, width: 100, flexDirection: 'row', padding: 8}}
            value={this.state.msg}
            onChangeText={this.handletextchange}
          />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    height: '100%',
  },
  paragraph: {
    fontSize: 15,

    margin: 5,
    flex: 1,
    padding: 5,
  },
});
