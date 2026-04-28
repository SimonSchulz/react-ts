export type ServerMsg =
  | { type: 'message'; payload: { text: string; user: string } }
  | { type: 'system'; payload: { text: string } }
  | { type: 'typing'; payload: { user: string } }

export type ChatMsg =
  | { kind: 'user'; text: string; user: string }
  | { kind: 'system'; text: string }
  | { kind: 'me'; text: string }
