/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {StyleSheet, AsyncStorage, BackHandler} from 'react-native';
import ToDoCard from './ToDoCard';
import AddToDo from './AddToDo';

import {
  Container,
  Header,
  Content,
  Body,
  Text,
  Label,
  Item,
  Button,
  Icon,
  Title,
  Left,
  Right,
  View,
} from 'native-base';

export default class App extends React.Component {
  state = {
    showAddTodo: false,

    msg: '',
    newItemIndex: 99999,
    emptyList: {
      title: '',
      todos: [{text: '', done: false, order: 999, onFocus: false}],
    },

    toDosList: [
      // {
      //   title: '',
      //   todos: [
      //     {text: 'buy baby toys', done: false, order: 1, onFocus: false},
      //     {text: '', done: false, order: 999, onFocus: false},
      //   ],
      //   msg: '',
      //   showOption: false,
      // },
      // {
      //   title: '',
      //   todos: [
      //     {
      //       text: 'service bike',
      //       done: false,
      //       order: 2,
      //       onFocus: false,
      //     },
      //     {text: '', done: false, order: 999, onFocus: false},
      //   ],
      //   msg: '',
      //   showOption: false,
      // },
      // {
      //   title: '',
      //   todos: [
      //     {text: 'buy coffee cups', done: false, order: 3, onFocus: false},
      //     {text: '', done: false, order: 999, onfocus: false},
      //   ],
      //   msg: '',
      //   showOption: false,
      // },
      // {
      //   title: '',
      //   todos: [
      //     {text: 'services car', done: false, order: 4, onFocus: false},
      //     {text: '', done: false, order: 999, onFocus: false},
      //   ],
      //   msg: '',
      //   showOption: false,
      // },
    ],
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.hideOptionButton,
    );
  }

  showOptionButton = cardIndex => {
    this.state.toDosList[cardIndex].showOption = true;
    this.setState({toDosList: this.state.toDosList});
  };
  hideOptionButton = () => {
    let isOptionOpen = false;
    this.setState({
      toDosList: this.state.toDosList.map(item => {
        if (item.showOption) {
          isOptionOpen = true;
        }
        item.showOption = false;
        return item;
      }),
    });
    if (isOptionOpen) {
      return true;
    }
  };

  componentDidUpdate() {
    AsyncStorage.setItem('tododata', JSON.stringify(this.state.toDosList));
  }
  async componentWillMount() {
    let tododata = await AsyncStorage.getItem('tododata');
    if (tododata && tododata !== '') {
      tododata = JSON.parse(tododata);
      this.setState({toDosList: tododata});
    }
  }

  handletextchange = mytext => {
    this.setState({msg: mytext});
  };
  onFocus = (cardIndex, itemindex) => {
    this.state.toDosList[cardIndex].todos[itemindex].onFocus = true;

    this.setState({toDosList: this.state.toDosList});
  };
  onBlur = (cardIndex, itemindex) => {
    this.state.toDosList[cardIndex].todos[itemindex].onFocus = false;

    this.setState({toDosList: this.state.toDosList});
  };
  handleTodosDone = (cardIndex, itemindex) => {
    this.state.toDosList[cardIndex].todos[itemindex].done = !this.state
      .toDosList[cardIndex].todos[itemindex].done;

    this.setState({toDosList: this.state.toDosList});
  };

  updateToDoData = (cardIndex, itemindex, text) => {
    // alert(cardIndex, itemindex, text);
    var lastitem = this.state.toDosList[cardIndex].todos.length - 1;
    if (itemindex == lastitem) {
      this.state.toDosList[cardIndex].todos.push({
        text: '',
        done: false,
        order: 999,
      });
    }
    this.state.toDosList[cardIndex].todos[itemindex].text = text;
    this.setState({toDosList: this.state.toDosList});
  };
  updateToDoTitle = (cardIndex, text) => {
    // alert(cardIndex, itemindex, text);

    this.state.toDosList[cardIndex].title = text;
    this.setState({toDosList: this.state.toDosList});
  };

  addNewList = () => {
    this.state.toDosList.push(JSON.parse(JSON.stringify(this.state.emptyList)));
    this.setState({
      toDosList: this.state.toDosList,
      showAddTodo: true,
      newItemIndex: this.state.toDosList.length - 1,
    });
  };
  hideAddTodo = () => {
    this.setState({showAddTodo: false});
  };

  renderToDoList = () => {
    return this.state.toDosList.map((item, index) => {
      return (
        <ToDoCard
          onPress={this.showAddEditTodo}
          toDoData={item}
          updateToDoData={this.updateToDoData}
          updateToDoTitle={this.updateToDoTitle}
          cardIndex={index}
          deleteTodo={this.deleteTodo}
          handleTodosDone={this.handleTodosDone}
          onFocusChange={this.onFocusChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          deleteToDoTask={this.deleteToDoTask}
          showOptionButton={this.showOptionButton}
          hideOptionButton={this.hideOptionButton}
        />
      );
    });
  };
  addNewToDo = () => {
    if (this.state.msg) {
      var newToDo = {text: this.state.msg, done: false, order: ''};
      this.state.toDosList.push(newToDo);
      this.setState({toDosList: this.state.toDosList, msg: ''});
    }
  };
  deleteTodo = (cardIndex, dataindex) => {
    this.state.toDosList[cardIndex].todos.splice(dataindex, 1);
    this.setState({toDosList: this.state.toDosList});
  };
  deleteToDoTask = cardIndex => {
    this.state.toDosList.splice(cardIndex, 1);
    this.setState({toDosList: this.state.toDosList});
  };
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="checkbox" />
            </Button>
          </Left>
          <Body>
            <Title>TODOS</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {this.state.toDosList.length ? (
            this.renderToDoList()
          ) : (
            <View
              style={{
                justifyContent: 'flex-end',
                flex: 1,
                height: 300,
                alignSelf: 'center',
              }}>
              <Text>Please Add Todos</Text>
            </View>
          )}
        </Content>
        <Button
          style={{justifyContent: 'center'}}
          onPress={this.addNewList}
          Block
          light>
          <Icon name="add-circle" />
          <Text>ADD NEW </Text>
        </Button>

        {this.state.toDosList.length > 0 && this.state.newItemIndex != 99999 && (
          <AddToDo
            showAddEditTodo={this.state.showAddTodo}
            onRequestClose={() => {
              this.hideAddTodo();
              this.setState({newItemIndex: 99999});
            }}
            toDoData={this.state.toDosList[this.state.newItemIndex]}
            updateData={this.updateToDoData}
            updateToDoTitle={this.updateToDoTitle}
            cardIndex={this.state.newItemIndex}
            deletetodo={this.deleteTodo}
            handleTodosDone={this.handleTodosDone}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            deleteToDoTask={this.deleteToDoTask}
          />
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'skyblue',
    height: '100%',
  },
  paragraph: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 5,
    flex: 1,
    padding: 5,
  },
});
