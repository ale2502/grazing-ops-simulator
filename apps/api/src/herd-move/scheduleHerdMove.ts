type Collar = {
  id: string;
};

export type HerdMoveCommand = {
  id: string;
  herdId: string;
  grazingBreakId: string;
  scheduledFor: Date;
  status: 'dispatched';
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
  commandRepository: {
    create(command: HerdMoveCommand): Promise<void>;
  };
};

export async function scheduleHerdMove(
  input: {
    herdId: string;
    grazingBreakId: string;
    scheduledFor: Date;
  },
  dependencies: ScheduleHerdMoveDependencies,
) {
  const command: HerdMoveCommand = {
    id: dependencies.createId(),
    herdId: input.herdId,
    grazingBreakId: input.grazingBreakId,
    scheduledFor: input.scheduledFor,
    status: 'dispatched' as const,
  };

  await dependencies.commandRepository.create(command);

  const collars = await dependencies.collarRepository.findByHerdId(
    input.herdId,
  );

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
