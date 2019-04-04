import React, { Component } from 'react';
import { LinearGradient } from 'expo';
import {
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Text,
    View,
    StyleSheet,
    TextInput,
} from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements'; // 0.19.0

import '@expo/vector-icons'; // 6.3.1

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            text: '',
            dataSource: null,
            renderRow: '',
            visit_data: {}
        };
    }
    componentDidMount() {
        return fetch('http://linkcard.io:8000/api/getVisitData/')
            .then(response => {
                console.log('data comes here', JSON.parse(response._bodyInit));
                console.log('hello', response);
                // let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState(
                    {
                        isLoading: false,
                        getVisitData: JSON.parse(response._bodyInit),

                        /* renderRow: JSON.parse(response._bodyInit).pt_data.map(rowData =>( <Text style={styles.rowViewContainer}
                                        onPress={this.GetListViewItem.bind(this, rowData.pt_name)}>hello</Text>))*/
                    },
                    function() {
                        console.log(this.state.dataSource);
                        // do something with new state
                    }
                );
            })
            .catch(error => {

                console.error(error);
            });
    }
    goback(){
        this.props.navigation.navigate('Patient');
    }
    GetListViewItem(pt_name) {
        console.log('hello', pt_name);
    }

    SearchFilterFunction(text) {
        const newData = this.state.dataSource.filter(function(item) {
            const itemData = item.pt_name.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        console.log(newData);
        this.setState({
            dataSource: newData,
            text: text,
        });
    }



    render() {
        console.log('dataSource', this.state.dataSource);
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.box1}>
                <View style={styles.headerStyle}>
                    <View  style={styles.box2}>
                        <LinearGradient colors={['#7117ea', '#8422d5','#982ebe','#cf507f']}

                                        style={{flex:0.1,width: '100%',paddingTop:100,}}>
                            <Text style={styles.backText} onPress={this.goback.bind(this)}>Back</Text>
                            <Text style={styles.textinput}>Provider Visit</Text>
                            <Text style={styles.customFilter}>Filter</Text>
                        </LinearGradient>
                    </View>

                    <View >
                        <Text style={styles.patientMetaFirst}>{this.state.getVisitData.doctor}{"\n"}</Text>
                        <Text style={(styles.patientMeta, {textDecorationLine: 'underline',alignSelf: 'center',fontSize:18})}>seen on : <Text style={{fontSize:22}}>{this.state.getVisitData.date_of_service}{"\n"}</Text></Text>
                        <Text style={styles.patientMeta}>{this.state.getVisitData.specialty}{"\n"}</Text>
                        <Text style={styles.patientMeta}>{this.state.getVisitData.number}{"\n"}</Text>
                        <Text style={styles.patientMeta}>
                            {this.state.getVisitData.address}{"\n"}</Text>

                        <Text style={styles.submitText}>Call</Text>
                    </View>

                </View>



            </View>
        );
    }
}
const styles = StyleSheet.create({


    patientMetaFirst: {
        lineHeight: 20,
        alignSelf: 'center',
        marginTop:5,
        fontSize: 22,
    },
    patientMeta:{
        lineHeight: 20,
        alignSelf: 'stretch',
        textAlign: 'center',
        marginTop:10,
        marginBottom: 10,
        padding: 0,
        marginLeft:0,
        marginRight: 0,
        fontSize: 18,


    },

    box1: {
        backgroundColor: '#fff',
        flex: 1,

    },
    box2: {

        paddingTop:0,
        alignItems: 'center',

    },

    extraDetails: {
        flexDirection: 'row',
        height: 60,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    customFilter:{
        color: 'white',
        backgroundColor: 'rgba(52, 52, 52, 0)',
        fontSize: 15,
        right:15,
        top:10,
        position:'absolute',
        alignSelf: 'flex-start',
    },
    backText:{
        color: 'white',
        backgroundColor: 'rgba(52, 52, 52, 0)',
        fontSize: 15,
        left:15,
        top:10,
        position:'absolute',
        alignSelf: 'flex-start',
    },
    filterText: {
        color: 'white',
        position: 'absolute',
        fontSize: 20,
        alignSelf: 'flex-end',
    },
    button1: {
        backgroundColor: '#87CCDC',
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 0,
        padding: 15,
        height: 95,
        fontWeight: 'bold',
    },
    buttonText: {
        flexDirection: 'column',
        margin: 7,
        padding: 30,
        fontSize: 7.5,
        textAlign: 'center',
        color: 'black',
    },
    textinput: {
        fontSize: 40,
        textAlign: 'center',
        marginTop:-70,
        backgroundColor: 'rgba(52, 52, 52, 0)',
        color: 'white',

    },
    rowViewContainer: {
        flex: 1,
        flexDirection: 'column',
        color: 'black',
        fontSize: 17,
        padding: 10,
        borderColor: '#87CCDC',
        borderWidth: 1,
        borderRadius: 7,
        justifyContent: 'center',
        textAlign: 'center',
    },
    TextInputStyleClass: {
        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#87CCDC',
        borderRadius: 7,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
    },
    submitText: {
        marginRight: '30%',
        marginLeft: '30%',
        paddingBottom: 10,
        width: '50%',
        borderRadius: 10,
        backgroundColor: '#7117ea',
        textAlign: 'center',
        fontSize: 30,
        color: 'white'
    },
    beforeArrow: {
        color: 'red',
        position: 'absolute',
        right: 5,
    },
});
