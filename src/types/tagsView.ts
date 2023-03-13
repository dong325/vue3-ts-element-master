export interface visitedItem {
    title: string,
    path: string,
    query?: any,
    meta?: any,
    fullPath?: any,
}

export class InitData {
    visitedViews:visitedItem[] = []
}