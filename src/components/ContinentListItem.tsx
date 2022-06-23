import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
// @ts-ignore
import styled from 'styled-components/native';
import {SCREENS, STACK_IDS} from '~/navigation/screens';

const ContinentListItem = ({code, name}: ContinentListItemProps) => {
  const onItemPress = useCallback(() => {
    Navigation.push(STACK_IDS.MAIN, {
      component: {
        name: SCREENS.COUNTRY,
        passProps: {
          code,
        },
      },
    });
  }, [code]);

  return (
    <TouchableOpacity onPress={onItemPress}>
      <ContryText>{name}</ContryText>
    </TouchableOpacity>
  );
};

interface ContinentListItemProps {
  code: string;
  name: string;
}

const ContryText = styled.Text`
  color: #2e55ff;
  text-decoration-line: underline;
  text-align: right;
`;

export default ContinentListItem;
