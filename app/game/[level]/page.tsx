import { notFound } from 'next/navigation';
import { LEVELS, getLevelBySlug } from '@/lib/lore/levels';
import { GameScene } from '@/components/scene/GameScene';

export function generateStaticParams() {
  return LEVELS.map((l) => ({ level: l.slug }));
}

export const dynamicParams = false;

export default function LevelPage({ params }: { params: { level: string } }) {
  const level = getLevelBySlug(params.level);
  if (!level) notFound();
  return <GameScene level={level} />;
}
