import React, { Component } from "react"
import {  View,  Text,  TouchableHighlight, StyleSheet, TextInput} from "react-native"
import { LinearGradient } from 'expo';


class Welcome extends Component {
    constructor(props) {
        super(props)
    }
    gotoMain() {
        this.props.navigation.navigate('TabScreen');
    }
    render() {
        return (
            <LinearGradient colors={['#7117ea', '#8422d5','#982ebe','#cf507f']}

                            style={{ height:'100%',width:'100%'}}>
                <View style={styles.container}>

                    <View style={{ width: '75%' }}>
                        <TextInput style={styles.inputfield} placeholder="First Name"></TextInput>
                    </View>
                    <View style={{ width: '75%', marginTop:10 }}>
                        <TextInput style={styles.inputfield} placeholder="Last Name"></TextInput>
                    </View>
                    <View style={{ width: '75%', marginTop:10 }}>
                        <TextInput style={styles.inputfield} placeholder="Specialty"></TextInput>
                    </View>
                    <View style={{ width: '75%', marginTop:10 }}>
                        <TextInput style={styles.inputfield} placeholder="NPI"></TextInput>
                    </View>
                    <View style={{ width: '75%', marginTop:10 }}>
                        <TextInput style={styles.inputfield} placeholder="Credentials, comma-separated"></TextInput>
                    </View>
                    <View style={{ width: '75%', marginTop:10 }}>
                        <TextInput style={styles.inputfield} placeholder="Password"></TextInput>
                    </View>
                    <TouchableHighlight
                        onPress={this.gotoMain.bind(this)}
                        style={styles.submit}
                        underlayColor='#003440'>
                        <Text style={styles.submitText}>Sign Up</Text>
                    </TouchableHighlight>

                </View>
            </LinearGradient>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        paddingTop: 23,

    },

    inputfield: {
        backgroundColor: 'white',
        fontSize: 20,
        paddingLeft:10,
        margin: 0,
        height: 50,
        width: '100%',
        alignItems: 'flex-end',
        borderStyle: 'solid',
        borderColor: '#fff',
        borderRadius: 7,
    },
    submit: {
        marginRight: 30,
        marginLeft: 30,
        marginTop: 30,
        paddingTop: 10,
        paddingBottom: 10,
        width: '20%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    submitText: {
        color: '#7117ea',
        textAlign: 'center',
        fontSize: 15
    }
});

export default Welcome
///////////////////////