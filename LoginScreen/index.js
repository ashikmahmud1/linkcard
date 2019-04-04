import React, {Component} from "react"
import {LinearGradient} from 'expo';
import { Button } from 'react-native-material-design';
import { TextField } from 'react-native-material-textfield';
import {
    Platform,
    View,
    Image,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    ImageBackground,
    StatusBar,
    ScrollView
} from "react-native"

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class Welcome extends Component {
    constructor(props) {
        super(props)
    }

    gotoMain() {
        this.props.navigation.navigate('TabScreen');
    }

    gotoSignUp() {
        this.props.navigation.navigate('SignupScreen');
    }

    render() {
        return (
            <LinearGradient colors={['#7117ea', '#8422d5', '#982ebe', '#cf507f']}

                            style={{flex: 1,}}>
                <View style={styles.container}>

                    <Text style={styles.title}>

                        <Image
                            style={{width: 350, height: 70, paddingBottom: 30, marginLeft: 35}}
                            source={require('../img/link3.png')}
                        />
                    </Text>

                    <View style={{width: '75%'}}>
                        <TextField baseColor="rgba(255, 255, 255, 1)" tintColor="rgba(255, 255, 255, 1)" label="Username"></TextField>
                    </View>
                    <View style={{width: '75%', marginTop: 10}}>
                        <TextField baseColor="rgba(255, 255, 255, 1)" tintColor="rgba(255, 255, 255, 1)" label="Password"></TextField>
                    </View>

                    <View>
                        <Button value="NORMAL FLAT" onPress={this.gotoSignUp.bind(this)} />
                        <Button value="NORMAL RAISED" raised={true} onPress={this.gotoSignUp.bind(this)} />
                    </View>

                    <TouchableHighlight
                        onPress={this.gotoMain.bind(this)}
                        style={styles.submit}
                        underlayColor='#003440'>
                        <Text style={styles.submitText}>LOGIN</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.gotoSignUp.bind(this)}
                        style={styles.submit}
                        underlayColor='#003440'>
                        <Text style={styles.submitText}>SIGNUP</Text>
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
        paddingTop: 23

    },
    baseText: {
        fontSize: 30,
        color: '#fff',
        backgroundColor: '#7117ea',
    },
    title: {
        backgroundColor: '#8422d5',
        paddingBottom: 80
    },
    titleText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#7117ea',
    },
    input: {
        fontSize: 20,
        color: '#fff',
        marginTop: 40,
        alignItems: 'flex-start',
    },
    inputfield: {
        backgroundColor: 'white',
        fontSize: 20,
        paddingLeft: 10,
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
        fontSize: 15,
    }
});

export default Welcome
///////////////////////