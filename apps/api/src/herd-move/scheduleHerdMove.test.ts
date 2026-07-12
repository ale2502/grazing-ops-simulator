import { describe, expect, it } from 'vitest';
import {
  type CommandAcknowledgment,
  scheduleHerdMove,
} from './scheduleHerdMove';

function createDependencies(collars: { id: string }[] = []) {
  const createdAcknowledgments: CommandAcknowledgment[] = [];

  return {
    createdAcknowledgments,
    dependencies: {
      createId: () => 'command-1',
      collarRepository: {
        findByHerdId: async () => collars,
      },
      acknowledgmentRepository: {
        createMany: async (acknowledgments: CommandAcknowledgment[]) => {
          createdAcknowledgments.push(...acknowledgments);
        },
      },
    },
  };
}

describe('scheduleHerdMove', () => {
  it('creates a dispatched herd move command', async () => {
    // Arrange
    const input = {
      herdId: 'herd-1',
      grazingBreakId: 'break-1',
      scheduledFor: new Date('2026-07-08T06:00:00.000Z'),
    };
    const { dependencies } = createDependencies();

    // Act
    const result = await scheduleHerdMove(input, dependencies);

    // Assert
    expect(result.status).toBe('dispatched');
  });

  it('creates a pending acknowledgement for each collar in the herd', async () => {
    // Arrange
    const collars = [{ id: 'collar-1' }, { id: 'collar-2' }];
    const input = {
      herdId: 'herd-1',
      grazingBreakId: 'break-1',
      scheduledFor: new Date('2026-07-08T06:00:00.000Z'),
    };
    const { createdAcknowledgments, dependencies } = createDependencies(collars);

    // Act
    const result = await scheduleHerdMove(input, dependencies);

    // Assert
    expect(createdAcknowledgments).toEqual([
      {
        herdMoveCommandId: result.id,
        collarId: 'collar-1',
        status: 'pending',
      },
      {
        herdMoveCommandId: result.id,
        collarId: 'collar-2',
        status: 'pending',
      },
    ]);
  });
});
