import React, { memo, useCallback, useMemo } from 'react';
import { Navigation } from 'react-native-navigation';
// @ts-ignore
import styled from 'styled-components/native';
import {SCREENS, STACK_IDS} from '~/navigation/screens';
import { useTheme } from '~/theme/useTheme';

const CountryListItem = ({
  code,
  name,
  capital,
  emoji,
}: CountryListItemProps) => {

  const onItemPress = useCallback(() => {
    Navigation.push(STACK_IDS.MAIN, {
      component: {
        name: SCREENS.COUNTRY,
        passProps: {
          code
        }
      }
    });
  }, [code]);

  const { colors } = useTheme();

  const Root = useMemo(
    () => styled.TouchableOpacity`
      padding-vertical: 5px;
      padding-horizontal: 10px;
      flex-direction: row;
      align-items: center;
      margin-horizontal: 20px;
      margin-vertical: 10px;
      shadow-opacity: 0.2;
      shadow-radius: 7px;
      background-color: ${colors.backgroundColor};
      shadow-color: ${colors.shadowColor};
      border-color: ${colors.textColor};
      elevation: 7;
    `,
    [colors],
  );

  const TextName = useMemo(
    () => styled.Text`
      font-weight: bold;
      font-size: 20px;
      color: ${colors.textColor};
      flex-wrap: wrap;
      width: 80%;
    `,
    [colors],
  );

  const TextCapital = useMemo(
    () => styled.Text`
      font-size: 15px;
      color: ${colors.textColor};
      flex-wrap: wrap;
    `,
    [colors],
  );

  return (
    <Root onPress={onItemPress}>
      <TextFlag>{emoji}</TextFlag>
      <Info>
        <TextName>{name}</TextName>
        <TextCapital>{capital}</TextCapital>
      </Info>
    </Root>
  );
};

type CountryListItemProps = {
  code: string;
  name: string;
  capital: string | undefined | null;
  emoji: string;
};

const TextFlag = styled.Text`
  font-size: 55px;
`;
const Info = styled.View`
  margin-left: 20px;
  flex: 1;
`;

export default memo(CountryListItem);
