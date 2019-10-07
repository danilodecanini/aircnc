import React, { useState, useEffect } from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView, Image, AsyncStorage, StyleSheet } from 'react-native';

import SpotList from '../components/Spotlist';

import logo from '../assets/logo.png';

export default function List({navigation}){
    const [ techs, setTechs ] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    async function handleLogout(){

        await AsyncStorage.setItem('user', '');
        await AsyncStorage.setItem('techs', '');
        navigation.navigate('Login');

    }

    return (
        <SafeAreaView style={StyleSheet.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo}/>
            </TouchableOpacity>
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10,
    },
});