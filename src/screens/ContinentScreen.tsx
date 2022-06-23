import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import ContinentListItem from '~/components/ContinentListItem';
import { useGetContinentQuery } from '~/graphql/service';
import { useTheme } from '~/theme/useTheme';
// @ts-ignorer
import styled from 'styled-components/native';
import AnimatedBackground from '~/components/AnimatedBackground';
import { STATUS_BAR_HEIGHT } from '~/utils/constants';
import { getScreenStyle } from '~/theme/getScreenStyle';

export const ContinentScreen = ({ code }: ContinentScreenProps) => {
  const { data } = useGetContinentQuery({
    variables: {
      code,
    },
  });

  const { colors } = useTheme();
  const TitleText = useMemo(
    () => styled.Text`
      align-self: center;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
      margin-top: 40px;
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

  return (
    <Root>
      <AnimatedBackground />
      <FlatList
        ListHeaderComponent={
          <>
            <TitleText>{data?.continent?.name || ' '}</TitleText>
            <Info>
              <InfoText>code</InfoText>
              <InfoText>{data?.continent?.code}</InfoText>
            </Info>
          </>
        }
        showsVerticalScrollIndicator={false}
        data={data?.continent?.countries}
        renderItem={({ item, index }) => (
          <Info>
            {index === 0 ? <InfoText>countries</InfoText> : <View />}
            <ContinentListItem code={item.code} name={item.name} />
          </Info>
        )}
        ListFooterComponent={<Footer />}
        keyExtractor={(_, index) => `countries-${index}`}
      />
    </Root>
  );
};

//#region
type ContinentScreenProps = {
  code: string,
};

const Root = styled.View`
  flex: 1;
`;

const Footer = styled.Text`
  height: ${STATUS_BAR_HEIGHT}px;
`;

const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 15px;
  padding-top: 3px;
`;
ContinentScreen.options = getScreenStyle();
//#endregion
