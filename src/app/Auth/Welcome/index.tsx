import React, {useEffect} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import styles from './styles';
import {useGetUserLogged} from '../../../services/api/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RoutesNavigation} from '../../../services/routes';

type Props = NativeStackScreenProps<RoutesNavigation, 'Welcome'>;

export default function Welcome({navigation}: Props) {
  const {data} = useGetUserLogged();

  useEffect(() => {
    if (data) {
      navigation.navigate('Home');
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/hp-hero.png')}
        style={styles.images}
      />
      <View style={styles.viewText}>
        <Text style={styles.title}>Xogito Notes</Text>
        <Text style={styles.subtitle}>
          Welcome to Xogito Notes, here you can organize all your notes without
          hassle!
        </Text>
        <Text style={styles.subtitle}>Create your profile and enjoy it!</Text>
      </View>
      <View style={styles.viewButtons}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={styles.button}>
          <Text style={styles.whiteText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
