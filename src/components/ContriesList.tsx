import React, {memo, useMemo} from 'react';
import {FlatList, Animated, RefreshControl} from 'react-native';
import CountryListItem from '~/components/CountryListItem';
import {useTheme} from '~/theme/useTheme';
// @ts-ignore
import styled from 'styled-components/native';
import {HEADER_HEIGHT, STATUS_BAR_HEIGHT} from '~/utils/constants';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ContriesList = ({
  data,
  offset,
  onRefresh,
  loading,
}: ContriesListProps) => {
  const {colors} = useTheme();

  const TitleText = useMemo(
    () => styled.Text`
      margin: 20px;
      font-size: 20px;
      font-weight: bold;
      color: ${colors.textColor};
      padding-top: ${HEADER_HEIGHT - STATUS_BAR_HEIGHT}px;
    `,
    [colors],
  );

  return (
    <AnimatedFlatList
      ListHeaderComponent={<TitleText>List of countries</TitleText>}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={loading} />
      }
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: offset}}}], {
        useNativeDriver: true,
      })}
      scrollEventThrottle={16}
      data={data}
      style={{
        marginTop: STATUS_BAR_HEIGHT,
      }}
      renderItem={({item}) => {
        // @ts-ignore
        const {code, name, capital, emoji} = item;
        return (
          <CountryListItem
            code={code}
            name={name}
            capital={capital}
            emoji={emoji}
          />
        );
      }}
      ListFooterComponent={<Footer />}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => `ContriesList-${index}`}
    />
  );
};

export default memo(ContriesList);

//#region
const Footer = styled.Text`
  height: ${STATUS_BAR_HEIGHT}px;
`;

type ContriesListProps = {
  data?: Array<{
    code: string;
    name: string;
    capital?: string | null;
    emoji: string;
  }>;
  offset: Animated.Value;
  onRefresh: () => void;
  loading: boolean;
};

//#endregion
