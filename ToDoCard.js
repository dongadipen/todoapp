import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  BackHandler,
} from 'react-native';
import {Card, CardItem, Body, Text, Icon, Right} from 'native-base';
import AddToDo from './AddToDo';
var press_timer;

export default class ToDoCard extends React.Component {
  state = {
    showAddEditTodo: false,
    showDeleteButton: false,
  };
  handelPressIn = () => {
    press_timer = setTimeout(() => {
      this.props.showOptionButton(this.props.cardIndex);
    }, 500);
  };
  handelPressOut = () => {
    clearTimeout(press_timer);
  };

  showAddEditTodo = () => {
    if (!this.props.toDoData.showOption) {
      this.setState({showAddEditTodo: true});
    }
  };
  hideAddEditTodo = () => {
    this.setState({showAddEditTodo: false});
  };

  renderToDos = () => {
    let lastItem = this.props.toDoData.todos.length - 1;

    return this.props.toDoData.todos.map((toDos, index) => {
      if (lastItem == index) {
        return <View></View>;
      }
      return (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            marginLeft: -4,
          }}>
          <TouchableOpacity
            onPress={done => {
              this.props.handleTodosDone(this.props.cardIndex, index, done);
            }}>
            <Text style={styles.paragraph}>{toDos.done ? ' ☑' : ' ☐'}</Text>
          </TouchableOpacity>

          <Text
            style={{
              textDecorationLine: toDos.done ? 'line-through' : 'none',

              ...styles.paragraph,
            }}>
            {toDos.text}
          </Text>
        </View>
      );
    });
  };
  render() {
    return (
      <TouchableOpacity
        onPress={this.showAddEditTodo}
        onPressIn={this.handelPressIn}
        onPressOut={this.handelPressOut}>
        <Card
          style={{
            borderRadius: 10,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            padding: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.deleteToDoTask(this.props.cardIndex);
            }}>
            {this.props.toDoData.showOption && (
              <Text style={styles.paragraph}>❌</Text>
            )}
          </TouchableOpacity>

          <View>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              {this.props.toDoData.title}
            </Text>
          </View>
          {this.renderToDos()}
        </Card>
        <AddToDo
          showAddEditTodo={this.state.showAddEditTodo}
          onRequestClose={this.hideAddEditTodo}
          toDoData={this.props.toDoData}
          updateData={this.props.updateToDoData}
          updateToDoTitle={this.props.updateToDoTitle}
          cardIndex={this.props.cardIndex}
          deletetodo={this.props.deleteTodo}
          handleTodosDone={this.props.handleTodosDone}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          deleteToDoTask={this.props.deleteToDoTask}
          showOptionButton={this.props.showOptionButton}
          hideOptionButton={this.props.hideOptionButton}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: '100%',
  },
  paragraph: {
    fontSize: 15,

    margin: 1,
    flex: 1,
    alignSelf: 'flex-end',
  },
});
