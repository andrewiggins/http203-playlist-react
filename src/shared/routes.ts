const baseUrl = "/http203-playlist-react";
export function homePath() {
	return baseUrl + "/";
}
export function cohostPath(cohost: string): string {
	return baseUrl + `/with-${cohost.toLowerCase()}/`;
}
export function videoPath(slug: string): string {
	return baseUrl + `/videos/${slug}/`;
}

export function isHomePath(path: string): boolean {
	return path === baseUrl || path === `${baseUrl}/`;
}
export function isCohostPath(path: string): boolean {
	return path.startsWith(`${baseUrl}/with-`);
}
export function isVideoPath(path: string): boolean {
	return path.startsWith(`${baseUrl}/videos/`);
}
