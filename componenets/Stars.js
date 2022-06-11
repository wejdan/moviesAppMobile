import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stars = props => {
  const starsCount = parseFloat(props.count) / 2;
  const filledStars = Math.floor(starsCount);
  const halfStars = starsCount % 1 ? 1 : 0;
  const EmptyStars = 5 - (filledStars + halfStars);
  if (parseInt(props.count) == 0) {
    return <Text></Text>;
  }
  const filledStarsList = Array(filledStars)
    .fill()
    .map((v, i) => i);

  const EmptyStarsList = Array(EmptyStars)
    .fill()
    .map((v, i) => i);

  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      {filledStarsList.map((star, index) => {
        return <Icon key={index} name="star" size={24} color="tomato" />;
      })}

      {halfStars > 0 && <Icon name="star-half-full" size={24} color="tomato" />}
      {EmptyStarsList.map((start, index) => {
        return <Icon key={index} name="star-o" size={24} color="#aaa" />;
      })}
    </View>
  );
};

export default Stars;
