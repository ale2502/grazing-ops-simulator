export async function scheduleHerdMove(input: {
  herdId: string;
  grazingBreakId: string;
  scheduledFor: Date;
}) {
  return {
    status: 'dispatched',
  };
}
