import React from 'react';
import { ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Error from './Extra/ErrorBoundary'
import { myIp } from './Extra/MyIp'

import Post from './Post/Post'

import { getPosts } from './Fetch/Requests'

import { home } from '../assets/css/home'


export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            posts: []
        } 
    }
    
    componentDidMount() {
        this.loadPosts()
    }
    
    loadPosts = () => {
        
        getPosts(response => {
            if (response) {
                arr = []
                for (var i in response) {
                    const { post_id, image, description, likes, comments, user } = response[i]
                    arr.push({ 
                        id:post_id,
                        image, 
                        description,
                        likes,
                        comments,
                        user:{
                            username: user.username,
                            id: user.id,
                            avatar: user.avatar
                        }
                    })
                }
                this.setState({ posts: this.state.posts.concat(arr)})
                // console.log(this.state)
            } else {
                console.log('error')
            }
        })
    }

    goToProfile = (id) => {
        this.props.navigation.navigate('User', id)
    }

    getComment = (id) => {
        this.props.navigation.navigate('Comments', id)
    }
  
    render() {
    
        return (
            <Error>  
                <ScrollView style={home.container}>
                    {this.state.posts.map((post, i) => {
                    return(
                        <Post key={i} 
                            id={post.id}
                            user={post.user} 
                            goToProfile={this.goToProfile} 
                            description={post.description} 
                            img={{uri:`${myIp}/`+post.image}} 
                            likes={post.likes}
                            comment={this.getComment}
                            />  
                    )})}
                </ScrollView>
            </Error>
        );
    }
}