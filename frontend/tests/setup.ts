// tests/setup.ts
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock URL.createObjectURL for jsdom
Object.defineProperty(global.URL, 'createObjectURL', {
  writable: true,
  value: vi.fn(() => 'blob:mock'),
});
Object.defineProperty(global.URL, 'revokeObjectURL', {
  writable: true,
  value: vi.fn(),
});
