import { renderHook, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DESKTOP_BREAKPOINT_PX,
  motionEligible,
  useIsDesktop,
  useIsTouchDevice,
  useReducedMotion,
} from './motionGates';

/**
 * Build a controllable MediaQueryList mock.
 * Returns helpers to flip the `matches` state and to read the registered
 * listeners — so tests can verify cleanup.
 */
type MQLController = {
  setMatches(next: boolean): void;
  listenerCount(): number;
};

function installMatchMediaMock() {
  const controllers = new Map<string, MQLController>();
  const listenersByQuery = new Map<string, Set<(e: MediaQueryListEvent) => void>>();
  const stateByQuery = new Map<string, boolean>();

  function matchMedia(query: string): MediaQueryList {
    if (!listenersByQuery.has(query)) listenersByQuery.set(query, new Set());
    if (!stateByQuery.has(query)) stateByQuery.set(query, false);

    const mql: MediaQueryList = {
      get matches() {
        return stateByQuery.get(query) ?? false;
      },
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((_evt: string, handler: EventListenerOrEventListenerObject) => {
        listenersByQuery.get(query)?.add(handler as (e: MediaQueryListEvent) => void);
      }),
      removeEventListener: vi.fn((_evt: string, handler: EventListenerOrEventListenerObject) => {
        listenersByQuery.get(query)?.delete(handler as (e: MediaQueryListEvent) => void);
      }),
      dispatchEvent: vi.fn(() => true),
    };

    controllers.set(query, {
      setMatches(next: boolean) {
        stateByQuery.set(query, next);
        const event = { matches: next, media: query } as MediaQueryListEvent;
        listenersByQuery.get(query)!.forEach((l) => l(event));
      },
      listenerCount() {
        return listenersByQuery.get(query)!.size;
      },
    });

    return mql;
  }

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: matchMedia,
  });

  return {
    set(query: string, matches: boolean) {
      // Ensure the query has been registered before tests try to flip it.
      if (!stateByQuery.has(query)) {
        stateByQuery.set(query, matches);
        listenersByQuery.set(query, new Set());
      } else {
        const c = controllers.get(query);
        if (c) c.setMatches(matches);
        else stateByQuery.set(query, matches);
      }
    },
    flip(query: string, matches: boolean) {
      const c = controllers.get(query);
      if (!c) throw new Error(`No controller for query ${query}`);
      c.setMatches(matches);
    },
    listenerCount(query: string) {
      return controllers.get(query)?.listenerCount() ?? 0;
    },
    reset() {
      controllers.clear();
      listenersByQuery.clear();
      stateByQuery.clear();
    },
  };
}

let mediaMock: ReturnType<typeof installMatchMediaMock>;

beforeEach(() => {
  mediaMock = installMatchMediaMock();
  // Default jsdom doesn't expose ontouchstart; clean state per-test.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (window as any).ontouchstart;
  // Make rAF deterministic — fire callbacks synchronously.
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
    cb(0);
    return 0;
  });
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
});

afterEach(() => {
  mediaMock.reset();
  vi.restoreAllMocks();
});

describe('useReducedMotion', () => {
  it('returns false by default when reduced motion is not set', () => {
    mediaMock.set('(prefers-reduced-motion: reduce)', false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when reduced motion is set on mount', () => {
    mediaMock.set('(prefers-reduced-motion: reduce)', true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('reacts when reduced motion is toggled at runtime', () => {
    mediaMock.set('(prefers-reduced-motion: reduce)', false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => mediaMock.flip('(prefers-reduced-motion: reduce)', true));
    expect(result.current).toBe(true);

    act(() => mediaMock.flip('(prefers-reduced-motion: reduce)', false));
    expect(result.current).toBe(false);
  });

  it('removes its listener on unmount', () => {
    mediaMock.set('(prefers-reduced-motion: reduce)', false);
    const { unmount } = renderHook(() => useReducedMotion());
    expect(mediaMock.listenerCount('(prefers-reduced-motion: reduce)')).toBe(1);
    unmount();
    expect(mediaMock.listenerCount('(prefers-reduced-motion: reduce)')).toBe(0);
  });
});

describe('useIsTouchDevice', () => {
  it('returns false on pure pointer devices with no touch', () => {
    mediaMock.set('(pointer: coarse)', false);
    const { result } = renderHook(() => useIsTouchDevice());
    expect(result.current).toBe(false);
  });

  it('returns true when pointer is coarse', () => {
    mediaMock.set('(pointer: coarse)', true);
    const { result } = renderHook(() => useIsTouchDevice());
    expect(result.current).toBe(true);
  });

  it('returns true when ontouchstart is present (hybrid laptops with touchscreens)', () => {
    mediaMock.set('(pointer: coarse)', false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).ontouchstart = null;
    const { result } = renderHook(() => useIsTouchDevice());
    expect(result.current).toBe(true);
  });
});

describe('useIsDesktop', () => {
  it('returns true on a wide-viewport pointer device', () => {
    mediaMock.set(`(min-width: ${DESKTOP_BREAKPOINT_PX}px)`, true);
    mediaMock.set('(pointer: coarse)', false);
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(true);
  });

  it('returns false on a narrow viewport even with a pointer device', () => {
    mediaMock.set(`(min-width: ${DESKTOP_BREAKPOINT_PX}px)`, false);
    mediaMock.set('(pointer: coarse)', false);
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(false);
  });

  it('returns false on a wide viewport touch device (tablet held horizontally)', () => {
    mediaMock.set(`(min-width: ${DESKTOP_BREAKPOINT_PX}px)`, true);
    mediaMock.set('(pointer: coarse)', true);
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(false);
  });

  it('reacts to viewport resizing across the breakpoint', () => {
    mediaMock.set(`(min-width: ${DESKTOP_BREAKPOINT_PX}px)`, true);
    mediaMock.set('(pointer: coarse)', false);
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(true);

    act(() => mediaMock.flip(`(min-width: ${DESKTOP_BREAKPOINT_PX}px)`, false));
    expect(result.current).toBe(false);
  });
});

describe('motionEligible', () => {
  it('truth table', () => {
    expect(motionEligible({ reduced: false, isDesktop: true })).toBe(true);
    expect(motionEligible({ reduced: true, isDesktop: true })).toBe(false);
    expect(motionEligible({ reduced: false, isDesktop: false })).toBe(false);
    expect(motionEligible({ reduced: true, isDesktop: false })).toBe(false);
  });
});

describe('SSR-default behavior', () => {
  it('exports a deterministic breakpoint constant', () => {
    // The token-mirror that consumers compose with.
    expect(DESKTOP_BREAKPOINT_PX).toBe(1024);
  });

  // Note: the hooks themselves use useState(default) so the first render
  // returns the default before useEffect runs. The defaults match the
  // documented SSR contract: reduced=false, touch=false, desktop=true.
});
