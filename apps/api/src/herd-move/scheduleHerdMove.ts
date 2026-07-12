type Collar = {
  id: string;
};

export type CommandAcknowledgment = {
  herdMoveCommandId: string;
  collarId: string;
  status: 'pending';
};

type ScheduleHerdMoveDependencies = {
  createId(): string;
  collarRepository: {
    findByHerdId(herdId: string): Promise<Collar[]>;
  };
  acknowledgmentRepository: {
    createMany(acknowledgments: CommandAcknowledgment[]): Promise<void>;
  };
};

export async function scheduleHerdMove(input: {
  herdId: string;
  grazingBreakId: string;
  scheduledFor: Date;
}, dependencies: ScheduleHerdMoveDependencies) {
  const command = {
    id: dependencies.createId(),
    status: 'dispatched' as const,
  };

  const collars = await dependencies.collarRepository.findByHerdId(input.herdId);

  const acknowledgments = collars.map((collar) => ({
    herdMoveCommandId: command.id,
    collarId: collar.id,
    status: 'pending' as const,
  }));

  await dependencies.acknowledgmentRepository.createMany(acknowledgments);

  return {
    ...command,
  };
}
