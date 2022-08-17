import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import Tag from './Tag';

type Props = {
  data: string[];
  value: string;
  onPress: (item: string) => Promise<void>;
};

export default function TagsList({data, value, onPress}: Props) {
  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View style={styles.ml16}>
          <Tag {...{onPress}} item={'All'} currentValue={value} />
        </View>
        {data?.map((item, idx) => (
          <View key={idx}>
            <Tag {...{item, onPress}} currentValue={value} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginBottom: 16,
  },
  ml16: {
    marginLeft: 16,
  },
});
