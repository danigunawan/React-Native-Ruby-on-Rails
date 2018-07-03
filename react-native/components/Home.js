import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetching } from './Extra/Fetch'
import User from './Users/User'
import LoginForm from './Users/LoginForm'
import SignupForm from './Users/SignupForm'
import FindUser from './Users/FindUser'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      users: [],
      is_logged: []
    }
  }

  componentDidMount() {
      console.log('Mounted home')

      fetching({}, 'GET', 'http://10.172.175.155:4000/api/v1/users', 
      response => {
        this.setState({
          users: response.user
        })
      })

      fetching({}, 'GET', 'http://10.172.175.155:4000/api/v1/is_logged?',
      response => {
          this.setState({
            is_logged: response
          })
        console.log(this.state.is_logged)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Rails API users</Text>
          <Text>
          {this.state.users.map((user) => {
            return(
              <User user={user} key={user.id}/>)})}
          </Text>
        {/* <LoginForm/>
        <SignupForm/>
        <FindUser/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
