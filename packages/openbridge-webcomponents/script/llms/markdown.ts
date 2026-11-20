/**
 * Fenced code tracking
 *
 * Markdown fences open with three or more backticks or tildes and close with
 * the same character at least as many times; a shorter or different fence
 * inside stays code. Every pass that must leave code alone shares this.
 */
export interface FenceState {
  readonly inFence: boolean;
  /** Updates the state for `line`; true when the line is a fence delimiter. */
  update(line: string): boolean;
}

export function fenceState(): FenceState {
  let open: {char: string; length: number} | undefined;
  return {
    get inFence() {
      return open !== undefined;
    },
    update(line) {
      const m = /^\s*(`{3,}|~{3,})/.exec(line);
      if (!m) return false;
      const char = m[1][0];
      const length = m[1].length;
      if (!open) {
        open = {char, length};
        return true;
      }
      if (
        char === open.char &&
        length >= open.length &&
        /^\s*[`~]+\s*$/.test(line)
      ) {
        open = undefined;
        return true;
      }
      return false;
    },
  };
}
