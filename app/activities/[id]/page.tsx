// File: /app/activities/[id]/page.tsx
import { MOCK_ACTIVITIES } from '@/lib/constants';
import ClientActivityPage from '@/components/activities/ClientActivityPage';

export async function generateStaticParams() {
  return MOCK_ACTIVITIES.map((activity) => ({
    id: activity.id,
  }));
}

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  const activity = MOCK_ACTIVITIES.find((a) => a.id === params.id);

  if (!activity) {
    return <div className="p-4">Activity not found</div>;
  }

  return <ClientActivityPage activity={activity} images={[activity.image]} />;
}
