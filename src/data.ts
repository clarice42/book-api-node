interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
  description: string;
}

export const library: Book[] = [
  {
    id: 1,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: "1813",
    description: "Lorem ipsum...",
  },
  {
    id: 2,
    title: "Moby Dick",
    author: "Herman Melville",
    year: "1851",
    description: "It's about a white whalle...",
  },
];
