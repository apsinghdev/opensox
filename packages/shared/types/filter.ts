export type DateRange = {
    start: string;
    end?: string;
}

export type StarRange = {
    min?: string;
    max?: string;
    custom?: string;
}

export type ForkRange = {
    min?: string;
    max?: string;
}

export type FilterProps = {
    language?: string;
    stars?: StarRange;
    forks?: ForkRange;
    pushed?: string;
    created?: string;
    repoName?: string
}