import React, {Component} from "react"
import {
    Platform,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    StyleSheet,
    StatusBar,
    ScrollView
} from "react-native"

class Welcome extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.submit1}>
                <Text>
                    Welcome to React Native!!!
                </Text>
                <Text>
                    To get started, edit App.js
                </Text>
                <Text>
                </Text>
                <TouchableOpacity
                    style={styles.submit}>
                    <Text style={{color: 'white'}}>LOGOUT</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    submit1: {

        alignItems: 'center',
        padding: 100,


    },
    submit: {
        marginRight: 100,
        marginLeft: 100,
        marginTop: 30,
        margin: 1000,
        paddingTop: 10,
        paddingBottom: 10,
        width: '50%',
        backgroundColor: '#7117ea',
        borderRadius: 10,
        borderWidth: 2,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white'
    },
});
export default Welcome
