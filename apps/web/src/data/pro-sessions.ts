/**
 * Pro Sessions Data
 *
 * Contains all the Opensox Pro Session YouTube videos with their topics
 */

export interface ProSession {
    id: number;
    title: string;
    youtubeUrl: string;
    topicsCovered: string[];
    duration?: string;
}

export const proSessions: ProSession[] = [
    {
        id: 1,
        title: "Pro Session 01",
        youtubeUrl: "https://www.youtube.com/watch?v=nZOLgP2P8aQ",
        topicsCovered: [
            "Introduction to Open Source Contributions",
            "Setting up your development environment",
            "Understanding Git workflow basics",
        ],
    },
    {
        id: 2,
        title: "Pro Session 02",
        youtubeUrl: "https://www.youtube.com/watch?v=fp6fiTce-fI",
        topicsCovered: [
            "Finding your first issue",
            "Reading project documentation effectively",
            "Communicating with maintainers",
        ],
    },
    {
        id: 3,
        title: "Pro Session 03",
        youtubeUrl: "https://www.youtube.com/watch?v=nZOLgP2P8aQ",
        topicsCovered: [
            "Writing clean pull requests",
            "Code review best practices",
            "Handling feedback gracefully",
        ],
    },
    {
        id: 4,
        title: "Pro Session 04",
        youtubeUrl: "https://www.youtube.com/watch?v=fp6fiTce-fI",
        topicsCovered: [
            "Building your Open Source portfolio",
            "Showcasing contributions on GitHub",
            "Networking in the OSS community",
        ],
    },
    {
        id: 5,
        title: "Pro Session 05",
        youtubeUrl: "https://www.youtube.com/watch?v=nZOLgP2P8aQ",
        topicsCovered: [
            "Advanced Git techniques",
            "Rebasing and resolving conflicts",
            "Cherry-picking commits",
        ],
    },
    {
        id: 6,
        title: "Pro Session 06",
        youtubeUrl: "https://www.youtube.com/watch?v=fp6fiTce-fI",
        topicsCovered: [
            "Understanding CI/CD pipelines",
            "Writing effective tests",
            "Debugging failed builds",
        ],
    },
    {
        id: 7,
        title: "Pro Session 07",
        youtubeUrl: "https://www.youtube.com/watch?v=nZOLgP2P8aQ",
        topicsCovered: [
            "Contributing to documentation",
            "Writing technical content",
            "Documentation as code",
        ],
    },
    {
        id: 8,
        title: "Pro Session 08",
        youtubeUrl: "https://www.youtube.com/watch?v=fp6fiTce-fI",
        topicsCovered: [
            "Preparing for GSoC",
            "Writing winning proposals",
            "Building relationships with mentors",
        ],
    },
    {
        id: 9,
        title: "Pro Session 09",
        youtubeUrl: "https://www.youtube.com/watch?v=nZOLgP2P8aQ",
        topicsCovered: [
            "Landing your first OSS internship",
            "Resume tips for developers",
            "Leveraging OSS for career growth",
            "Landing your first OSS internship",
            "Resume tips for developers",
            "Leveraging OSS for career growth",
            "Landing your first OSS internship",
            "Resume tips for developers",
            "Leveraging OSS for career growth",
        ],
    },
];
