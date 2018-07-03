import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import Error from '../Extra/ErrorBoundary'
import { fetching } from '../Extra/Fetch'

export default class LoginForm extends Component {
    constructor(){
        super()    
        this.username = '',
        this.password = '',
        this.password_confirmation = ''
    }
    

    logIn = (event) => {
        event.preventDefault()
        
        
        const options = { 
            username:this.username,
            password:this.password,
            password_confirmation:this.password_confirmation
        }
        
        console.log(options)
        
        fetching(options, 'POST', 'http://10.172.175.155:4000/api/v1/login', response => {
            console.log(response)
            console.log('welcome to Rail API!')
        })
    }

    render() {
        return (
            <Error>
                <View>
                    <Text> Login </Text>
                    <TextInput 
						onChangeText={username => this.username = username}
						placeholder = 'Username'
					/>
					<TextInput 
						onChangeText={password => this.password = password}
						placeholder = 'Password'
					/>
					<TextInput 
						onChangeText={password_confirmation => this.password_confirmation = password_confirmation}
						placeholder = 'Password Confirmation'
					/>
					<Button 
						onPress={this.logIn}
                        title = 'Log in'
                        ></Button>
                </View>
            </Error>
        )
    }
}