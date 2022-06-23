import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
// @ts-ignore
import styled from 'styled-components/native';
import screens from '~/navigation/screens';
import { IS_IOS } from '~/utils/constants';

const ContinentListItem = ({ code, name }: ContinentListItemProps) => {
  const onItemPress = useCallback(async () => {
    // android can't push more screen
    if (!IS_IOS) {
      await Navigation.pop(screens.CONTINENT.id);
      Navigation.updateProps(screens.COUNTRY.id, {
        code
      });
    } else {
      Navigation.push(screens.CONTINENT.id,
        {
          component: {
            ...screens.COUNTRY,
            passProps: {
              code,
            }
          }
        }
      )
    }
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
