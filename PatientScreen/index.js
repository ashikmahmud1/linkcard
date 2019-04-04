import React, {Component} from 'react';
import {LinearGradient} from 'expo';
import {
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    TouchableHighlight,
    ScrollView,
    Text,
    View,
    StyleSheet,
    TextInput,
} from 'react-native';
import {Icon, List, ListItem} from 'react-native-elements'; // 0.19.0

import '@expo/vector-icons'; // 6.3.1
//import 'IndividualScreen' from '../IndividualScreen'
export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            text: '',
            dataFilter: null,
            dataSource: null,
            renderRow: '',
            pt_name: null,
        };
    }

    componentDidMount() {
        return fetch('http://linkcard.io:8000/api/getPatientList/')
            .then(response => {
                console.log('data comes here', JSON.parse(response._bodyInit).pt_data);
                console.log('hello', response);
                // let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState(
                    {
                        isLoading: false,
                        dataSource: JSON.parse(response._bodyInit).pt_data,
                        dataFilter: JSON.parse(response._bodyInit).pt_data,
                        /* renderRow: JSON.parse(response._bodyInit).pt_data.map(rowData =>( <Text style={styles.rowViewContainer}
                                        onPress={this.GetListViewItem.bind(this, rowData.pt_name)}>hello</Text>))*/
                    },
                    function () {
                        console.log(this.state.dataSource);
                        // do something with new state
                    }
                );
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    dataSource: [
                        {
                            pt_name: 'prakash shrestha',
                            age: '32',
                            last_dos: '10',
                            gender: 'Male',
                        },
                        {
                            pt_name: 'Daniel Jacon',
                            age: '32',
                            last_dos: '10',
                            gender: 'male',
                        },
                        {
                            pt_name: 'Hansu Shrestha',
                            age: '45',
                            last_dos: '10',
                            gender: 'male',
                        },
                    ],

                    /* renderRow: JSON.parse(response._bodyInit).pt_data.map(rowData =>( <Text style={styles.rowViewContainer}
                                      onPress={this.GetListViewItem.bind(this, rowData.pt_name)}>hello</Text>))*/
                });

                console.error(error);
            });
    }

    GetListViewItem(pt_name) {
        this.props.navigation.navigate('Patient');
        console.log('hello', pt_name);
    }

    onePatient(pt_name) {
        console.log('yaha ayo');
        this.setState({pt_name: pt_name});
        this.props.navigation.navigate('Patient');
    }

    SearchFilterFunction(text) {
        const newData = this.state.dataFilter.filter(function (item) {
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

    goback() {
        this.props.navigation.navigate('ScanScreen');
    }

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.1,
                    width: '100%',
                    backgroundColor: 'purple',
                }}
            />
        );
    };

    render() {
        console.log('dataSource', this.state.dataSource);
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        return (


            <View style={styles.box1}>

                <View style={styles.headerStyle}>
                    <View style={styles.box2}>
                        <LinearGradient colors={['#7117ea', '#8422d5', '#982ebe', '#cf507f']}

                                        style={{flex: 0.1, width: '100%', paddingTop: 100,}}>
                            <Text style={styles.backText} onPress={this.goback.bind(this)}>LOGOUT</Text>
                            <Text style={styles.textinput}>Patients</Text>
                            <Text style={styles.customFilter}>Filter</Text>
                        </LinearGradient>
                    </View>
                </View>
                <ScrollView style={styles.list}>

                    <List>

                        <FlatList
                            data={this.state.dataSource}
                            renderItem={({item}) => (
                                <ListItem containerStyle={{
                                    borderBottomWidth: 0,
                                }}
                                          title={<View><Text><Text
                                              style={styles.title}>{item.pt_name}</Text>{'\n'}<Text>{item.gender} /{item.age}</Text></Text><Text
                                              style={styles.beforeArrow}>{item.last_dos}</Text></View>}

                                          onPress={this.onePatient.bind(this, item.pt_name)}
                                          chevronColor="#7117ea"
                                />
                            )}
                        />
                    </List>
                </ScrollView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#87CCDC',
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        color: '#7117ea'
    },
    list: {
        marginTop: -30,
        borderColor: '#7117ea'
    },
    box1: {
        backgroundColor: '#fff',
        padding: 0,
        flex: 1,
    },
    headerStyle: {

        borderWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 10
    },
    customFilter: {
        color: 'white',
        backgroundColor: 'rgba(52, 52, 52, 0)',
        fontSize: 15,
        right: 15,
        top: 10,
        position: 'absolute',
        alignSelf: 'flex-start',
    },
    backText: {
        color: 'white',
        backgroundColor: 'rgba(52, 52, 52, 0)',
        fontSize: 15,
        left: 15,
        top: 10,
        position: 'absolute',
        alignSelf: 'flex-start',
    },
    filterText: {
        color: 'white',
        position: 'absolute',

        fontSize: 20,
        alignSelf: 'flex-end',
    },
    box2: {

        paddingTop: 0,
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
    button1: {
        backgroundColor: 'purple',
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
        color: 'purple',
    },
    textinput: {
        fontSize: 40,
        textAlign: 'center',
        marginTop: -70,
        backgroundColor: 'rgba(52, 52, 52, 0)',
        color: 'white',

    },
    rowViewContainer: {
        flex: 1,
        flexDirection: 'column',
        color: '#7117ea',
        fontSize: 17,
        padding: 10,
        borderColor: '#7117ea',
        borderWidth: 1,
        borderRadius: 7,
        justifyContent: 'center',
        textAlign: 'left',
    },
    TextInputStyleClass: {
        textAlign: 'center',
        height: 40,
        marginBottom: -20,
        borderWidth: 1,
        borderColor: 'purple',
        borderRadius: 7,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
    },
    beforeArrow: {
        alignSelf: 'flex-end',
        textAlign: 'right',
        position: 'absolute',
        paddingTop: 10,
        paddingRight: 5
    },
});
