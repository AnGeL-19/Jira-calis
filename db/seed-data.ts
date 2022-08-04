
interface SeedData{
    entries: SeedEntry[];
}

interface SeedEntry{
    description: string;
    status: string;
    createAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'pending: Lorem ipsum de amonos cpsas y asi',
            status: 'pending',
            createAt: Date.now()
        },
        {
            description: 'in-progress: Lorem ipsum de amonos cpsas y asi',
            status: 'in-progress',
            createAt: Date.now() - 100000
        },
        {
            description: 'finished: Lorem ipsum de amonos cpsas y asi',
            status: 'finished',
            createAt: Date.now() - 10000
        }
    ]
}






