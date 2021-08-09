import { ExactMatchResults } from './getExactMatches';

export enum MatchStatus {
	MATCHES_NONE,
	MATCHES_PARTIAL,
	MATCHES_EXACT,
}

export type Guess = number[];
export type SecretCode = number[];
export type PegValueTotals = number[];

export interface GuessResult
	extends Pick<ExactMatchResults, 'totalExactMatches'> {
	totalPartialMatches: number;
	winner: boolean;
	gameOver: boolean;
}
