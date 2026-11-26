export const explorationSpotIds = ['M01', 'M02', 'M03', 'M04'] as const;

export const explorationIntroOptions = [
  { id: 'exploration-curiosity-a', text: '听说附近有棵高大的杉树和一座特别的鸟居。它们是什么样子的呢？' },
  { id: 'exploration-curiosity-b', text: '听说附近有不少特别的东西。我能找到它们吗？' },
] as const;

export function chooseExplorationIntro(randomValue: number) {
  return explorationIntroOptions[randomValue < 0.5 ? 0 : 1];
}

export function markSpotDiscovered(discoveredIds: string[], spotId: string) {
  if (!explorationSpotIds.includes(spotId as typeof explorationSpotIds[number]) || discoveredIds.includes(spotId)) {
    return { discoveredIds, added: false };
  }
  return { discoveredIds: [...discoveredIds, spotId], added: true };
}

export function routeStopLabels(spotIds: string[], names: Record<string, string>) {
  return ['大江山口内宫站（出发）', ...spotIds.map((id) => names[id] ?? id), '大江山口内宫站（返程）'];
}
