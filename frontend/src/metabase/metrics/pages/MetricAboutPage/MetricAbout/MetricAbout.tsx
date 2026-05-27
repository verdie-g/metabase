import { useCallback, useMemo } from "react";
import { push } from "react-router-redux";

import { MetricCardVisualization } from "metabase/data-studio/common/components/OverviewVisualization";
import { useCardQueryData } from "metabase/data-studio/common/hooks/use-card-query-data";
import { useMetricDefinition } from "metabase/metrics/common/hooks";
import { useDispatch } from "metabase/redux";
import { Box, Flex, Stack } from "metabase/ui";
import * as Urls from "metabase/urls";
import * as LibMetric from "metabase-lib/metric";
import type { Card } from "metabase-types/api";

import type { MetricUrls } from "../../../types";

import { AboutVisualization } from "./AboutVisualization";
import { DescriptionSection } from "./DescriptionSection";
import S from "./MetricAbout.module.css";

interface MetricAboutProps {
  card: Card;
  urls: MetricUrls;
}

export function MetricAbout({ card, urls }: MetricAboutProps) {
  const { definition } = useMetricDefinition(card.id ?? null);
  const dispatch = useDispatch();
  const { data, isLoading } = useCardQueryData(card);

  const hasTimeDimension = useMemo(
    () =>
      definition
        ? LibMetric.defaultBreakoutDimensions(definition).some(
            LibMetric.isDateOrDateTime,
          )
        : false,
    [definition],
  );

  const handleChartClick = useCallback(() => {
    if (card.id != null) {
      dispatch(push(Urls.exploreMetric(card.id)));
    }
  }, [dispatch, card.id]);

  return (
    <Flex className={S.root} flex={1} gap="md">
      <Box
        className={S.chartContainer}
        flex={1}
        mah={700}
        onClick={handleChartClick}
      >
        {hasTimeDimension ? (
          <AboutVisualization card={card} />
        ) : (
          <MetricCardVisualization
            card={card}
            data={data}
            isLoading={isLoading}
            className={S.visualizationPanel}
          />
        )}
      </Box>
      <Stack flex="0 0 360px" className={S.descriptionSection} mah={700}>
        <DescriptionSection card={card} urls={urls} />
      </Stack>
    </Flex>
  );
}
