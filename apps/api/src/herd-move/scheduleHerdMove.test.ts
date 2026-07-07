import { describe, expect, it } from 'vitest';
import { scheduleHerdMove } from './scheduleHerdMove';

describe('scheduleHerdMove', () => {
  it('creates a dispatched herd move command', async () => {
    // Arrange
    const input = {
      herdId: 'herd-1',
      grazingBreakId: 'break-1',
      scheduledFor: new Date('2026-07-08T06:00:00.000Z'),
    };

    // Act
    const result = await scheduleHerdMove(input);

    // Assert
    expect(result.status).toBe('dispatched');
  });
});
