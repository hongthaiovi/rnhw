// import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { useGetCountryQuery } from '~/graphql/service';
import { useTheme } from '~/theme/useTheme';
// @ts-ignore
import styled from 'styled-components/native';
import { Navigation } from 'react-native-navigation';
import { SCREENS, STACK_IDS } from '~/navigation/screens';
import AnimatedBackground from '~/components/AnimatedBackground';

export const CountryScreen = ({ code }: Props) => {
  const { data } = useGetCountryQuery({
    variables: {
      code,
    },
  });

  const { colors, isDark } = useTheme();

  const TitleText = useMemo(
    () => styled.Text`
      align-self: center;
      font-size: 20px;
      font-weight: bold;
      color: ${colors.textColor};
    `,
    [colors],
  );

  const InfoText = useMemo(
    () => styled.Text`
      font-size: 15px;
      color: ${colors.textColor};
    `,
    [colors],
  );

  const onPress = useCallback(() => {
    Navigation.push(STACK_IDS.MAIN, {
      component: {
        name: SCREENS.CONTINENT,
        passProps: {
          code: data!.country!.continent.code,
        },
      },
    });
  }, [data]);

  return (
    <Root>
      <StatusBar
        translucent
        animated
        backgroundColor={colors.backgroundColor}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <AnimatedBackground />
      <Header>
        <FlagText>{data?.country?.emoji || ' '}</FlagText>
        <TitleText>{data?.country?.name || ' '}</TitleText>
      </Header>
      <Info>
        <InfoText>alpha2Code</InfoText>
        <InfoText>{data?.country?.code}</InfoText>
      </Info>
      <Info>
        <InfoText>callingCodes</InfoText>
        <InfoText>+{data?.country?.phone}</InfoText>
      </Info>
      <Info>
        <InfoText>continent</InfoText>
        <TouchableOpacity onPress={onPress}>
          <ContinentText>{data?.country?.continent.name}</ContinentText>
        </TouchableOpacity>
      </Info>
    </Root>
  );
};

//#region
type Props = {
  code: string;
};
const Root = styled.View`
  flex: 1;
`;
const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 15px;
  padding-top: 3px;
`;

const Header = styled.View`
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ContinentText = styled.Text`
  color: #2e55ff;
  text-decoration-line: underline;
`;

const FlagText = styled.Text`
  font-size: 70px;
`;
//#endregion
