import React, {Component} from 'react';
import {LinearGradient} from 'expo';
import {
    ActivityIndicator,
    TouchableOpacity,
    TouchableHighlight,
    FlatList,
    ScrollView,
    Text,
    View,
    StyleSheet,
    TextInput
} from 'react-native';
import {Icon, List, ListItem} from "react-native-elements"; // 0.19.0


import "@expo/vector-icons"; // 6.3.1


export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            text: '',
            dataFilter: null,
            dataSource: null,
            patient: {},
            age: null,
            gender: null,
            last_seen: null,
            insurance: null,
            renderRow: '',
            pt_name: null,
        }
    }

    componentDidMount() {
        return fetch('http://linkcard.io:8000/api/getPatientInfo/')
            .then((response) => {
                console.log("data comes here", JSON.parse(response._bodyInit).patient_meta);
                console.log("hello", JSON.parse(response._bodyInit).visit_list)

                // let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({
                    isLoading: false,
                    dataSource: JSON.parse(response._bodyInit).visit_list,
                    dataFilter: JSON.parse(response._bodyInit).visit_list,
                    patient: JSON.parse(response._bodyInit).patient_meta,
                    pt_name: JSON.parse(response._bodyInit).name,
                    age: JSON.parse(response._bodyInit).age,

                    gender: JSON.parse(response._bodyInit).gender,
                    last_seen: JSON.parse(response._bodyInit).last_seen,
                    insurance: JSON.parse(response._bodyInit).insurance,
                    /* renderRow: JSON.parse(response._bodyInit).pt_data.map(rowData =>( <Text style={styles.rowViewContainer}
                             onPress={this.GetListViewItem.bind(this, rowData.pt_name)}>hello</Text>))*/
                }, function () {
                    console.log(this.state.dataSource)
                    console.log(response._bodyInit)
                    // do something with new state
                });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    dataSource: [{
                        pt_name: "prakash shrestha",
                        age: "32",
                        last_dos: '10',
                        gender: "Male"
                    }, {pt_name: "Daniel Jacon", age: "32", last_dos: '10', gender: "male"}, {
                        pt_name: "Hansu Shrestha",
                        age: "45",
                        last_dos: '10',
                        gender: "male"
                    }],

                    /* renderRow: JSON.parse(response._bodyInit).pt_data.map(rowData =>( <Text style={styles.rowViewContainer}
                             onPress={this.GetListViewItem.bind(this, rowData.pt_name)}>hello</Text>))*/
                });

                console.error(error);
            });
    }

    GetListViewItem(pt_name) {
        console.log("hello", pt_name)
    }

    goback() {
        this.props.navigation.navigate('PatientScreen');
    }

    onePatient() {
        console.log("yaha ayo")
        this.props.navigation.navigate('Provider');
    }

    SearchFilterFunction(text) {
        const newData = this.state.dataFilter.filter(function (item) {
            const itemData = item.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        console.log(newData)
        this.setState({
            dataSource: newData,
            text: text
        })
    }

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.1,
                    width: "100%",
                    backgroundColor: "#7117ea",
                }}
            />
        );
    }

    render() {
        console.log("dataSource", this.state.dataSource)
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

                    <LinearGradient colors={['#7117ea', '#8422d5', '#982ebe', '#cf507f']}

                                    style={{flex: 0.1, width: '100%', paddingTop: 100,}}>
                        <Text style={styles.backText} onPress={this.goback.bind(this)}>Back</Text>
                        <Text style={styles.textinput}>{this.state.pt_name}</Text>
                        <Text style={styles.customFilter}>Filter</Text>
                    </LinearGradient>


                    <View>
                        <Text style={styles.patientMeta}>{this.state.age} Years Old</Text>
                        <Text style={styles.patientMeta}>{this.state.gender} </Text>
                        <Text style={styles.patientMeta}>Last Seen: {this.state.last_seen}</Text>
                        <Text style={styles.patientMeta}>{this.state.insurance}</Text>
                    </View>

                </View>

                <ScrollView style={styles.list}>

                    <List>

                        <FlatList
                            data={this.state.dataSource}
                            renderItem={({item}) => (
                                <ListItem
                                    containerStyle={{
                                        borderBottomWidth: 0,
                                    }}
                                    roundAvatar
                                    subtitle={<Text>{item.specialty}</Text>}
                                    rightTitle={<Text style={styles.beforeArrow}>{item.date_of_service}</Text>}
                                    title={<View style={styles.listProvider}>
                                        <Text style={styles.title}><Text
                                            style={styles.patientName}>{item.name}</Text></Text>


                                    </View>}
                                    avatar={require('../img/intestine.png')}
                                    chevronColor="#7117ea"
                                    onPress={this.onePatient.bind(this)}

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

    list: {
        marginTop: -20,
        flex: 4,
    },
    patientName: {
        fontWeight: 'bold',
        color: '#7117ea'
    },
    container: {
        backgroundColor: '#7117ea',
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
    listProvider: {
        marginLeft: 20,
        marginTop: 10,
    },
    box1: {
        backgroundColor: '#fff',
        padding: 0,
        flex: 1,
    },
    box2: {

        paddingTop: 0,
        alignItems: 'center',

    },
    title: {
        fontWeight: 'bold',
        position: 'relative',


    },
    extraDetails: {
        flexDirection: 'row',
        height: 60,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    patientMeta: {
        lineHeight: 35,
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 18,

    },
    button1: {
        backgroundColor: '#7117ea',
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
        marginTop: -70,
        backgroundColor: 'rgba(52, 52, 52, 0)',
        color: 'white',

    },
    rowViewContainer: {
        flex: 1,
        flexDirection: 'column',
        color: 'black',
        fontSize: 17,
        padding: 10,
        borderColor: '#7117ea',
        borderWidth: 1,
        borderRadius: 7,
        justifyContent: 'center',
        textAlign: 'center',
    },
    TextInputStyleClass: {
        textAlign: 'center',
        height: 40,
        marginBottom: -20,
        borderWidth: 1,
        borderColor: '#7117ea',
        borderRadius: 7,
        backgroundColor: "#FFFFFF",
        justifyContent: 'space-around',
    },
    beforeArrow: {
        alignSelf: 'flex-end',
        textAlign: 'left',
        bottom: 15,
        left: -20,


    },
});